import { Link } from 'react-router-dom'

const link =
  'text-sm text-cream/55 transition-colors hover:text-clay'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-asphalt text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-extrabold">
              Elsewhere{' '}
              <span className="font-desi text-base font-medium text-clay">और</span>{' '}
              <span className="text-cream/70">Co.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/50">
              Streetwear for people between places.
            </p>
          </div>
          <div>
            <p className="font-street text-xs tracking-[0.2em] text-cream/40">
              Shop
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link to="/shop" className={link}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/design-your-own" className={link}>
                  Design your own
                </Link>
              </li>
              <li>
                <Link to="/collections" className={link}>
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className={link}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/journal" className={link}>
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className={link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-street text-xs tracking-[0.2em] text-cream/40">
              Social
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="https://www.instagram.com/elsewhere.and.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-street text-xs tracking-[0.2em] text-cream/40">
              Legal
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link to="/terms" className={link}>
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={link}>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-cream/40 md:text-left">
          © {new Date().getFullYear()} Elsewhere and Co. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
