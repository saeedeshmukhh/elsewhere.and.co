import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  isValidEmail,
  isHoneypotClean,
  LIMITS,
  sanitizePlainText,
} from '../lib/validation'
import { submitContactInquiry } from '../lib/contactSubmit'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
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

    setSending(true)
    const result = await submitContactInquiry({
      name: n,
      email: em,
      message: msg,
    })
    setSending(false)

    if (result.ok) {
      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    } else {
      setError(result.error)
    }
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
        Wholesale, waitlist, or a question about an order — feel free to send a note and
        we&apos;ll reply by email.
      </p>

      {sent && !error ? (
        <div
          className="mt-12 border-l-4 border-ink bg-cream-dark/20 px-8 py-10 md:px-10"
          role="status"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            Inbox
          </p>
          <h2 className="font-display mt-5 text-2xl font-bold tracking-tight text-ink md:text-[1.75rem]">
            We read every note.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal">
            Yours is in the queue. We&apos;ll answer from the studio at the address you left
            above — usually within a couple of days, sooner when we can.
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            If this was about a custom route or the drop, mention it in a follow-up anytime.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink underline-offset-4 hover:underline"
          >
            Send another message
          </button>
          <div className="mt-10 border-t border-cream-dark pt-8">
            <Link
              to="/shop"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
            >
              ← Back to shop
            </Link>
          </div>
        </div>
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
            disabled={sending}
            className="w-full border border-ink bg-ink py-3.5 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink disabled:opacity-50"
          >
            {sending ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </div>
  )
}
