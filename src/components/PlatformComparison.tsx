const PLATFORMS = [
  {
    name: 'Playmatez',
    focus: 'Social and entertainment oriented markets',
    duration: 'Short form markets, often minutes to days',
    settlement:
      'Resolves against previously agreed public sources stated per market',
  },
  {
    name: 'Kalshi',
    focus: 'Regulated financial and event contracts',
    duration: 'Hourly, daily, and longer dated contracts',
    settlement:
      'Resolves against official public data sources, CFTC regulated',
  },
  {
    name: 'Polymarket',
    focus: 'Political and current events markets',
    duration: 'Varied, from days to months',
    settlement:
      'Resolves against UMA oracle with community verification',
  },
];

const ATTRIBUTES = [
  { key: 'focus', label: 'Primary market focus' },
  { key: 'duration', label: 'Typical market duration' },
  { key: 'settlement', label: 'Settlement approach' },
] as const;

export function PlatformComparison() {
  return (
    <div className="overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card">
      {/* Header row */}
      <div className="grid grid-cols-3 bg-navy/5">
        {PLATFORMS.map((p) => (
          <div
            key={p.name}
            className="px-4 py-5 text-center border-l border-navy/10 first:border-l-0"
          >
            <span className="font-serif text-base text-navy font-medium">
              {p.name}
            </span>
          </div>
        ))}
      </div>

      {/* Attribute rows */}
      {ATTRIBUTES.map((attr, i) => (
        <div
          key={attr.key}
          className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-navy/[0.02]'}`}
        >
          {PLATFORMS.map((p, j) => (
            <div
              key={p.name + attr.key}
              className={`px-4 py-5 border-l border-navy/10 first:border-l-0 ${
                j > 0 ? 'border-t-0' : ''
              } ${i % 2 !== 0 ? 'border-t border-navy/5' : 'border-t border-navy/5'}`}
            >
              <div className="mb-1 text-[0.65rem] uppercase tracking-[0.12em] text-navy-light/60 sm:hidden">
                {attr.label}
              </div>
              <p className="text-sm text-charcoal/80 leading-relaxed text-center">
                {p[attr.key]}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function HistoricalExample() {
  return (
    <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-card">
      <h3 className="font-serif text-lg text-navy mb-3">
        When the market and the polls disagreed
      </h3>
      <p className="text-charcoal/80 leading-relaxed">
        Leading up to the 2024 US presidential election, public polling
        showed a closely tied race. Polymarket's pricing told a different
        story, giving one candidate a clear lead in implied probability that
        held through election day. It is a widely cited real example of
        market pricing diverging from polling, and a reminder that a market
        price reflects what participants collectively expect, not what any
        single poll says.
      </p>
    </div>
  );
}
