import type { Collection } from '../types/collection'

/** Pre-launch: single live collection */
export const collections: Collection[] = [
  {
    id: 'c-roots',
    slug: 'roots-remain',
    name: 'Roots Remain',
    description:
      'City crossovers — wear the route you carry between two homes.',
    heroImage: '/products/california-pune/01.png',
    releaseStatus: 'active',
    featured: true,
    productIds: ['p1', 'p4', 'p2', 'p6', 'p5', 'p3'],
    launchDate: '2025-03-01',
    badge: 'new',
    story:
      'Our first drop explores twin cities and twin selves — typography and distance, without noise.',
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getFeaturedCollections(limit = 1): Collection[] {
  return collections.filter((c) => c.featured).slice(0, limit)
}

/** Nav + shop: only the live collection */
export function getCollectionsForNav(): Collection[] {
  return collections.filter((c) => c.releaseStatus === 'active')
}
