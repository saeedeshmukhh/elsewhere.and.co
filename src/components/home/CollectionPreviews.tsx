import { Link } from 'react-router-dom'
import { getFeaturedCollections } from '../../data/catalog'
import { CollectionCard } from '../collection/CollectionCard'

export function CollectionPreviews() {
  const featured = getFeaturedCollections(1)

  return (
    <section className="border-t border-cream-dark bg-cream-dark/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            The live collection
          </h2>
          <p className="mt-3 text-muted">
            Pre-launch edit: one collection, five pieces. More drops later — sign up on the
            newsletter when you&apos;re ready.
          </p>
        </div>
        <div className="mt-14 max-w-2xl">
          {featured.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-6">
          <Link
            to="/collections/roots-remain"
            className="text-xs font-semibold uppercase tracking-widest text-ink underline-offset-4 hover:underline"
          >
            Roots Remain — shop the drop
          </Link>
          <Link
            to="/design-your-own"
            className="text-xs font-semibold uppercase tracking-widest text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Design your own
          </Link>
        </div>
      </div>
    </section>
  )
}
