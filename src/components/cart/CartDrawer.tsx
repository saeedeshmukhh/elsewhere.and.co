import { Link } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import { getProductById } from '../../data/products'

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    updateQuantity,
    removeLine,
    subtotal,
  } = useCart()

  if (!isOpen) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity"
        aria-label="Close cart overlay"
        onClick={closeCart}
      />
      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between border-b border-cream-dark px-6 py-5">
          <h2 id="cart-title" className="font-display text-lg font-bold">
            Cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="text-sm text-muted">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-8">
              {lines.map((line) => {
                const product = getProductById(line.productId)
                if (!product) return null
                const color = product.colors.find((c) => c.id === line.colorId)
                return (
                  <li key={line.key} className="flex gap-4 border-b border-cream-dark/80 pb-8 last:border-0">
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={closeCart}
                      className="h-28 w-20 shrink-0 overflow-hidden bg-cream-dark/30"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={closeCart}
                        className="font-medium text-ink hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted">
                        {color?.label ?? line.colorId} · Size {line.size}
                      </p>
                      <p className="mt-2 text-sm tabular-nums">
                        ${product.price} each
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <label className="sr-only" htmlFor={`qty-${line.key}`}>
                          Quantity
                        </label>
                        <div className="flex items-center border border-cream-dark">
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm hover:bg-cream-dark/40"
                            onClick={() =>
                              updateQuantity(line.key, line.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <input
                            id={`qty-${line.key}`}
                            readOnly
                            value={line.quantity}
                            className="w-10 border-x border-cream-dark bg-transparent py-1.5 text-center text-sm tabular-nums"
                          />
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm hover:bg-cream-dark/40"
                            onClick={() =>
                              updateQuantity(line.key, line.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-xs font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
                          onClick={() => removeLine(line.key)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-cream-dark bg-cream-dark/20 px-6 py-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Shipping and taxes calculated at checkout.
          </p>
          <Link
            to="/cart"
            onClick={closeCart}
            className="mt-6 block w-full border border-ink bg-ink py-3.5 text-center text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            Checkout
          </Link>
          <button
            type="button"
            onClick={closeCart}
            className="mt-3 w-full py-2 text-center text-sm text-muted hover:text-ink"
          >
            Continue shopping
          </button>
        </div>
      </aside>
    </>
  )
}
