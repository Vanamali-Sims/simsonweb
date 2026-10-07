import { proofTiles } from '@content/portfolio';
import BeforeAfterBars from './BeforeAfterBars';

export default function ProofNumbers() {
  return (
    <section
      id="proof"
      className="border-b border-grid px-5 py-16 md:px-8 md:py-20"
      aria-labelledby="proof-heading"
    >
      <div className="mx-auto max-w-[1360px]">
        <h2 id="proof-heading" className="sr-only">Proof numbers</h2>
        <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
          {proofTiles.map((tile) => (
            <li key={tile.id} className="flex flex-col gap-4">
              <p className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                {tile.headline}
              </p>
              <p className="text-base text-muted">{tile.caption}</p>
              <BeforeAfterBars
                beforeLabel={tile.beforeLabel}
                afterLabel={tile.afterLabel}
                beforeValue={tile.beforeValue}
                afterValue={tile.afterValue}
                color={tile.color}
                format={
                  tile.id === 'sea-anchor-p10'
                    ? 'decimal3'
                    : tile.id === 'silveroak-routing'
                      ? 'seconds'
                      : 'default'
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
