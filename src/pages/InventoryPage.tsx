import { Search, SlidersHorizontal, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { CarCard } from '../components/CarCard'
import { PageIntro } from '../components/PageIntro'
import { Reveal } from '../components/Reveal'
import { cars } from '../data/marketplace'

type SortValue = 'featured' | 'price-asc' | 'price-desc' | 'year-desc'

export function InventoryPage() {
  const [query, setQuery] = useState('')
  const [make, setMake] = useState('all')
  const [sort, setSort] = useState<SortValue>('featured')
  const [showFilters, setShowFilters] = useState(false)

  const makes = useMemo(() => [...new Set(cars.map((car) => car.make))].sort(), [])

  const visibleCars = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const result = cars.filter((car) => {
      const matchesMake = make === 'all' || car.make === make
      const matchesQuery =
        !normalized || `${car.year} ${car.make} ${car.model}`.toLowerCase().includes(normalized)
      return matchesMake && matchesQuery
    })

    return [...result].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'year-desc') return b.year - a.year
      return cars.indexOf(a) - cars.indexOf(b)
    })
  }, [make, query, sort])

  const reset = () => {
    setQuery('')
    setMake('all')
    setSort('featured')
  }

  return (
    <motion.main className="page page--inventory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageIntro
        eyebrow="The current collection"
        title="Our cars"
        copy="Low-volume icons, honest descriptions and specialist support from the first question to the first drive."
        action={
          <button className="pill pill--outline" type="button" onClick={() => setShowFilters((value) => !value)} aria-expanded={showFilters}>
            <SlidersHorizontal size={15} /> Filters
          </button>
        }
      />

      <Reveal className={`filter-bar${showFilters ? ' is-open' : ''}`}>
        <label className="filter-search">
          <span>Search</span>
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Model, make or year" />
        </label>
        <label>
          <span>Make</span>
          <select value={make} onChange={(event) => setMake(event.target.value)}>
            <option value="all">All makes</option>
            {makes.map((name) => <option key={name}>{name}</option>)}
          </select>
        </label>
        <label>
          <span>Sort by</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortValue)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="year-desc">Newest year</option>
          </select>
        </label>
        <button className="filter-reset" type="button" onClick={reset}><X size={15} /> Reset</button>
      </Reveal>

      <section className="inventory-results" aria-live="polite">
        <div className="inventory-results__meta">
          <span>{visibleCars.length.toString().padStart(2, '0')} cars</span>
          <span>1960–1970 archive</span>
        </div>
        {visibleCars.length > 0 ? (
          <div className="inventory-grid">
            {visibleCars.map((car, index) => (
              <Reveal key={car.slug} delay={Math.min(index * 0.04, 0.2)}>
                <CarCard car={car} priority={index < 2} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="eyebrow">No exact match</p>
            <h2>Let us source it.</h2>
            <p>Reset the filters or send us the model and specification you have in mind.</p>
            <button className="pill pill--dark" type="button" onClick={reset}>Show all cars</button>
          </div>
        )}
      </section>
    </motion.main>
  )
}
