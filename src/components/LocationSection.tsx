import { ArrowUpRight, MapPin } from 'lucide-react'
import { useContact } from '../context/contact-context'
import { Reveal } from './Reveal'

export function MapArtwork() {
  return (
    <div className="map-art" role="img" aria-label="Stylized map showing our showroom near the coast">
      <div className="map-art__water" />
      <div className="map-art__land" />
      <span className="map-art__road map-art__road--1" />
      <span className="map-art__road map-art__road--2" />
      <span className="map-art__road map-art__road--3" />
      <span className="map-art__road map-art__road--4" />
      <span className="map-art__road map-art__road--5" />
      <span className="map-art__label map-art__label--1">North district</span>
      <span className="map-art__label map-art__label--2">Old town</span>
      <span className="map-art__label map-art__label--3">Coastal road</span>
      <span className="map-art__pin"><MapPin size={22} fill="currentColor" /></span>
      <span className="map-art__showroom">Archive showroom</span>
    </div>
  )
}

export function LocationSection({ compact = false }: { compact?: boolean }) {
  const { openContact } = useContact()

  return (
    <section className={`section section--location${compact ? ' section--location-compact' : ''}`}>
      <div className="location-copy">
        <Reveal>
          <p className="eyebrow">By appointment</p>
          <h2>Where<br />to find us</h2>
        </Reveal>
        <Reveal className="location-contact" delay={0.08}>
          <a href="tel:+17015811331">+1 (701) 581-1331</a>
          <p>101 Trans Am Avenue<br />Bayshore, CA 94010</p>
          <button className="pill pill--dark" type="button" onClick={() => openContact('Showroom visit')}>
            Book your appointment <ArrowUpRight size={15} />
          </button>
        </Reveal>
      </div>
      <Reveal className="location-map" delay={0.12}>
        <MapArtwork />
      </Reveal>
    </section>
  )
}
