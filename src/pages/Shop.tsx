import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { collections } from '../data/collections'
import { products, getProductsByCollectionSlug } from '../data/catalog'
import { ProductCard } from '../components/product/ProductCard'
import type { ShopTag } from '../types/product'

type TagFilter = 'all' | ShopTag
type ColFilter = 'all' | string

const tagFilters: { id: TagFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'best-sellers', label: 'Best sellers' },
  { id: 'hoodies', label: 'Hoodies' },
  { id: 't-shirts', label: 'T-Shirts' },
]

function collectionNavItems(): { slug: string; name: string }[] {
  const rows: { slug: string; name: string }[] = [
    { slug: 'all', name: 'All pieces' },
  ]
  for (const c of collections) {
    if (c.releaseStatus === 'active') {
      rows.push({ slug: c.slug, name: c.name })
    }
  }
  return rows
}

function productMatchesTag(p: (typeof products)[0], tag: ShopTag): boolean {
  return p.shopTags.includes(tag)
}

export function Shop() {
  const [colFilter, setColFilter] = useState<ColFilter>('all')
  const [tagFilter, setTagFilter] = useState<TagFilter>('all')

  const colNav = useMemo(() => collectionNavItems(), [])

  const baseList = useMemo(() => {
    if (colFilter === 'all') return [...products]
    return getProductsByCollectionSlug(colFilter)
  }, [colFilter])

  const filtered = useMemo(() => {
    return baseList.filter((p) => {
      if (tagFilter === 'all') return true
      return productMatchesTag(p, tagFilter)
    })
  }, [baseList, tagFilter])

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const p of filtered) {
      const key = p.collectionSlug
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return map
  }, [filtered])

  const sectionOrder = collections
    .filter((c) => c.releaseStatus === 'active')
    .map((c) => c.slug)

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
      <header className="max-w-3xl">
        <p className="font-street text-[clamp(3rem,10vw,5.5rem)] leading-none tracking-tight text-ink">
          SHOP
        </p>
        <p className="mt-3 font-desi text-sm text-muted">चुनो · पहनो · भेजो</p>
        <p className="mt-4 max-w-xl text-muted">
          Roots Remain — five curated pieces. Hoodies are featured as best sellers; tees follow.
          Checkout is paused until launch.
        </p>
      </header>

      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Collection
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {colNav.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setColFilter(c.slug)}
              className={[
                'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors',
                colFilter === c.slug
                  ? 'border-ink bg-ink text-cream'
                  : 'border-cream-dark text-muted hover:border-ink/30 hover:text-ink',
              ].join(' ')}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-cream-dark pb-8">
        {tagFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setTagFilter(f.id)}
            className={[
              'rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-300',
              tagFilter === f.id
                ? 'border-ink bg-ink text-cream'
                : 'border-cream-dark bg-transparent text-muted hover:border-ink/30 hover:text-ink',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {colFilter === 'all' ? (
        <div className="mt-16 space-y-20">
          {sectionOrder.map((slug) => {
            const list = grouped.get(slug)
            if (!list?.length) return null
            const col = collections.find((c) => c.slug === slug)
            return (
              <section key={slug}>
                <div className="flex flex-col gap-2 border-b border-cream-dark pb-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">
                      {col?.name ?? slug}
                    </h2>
                    {col?.description && (
                      <p className="mt-2 max-w-xl text-sm text-muted">
                        {col.description}
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/collections/${slug}`}
                    className="text-xs font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:underline"
                  >
                    View collection
                  </Link>
                </div>
                <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <ProductCard key={p.id} product={p} showQuickAdd />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} showQuickAdd />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted">Nothing in this filter yet.</p>
      )}

      <p className="mt-20 text-center text-xs text-muted">
        Want a custom city pair?{' '}
        <Link to="/design-your-own" className="text-ink underline-offset-4 hover:underline">
          Try Design your own
        </Link>
        .
      </p>
    </div>
  )
}
