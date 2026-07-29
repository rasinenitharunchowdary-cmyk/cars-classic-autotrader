import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { FaqSection } from '../components/FaqSection'
import { PageIntro } from '../components/PageIntro'
import { Reveal } from '../components/Reveal'
import { StatsSection } from '../components/StatsSection'
import { useContact } from '../context/contact-context'

export function AboutPage() {
  const { openContact } = useContact()

  return (
    <motion.main className="page page--about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageIntro eyebrow="Independent since 2019" title={<>Who <br />are we?</>} />
      <section className="about-editorial">
        <Reveal className="about-editorial__aside">
          <p className="eyebrow">Collectors helping collectors</p>
          <button className="pill pill--dark" type="button" onClick={() => openContact('Meet the team')}>
            Meet our specialists <ArrowUpRight size={15} />
          </button>
        </Reveal>
        <Reveal className="about-editorial__copy" delay={0.08}>
          <p className="about-editorial__lead">
            Cars Classic Autotrader is an independent marketplace for significant machines from the
            1960s and 1970s—built around provenance, transparent condition reports and human advice.
          </p>
          <div className="about-editorial__columns">
            <p>
              We started after seeing too many great cars reduced to a few glossy photos and an
              optimistic paragraph. A collector deserves the complete picture: what is original,
              what has changed, how the car behaves and what it may need next.
            </p>
            <p>
              Our small team combines restoration, valuation, logistics and long-distance touring
              experience. We inspect each car, speak plainly about compromises and encourage
              independent verification before a purchase.
            </p>
            <p>
              The result is a slower, more thoughtful marketplace. Fewer cars, better information
              and ongoing support for transport, finance, maintenance planning and eventual resale.
            </p>
          </div>
        </Reveal>
      </section>
      <StatsSection />
      <FaqSection />
    </motion.main>
  )
}
