import { collections } from '../data/collections'
import { CollectionCard } from '../components/collection/CollectionCard'

export function Collections() {
  const ordered = [...collections].sort((a, b) => {
    const rank = (s: string) =>
      s === 'active' ? 0 : s === 'upcoming' ? 1 : 2
    return rank(a.releaseStatus) - rank(b.releaseStatus) || a.name.localeCompare(b.name)
  })

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Collections
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Collections
        </h1>
        <p className="mt-4 text-muted">
          Right now the storefront is focused on a single pre-launch drop —{' '}
          <strong className="font-medium text-ink">Roots Remain</strong>. More collections will
          appear here as we ship.
        </p>
      </header>
      <div className="mt-16 grid max-w-2xl gap-10">
        {ordered.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
    </div>
  )
}
