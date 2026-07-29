import { motion } from 'motion/react'
import { PageIntro } from '../components/PageIntro'

type LegalPageProps = {
  kind: 'privacy' | 'terms'
}

export function LegalPage({ kind }: LegalPageProps) {
  const isPrivacy = kind === 'privacy'

  return (
    <motion.main className="page page--legal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <PageIntro
        eyebrow="Cars Classic Autotrader"
        title={isPrivacy ? 'Privacy policy' : 'Terms of use'}
        copy="A concise overview for this frontend demonstration. Production legal copy should be reviewed for the operating business and jurisdiction."
      />
      <article className="legal-copy">
        <section>
          <h2>{isPrivacy ? 'Information we collect' : 'Marketplace information'}</h2>
          <p>
            {isPrivacy
              ? 'When you submit an enquiry, the interface collects the details you choose to provide so a specialist can respond. This demonstration does not transmit or persist form data.'
              : 'Vehicle descriptions, prices and availability shown in this demonstration are illustrative. A production marketplace must verify each listing and provide final written terms before purchase.'}
          </p>
        </section>
        <section>
          <h2>{isPrivacy ? 'How information is used' : 'Independent checks'}</h2>
          <p>
            {isPrivacy
              ? 'In production, submitted details should be used only to answer the enquiry, arrange requested services and meet legal obligations, with appropriate retention and access controls.'
              : 'Buyers should review the full condition file, arrange an independent inspection where appropriate and confirm shipping, tax, registration and finance obligations.'}
          </p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>Contact +1 (701) 581-1331 for questions about this interface or the marketplace process.</p>
        </section>
      </article>
    </motion.main>
  )
}
