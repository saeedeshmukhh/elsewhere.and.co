import { Link } from 'react-router-dom'
import type { Collection } from '../../types/collection'

interface CollectionCardProps {
  collection: Collection
  className?: string
}

export function CollectionCard({ collection, className = '' }: CollectionCardProps) {
  const isUpcoming = collection.releaseStatus === 'upcoming'

  return (
    <article
      className={`group flex flex-col border border-ink/10 bg-cream transition-all hover:border-clay/40 hover:shadow-lg ${className}`}
    >
      <Link
        to={`/collections/${collection.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-cream-dark/30"
      >
        <img
          src={collection.heroImage}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {collection.badge && (
          <span className="absolute left-4 top-4 bg-asphalt px-3 py-1 font-street text-sm tracking-wider text-cream">
            {collection.badge === 'coming_soon'
              ? 'Soon'
              : collection.badge === 'limited'
                ? 'Limited'
                : collection.badge === 'new'
                  ? 'New'
                  : collection.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <Link to={`/collections/${collection.slug}`}>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            {collection.name}
          </h2>
        </Link>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {collection.description}
        </p>
        <Link
          to={`/collections/${collection.slug}`}
          className="mt-6 inline-flex text-xs font-bold uppercase tracking-[0.2em] text-clay underline-offset-4 hover:underline"
        >
          {isUpcoming ? 'View details' : 'Enter'}
        </Link>
      </div>
    </article>
  )
}
