import { useState } from 'react'

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false)

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
            setSubmitted(true)
          }}
        >
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="min-h-[52px] flex-1 border border-cream-dark bg-cream px-4 text-sm outline-none transition-[box-shadow] focus:ring-2 focus:ring-ink/20"
          />
          <button
            type="submit"
            className="min-h-[52px] border border-ink bg-ink px-8 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-ink"
          >
            {submitted ? 'Thank you' : 'Sign up'}
          </button>
        </form>
        {submitted && (
          <p className="mt-4 text-sm text-muted">
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        )}
      </div>
    </section>
  )
}
