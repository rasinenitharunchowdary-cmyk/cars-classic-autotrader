import { ArrowUpRight, Heart } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { formatPrice, type Car } from '../data/marketplace'

type CarCardProps = {
  car: Car
  featured?: boolean
  priority?: boolean
}

export function CarCard({ car, featured = false, priority = false }: CarCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className={`car-card car-card--${car.accent}${featured ? ' car-card--featured' : ''}`}
      whileHover={reduceMotion ? undefined : { y: -7, rotateX: 1.5, rotateY: -1.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <img
        className="car-card__image"
        src={car.image}
        alt={`${car.title} in ${car.color}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      <div className="car-card__shade" />
      <div className="car-card__topline">
        <span>{car.year}</span>
        <button type="button" className="icon-button icon-button--glass" aria-label={`Save ${car.title}`}>
          <Heart size={16} strokeWidth={1.7} />
        </button>
      </div>
      <div className="car-card__body">
        <p>{car.make}</p>
        <h3>{car.title}</h3>
        <div className="car-card__actions">
          <Link className="pill pill--light" to={`/cars/${car.slug}`}>
            View <ArrowUpRight size={14} />
          </Link>
          <span className="pill pill--glass">{formatPrice(car.price)}</span>
        </div>
      </div>
    </motion.article>
  )
}
