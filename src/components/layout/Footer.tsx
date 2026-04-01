import { Link } from 'react-router-dom'

const link = 'text-sm text-muted transition-colors hover:text-ink'

export function Footer() {
  return (
    <footer className="border-t border-cream-dark bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold text-ink">
              Elsewhere <span className="font-normal">&amp; Co.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Streetwear for people between places.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">
              Shop
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link to="/shop" className={link}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className={link}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/shop" className={link}>
                  Collections
                </Link>
              </li>
              <li>
                <a href="mailto:hello@elsewhere.studio" className={link}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">
              Social
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className={link}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">
              Legal
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href="#" className={link}>
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className={link}>
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-14 text-center text-xs text-muted md:text-left">
          © {new Date().getFullYear()} Elsewhere and Co. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
