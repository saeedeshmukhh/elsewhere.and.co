import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PAYMENTS_ENABLED } from '../config/storefront'
import type { CartLine } from '../context/cartContext'
import { useCart } from '../context/useCart'
import { getProductById } from '../data/catalog'
import {
  CheckoutNotConfiguredError,
  CheckoutRequestError,
  startHostedCheckout,
} from '../lib/checkout'

function OrderSummaryAside({
  subtotal,
}: {
  subtotal: number
}) {
  return (
    <aside className="h-fit border border-ink/15 bg-asphalt/5 p-8">
      <h2 className="font-street text-xs font-normal uppercase tracking-[0.2em] text-muted">
        Order summary
      </h2>
      <div className="mt-6 flex justify-between text-sm">
        <span className="text-muted">Subtotal</span>
        <span className="tabular-nums">${subtotal.toFixed(2)}</span>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Pre-launch: no charges yet. Join the waitlist to hear when checkout opens.
      </p>
      <Link
        to="/contact"
        className="mt-8 flex w-full items-center justify-center border border-ink bg-ink py-4 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-clay"
      >
        Join waitlist
      </Link>
      <Link
        to="/shop"
        className="mt-4 block text-center text-sm text-muted hover:text-ink"
      >
        Continue shopping
      </Link>
    </aside>
  )
}

function StripeOrderSummaryAside({
  lines,
  subtotal,
}: {
  lines: CartLine[]
  subtotal: number
}) {
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  async function handleCheckout() {
    setCheckoutError(null)
    setCheckoutLoading(true)
    try {
      const payload = lines.map((line) => ({
        productId: line.productId,
        quantity: line.quantity,
      }))
      const { url } = await startHostedCheckout(payload)
      window.location.assign(url)
    } catch (e) {
      if (e instanceof CheckoutNotConfiguredError) {
        setCheckoutError(
          'Stripe is not configured. Add STRIPE_SECRET_KEY in Cloudflare (wrangler secret), then redeploy.'
        )
      } else if (e instanceof CheckoutRequestError) {
        setCheckoutError(e.message)
      } else {
        setCheckoutError('Something went wrong. Try again later.')
        if (import.meta.env.DEV) console.error(e)
      }
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <aside className="h-fit border border-ink/15 bg-asphalt/5 p-8">
      <h2 className="font-street text-xs font-normal uppercase tracking-[0.2em] text-muted">
        Order summary
      </h2>
      <div className="mt-6 flex justify-between text-sm">
        <span className="text-muted">Subtotal</span>
        <span className="tabular-nums">${subtotal.toFixed(2)}</span>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Taxes and shipping at checkout. Prices are confirmed on the server when you pay.
      </p>
      {checkoutError && (
        <p className="mt-4 text-xs text-red-800" role="alert">
          {checkoutError}
        </p>
      )}
      <button
        type="button"
        disabled={checkoutLoading}
        onClick={handleCheckout}
        className="mt-8 w-full border border-ink bg-ink py-4 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-clay disabled:cursor-not-allowed disabled:opacity-50"
      >
        {checkoutLoading ? 'Redirecting…' : 'Checkout with Stripe'}
      </button>
      <Link
        to="/shop"
        className="mt-4 block text-center text-sm text-muted hover:text-ink"
      >
        Continue shopping
      </Link>
    </aside>
  )
}

export function CartPage() {
  const [searchParams] = useSearchParams()
  const { lines, updateQuantity, removeLine, subtotal } = useCart()
  const checkoutStatus = searchParams.get('checkout')

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
        Cart
      </h1>

      {checkoutStatus === 'success' && (
        <p
          className="mt-6 border border-clay/40 bg-cream-dark/30 px-4 py-3 text-sm text-ink"
          role="status"
        >
          Payment received — thank you. You&apos;ll get a confirmation from Stripe.
        </p>
      )}
      {checkoutStatus === 'cancel' && (
        <p className="mt-6 text-sm text-muted" role="status">
          Checkout canceled — your cart is unchanged.
        </p>
      )}

      {lines.length === 0 ? (
        <div className="mt-12 border border-ink/10 bg-cream-dark/20 p-12 text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block border border-ink bg-ink px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-clay hover:text-cream"
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
                  className="flex flex-col gap-6 border-b border-ink/10 pb-10 sm:flex-row"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="aspect-[3/4] w-full overflow-hidden border border-ink/10 bg-cream-dark/30 sm:h-48 sm:w-36 sm:shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer-when-downgrade"
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
                      <div className="flex items-center border border-ink/15">
                        <button
                          type="button"
                          className="px-4 py-2 text-sm hover:bg-cream-dark/40"
                          onClick={() =>
                            updateQuantity(line.key, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="min-w-[3rem] border-x border-ink/15 py-2 text-center text-sm tabular-nums">
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
                        className="text-sm text-muted underline-offset-4 hover:text-clay hover:underline"
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

          {PAYMENTS_ENABLED ? (
            <StripeOrderSummaryAside lines={lines} subtotal={subtotal} />
          ) : (
            <OrderSummaryAside subtotal={subtotal} />
          )}
        </div>
      )}
    </div>
  )
}
