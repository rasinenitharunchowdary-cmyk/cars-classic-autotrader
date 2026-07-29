import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import App from './App'
import { ContactProvider } from './context/ContactContext'

vi.mock('./components/three/HeroScene', () => ({
  HeroScene: () => <div data-testid="hero-scene" aria-label="3D classic car" />,
}))

beforeAll(() => {
  Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true })
})

afterEach(() => cleanup())

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ContactProvider>
        <App />
      </ContactProvider>
    </MemoryRouter>,
  )
}

describe('Car Marketplace', () => {
  it('renders the editorial home experience', async () => {
    renderApp()

    expect(screen.getByRole('heading', { level: 1, name: /retro cars/i })).toBeInTheDocument()
    expect(await screen.findByTestId('hero-scene')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /cars with a story to tell/i })).toBeInTheDocument()
  })

  it('opens the enquiry dialog from the hero', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /source a car/i }))

    expect(screen.getByRole('dialog', { name: /let's talk/i })).toBeInTheDocument()
    await waitFor(() => expect(screen.getByLabelText(/name/i)).toHaveFocus())
  })

  it('filters the inventory by a typed search term', async () => {
    const user = userEvent.setup()
    renderApp('/cars')

    await user.type(screen.getByRole('textbox', { name: /search/i }), 'Jaguar')

    expect(screen.getByRole('heading', { level: 3, name: /1967 jaguar e-type/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: /toyota 2000gt/i })).not.toBeInTheDocument()
  })

  it('keeps every vehicle gallery frame tied to the selected listing', () => {
    renderApp('/cars/1967-toyota-2000gt')

    const gallery = screen.getByRole('region', { name: /1967 toyota 2000gt photo gallery/i })
    const galleryImages = Array.from(gallery.querySelectorAll('img'))

    expect(galleryImages).toHaveLength(5)
    expect(new Set(galleryImages.map((image) => image.getAttribute('src')))).toEqual(
      new Set(['/assets/images/car-black.webp']),
    )
  })

  it('renders dynamic service content', () => {
    renderApp('/services/shipping')

    expect(screen.getByRole('heading', { level: 1, name: 'SHIPPING' })).toBeInTheDocument()
    expect(screen.getByText(/door-to-door enclosed transport/i)).toBeInTheDocument()
  })
})
