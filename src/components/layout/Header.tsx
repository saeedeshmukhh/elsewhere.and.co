import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/useCart'

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300',
    isActive ? 'text-cream' : 'text-cream/55 hover:text-cream',
  ].join(' ')

export function Header() {
  const { openCart, lineCount } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-asphalt/95 text-cream backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link
          to="/"
          className="group font-display text-lg font-extrabold leading-none tracking-tight text-cream md:text-xl"
        >
          Elsewhere{' '}
          <span className="font-desi text-sm font-medium text-clay/90 md:text-base">
            और
          </span>{' '}
          <span className="font-normal text-cream/80">Co.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          <NavLink to="/shop" className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/design-your-own" className={navClass}>
            Design
          </NavLink>
          <NavLink to="/collections" className={navClass}>
            Collections
          </NavLink>
          <NavLink to="/journal" className={navClass}>
            Journal
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="flex items-center gap-4 md:hidden" aria-label="Mobile">
            <Link to="/shop" className="text-xs font-semibold uppercase tracking-wider text-cream">
              Shop
            </Link>
            <Link
              to="/design-your-own"
              className="text-xs font-semibold uppercase tracking-wider text-cream/60"
            >
              Design
            </Link>
            <Link
              to="/collections"
              className="text-xs font-semibold uppercase tracking-wider text-cream/60"
            >
              Collections
            </Link>
          </nav>
          <Link
            to="/cart"
            className="hidden text-xs font-semibold uppercase tracking-wider text-cream/70 hover:text-cream sm:inline"
          >
            Bag
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cream"
            aria-label={`Cart${lineCount ? `, ${lineCount} items` : ''}`}
          >
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-8 min-w-8 items-center justify-center border border-white/15 bg-white/5 px-2 text-[11px] tabular-nums transition-colors group-hover:border-clay/50 group-hover:text-clay">
              {lineCount || 0}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
