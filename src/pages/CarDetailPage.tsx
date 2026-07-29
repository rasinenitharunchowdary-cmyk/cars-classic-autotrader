import { ArrowLeft, ArrowUpRight, Check, Gauge, MapPin, Share2 } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { FaqSection } from '../components/FaqSection'
import { LocationSection } from '../components/LocationSection'
import { Reveal } from '../components/Reveal'
import { ServicesGrid } from '../components/ServicesGrid'
import { useContact } from '../context/contact-context'
import { cars, formatPrice } from '../data/marketplace'
import { NotFoundPage } from './NotFoundPage'

export function CarDetailPage() {
  const { slug } = useParams()
  const { openContact } = useContact()
  const car = cars.find((item) => item.slug === slug)

  if (!car) return <NotFoundPage />

  const galleryFrames = Array.from({ length: 5 }, (_, index) => index)

  const specs = [
    ['Make', car.make],
    ['Model', car.model],
    ['Year', String(car.year)],
    ['Mileage', car.mileage],
    ['Engine', car.engine],
    ['Gearbox', car.gearbox],
    ['Power', car.power],
    ['Origin', car.origin],
  ]

  return (
    <motion.main className="page page--car-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="detail-utility">
        <Link to="/cars"><ArrowLeft size={15} /> Back to collection</Link>
        <button type="button"><Share2 size={15} /> Share</button>
      </div>
      <section className="detail-title">
        <p className="eyebrow">Collector car · inspected</p>
        <h1>{car.title}</h1>
      </section>

      <section className="detail-gallery" aria-label={`${car.title} photo gallery`}>
        {galleryFrames.map((index) => (
          <Reveal className={`detail-gallery__image detail-gallery__image--${index + 1}`} key={`${car.slug}-${index}`} delay={index * 0.04}>
            <img src={car.image} alt={index === 0 ? car.title : `${car.title} detail view ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} />
            {index === 0 && <span className="detail-gallery__count">01 / 05</span>}
          </Reveal>
        ))}
      </section>

      <section className="detail-overview">
        <Reveal className="detail-summary">
          <p className="eyebrow">Available now</p>
          <h2>{car.title}</h2>
          <strong className="detail-price">{formatPrice(car.price)}</strong>
          <div className="detail-badges">
            <span><Check size={14} /> Identity checked</span>
            <span><Gauge size={14} /> Road tested</span>
            <span><MapPin size={14} /> Bayshore showroom</span>
          </div>
          <button className="pill pill--dark pill--large" type="button" onClick={() => openContact(`Enquiry: ${car.title}`)}>
            Enquire about this car <ArrowUpRight size={16} />
          </button>
        </Reveal>
        <Reveal className="detail-specs" delay={0.06}>
          <p className="eyebrow">Specification</p>
          <dl>
            {specs.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </Reveal>
        <Reveal className="detail-story" delay={0.12}>
          <p className="eyebrow">About the car</p>
          <h2>Analogue character,<br />properly documented.</h2>
          <p>{car.description}</p>
          <p>
            Our inspection covers structure, running gear, electrics, road behaviour and visible
            signs of previous repair. The complete photo set and specialist notes are available on
            request, alongside a live walk-around for remote buyers.
          </p>
          <p>
            We welcome independent inspections and can coordinate shipping, financing and tailored
            mechanical protection before collection.
          </p>
        </Reveal>
      </section>

      <ServicesGrid compact />
      <FaqSection />
      <LocationSection compact />
    </motion.main>
  )
}
