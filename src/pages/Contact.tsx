import { useState } from 'react'
import {
  isValidEmail,
  isHoneypotClean,
  LIMITS,
  sanitizePlainText,
} from '../lib/validation'
export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isHoneypotClean(website)) {
      setSent(true)
      return
    }

    const n = sanitizePlainText(name, LIMITS.name)
    const em = email.trim().slice(0, LIMITS.email)
    const msg = sanitizePlainText(message, LIMITS.message)

    if (n.length < 2) {
      setError('Please enter your name.')
      return
    }
    if (!isValidEmail(em)) {
      setError('Please enter a valid email address.')
      return
    }
    if (msg.length < 10) {
      setError('Please write a short message (at least 10 characters).')
      return
    }

    const subject = encodeURIComponent(`Elsewhere and Co. — ${n}`)
    const body = encodeURIComponent(`${msg}\n\n— ${n}\n${em}`)
    window.location.href = `mailto:hello@elsewhere.studio?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Contact
      </p>
      <h1 className="font-display mt-4 text-4xl font-bold tracking-tight">
        Get in touch
      </h1>
      <p className="mt-4 text-muted">
        Wholesale, press, or a question about an order — we read everything.
        For spam resistance, wire this form to a Worker + Resend or Cloudflare
        Turnstile later; for now it opens your email client with a safe draft.
      </p>

      {sent && !error ? (
        <p className="mt-10 text-sm text-muted">
          If your mail app opened, send the draft from there. If nothing
          happened, email{' '}
          <a className="underline" href="mailto:hello@elsewhere.studio">
            hello@elsewhere.studio
          </a>
          .
        </p>
      ) : (
        <form className="mt-12 space-y-6" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />
          <div>
            <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-widest text-muted">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={LIMITS.name}
              className="mt-2 w-full border border-cream-dark bg-cream px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ink/20"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={LIMITS.email}
              className="mt-2 w-full border border-cream-dark bg-cream px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ink/20"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-widest text-muted">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={LIMITS.message}
              rows={5}
              className="mt-2 w-full resize-y border border-cream-dark bg-cream px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ink/20"
            />
          </div>
          {error && (
            <p className="text-sm text-red-800" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full border border-ink bg-ink py-3.5 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            Open email draft
          </button>
        </form>
      )}
    </div>
  )
}
