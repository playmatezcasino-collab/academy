import { useState } from 'react';
import { Link2, Share2, Check } from 'lucide-react';

export function ShareGuide() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available, fall through to native share
      handleShare();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Prediction Markets 101',
          text: 'A free, plain English guide to how prediction markets work.',
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed, no action needed
      }
    } else {
      handleCopy();
    }
  };

  const supportsNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
      <span className="text-sm text-navy-light font-medium">
        Share this guide
      </span>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy/20 bg-white px-3 py-1.5 text-sm text-navy hover:border-navy/40 hover:bg-navy/5 transition-all duration-200 active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-teal-dark" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Link2 className="h-3.5 w-3.5" />
              <span>Copy link</span>
            </>
          )}
        </button>
        {supportsNativeShare && (
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy/20 bg-white px-3 py-1.5 text-sm text-navy hover:border-navy/40 hover:bg-navy/5 transition-all duration-200 active:scale-[0.98]"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );
}
