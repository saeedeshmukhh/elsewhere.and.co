const items = [
  {
    title: 'Premium everyday streetwear',
    body: 'Heavyweight blanks, sharp graphics — made to live in, not just post.',
  },
  {
    title: 'Identity, not costume',
    body: 'Diaspora energy through type and city pairs — never loud “ethnic” filler.',
  },
  {
    title: 'Small-batch drops',
    body: 'Limited runs so every piece feels like yours, not everyone’s.',
  },
]

export function WhyElsewhere() {
  return (
    <section className="relative border-t border-clay/25 bg-asphalt py-24 text-cream md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay/60 to-transparent" />
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="text-center font-street text-[clamp(2.5rem,8vw,4.5rem)] leading-none tracking-tight text-cream/90">
          WHY <span className="text-clay">ELSEWHERE</span>
        </p>
        <p className="mx-auto mt-4 max-w-md text-center font-desi text-sm text-cream/50">
          एक लेबल · दो दुनियाँ
        </p>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {items.map((item) => (
            <div key={item.title} className="text-center md:text-left">
              <div className="mx-auto mb-5 h-px w-12 bg-clay md:mx-0" />
              <h3 className="font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
