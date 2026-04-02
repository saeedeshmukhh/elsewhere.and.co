export type ProductCategory = 'hoodies' | 'sweatshirts' | 't-shirts'

export type ShopTag = 'hoodies' | 'sweatshirts' | 't-shirts' | 'best-sellers'

export type StockStatus = 'in_stock' | 'low_stock' | 'sold_out' | 'coming_soon'

export type ReleaseBadge = 'first_drop' | 'limited' | 'new'

export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  /** Optional “was” price — render only when set; never trust client for real pricing in production */
  compareAtPrice?: number
  category: ProductCategory
  /** Shop filters / badges: Hoodies, T-Shirts, Best Sellers */
  shopTags: ShopTag[]
  /** Primary collection slug (first-class store grouping) */
  collectionSlug: string
  /** Label for cards when you want city-crossover wording */
  rootsLabel: string
  description: string
  taglines: string[]
  image: string
  gallery: string[]
  colors: { id: string; label: string; hex: string }[]
  sizes: string[]
  material: string
  fit: string
  shipping: string
  care: string
  isNewDrop: boolean
  stockStatus: StockStatus
  featured: boolean
  releaseBadge?: ReleaseBadge
}
