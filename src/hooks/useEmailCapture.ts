import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface EmailCaptureResult {
  success: boolean;
  emailWarning?: string;
}

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
  const [emailWarning, setEmailWarning] = useState('');

  const validate = useCallback((value: string): string | null => {
    if (!value.trim()) return 'Please enter your email address.';
    if (!EMAIL_RE.test(value.trim())) return 'Please enter a valid email address.';
    return null;
  }, []);

  const submit = useCallback(async (): Promise<EmailCaptureResult> => {
    const validationError = validate(email);
    if (validationError) {
      setError(validationError);
      setStatus('error');
      return { success: false };
    }

    setStatus('submitting');
    setError('');
    setEmailWarning('');

    try {
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert({
          email: email.trim(),
          name: name.trim() || null,
          phone: phone || null,
        });

      if (insertError) {
        // 23505 = unique_violation — email already subscribed, not an error
        if (insertError.code !== '23505') {
          throw new Error(insertError.message || 'Could not save your email. Please try again.');
        }
      }

      // The subscriber is saved — they get their guide regardless of email delivery.
      // Fire the email send in the background; a failure here is not blocking.
      const timestamp = new Date().toISOString();
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-guide`;
      fetch(functionUrl, {
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
      }).then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          console.warn('Guide email delivery issue:', body.error || body.details || response.status);
        }
      }).catch((err) => {
        console.warn('Guide email request failed:', err);
      });

      setStatus('success');
      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(msg);
      setStatus('error');
      return { success: false };
    }
  }, [email, name, phone, validate]);

  const reset = useCallback(() => {
    setName('');
    setEmail('');
    setStatus('idle');
    setError('');
    setEmailWarning('');
  }, []);

  return { name, setName, email, setEmail, status, error, emailWarning, submit, reset };
}
