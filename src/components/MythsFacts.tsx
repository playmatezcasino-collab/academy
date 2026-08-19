import { X, Check } from 'lucide-react';

const MYTHS = [
  {
    myth: "It's just gambling with a new name.",
    fact:
      'Prices are driven by collective probability estimates, not odds set by the house, and every market settles against a stated, verifiable source agreed before it opens.',
  },
  {
    myth: 'The platform decides who wins.',
    fact:
      'Outcomes are determined entirely by the real world event itself, verified against a previously agreed source — not by the platform.',
  },
  {
    myth: 'Prices never change once a market opens.',
    fact:
      'Prices move continuously as real money shifts between sides, the same way a tote board works at a racetrack.',
  },
  {
    myth: 'You need financial experience to understand this.',
    fact:
      'The core mechanic is a single idea — price reflects collective probability — that takes minutes to learn.',
  },
];

export function MythsFacts() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {MYTHS.map(({ myth, fact }) => (
        <div
          key={myth}
          className="rounded-xl border border-navy/10 bg-white p-6 shadow-card hover:shadow-card-hover hover:border-navy/20 transition-all duration-300"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta/15">
              <X className="h-3.5 w-3.5 text-terracotta" />
            </div>
            <p className="text-charcoal/50 italic leading-relaxed line-through decoration-terracotta/40">
              {myth}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/15">
              <Check className="h-3.5 w-3.5 text-teal-dark" />
            </div>
            <p className="text-charcoal/85 leading-relaxed">
              <span className="font-semibold text-teal-dark">Actually: </span>
              {fact}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
