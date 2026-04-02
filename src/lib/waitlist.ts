/** Mailto for waitlist / notify-me CTAs until a backend exists. */
export const WAITLIST_SUBJECT = 'Elsewhere — waitlist'
export function waitlistMailto(body?: string): string {
  const params = new URLSearchParams({ subject: WAITLIST_SUBJECT })
  if (body?.trim()) params.set('body', body.trim().slice(0, 2000))
  return `mailto:hello@elsewhere.co?${params.toString()}`
}
