import { Link } from 'react-router-dom'

const heroImg =
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1400&h=1800&q=80'

export function Hero() {
  return (
    <section className="relative grid min-h-[88vh] gap-0 overflow-hidden bg-asphalt lg:min-h-[90vh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="relative z-10 flex flex-col justify-center px-5 py-16 md:px-12 lg:py-24 lg:pl-16 xl:pl-20">
        <p className="font-street text-[clamp(3rem,12vw,7rem)] leading-[0.85] tracking-tight text-cream">
          DROP
          <span className="text-clay"> 01</span>
        </p>
        <div className="mt-6 max-w-lg border-l-2 border-clay pl-5">
          <p className="font-desi text-sm font-medium leading-relaxed text-cream/75 md:text-base">
            दो शहर · एक धागा
          </p>
          <p className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-cream md:text-3xl">
            Elsewhere <span className="text-cream/60">&amp; Co.</span>
          </p>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-cream/45">
            Streetwear · diaspora-bred
          </p>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-cream/65">
            Built for people between places — heavy blanks, quiet graphics, no
            costume drama.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/shop"
            className="inline-flex min-h-[52px] min-w-[160px] items-center justify-center bg-clay px-10 text-sm font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-clay-dark"
          >
            Shop drop
          </Link>
          <Link
            to="/collections/roots-remain"
            className="inline-flex min-h-[52px] items-center justify-center border border-cream/25 px-8 text-sm font-semibold uppercase tracking-[0.15em] text-cream transition-colors hover:border-clay hover:text-clay"
          >
            Roots remain
          </Link>
          <Link
            to="/design-your-own"
            className="inline-flex min-h-[52px] items-center justify-center border border-cream/25 px-8 text-sm font-semibold uppercase tracking-[0.15em] text-cream/80 transition-colors hover:border-clay hover:text-clay"
          >
            Design your own
          </Link>
        </div>
      </div>

      <div className="relative min-h-[50vh] lg:min-h-full">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent lg:bg-gradient-to-r lg:from-asphalt lg:via-asphalt/20 lg:to-transparent"
          aria-hidden
        />
        <p className="absolute bottom-6 right-6 hidden max-w-[12rem] text-right font-street text-4xl leading-none tracking-tight text-cream/25 lg:block">
          BETWEEN
          <br />
          <span className="text-clay/40">WORLDS</span>
        </p>
      </div>
    </section>
  )
}
