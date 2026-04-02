import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { useCart } from '../../context/useCart'
import { canAddProductToCart, getCartBlockReason } from '../../lib/cartRules'
import { ProductBadges } from './ProductBadges'

interface ProductCardProps {
  product: Product
  titleOverride?: string
  showQuickAdd?: boolean
  className?: string
}

export function ProductCard({
  product,
  titleOverride,
  showQuickAdd = true,
  className = '',
}: ProductCardProps) {
  const { addItem } = useCart()
  const defaultColor = product.colors[0]?.id ?? 'default'
  const purchasable = canAddProductToCart(product)
  const blockReason = getCartBlockReason(product)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!purchasable) return
    addItem({
      product,
      size: 'M',
      colorId: defaultColor,
      quantity: 1,
    })
  }

  const showCompare = product.compareAtPrice && product.compareAtPrice > product.price

  return (
    <article className={`group flex flex-col ${className}`}>
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden border border-ink/10 bg-cream-dark/30 transition-colors hover:border-clay/50"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {showQuickAdd && purchasable && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-asphalt/95 p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="w-full bg-clay py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-clay-dark"
            >
              Quick add — M
            </button>
          </div>
        )}
      </Link>
      <div className="mt-4 flex flex-1 flex-col gap-2">
        <ProductBadges product={product} />
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-ink md:text-xl">
            {titleOverride ?? product.name}
          </h3>
        </Link>
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {product.subtitle}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <p className="font-semibold tabular-nums text-ink">${product.price}</p>
          {showCompare && (
            <p className="text-sm tabular-nums text-muted line-through">
              ${product.compareAtPrice}
            </p>
          )}
        </div>
        {!purchasable && blockReason && (
          <p className="text-xs text-muted">{blockReason}</p>
        )}
      </div>
    </article>
  )
}
