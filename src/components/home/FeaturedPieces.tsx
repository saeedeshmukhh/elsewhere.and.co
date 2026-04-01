import { featuredPieceIds, getProductById } from '../../data/products'
import { ProductCard } from '../product/ProductCard'

export function FeaturedPieces() {
  const items = featuredPieceIds
    .map((id) => getProductById(id))
    .filter(Boolean)

  return (
    <section className="bg-cream-dark/15 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Featured pieces
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          Selected drops — built for everyday wear and long-distance hearts.
        </p>
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((p) =>
            p ? <ProductCard key={p.id} product={p} showQuickAdd /> : null
          )}
        </div>
      </div>
    </section>
  )
}
