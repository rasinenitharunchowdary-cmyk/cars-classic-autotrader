import { ArrowUpRight, Clock3, Mail, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { LocationSection } from '../components/LocationSection'
import { PageIntro } from '../components/PageIntro'
import { Reveal } from '../components/Reveal'
import { useContact } from '../context/contact-context'

export function ContactPage() {
  const { openContact } = useContact()

  return (
    <motion.main className="page page--contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageIntro
        eyebrow="We respond personally"
        title="Contacts"
        copy="Tell us what you are looking for, ask for a detailed vehicle file, or arrange a private showroom appointment."
        action={
          <button className="pill pill--dark" type="button" onClick={() => openContact()}>
            Connect with us <ArrowUpRight size={15} />
          </button>
        }
      />

      <Reveal className="contact-quick-grid">
        <a href="tel:+17015811331"><Phone size={20} /><span>Call the showroom</span><strong>+1 (701) 581-1331</strong></a>
        <a href="mailto:hello@carsclassic.example"><Mail size={20} /><span>Email our specialists</span><strong>hello@carsclassic.example</strong></a>
        <div><Clock3 size={20} /><span>Private appointments</span><strong>Mon–Sat · 09:00–18:00</strong></div>
      </Reveal>
      <LocationSection compact />
    </motion.main>
  )
}
