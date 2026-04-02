# Stripe checkout (Cloudflare Worker)

Payments run through **`POST /api/create-checkout-session`** on the same domain. The Worker (`worker/index.ts`) builds a **Stripe Checkout Session** using **`src/data/checkoutCatalog.ts`** — prices are **never taken from the browser**.

## 1. Stripe Dashboard

1. Create / open a [Stripe](https://stripe.com) account.
2. Get **test** keys: **Developers → API keys** → `sk_test_…` (secret) — you will **not** paste this into the frontend.

## 2. Cloudflare secret

In your project directory (logged in with `wrangler login`):

```bash
npx wrangler secret put STRIPE_SECRET_KEY
```

Paste **`sk_test_…`** when prompted. Repeat for production with **`sk_live_…`** when you go live.

## 3. Deploy

Your pipeline should run:

```bash
npm run deploy
```

(`npm run build` then `wrangler deploy` — Worker + `dist/` assets.)

## 4. Local testing

1. `npm run build`
2. Terminal A: `npm run dev:worker` (runs `wrangler dev` on port **8787** by default)
3. Terminal B: `npm run dev` (Vite proxies `/api/*` to `8787`)

Click **Checkout with Stripe** in the cart — you should redirect to Stripe Checkout.

## 5. After launch

- Add a **webhook** endpoint for `checkout.session.completed` to send order emails / fulfill (Worker route or separate service).
- Expand **`shipping_address_collection`** countries in `worker/index.ts` if you ship worldwide.
- Replace **Terms / Privacy** placeholders before heavy traffic.
