import { Link, useParams } from 'react-router-dom'
import { getCollectionBySlug, getProductsByCollectionSlug } from '../data/catalog'
import { ProductCard } from '../components/product/ProductCard'

export function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const collection = slug ? getCollectionBySlug(slug) : undefined

  if (!collection) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Collection not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-sm underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const items = getProductsByCollectionSlug(collection.slug)
  const isUpcoming = collection.releaseStatus === 'upcoming'

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-20">
      <Link
        to="/collections"
        className="text-xs font-medium uppercase tracking-widest text-muted hover:text-ink"
      >
        ← Collections
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[16/10] overflow-hidden bg-cream-dark/30 lg:aspect-auto lg:min-h-[420px]">
          <img
            src={collection.heroImage}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col justify-center">
          {collection.badge && (
            <span className="w-fit border border-ink/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink">
              {collection.badge === 'coming_soon'
                ? 'Coming soon'
                : collection.badge}
            </span>
          )}
          <h1 className="font-display mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            {collection.name}
          </h1>
          <p className="mt-4 text-lg text-charcoal">{collection.description}</p>
          <p className="mt-6 text-sm leading-relaxed text-muted">{collection.story}</p>
          {collection.launchDate && (
            <p className="mt-6 text-xs font-medium uppercase tracking-widest text-muted">
              {isUpcoming ? 'Target window' : 'Launched'}{' '}
              {new Date(collection.launchDate).toLocaleDateString(undefined, {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      <section className="mt-20 border-t border-cream-dark pt-16">
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          {isUpcoming ? 'Pieces' : 'Shop the drop'}
        </h2>
        {items.length === 0 ? (
          <p className="mt-8 max-w-md text-muted">
            {isUpcoming
              ? 'This drop is still in production. Join the newsletter for first access.'
              : 'No pieces in this collection yet.'}
          </p>
        ) : (
          <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} showQuickAdd />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
