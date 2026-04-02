/** Cloudflare Worker: static SPA + `/api/*` (Stripe when PAYMENTS_ENABLED, Gemini design previews). */
import { CHECKOUT_CATALOG } from '../src/data/checkoutCatalog'
import { handleDesignPreviewImages } from './geminiDesignImages'

const PAYMENTS_ENABLED = false

export interface Env {
  ASSETS: { fetch(input: Request | string, init?: RequestInit): Promise<Response> }
  STRIPE_SECRET_KEY: string
  /** Google AI Studio API key (Gemini image models via generateContent). Never expose to the client. */
  GEMINI_API_KEY?: string
}

interface LineInput {
  productId: string
  quantity: number
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/create-checkout-session' && request.method === 'POST') {
      return handleCheckout(request, env, url.origin)
    }

    if (url.pathname === '/api/design-preview-images') {
      return handleDesignPreviewImages(request, env.GEMINI_API_KEY)
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ error: 'Not found' }, 404)
    }

    return env.ASSETS.fetch(request)
  },
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

async function handleCheckout(
  request: Request,
  env: Env,
  origin: string
): Promise<Response> {
  if (!PAYMENTS_ENABLED) {
    return json(
      {
        error: 'Checkout is disabled until launch.',
        code: 'CHECKOUT_DISABLED',
      },
      503
    )
  }

  if (!env.STRIPE_SECRET_KEY?.trim()) {
    return json(
      { error: 'Payments not configured', code: 'STRIPE_MISSING' },
      503
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  if (!body || typeof body !== 'object' || !('lines' in body)) {
    return json({ error: 'Expected { lines: [...] }' }, 400)
  }

  const lines = (body as { lines: unknown }).lines
  if (!Array.isArray(lines) || lines.length === 0) {
    return json({ error: 'lines must be a non-empty array' }, 400)
  }
  if (lines.length > 25) {
    return json({ error: 'Too many line items' }, 400)
  }

  const normalized: { name: string; unitAmountCents: number; quantity: number }[] =
    []

  for (const raw of lines) {
    if (!raw || typeof raw !== 'object') {
      return json({ error: 'Invalid line item' }, 400)
    }
    const { productId, quantity } = raw as LineInput
    if (
      typeof productId !== 'string' ||
      !Object.prototype.hasOwnProperty.call(CHECKOUT_CATALOG, productId)
    ) {
      return json({ error: `Unknown product: ${productId}` }, 400)
    }
    const q = Number(quantity)
    if (!Number.isInteger(q) || q < 1 || q > 99) {
      return json({ error: 'Invalid quantity' }, 400)
    }
    const row = CHECKOUT_CATALOG[productId]
    normalized.push({
      name: row.name,
      unitAmountCents: row.unitAmountCents,
      quantity: q,
    })
  }

  const params = new URLSearchParams()
  params.set('mode', 'payment')
  params.set('success_url', `${origin}/cart?checkout=success`)
  params.set('cancel_url', `${origin}/cart?checkout=cancel`)
  params.set('billing_address_collection', 'required')
  for (const c of ['US', 'CA', 'GB', 'IN', 'AU', 'DE', 'FR']) {
    params.append('shipping_address_collection[allowed_countries][]', c)
  }

  normalized.forEach((item, i) => {
    params.set(`line_items[${i}][quantity]`, String(item.quantity))
    params.set(`line_items[${i}][price_data][currency]`, 'usd')
    params.set(
      `line_items[${i}][price_data][product_data][name]`,
      item.name
    )
    params.set(
      `line_items[${i}][price_data][unit_amount]`,
      String(item.unitAmountCents)
    )
  })

  const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })

  if (!stripeRes.ok) {
    const errText = await stripeRes.text()
    return json(
      {
        error: 'Unable to start checkout',
        ...(stripeRes.status < 500 ? { detail: errText.slice(0, 200) } : {}),
      },
      502
    )
  }

  const session = (await stripeRes.json()) as { url?: string }
  if (!session.url) {
    return json({ error: 'No session URL' }, 502)
  }

  return json({ url: session.url })
}
