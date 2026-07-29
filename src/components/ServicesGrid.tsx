import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/marketplace'
import { Reveal } from './Reveal'

type ServicesGridProps = {
  showHeading?: boolean
  compact?: boolean
}

export function ServicesGrid({ showHeading = true, compact = false }: ServicesGridProps) {
  return (
    <section className={`section section--services${compact ? ' section--services-compact' : ''}`}>
      {showHeading && (
        <div className="section-heading section-heading--row">
          <Reveal>
            <p className="eyebrow">From garage to driveway</p>
            <h2>Services</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Link className="pill pill--outline" to="/services">
              Explore services <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      )}
      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal className="service-card-wrap" key={service.slug} delay={index * 0.07}>
            <Link className="service-card" to={`/services/${service.slug}`}>
              <img src={service.image} alt="" loading="lazy" />
              <span className="service-card__scrim" />
              <span className="service-card__number">{service.index}</span>
              <span className="service-card__title">{service.title}</span>
              <span className="service-card__icon"><ArrowUpRight size={18} /></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
