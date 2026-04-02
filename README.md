# Elsewhere & Co.

Premium streetwear storefront: **Roots Remain** collection (five pieces), **Design your own** with Gemini image previews, cart + waitlist (pre-launch — Stripe checkout off).

## Live site

**Production:** [https://elsewhereandco.workers.dev](https://elsewhereandco.workers.dev)

> If that link does not match your account, open **Cloudflare → Workers & Pages → `elsewhereandco`** and copy the exact `*.workers.dev` hostname (or your custom domain). Update this README if you use a different URL.

## Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router 7  
- **Hosting:** Cloudflare Worker (`worker/index.ts`) serving the Vite `dist/` SPA (`wrangler.toml` → `[assets]`)  
- **API:** `/api/design-preview-images` (Gemini image models), `/api/create-checkout-session` (Stripe — disabled until launch)

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server (proxies `/api` → `http://127.0.0.1:8787`) |
| `npm run dev:worker` | Wrangler local Worker + static assets |
| `npm run build` | Typecheck + production client bundle to `dist/` |
| `npm run deploy` | `build` + `wrangler deploy` |
| `npm run lint` | ESLint |

## Local development (full stack)

1. Install: `npm install`
2. **Gemini previews:** create `.dev.vars` in the repo root (gitignored):

   ```bash
   GEMINI_API_KEY=your_key_from_https://aistudio.google.com/apikey
   ```

3. Two terminals:

   ```bash
   npm run dev:worker
   npm run dev
   ```

4. Open the URL Vite prints (e.g. `http://localhost:5173`). Stop the Worker with **Ctrl+C** in its terminal.

## Deploy (Cloudflare)

1. `npm run deploy` (or CI: `npm run build && npx wrangler deploy`).
2. Set secrets (never commit them):

   ```bash
   npx wrangler secret put GEMINI_API_KEY
   # When payments go live: npx wrangler secret put STRIPE_SECRET_KEY
   ```

3. Enable checkout later: set `PAYMENTS_ENABLED = true` in `src/config/storefront.ts` and `worker/index.ts`, redeploy, then add `STRIPE_SECRET_KEY`.

More Stripe detail: [PAYMENTS.md](./PAYMENTS.md). Security notes: [SECURITY.md](./SECURITY.md).

## Project layout

```
src/
  components/   # layout, home, product, cart, design
  config/       # storefront flags (e.g. payments on/off)
  context/      # cart
  data/         # products, collections, checkout catalog
  lib/          # checkout, design AI helpers, validation
  pages/        # routes
worker/
  index.ts              # routes + Stripe (when enabled)
  geminiDesignImages.ts # Design Your Own → Gemini
```

## Environment

| Variable | Where | Purpose |
|----------|--------|---------|
| `GEMINI_API_KEY` | Worker secret or `.dev.vars` | Design preview images (server only) |
| `STRIPE_SECRET_KEY` | Worker secret | Checkout (when enabled) |
| `VITE_*` | `.env.local` | Optional client vars — see `.env.example` |

Do **not** put `GEMINI_API_KEY` or Stripe secrets in `VITE_*` variables.

## License

Private — Elsewhere & Co.
