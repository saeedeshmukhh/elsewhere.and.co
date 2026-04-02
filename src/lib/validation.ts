/** Max lengths — defense in depth for any future API bodies */
export const LIMITS = {
  email: 254,
  name: 120,
  message: 4000,
  honeypot: 0,
} as const

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

/**
 * Strip control chars and trim; no HTML (React escapes output — this blocks obvious junk).
 */
export function sanitizePlainText(input: string, maxLen: number): string {
  const stripped = [...input]
    .filter((ch) => {
      const code = ch.codePointAt(0) ?? 0
      return code >= 0x20 && code !== 0x7f
    })
    .join('')
  return stripped.trim().slice(0, maxLen)
}

export function isValidEmail(email: string): boolean {
  const e = email.trim().slice(0, LIMITS.email)
  if (e.length < 5 || e.length > LIMITS.email) return false
  return EMAIL_RE.test(e)
}

export function normalizeEmail(email: string): string {
  return sanitizePlainText(email, LIMITS.email).toLowerCase()
}

/** Honeypot must stay empty — bots often fill hidden fields */
export function isHoneypotClean(value: string | undefined): boolean {
  return !value || value.trim().length === 0
}
