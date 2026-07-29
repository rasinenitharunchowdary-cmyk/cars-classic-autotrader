import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const navigation = [
  { label: 'Cars', to: '/cars' },
  { label: 'About us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contacts', to: '/contacts' },
]

const serviceLinks = [
  { label: 'Shipping', to: '/services/shipping' },
  { label: 'Warranty purchase', to: '/services/warranty' },
  { label: 'Financing', to: '/services/financing' },
]

function InstagramMark() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <Link className="site-wordmark site-wordmark--footer" to="/" aria-label="Cars Classic Autotrader home">
            <span className="site-wordmark__lead">Cars</span>
            <span className="site-wordmark__tail">Classic Autotrader</span>
          </Link>

          <p className="site-footer__statement">
            Carefully sourced classics.
            <br />
            Driven by genuine stories.
          </p>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__column">
            <p className="site-footer__label">Explore</p>
            <nav className="site-footer__links" aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-footer__column">
            <p className="site-footer__label">Services</p>
            <nav className="site-footer__links" aria-label="Services">
              {serviceLinks.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-footer__column site-footer__column--contact">
            <p className="site-footer__label">Get in touch</p>
            <a className="site-footer__contact-link" href="tel:+17015811331">
              <Phone aria-hidden="true" size={16} strokeWidth={1.5} />
              <span>+1 (701) 581-1331</span>
            </a>
            <a
              className="site-footer__contact-link"
              href="https://maps.google.com/?q=101+Trans+Am+Avenue+Bayshore+CA+94010"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin aria-hidden="true" size={16} strokeWidth={1.5} />
              <span>101 Trans Am Avenue, Bayshore, CA 94010</span>
              <ArrowUpRight aria-hidden="true" className="site-footer__arrow" size={14} strokeWidth={1.5} />
            </a>
            <a
              className="site-footer__contact-link"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramMark />
              <span>Instagram</span>
              <ArrowUpRight aria-hidden="true" className="site-footer__arrow" size={14} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Cars Classic Autotrader</p>
          <div className="site-footer__legal">
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of use</Link>
          </div>
          <a className="site-footer__back-to-top" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
