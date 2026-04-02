/**
 * Canonical prices for checkout — the Worker MUST use this map only (never client-sent amounts).
 * Pre-launch: checkout is disabled; keep map in sync when payments go live.
 */
export const CHECKOUT_CATALOG: Record<
  string,
  { name: string; unitAmountCents: number }
> = {
  p1: { name: 'CALIFORNIA → PUNE Sweatshirt', unitAmountCents: 3999 },
  p2: { name: 'NYC → MUMBAI Hoodie', unitAmountCents: 3999 },
  p3: { name: 'MUMBAI → NYC Tee', unitAmountCents: 1999 },
  p4: { name: 'NEW YORK → PUNE Sweatshirt', unitAmountCents: 3999 },
  p5: { name: 'BOSTON → BANGALORE Tee', unitAmountCents: 1999 },
  p6: { name: 'AHMEDABAD → AUSTIN Tee', unitAmountCents: 1999 },
}

export type CheckoutCatalogId = keyof typeof CHECKOUT_CATALOG
