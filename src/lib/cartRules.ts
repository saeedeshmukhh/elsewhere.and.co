import type { Product } from '../types/product'

export function canAddProductToCart(product: Product): boolean {
  return (
    product.stockStatus !== 'sold_out' && product.stockStatus !== 'coming_soon'
  )
}

export function getCartBlockReason(product: Product): string | null {
  if (product.stockStatus === 'sold_out') return 'This piece is sold out.'
  if (product.stockStatus === 'coming_soon') return 'Coming soon — not available yet.'
  return null
}
