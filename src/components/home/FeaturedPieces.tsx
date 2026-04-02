import { Link } from 'react-router-dom'

export function FeaturedPieces() {
  return (
    <section className="bg-asphalt py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
              Elsewhere Lab
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-cream md:text-4xl">
              Design your own crossover
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/65">
              Pick hoodie or tee, choose a base color, and set your US city + home city — we
              render the same struck-through / bold layout as the drop. No checkout yet; just
              preview and join the waitlist.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/design-your-own"
              className="inline-flex min-h-[52px] min-w-[200px] items-center justify-center bg-clay px-8 text-sm font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-clay-dark"
            >
              Open designer
            </Link>
            <Link
              to="/shop"
              className="inline-flex min-h-[52px] items-center justify-center border border-cream/25 px-8 text-sm font-semibold uppercase tracking-widest text-cream transition-colors hover:border-clay hover:text-clay"
            >
              Shop five-piece drop
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
