import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCollectionBySlug, getProductBySlug } from '../data/catalog'
import type { Product } from '../types/product'
import { Accordion } from '../components/product/Accordion'
import { ProductBadges } from '../components/product/ProductBadges'
import { useCart } from '../context/useCart'
import { canAddProductToCart, getCartBlockReason } from '../lib/cartRules'
import { waitlistMailto } from '../lib/waitlist'

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-sm underline">
          Back to shop
        </Link>
      </div>
    )
  }

  return <ProductDetailContent key={product.id} product={product} />
}

function ProductDetailContent({ product }: { product: Product }) {
  const { addItem } = useCart()
  const collection = getCollectionBySlug(product.collectionSlug)

  const [activeImage, setActiveImage] = useState(0)
  const [size, setSize] = useState('M')
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? '')
  const [qty, setQty] = useState(1)

  const gallery = product.gallery
  const purchasable = canAddProductToCart(product)
  const blockReason = getCartBlockReason(product)
  const showCompare =
    product.compareAtPrice && product.compareAtPrice > product.price

  const accordionItems = useMemo(
    () => [
      { id: 'mat', title: 'Material', content: product.material },
      { id: 'fit', title: 'Fit', content: product.fit },
      { id: 'ship', title: 'Shipping', content: product.shipping },
      { id: 'care', title: 'Care', content: product.care },
    ],
    [product.material, product.fit, product.shipping, product.care]
  )

  const primaryColor = colorId || product.colors[0]?.id

  const handleAdd = () => {
    if (!purchasable) return
    addItem({
      product,
      size,
      colorId: primaryColor,
      quantity: qty,
    })
  }

  const waitlistHref = waitlistMailto(
    `Waitlist: ${product.name}\nSize: ${size}\nColor: ${primaryColor}`
  )

  const imageCount = gallery.length
  const goPrevImage = () => {
    if (imageCount <= 1) return
    setActiveImage((i) => (i - 1 + imageCount) % imageCount)
  }
  const goNextImage = () => {
    if (imageCount <= 1) return
    setActiveImage((i) => (i + 1) % imageCount)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-widest text-muted">
        <Link to="/shop" className="hover:text-ink">
          Shop
        </Link>
        {collection && (
          <>
            <span aria-hidden>/</span>
            <Link
              to={`/collections/${collection.slug}`}
              className="hover:text-ink"
            >
              {collection.name}
            </Link>
          </>
        )}
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark/30">
            <img
              src={gallery[activeImage] ?? product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {imageCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrevImage}
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-cream/90 text-lg font-semibold text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-ink/40 hover:bg-cream md:left-3 md:h-12 md:w-12"
                  aria-label="Previous image"
                >
                  <span aria-hidden className="-mt-px block">
                    ←
                  </span>
                </button>
                <button
                  type="button"
                  onClick={goNextImage}
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-cream/90 text-lg font-semibold text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-ink/40 hover:bg-cream md:right-3 md:h-12 md:w-12"
                  aria-label="Next image"
                >
                  <span aria-hidden className="-mt-px block">
                    →
                  </span>
                </button>
              </>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${
                    activeImage === i
                      ? 'border-ink'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:pt-4">
          <ProductBadges
            product={product}
            collectionBadge={collection?.badge}
          />
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <p className="text-2xl font-medium tabular-nums">${product.price}</p>
            {showCompare && (
              <p className="text-lg tabular-nums text-muted line-through">
                ${product.compareAtPrice}
              </p>
            )}
          </div>
          {blockReason && (
            <p className="mt-3 text-sm text-muted">{blockReason}</p>
          )}
          <p className="mt-6 text-base leading-relaxed text-charcoal">
            {product.description}
          </p>
          {product.taglines.slice(0, 2).map((t) => (
            <p key={t} className="mt-3 text-sm italic text-muted">
              “{t}”
            </p>
          ))}

          <div className="mt-10 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Size
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={!purchasable}
                    onClick={() => setSize(s)}
                    className={`min-h-[44px] min-w-[52px] border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      size === s
                        ? 'border-ink bg-ink text-cream'
                        : 'border-cream-dark hover:border-ink/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {product.colors.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Color
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      disabled={!purchasable}
                      onClick={() => setColorId(c.id)}
                      className={`flex items-center gap-2 border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                        (colorId || primaryColor) === c.id
                          ? 'border-ink'
                          : 'border-cream-dark hover:border-ink/30'
                      }`}
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-ink/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Quantity
              </p>
              <div className="mt-3 inline-flex items-center border border-cream-dark">
                <button
                  type="button"
                  disabled={!purchasable}
                  className="px-4 py-2.5 text-lg hover:bg-cream-dark/30 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="min-w-[3rem] border-x border-cream-dark py-2.5 text-center tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  disabled={!purchasable}
                  className="px-4 py-2.5 text-lg hover:bg-cream-dark/30 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs uppercase tracking-widest text-muted">
            Pre-launch — payments off. Save pieces to your bag to explore; checkout opens when we
            launch.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              disabled={!purchasable}
              className="min-h-[52px] flex-1 border border-ink bg-ink py-3 text-sm font-semibold uppercase tracking-widest text-cream transition-colors enabled:hover:bg-cream enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add to cart
            </button>
            <a
              href={waitlistHref}
              className="flex min-h-[52px] flex-1 items-center justify-center border border-cream-dark py-3 text-center text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:border-ink"
            >
              Join waitlist
            </a>
          </div>

          <div className="mt-14">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>
    </div>
  )
}
