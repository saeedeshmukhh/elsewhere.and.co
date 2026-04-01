import { products, rootsRemainIds } from '../../data/products'
import { ProductCard } from '../product/ProductCard'

export function FeaturedCollection() {
  const rootsProducts = rootsRemainIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <section className="border-t border-cream-dark bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Roots Remain
          </h2>
          <p className="mt-4 text-muted">
            City crossovers — wear the route you carry every day.
          </p>
        </div>
        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {rootsProducts.map((p) =>
            p ? (
              <ProductCard
                key={p.id}
                product={p}
                titleOverride={p.rootsLabel}
                showQuickAdd
              />
            ) : null
          )}
        </div>
      </div>
    </section>
  )
}
