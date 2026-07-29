import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { faqs } from '../data/marketplace'
import { Reveal } from './Reveal'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section section--faq">
      <Reveal className="faq-heading">
        <p className="eyebrow">Questions, answered</p>
        <h2>FAQ</h2>
        <p>Need something more specific? Our specialists are one message away.</p>
      </Reveal>
      <Reveal className="faq-list" delay={0.08}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={faq.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${index}`}
                    className="faq-item__answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </Reveal>
    </section>
  )
}
