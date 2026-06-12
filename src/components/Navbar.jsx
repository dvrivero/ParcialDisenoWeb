import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useScrolled } from '../hooks/UseScrolled.js'
import CartDrawer from './CartDrawer.jsx'

const NAV_LINKS = [
  { href: '#por-que', label: 'Por qué HoneyB' },
  { href: '#elige', label: 'Productos' },
  { href: '/hoteleria', label: 'Hotelería' },
  { href: '#testimonios', label: 'Testimonios' },
]

export default function Navbar() {
  const { cartCount } = useCart()
  const scrolled = useScrolled()
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link to="/" className="font-display text-xl font-bold tracking-wide text-dark">
            HONEY'B
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              href.startsWith('/') && !href.includes('#')
                ? <Link key={href} to={href} className={`transition-colors ${pathname === href ? 'text-dark' : 'text-dark/55 hover:text-dark'}`}>{label}</Link>
                : <a key={href} href={href} className="text-dark/55 hover:text-dark transition-colors">{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-dark text-cream px-4 py-2 rounded-full text-sm font-medium hover:bg-dark/80 transition-all"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="hidden sm:inline">Carrito</span>

              {cartCount > 0 && (
                <span key={cartCount} className="animate-pop-in absolute -top-2 -right-2 w-5 h-5 bg-honey-400 text-dark text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`block h-0.5 w-5 bg-dark transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}/>
              <span className={`block h-0.5 w-5 bg-dark transition-all ${mobileOpen ? 'opacity-0' : ''}`}/>
              <span className={`block h-0.5 w-5 bg-dark transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-cream border-t border-dark/8 px-6 py-4 space-y-3">
            {NAV_LINKS.map(({ href, label }) => (
              href.startsWith('/') && !href.includes('#')
                ? <Link key={href} to={href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-dark/70 py-1">{label}</Link>
                : <a key={href} href={href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-dark/70 py-1">{label}</a>
            ))}
          </div>
        )}
      </nav>

      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  )
}
