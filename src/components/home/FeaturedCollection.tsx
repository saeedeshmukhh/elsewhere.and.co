import { Link } from 'react-router-dom'
import {
  getCollectionBySlug,
  getRootsBestSellerTops,
  getRootsTees,
} from '../../data/catalog'
import { ProductCard } from '../product/ProductCard'

export function FeaturedCollection() {
  const col = getCollectionBySlug('roots-remain')
  if (!col) return null

  const bestSellerTops = getRootsBestSellerTops()
  const tees = getRootsTees()

  return (
    <section className="border-t border-cream-dark bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Collection
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {col.name}
          </h2>
          <p className="mt-4 text-muted">{col.description}</p>
          <Link
            to={`/collections/${col.slug}`}
            className="mt-8 inline-block text-xs font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:underline"
          >
            View collection
          </Link>
        </div>

        <div className="mt-20 space-y-16">
          <div>
            <div className="flex flex-col gap-2 border-b border-cream-dark pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-clay">
                  Best sellers
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold md:text-3xl">
                  Hoodies &amp; fleece
                </h3>
                <p className="mt-2 max-w-lg text-sm text-muted">
                  Featured first — vintage crew and heavyweight hoodie from the drop.
                </p>
              </div>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
              {bestSellerTops.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  titleOverride={p.rootsLabel}
                  showQuickAdd
                />
              ))}
            </div>
          </div>

          <div>
            <div className="border-b border-cream-dark pb-6">
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                T-shirts
              </h3>
              <p className="mt-2 max-w-lg text-sm text-muted">
                Light layers — same graphic language, cotton-soft.
              </p>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {tees.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  titleOverride={p.rootsLabel}
                  showQuickAdd
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
