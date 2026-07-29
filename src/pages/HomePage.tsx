import { ArrowDown, ArrowUpRight, Gauge, ShieldCheck, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { CarMosaic } from '../components/CarMosaic'
import { FaqSection } from '../components/FaqSection'
import { LocationSection } from '../components/LocationSection'
import { Reveal } from '../components/Reveal'
import { ServicesGrid } from '../components/ServicesGrid'
import { StatsSection } from '../components/StatsSection'
import { useContact } from '../context/contact-context'
import { cars } from '../data/marketplace'

const HeroScene = lazy(() =>
  import('../components/three/HeroScene').then((module) => ({ default: module.HeroScene })),
)

export function HomePage() {
  const { openContact } = useContact()
  const reduceMotion = useReducedMotion()

  return (
    <motion.main
      className="page page--home"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="home-hero">
        <div className="home-hero__copy">
          <motion.p
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            Curated machines · documented stories
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.72, ease: [0.2, 0.7, 0.2, 1] }}
          >
            Retro cars
            <span>1960–1970</span>
          </motion.h1>
          <motion.div
            className="home-hero__actions"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
          >
            <Link className="pill pill--dark pill--large" to="/cars">
              Explore the collection <ArrowUpRight size={16} />
            </Link>
            <button className="pill pill--outline pill--large" type="button" onClick={() => openContact('Sourcing a classic')}>
              Source a car
            </button>
          </motion.div>
          <div className="home-hero__proof" aria-label="Marketplace assurances">
            <span><ShieldCheck size={15} /> Specialist inspected</span>
            <span><Gauge size={15} /> Road tested</span>
            <span><Sparkles size={15} /> Collector grade</span>
          </div>
        </div>

        <motion.div
          className="home-hero__stage"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.9 }}
        >
          <div className="home-hero__stage-label">
            <span>Archive no. 067</span>
            <span>Interactive 3D</span>
          </div>
          <Suspense fallback={<div className="home-hero__scene-loading" aria-hidden="true" />}>
            <HeroScene carColor="#2c2c29" accentColor="#a53a31" ariaLabel="Interactive three-dimensional charcoal classic grand touring coupe" />
          </Suspense>
          <img className="home-hero__static-car" src="/assets/images/hero-car.png" alt="Charcoal 1960s grand touring coupe" />
          <div className="home-hero__stage-caption">
            <strong>1967 Grand Tourer</strong>
            <span>Move your pointer to explore</span>
          </div>
        </motion.div>

        <a className="home-hero__scroll" href="#featured-cars">
          Scroll to discover <ArrowDown size={15} />
        </a>
      </section>

      <section id="featured-cars" className="section section--featured">
        <div className="section-heading section-heading--row">
          <Reveal>
            <p className="eyebrow">Available now</p>
            <h2 aria-label="Cars with a story to tell">Cars with a<br />story to tell</h2>
          </Reveal>
          <Reveal className="section-copy" delay={0.08}>
            Every car is identity checked, photographed in detail and accompanied by a plain-language
            condition report before it joins the collection.
          </Reveal>
        </div>
        <CarMosaic cars={cars} />
      </section>

      <StatsSection />
      <ServicesGrid />
      <FaqSection />
      <LocationSection />
    </motion.main>
  )
}
