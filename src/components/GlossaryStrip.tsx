import {
  Activity,
  BadgeDollarSign,
  Flag,
  Layers,
  Timer,
  Tag,
} from 'lucide-react';

const TERMS = [
  {
    icon: Activity,
    accent: 'text-teal',
    term: 'Implied Probability',
    definition:
      'What a market price says about the likelihood of an outcome.',
  },
  {
    icon: BadgeDollarSign,
    accent: 'text-navy-light',
    term: 'Liquidity',
    definition:
      'How much money is actively backing each side of a market.',
  },
  {
    icon: Flag,
    accent: 'text-terracotta',
    term: 'Settlement',
    definition:
      'The moment a market resolves against its stated, verifiable source.',
  },
  {
    icon: Layers,
    accent: 'text-slateblue',
    term: 'Position Sizing',
    definition:
      'How much of your total funds any single position represents.',
  },
  {
    icon: Timer,
    accent: 'text-teal-dark',
    term: 'Sustained Window',
    definition:
      'A required period a condition must hold true, not just a single instant.',
  },
  {
    icon: Tag,
    accent: 'text-navy',
    term: 'Market Price',
    definition:
      'The current cost to back a side, which moves as money shifts between YES and NO.',
  },
];

export function GlossaryStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TERMS.map(({ icon: Icon, accent, term, definition }) => (
        <div
          key={term}
          className="rounded-xl border border-navy/10 bg-white p-5 shadow-card hover:shadow-card-hover hover:border-navy/20 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`h-5 w-5 ${accent}`} />
            <h3 className="font-medium text-navy text-sm">{term}</h3>
          </div>
          <p className="text-charcoal/70 text-sm leading-relaxed">
            {definition}
          </p>
        </div>
      ))}
    </div>
  );
}
