import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="page page--not-found">
      <p className="eyebrow">404 · Detour</p>
      <h1>This road ends here.</h1>
      <p>The page may have moved, but the collection is still waiting.</p>
      <Link className="pill pill--dark pill--large" to="/"><ArrowLeft size={16} /> Return home</Link>
    </main>
  )
}
