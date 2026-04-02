export type CollectionReleaseStatus = 'active' | 'upcoming' | 'archived'

export type CollectionBadge = 'new' | 'limited' | 'sold_out' | 'coming_soon'

export interface Collection {
  id: string
  slug: string
  name: string
  description: string
  /** Path or URL — prefer same-origin paths for CSP */
  heroImage: string
  releaseStatus: CollectionReleaseStatus
  featured: boolean
  productIds: string[]
  launchDate?: string
  badge?: CollectionBadge
  /** Longer copy for collection detail page */
  story: string
}
