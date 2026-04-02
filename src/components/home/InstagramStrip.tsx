const shots = [
  '/products/mumbai-nyc/05.png',
  '/products/california-pune-sweatshirt.png',
  '/products/nyc-thane-hoodie.png',
  '/products/mumbai-nyc/05.png',
  '/products/california-pune-sweatshirt.png',
  '/products/nyc-thane-hoodie.png',
]

export function InstagramStrip() {
  return (
    <section className="border-t border-cream-dark py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              @elsewhere.and.co
            </p>
            <h2 className="font-display mt-2 text-xl font-bold md:text-2xl">
              On the grid
            </h2>
          </div>
          <a
            href="https://www.instagram.com/elsewhere.and.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink underline-offset-4 hover:underline"
          >
            Follow on Instagram
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
          {shots.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="aspect-square overflow-hidden bg-cream-dark/20"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
