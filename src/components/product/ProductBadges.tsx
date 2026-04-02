import type { Product, ShopTag } from '../../types/product'
import type { CollectionBadge } from '../../types/collection'

const badgeClass =
  'inline-flex items-center border border-clay/25 bg-asphalt/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink'

const LABELS: Record<string, string> = {
  first_drop: 'First drop',
  limited: 'Limited',
  new: 'New',
  low_stock: 'Low stock',
  sold_out: 'Sold out',
  coming_soon: 'Coming soon',
}

const SHOP_TAG_LABELS: Record<ShopTag, string> = {
  hoodies: 'Hoodies',
  't-shirts': 'T-Shirts',
  'best-sellers': 'Best sellers',
}

export function ProductBadges({
  product,
  collectionBadge,
}: {
  product: Product
  collectionBadge?: CollectionBadge
}) {
  const items: string[] = []
  if (product.releaseBadge) items.push(LABELS[product.releaseBadge] ?? product.releaseBadge)
  if (product.stockStatus === 'low_stock') items.push(LABELS.low_stock)
  if (product.stockStatus === 'sold_out') items.push(LABELS.sold_out)
  if (product.stockStatus === 'coming_soon') items.push(LABELS.coming_soon)
  if (collectionBadge === 'coming_soon' && !items.includes(LABELS.coming_soon)) {
    items.push(LABELS.coming_soon)
  }

  const unique = [...new Set(items)]

  const tagPills = product.shopTags?.map((t) => SHOP_TAG_LABELS[t]) ?? []
  const tagUnique = [...new Set(tagPills)]

  if (unique.length === 0 && tagUnique.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {unique.map((label) => (
        <span key={label} className={badgeClass}>
          {label}
        </span>
      ))}
      {tagUnique.map((label) => (
        <span
          key={`tag-${label}`}
          className="inline-flex items-center border border-cream-dark bg-cream-dark/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          {label}
        </span>
      ))}
    </div>
  )
}
