import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { useCart } from '../../context/useCart'

interface ProductCardProps {
  product: Product
  /** Optional label override (e.g. Roots Remain) */
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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      product,
      size: 'M',
      colorId: defaultColor,
      quantity: 1,
    })
  }

  return (
    <article
      className={`group flex flex-col ${className}`}
    >
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-cream-dark/40"
      >
        <img
          src={product.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          loading="lazy"
        />
        {showQuickAdd && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="w-full border border-ink bg-ink py-3 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Quick add — M
            </button>
          </div>
        )}
      </Link>
      <div className="mt-5 flex flex-1 flex-col gap-1">
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-display text-base font-semibold tracking-tight text-ink md:text-lg">
            {titleOverride ?? product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted">{product.subtitle}</p>
        <p className="mt-2 font-medium tabular-nums text-ink">${product.price}</p>
      </div>
    </article>
  )
}
