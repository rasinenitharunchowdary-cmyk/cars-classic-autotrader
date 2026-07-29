import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { PageIntro } from '../components/PageIntro'
import { ServicesGrid } from '../components/ServicesGrid'
import { useContact } from '../context/contact-context'

export function ServicesPage() {
  const { openContact } = useContact()

  return (
    <motion.main className="page page--services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageIntro
        eyebrow="Beyond the transaction"
        title="Services"
        copy="Coordinated support for the practical parts of collecting—from careful transport to clear finance and mechanical protection."
        action={
          <button className="pill pill--dark" type="button" onClick={() => openContact('Service consultation')}>
            Speak with a specialist <ArrowUpRight size={15} />
          </button>
        }
      />
      <ServicesGrid showHeading={false} />
    </motion.main>
  )
}
