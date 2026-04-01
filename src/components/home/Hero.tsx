import { Link } from 'react-router-dom'

const heroImg = '/products/miami-goa-tee.png'

export function Hero() {
  return (
    <section className="grid gap-0 lg:grid-cols-2 lg:gap-0">
      <div className="flex flex-col justify-center px-5 py-20 md:px-12 lg:min-h-[min(85vh,820px)] lg:py-28 lg:pl-16 xl:pl-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          First collection
        </p>
        <h1 className="font-display mt-6 text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl">
          Elsewhere <span className="font-normal">&amp; Co.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg font-medium text-charcoal md:text-xl">
          Streetwear for people between places.
        </p>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Designed for stories of distance, identity, and belonging.
        </p>
        <div className="mt-12">
          <Link
            to="/shop"
            className="inline-flex min-h-[52px] min-w-[180px] items-center justify-center border border-ink bg-ink px-10 text-sm font-semibold uppercase tracking-[0.15em] text-cream transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-cream hover:text-ink"
          >
            Shop now
          </Link>
        </div>
      </div>
      <div className="relative min-h-[420px] bg-cream-dark/30 lg:min-h-[min(85vh,820px)]">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent lg:bg-gradient-to-l" />
      </div>
    </section>
  )
}
