import { useState } from 'react';
import { useEmailCapture } from '@/hooks/useEmailCapture';
import { ShareGuide } from '@/components/ShareGuide';
import { Check, Download, Loader2, Mail, User } from 'lucide-react';

const GUIDE_PDF_URL = 'https://pub-85e8da6f6b3443da89cb72ca8b6938ec.r2.dev/Guides/Prediction_Markets_101_Course.pdf';

type Variant = 'primary' | 'secondary';

interface EmailFormProps {
  variant?: Variant;
  onConverted?: () => void;
}

export function EmailForm({ variant = 'primary', onConverted }: EmailFormProps) {
  const { name, setName, email, setEmail, status, error, submit } = useEmailCapture();
  const [showDownload, setShowDownload] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submit();
    if (success) {
      setShowDownload(true);
      onConverted?.();
    }
  };

  const isPrimary = variant === 'primary';

  if (status === 'success' && showDownload) {
    return (
      <div className="w-full">
        <div
          className={`flex items-center gap-2 ${isPrimary ? 'text-lg' : 'text-base'} font-medium text-teal-dark`}
        >
          <Check className={isPrimary ? 'h-5 w-5' : 'h-4 w-4'} />
          <span>You're in. The guide is on its way.</span>
        </div>
        <a
          href={GUIDE_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex items-center gap-2 ${
            isPrimary
              ? 'px-6 py-3 text-base'
              : 'px-4 py-2 text-sm'
          } rounded-lg bg-teal text-white font-medium shadow-card hover:bg-teal-dark hover:shadow-card-hover active:scale-[0.98] transition-all duration-200`}
        >
          <Download className={isPrimary ? 'h-5 w-5' : 'h-4 w-4'} />
          Download the Guide
        </a>
        <ShareGuide />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className={`flex flex-col ${isPrimary ? 'md:flex-row' : 'sm:flex-row'} gap-3`}>
        <div className="relative flex-1">
          <User
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-navy-light/50 ${
              isPrimary ? 'h-5 w-5' : 'h-4 w-4'
            }`}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="First name"
            disabled={status === 'submitting'}
            className={`w-full ${
              isPrimary ? 'pl-11 pr-4 py-3 text-base' : 'pl-10 pr-3 py-2 text-sm'
            } rounded-lg border border-navy/20 bg-white text-charcoal placeholder:text-navy-light/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors`}
          />
        </div>
        <div className="relative flex-1">
          <Mail
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-navy-light/50 ${
              isPrimary ? 'h-5 w-5' : 'h-4 w-4'
            }`}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            disabled={status === 'submitting'}
            className={`w-full ${
              isPrimary ? 'pl-11 pr-4 py-3 text-base' : 'pl-10 pr-3 py-2 text-sm'
            } rounded-lg border ${
              error ? 'border-teal' : 'border-navy/20'
            } bg-white text-charcoal placeholder:text-navy-light/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`inline-flex items-center justify-center gap-2 rounded-lg bg-teal text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 ${
            isPrimary
              ? 'px-8 py-4 text-lg font-bold shadow-card-lg hover:bg-teal-dark hover:shadow-card-lg hover:-translate-y-0.5 animate-button-pulse'
              : 'px-4 py-2 text-sm font-medium shadow-card hover:bg-teal-dark hover:shadow-card-hover'
          }`}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className={isPrimary ? 'h-5 w-5 animate-spin' : 'h-4 w-4 animate-spin'} />
              <span>Sending…</span>
            </>
          ) : (
            <span>Send Me The Free Guide</span>
          )}
        </button>
      </div>

      {error && (
        <p className={`mt-2 text-teal ${isPrimary ? 'text-sm' : 'text-xs'}`}>
          {error}
        </p>
      )}

      <p
        className={`mt-3 ${isPrimary ? 'text-sm' : 'text-xs'} text-navy-light/70`}
      >
        By submitting, you agree to receive the guide and occasional related emails.
      </p>
    </form>
  );
}
