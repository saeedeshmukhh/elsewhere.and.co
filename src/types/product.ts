export type ProductCategory = 'hoodies' | 'sweatshirts' | 't-shirts'

export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  price: number
  category: ProductCategory
  /** Label shown on home "Roots Remain" (city crossover naming) */
  rootsLabel: string
  description: string
  /** Short lines for product detail / cards */
  taglines: string[]
  image: string
  gallery: string[]
  colors: { id: string; label: string; hex: string }[]
  sizes: string[]
  material: string
  fit: string
  shipping: string
  care: string
  /** Include in "New Drop" filter */
  isNewDrop: boolean
}
