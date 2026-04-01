const items = [
  {
    title: 'Premium everyday streetwear',
    body: 'Heavyweight fabrics and quiet details — made to live in, not just post.',
  },
  {
    title: 'Designed around identity and belonging',
    body: 'Graphics and naming that nod to the cities we leave and the ones we choose.',
  },
  {
    title: 'Small-batch drops',
    body: 'Limited runs so pieces feel personal — not mass-market.',
  },
]

export function WhyElsewhere() {
  return (
    <section className="bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <h2 className="font-display text-center text-2xl font-bold md:text-3xl">
          Why Elsewhere and Co.
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {items.map((item) => (
            <div key={item.title} className="text-center md:text-left">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 md:mx-0">
                <span className="block h-2 w-2 rounded-full bg-warm-beige" />
              </div>
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
