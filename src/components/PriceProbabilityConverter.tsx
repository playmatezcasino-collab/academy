import { useState } from 'react';

export function PriceProbabilityConverter() {
  const [cents, setCents] = useState(60);

  const yesWidth = cents;
  const noWidth = 100 - cents;

  return (
    <div className="rounded-xl border border-navy/10 bg-white p-8 sm:p-10 shadow-card">
      <div className="mb-8 text-center">
        <h3 className="font-serif text-xl text-navy">
          Convert a price into a probability
        </h3>
        <p className="mt-2 text-sm text-charcoal/60">
          Drag the slider or type a price in cents. Watch how the implied
          probability changes.
        </p>
      </div>

      {/* Probability bar */}
      <div className="relative mb-8">
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          <span className="text-navy">YES</span>
          <span className="text-red">NO</span>
        </div>
        <div className="relative flex h-12 w-full overflow-hidden rounded-lg shadow-inner">
          <div
            className="relative flex items-center justify-center bg-navy text-white text-sm font-semibold transition-all duration-150 ease-out"
            style={{ width: `${yesWidth}%` }}
          >
            {cents >= 12 && <span>{cents}%</span>}
          </div>
          <div
            className="relative flex items-center justify-center bg-red text-white text-sm font-semibold transition-all duration-150 ease-out"
            style={{ width: `${noWidth}%` }}
          >
            {noWidth >= 12 && <span>{noWidth}%</span>}
          </div>
        </div>
      </div>

      {/* Slider + number input */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={100}
            value={cents}
            onChange={(e) => setCents(Number(e.target.value))}
            aria-label="Price in cents"
            className="converter-slider w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={100}
            value={cents}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!Number.isNaN(v)) setCents(Math.max(0, Math.min(100, v)));
            }}
            aria-label="Price in cents"
            className="w-20 rounded-lg border border-navy/20 bg-white px-3 py-2 text-center text-base text-charcoal focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
          />
          <span className="text-sm text-navy-light font-medium">cents</span>
        </div>
      </div>

      {/* Live readout */}
      <p className="text-center text-lg text-charcoal/85 leading-relaxed">
        A{' '}
        <span className="font-semibold text-navy tabular-nums">{cents}</span>{' '}
        cent share implies a{' '}
        <span className="font-semibold text-navy tabular-nums">
          {cents}%
        </span>{' '}
        chance of that outcome.
      </p>
    </div>
  );
}
