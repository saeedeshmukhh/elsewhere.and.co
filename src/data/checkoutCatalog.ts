/**
 * Canonical prices for checkout — the Worker MUST use this map only (never client-sent amounts).
 * Pre-launch: checkout is disabled; keep map in sync when payments go live.
 */
export const CHECKOUT_CATALOG: Record<
  string,
  { name: string; unitAmountCents: number }
> = {
  p1: { name: 'CALIFORNIA → PUNE Hoodie', unitAmountCents: 6800 },
  p2: { name: 'NYC → MUMBAI Hoodie', unitAmountCents: 6800 },
  p3: { name: 'MIAMI → GOA Tee', unitAmountCents: 4200 },
  p4: { name: 'BROOKLYN → THANE Tee', unitAmountCents: 4200 },
  p5: { name: 'BOSTON → BANGALORE Tee', unitAmountCents: 4200 },
}

export type CheckoutCatalogId = keyof typeof CHECKOUT_CATALOG
