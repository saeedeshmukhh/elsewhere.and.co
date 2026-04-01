import { useMemo, useState } from 'react'
import { products } from '../data/products'
import { ProductCard } from '../components/product/ProductCard'
import type { ProductCategory } from '../types/product'

type Filter = 'all' | ProductCategory | 'new'

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'hoodies', label: 'Hoodies' },
  { id: 'sweatshirts', label: 'Sweatshirts' },
  { id: 't-shirts', label: 'T-Shirts' },
  { id: 'new', label: 'New Drop' },
]

export function Shop() {
  const [active, setActive] = useState<Filter>('all')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (active === 'all') return true
      if (active === 'new') return p.isNewDrop
      return p.category === active
    })
  }, [active])

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Shop
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Collection
        </h1>
        <p className="mt-4 text-muted">
          Between cities, between selves — pick your crossover.
        </p>
      </header>

      <div className="mt-12 flex flex-wrap gap-2 border-b border-cream-dark pb-8">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f.id)}
            className={[
              'rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300',
              active === f.id
                ? 'border-ink bg-ink text-cream'
                : 'border-cream-dark bg-transparent text-muted hover:border-ink/30 hover:text-ink',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} showQuickAdd />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted">No products in this filter.</p>
      )}
    </div>
  )
}
