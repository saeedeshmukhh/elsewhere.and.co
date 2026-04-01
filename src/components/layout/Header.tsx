import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/useCart'

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm font-medium tracking-wide transition-colors duration-300',
    isActive ? 'text-ink' : 'text-muted hover:text-ink',
  ].join(' ')

export function Header() {
  const { openCart, lineCount } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-cream-dark/60 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl"
        >
          Elsewhere <span className="font-normal">&amp; Co.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          <NavLink to="/shop" className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/shop" className={navClass}>
            Collections
          </NavLink>
          <a
            href="mailto:hello@elsewhere.studio"
            className="text-sm font-medium tracking-wide text-muted transition-colors hover:text-ink"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="flex items-center gap-4 md:hidden" aria-label="Mobile">
            <Link to="/shop" className="text-sm font-medium text-ink">
              Shop
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted hover:text-ink">
              About
            </Link>
          </nav>
          <Link
            to="/cart"
            className="hidden text-sm font-medium text-muted hover:text-ink sm:inline"
          >
            Bag
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-ink"
            aria-label={`Cart${lineCount ? `, ${lineCount} items` : ''}`}
          >
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-8 min-w-8 items-center justify-center rounded-full border border-ink/10 bg-cream-dark/40 px-2 text-xs tabular-nums transition-colors group-hover:border-ink/20">
              {lineCount || 0}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
