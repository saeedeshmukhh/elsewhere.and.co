/**
 * Stripe Checkout is created by the Cloudflare Worker (`worker/index.ts`).
 * Never put secret keys in the frontend — only `pk_` publishable keys belong in the client if you add Elements later.
 */
import { PAYMENTS_ENABLED } from '../config/storefront'

export class CheckoutDisabledError extends Error {
  override name = 'CheckoutDisabledError'
  constructor() {
    super('Checkout is disabled during pre-launch.')
  }
}

export class CheckoutNotConfiguredError extends Error {
  override name = 'CheckoutNotConfiguredError'
  constructor() {
    super('Payments are not configured on the server yet.')
  }
}

export class CheckoutRequestError extends Error {
  override name = 'CheckoutRequestError'
  constructor(message: string) {
    super(message)
  }
}

export interface CheckoutLineRequest {
  productId: string
  quantity: number
}

export async function startHostedCheckout(
  lines: CheckoutLineRequest[]
): Promise<{ url: string }> {
  if (!PAYMENTS_ENABLED) {
    throw new CheckoutDisabledError()
  }

  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ lines }),
  })

  const data = (await res.json().catch(() => ({}))) as {
    url?: string
    error?: string
    code?: string
  }

  if (res.status === 503 && data.code === 'CHECKOUT_DISABLED') {
    throw new CheckoutDisabledError()
  }

  if (res.status === 503 && data.code === 'STRIPE_MISSING') {
    throw new CheckoutNotConfiguredError()
  }

  if (!res.ok) {
    throw new CheckoutRequestError(
      data.error || 'Checkout could not be started. Try again.'
    )
  }

  if (!data.url) {
    throw new CheckoutRequestError('Invalid response from checkout.')
  }

  return { url: data.url }
}
