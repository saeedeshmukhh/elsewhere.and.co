import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { getProductById } from '../data/products'

export function CartPage() {
  const { lines, updateQuantity, removeLine, subtotal } = useCart()

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
        Cart
      </h1>

      {lines.length === 0 ? (
        <div className="mt-12 border border-cream-dark/60 bg-cream-dark/10 p-12 text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block border border-ink bg-ink px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            Shop collection
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <ul className="flex flex-col gap-10">
            {lines.map((line) => {
              const product = getProductById(line.productId)
              if (!product) return null
              const color = product.colors.find((c) => c.id === line.colorId)
              return (
                <li
                  key={line.key}
                  className="flex flex-col gap-6 border-b border-cream-dark pb-10 sm:flex-row"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="aspect-[3/4] w-full overflow-hidden bg-cream-dark/30 sm:h-48 sm:w-36 sm:shrink-0"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-display text-lg font-semibold text-ink hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      {color?.label ?? line.colorId} · Size {line.size}
                    </p>
                    <p className="mt-3 tabular-nums">${product.price}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <div className="flex items-center border border-cream-dark">
                        <button
                          type="button"
                          className="px-4 py-2 text-sm hover:bg-cream-dark/40"
                          onClick={() =>
                            updateQuantity(line.key, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="min-w-[3rem] border-x border-cream-dark py-2 text-center text-sm tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-4 py-2 text-sm hover:bg-cream-dark/40"
                          onClick={() =>
                            updateQuantity(line.key, line.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                        onClick={() => removeLine(line.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right sm:pt-0">
                    <p className="font-medium tabular-nums">
                      ${(product.price * line.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <aside className="h-fit border border-cream-dark bg-cream-dark/10 p-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
              Order summary
            </h2>
            <div className="mt-6 flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Demo checkout — connect Shopify, Stripe, or your backend when you
              are ready.
            </p>
            <button
              type="button"
              className="mt-8 w-full border border-ink bg-ink py-4 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Checkout
            </button>
            <Link
              to="/shop"
              className="mt-4 block text-center text-sm text-muted hover:text-ink"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
