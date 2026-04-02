import { Link } from 'react-router-dom'

export function Journal() {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Journal
      </p>
      <h1 className="font-display mt-4 text-4xl font-bold tracking-tight">
        Stories
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-charcoal">
        Long-form drops, interviews, and notes from between places — coming as
        the label grows. For now, read our{' '}
        <Link to="/about" className="underline underline-offset-4">
          About
        </Link>{' '}
        page or sign up for the newsletter on the home page.
      </p>
      <p className="mt-10 text-sm text-muted">
        Tip: connect this route to Sanity, Contentful, or Markdown files when
        you are ready to publish.
      </p>
    </div>
  )
}
