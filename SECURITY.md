# Security notes — Elsewhere and Co.

This storefront is a **static SPA** (Vite + React). There is **no server** in this repo handling payments or storing PII; adjust expectations accordingly.

## What this codebase does

- **No secrets in the bundle** — only `VITE_*` variables from `.env` are inlined at build time. API keys for Gemini and Stripe live on the Worker only (see README).
- **Forms** — Newsletter and contact validate input client-side, use a **honeypot** field for basic bot friction, and render output through React (no `dangerouslySetInnerHTML`).
- **Cart** — In-memory only (plus your browser session). No auth tokens. When you add Stripe/Shopify, **create checkout sessions on the server** and treat displayed prices as estimates until the provider confirms.
- **Error boundary** — User-facing errors are generic; details log to the console **in development only**.
- **Headers** — `public/_headers` sets baseline security headers where the host supports them (e.g. Cloudflare Pages). If you deploy as a Worker with static assets only, mirror these in the dashboard **Transform Rules** or a thin Worker if `_headers` is not applied.

## Recommended next steps (production)

1. **Rate limiting** — Add a Cloudflare **Rate limiting** rule or **WAF** on `/api/*` when you introduce backend routes. For static-only, enable **Bot Fight Mode** / **Super Bot Fight Mode** as appropriate.
2. **Newsletter / contact** — Replace client-only success with `POST` to a **Worker** or **serverless** handler that validates Turnstile/hCaptcha, rate-limits by IP, and forwards to email or ESP.
3. **CSP** — Tighten **Content-Security-Policy** once you freeze asset hosts (fonts, images, analytics). Start in **report-only** mode in Cloudflare to avoid breaking the site.
4. **HSTS** — Enable **Always Use HTTPS** and HSTS for your custom domain in Cloudflare **SSL/TLS**.
5. **CSRF** — Not applicable to pure static forms; when you add **cookie-based sessions**, use **SameSite** cookies and CSRF tokens on mutating POSTs.
6. **Dependencies** — Run `npm audit` regularly and enable Dependabot on GitHub.

## Checkout

The app **`POST`s** to **`/api/create-checkout-session`**. The Cloudflare Worker (`worker/index.ts`) creates a **Stripe Checkout Session** using **`STRIPE_SECRET_KEY`** (set with `wrangler secret put`). Amounts come only from **`src/data/checkoutCatalog.ts`** on the server — never from the client payload. See **`PAYMENTS.md`** for setup.
