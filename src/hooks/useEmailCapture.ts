import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useEmailCapture() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone] = useState(() => {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    return params.get('phone')?.trim() ?? '';
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const validate = useCallback((value: string): string | null => {
    if (!value.trim()) return 'Please enter your email address.';
    if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email address.';
    return null;
  }, []);

  const submit = useCallback(async (): Promise<boolean> => {
    const validationError = validate(email);
    if (validationError) {
      setError(validationError);
      setStatus('error');
      return false;
    }

    setStatus('submitting');
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert({
          email: email.trim(),
          name: name.trim() || null,
          phone: phone || null,
        });

      if (insertError) {
        // 23505 = unique_violation — email already subscribed
        if (insertError.code !== '23505') {
          throw insertError;
        }
      }

      // Send the guide + notification emails via the send-guide edge function.
      const timestamp = new Date().toISOString();
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-guide`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || null,
          phone: phone || null,
          timestamp,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Email send failed (${response.status})`);
      }

      setStatus('success');
      return true;
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('error');
      return false;
    }
  }, [email, name, phone, validate]);

  const reset = useCallback(() => {
    setName('');
    setEmail('');
    setStatus('idle');
    setError('');
  }, []);

  return { name, setName, email, setEmail, status, error, submit, reset };
}
