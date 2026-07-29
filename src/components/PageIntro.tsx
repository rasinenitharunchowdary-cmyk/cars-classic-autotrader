import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type PageIntroProps = {
  eyebrow?: string
  title: ReactNode
  copy?: string
  action?: ReactNode
  className?: string
}

export function PageIntro({ eyebrow, title, copy, action, className = '' }: PageIntroProps) {
  return (
    <section className={`page-intro ${className}`}>
      <Reveal className="page-intro__heading">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </Reveal>
      {(copy || action) && (
        <Reveal className="page-intro__aside" delay={0.08}>
          {copy && <p>{copy}</p>}
          {action}
        </Reveal>
      )}
    </section>
  )
}
