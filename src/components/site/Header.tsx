import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Heart, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navigation = [
  { label: 'Cars', to: '/cars' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contacts', to: '/contacts' },
]

const phoneDisplay = '+1 (701) 581-1331'
const phoneHref = 'tel:+17015811331'

function InstagramMark({ size = 17 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
    </svg>
  )
}

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `site-nav__link${isActive ? ' is-active' : ''}`
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => firstMenuLinkRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="site-header" id="top">
        <div className="site-header__inner">
          <Link className="site-wordmark site-wordmark--header" to="/" aria-label="Cars Classic Autotrader home">
            <span className="site-wordmark__lead">Cars</span>
            <span className="site-wordmark__tail">Classic Autotrader</span>
          </Link>

          <nav className="site-nav site-nav--desktop" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink className={navLinkClass} key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <a className="site-header__phone" href={phoneHref} aria-label={`Call ${phoneDisplay}`}>
              <Phone aria-hidden="true" size={15} strokeWidth={1.7} />
              <span>{phoneDisplay}</span>
            </a>
            <a
              className="site-header__icon site-header__icon--social"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Cars Classic Autotrader on Instagram"
            >
              <InstagramMark />
            </a>
            <Link className="site-header__icon" to="/cars?favorites=true" aria-label="View favorite cars">
              <Heart aria-hidden="true" size={17} strokeWidth={1.6} />
            </Link>
            <button
              ref={menuButtonRef}
              className="site-header__menu-button"
              type="button"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? (
                <X aria-hidden="true" size={22} strokeWidth={1.5} />
              ) : (
                <Menu aria-hidden="true" size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {createPortal(
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              className="mobile-menu"
              id="mobile-navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <button
                className="mobile-menu__backdrop"
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                className="mobile-menu__panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 360, damping: 36, mass: 0.85 }}
              >
                <nav className="mobile-menu__nav" aria-label="Mobile navigation">
                  {navigation.map((item, index) => (
                    <NavLink
                      ref={index === 0 ? firstMenuLinkRef : undefined}
                      className={navLinkClass}
                      key={item.to}
                      to={item.to}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true">↗</span>
                    </NavLink>
                  ))}
                </nav>

                <div className="mobile-menu__meta">
                  <a href={phoneHref}>
                    <Phone aria-hidden="true" size={16} strokeWidth={1.6} />
                    {phoneDisplay}
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <InstagramMark size={16} />
                    Instagram
                  </a>
                  <Link to="/cars?favorites=true">
                    <Heart aria-hidden="true" size={16} strokeWidth={1.6} />
                    Favorite cars
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

export default Header
