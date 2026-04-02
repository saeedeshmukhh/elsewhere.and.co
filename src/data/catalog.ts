/**
 * Single import surface for storefront data. Later: swap implementations to fetch from CMS/API.
 */
import type { Product } from '../types/product'
import {
  collections,
  getCollectionBySlug,
  getFeaturedCollections,
  getCollectionsForNav,
} from './collections'
import {
  products,
  getProductBySlug,
  getProductById,
  getFirstDropProducts,
} from './products'

export {
  collections,
  getCollectionBySlug,
  getFeaturedCollections,
  getCollectionsForNav,
}
export {
  products,
  getProductBySlug,
  getProductById,
  getFirstDropProducts,
}

export function getProductsByCollectionSlug(slug: string): Product[] {
  const col = getCollectionBySlug(slug)
  if (col?.productIds?.length) {
    const byId = new Map(products.map((p) => [p.id, p]))
    return col.productIds
      .map((id) => byId.get(id))
      .filter((p): p is Product => Boolean(p))
  }
  return products
    .filter((p) => p.collectionSlug === slug)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getRootsHoodies(): Product[] {
  return getProductsByCollectionSlug('roots-remain').filter(
    (p) => p.category === 'hoodies'
  )
}

/** Best-seller tops: hoodies + sweatshirts (collection order). */
export function getRootsBestSellerTops(): Product[] {
  return getProductsByCollectionSlug('roots-remain').filter(
    (p) =>
      p.shopTags.includes('best-sellers') &&
      (p.category === 'hoodies' || p.category === 'sweatshirts')
  )
}

export function getRootsTees(): Product[] {
  return getProductsByCollectionSlug('roots-remain').filter(
    (p) => p.category === 't-shirts'
  )
}
