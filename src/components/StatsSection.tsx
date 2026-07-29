import { Reveal } from './Reveal'

const stats = [
  { value: '32', label: 'Retro cars' },
  { value: '400', label: 'Satisfied clients' },
  { value: '5', suffix: 'years', label: 'Delighting collectors' },
]

export function StatsSection() {
  return (
    <section className="section section--stats">
      <div className="section-heading section-heading--split">
        <Reveal>
          <p className="eyebrow">A living archive</p>
          <h2>About us<br />in numbers</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="section-copy">
            From first inspection to international delivery, every car is handled by people who
            value provenance, mechanical honesty and the thrill of a great drive.
          </p>
        </Reveal>
      </div>
      <div className="stats-stage">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} className="stat-orbit" delay={index * 0.07}>
              <strong>
                {stat.value}
                {stat.suffix && <small>{stat.suffix}</small>}
              </strong>
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </div>
        <Reveal className="stats-stage__car" delay={0.15}>
          <img src="/assets/images/hero-car.png" alt="Charcoal 1960s grand touring coupe" loading="lazy" />
        </Reveal>
      </div>
    </section>
  )
}
