import type { Car } from '../data/marketplace'
import { CarCard } from './CarCard'
import { Reveal } from './Reveal'

export function CarMosaic({ cars }: { cars: Car[] }) {
  return (
    <section className="car-mosaic" aria-label="Featured classic cars">
      {cars.map((car, index) => (
        <Reveal
          key={car.slug}
          className={`car-mosaic__item car-mosaic__item--${index + 1}`}
          delay={Math.min(index * 0.04, 0.2)}
        >
          <CarCard car={car} featured={index === 0 || index === 4} priority={index < 2} />
        </Reveal>
      ))}
    </section>
  )
}
