import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { useContact } from '../context/contact-context'
import { services } from '../data/marketplace'
import { NotFoundPage } from './NotFoundPage'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const { openContact } = useContact()
  const service = services.find((item) => item.slug === slug)

  if (!service) return <NotFoundPage />

  return (
    <motion.main className="page page--service-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="detail-utility">
        <Link to="/services"><ArrowLeft size={15} /> All services</Link>
        <span>{service.index} / 03</span>
      </div>
      <section className="service-detail">
        <Reveal className="service-detail__title">
          <p className="eyebrow">Specialist support</p>
          <h1>{service.title}</h1>
        </Reveal>
        <Reveal className="service-detail__media" delay={0.06}>
          <img src={service.image} alt={`${service.shortTitle} for a classic vehicle`} />
          <span>{service.index} / {service.shortTitle}</span>
        </Reveal>
        <Reveal className="service-detail__copy" delay={0.12}>
          <p className="service-detail__lead">{service.summary}</p>
          {service.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul>
            <li><Check size={15} /> One named coordinator</li>
            <li><Check size={15} /> Clear written terms</li>
            <li><Check size={15} /> Collector-car specialists</li>
          </ul>
          <button className="pill pill--dark pill--large" type="button" onClick={() => openContact(service.shortTitle)}>
            Discuss {service.shortTitle.toLowerCase()} <ArrowUpRight size={16} />
          </button>
        </Reveal>
      </section>
    </motion.main>
  )
}
