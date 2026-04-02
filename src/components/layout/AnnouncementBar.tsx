export function AnnouncementBar() {
  return (
    <div className="border-b border-clay/30 bg-asphalt text-cream">
      <p className="mx-auto max-w-[1400px] px-5 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.18em] md:px-8 md:text-xs">
        <span className="text-clay" aria-hidden>
          ●
        </span>{' '}
        Free shipping on first drop orders over $100 · Limited runs
      </p>
    </div>
  )
}
