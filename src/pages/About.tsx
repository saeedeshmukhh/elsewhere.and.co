const blocks = [
  {
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    alt: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
    alt: '',
  },
]

export function About() {
  return (
    <article className="mx-auto max-w-[900px] px-5 py-20 md:px-8 md:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        About
      </p>
      <h1 className="font-display mt-6 text-4xl font-bold tracking-tight md:text-5xl">
        Between places
      </h1>

      <div className="mt-16 space-y-10 text-lg leading-relaxed text-charcoal md:text-xl">
        <p>
          Elsewhere and Co. began with a simple tension: the comfort of knowing where
          you&apos;re from, and the quiet ache of building a life somewhere new.
          We make streetwear for that in-between — for people who carry more
          than one address in their head.
        </p>
        <p>
          Our first collection looks at cities in pairs — routes drawn across
          oceans and time zones — because identity isn&apos;t a single pin on a
          map. It&apos;s the story you tell when someone asks where you&apos;re
          from, and you don&apos;t know where to start.
        </p>
        <p className="text-muted">
          We design in small batches, with premium fabrics and restraint. No
          loud clichés — just pieces that feel honest on the body and true to
          the diaspora we belong to.
        </p>
      </div>

      <section className="mt-24 border-t border-cream-dark pt-24">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Mission</h2>
        <p className="mt-6 text-lg leading-relaxed text-charcoal">
          To make everyday streetwear that honors distance, memory, and
          belonging — for anyone who lives in one place and still feels tethered
          to another.
        </p>
      </section>

      <div className="mt-20 grid gap-6 md:grid-cols-2">
        {blocks.map((b) => (
          <figure
            key={b.src}
            className="aspect-[4/5] overflow-hidden bg-cream-dark/30"
          >
            <img src={b.src} alt={b.alt} className="h-full w-full object-cover" />
          </figure>
        ))}
      </div>
    </article>
  )
}
