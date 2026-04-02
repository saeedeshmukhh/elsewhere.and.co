import { useState } from 'react'
import {
  isValidEmail,
  isHoneypotClean,
  LIMITS,
  normalizeEmail,
} from '../../lib/validation'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <section className="border-t border-cream-dark py-24 md:py-32">
      <div className="mx-auto max-w-xl px-5 text-center md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Stay in the loop
        </h2>
        <p className="mt-4 text-muted">
          Get early access to new drops, limited collections, and stories from
          Elsewhere and Co.
        </p>
        <form
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          onSubmit={(e) => {
            e.preventDefault()
            setError(null)
            if (!isHoneypotClean(company)) {
              setSubmitted(true)
              return
            }
            const normalized = normalizeEmail(email)
            if (!isValidEmail(normalized)) {
              setError('Please enter a valid email address.')
              return
            }
            setSubmitted(true)
          }}
          noValidate
        >
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={LIMITS.email}
            required
            placeholder="Email address"
            className="min-h-[52px] flex-1 border border-cream-dark bg-cream px-4 text-sm outline-none transition-[box-shadow] focus:ring-2 focus:ring-ink/20"
            autoComplete="email"
          />
          <button
            type="submit"
            className="min-h-[52px] border border-ink bg-ink px-8 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            {submitted ? 'Thank you' : 'Sign up'}
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}
        {submitted && !error && (
          <p className="mt-4 text-sm text-muted">
            You&apos;re on the list. Connect an email API (e.g. Resend, Klaviyo,
            or a Worker) to store addresses for real launches.
          </p>
        )}
      </div>
    </section>
  )
}
