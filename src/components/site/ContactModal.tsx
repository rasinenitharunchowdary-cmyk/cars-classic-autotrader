import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Phone, Send, X } from 'lucide-react'
import { useContact } from '../../context/contact-context'

type ContactForm = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  consent: boolean
}

type ContactErrors = Partial<Record<keyof ContactForm, string>>

const standardSubjects = [
  'General enquiry',
  'Vehicle enquiry',
  'Shipping',
  'Warranty purchase',
  'Financing',
  'Sell a vehicle',
]

const emptyForm = (subject: string): ContactForm => ({
  name: '',
  email: '',
  phone: '',
  service: subject,
  message: '',
  consent: false,
})

function validate(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {}
  const phoneDigits = form.phone.replace(/\D/g, '')

  if (form.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
  if (phoneDigits.length < 7) errors.phone = 'Please enter a valid phone number.'
  if (!form.service) errors.service = 'Please select a service.'
  if (form.message.trim().length < 10) errors.message = 'Please add a short message (at least 10 characters).'
  if (!form.consent) errors.consent = 'Please confirm that we may contact you.'

  return errors
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true')
}

export function ContactModal() {
  const { closeContact, isOpen, subject } = useContact()
  const [form, setForm] = useState<ContactForm>(() => emptyForm(subject))
  const [errors, setErrors] = useState<ContactErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  const subjectOptions = useMemo(
    () => (standardSubjects.includes(subject) ? standardSubjects : [subject, ...standardSubjects]),
    [subject],
  )

  useEffect(() => {
    if (!isOpen) return
    setForm(emptyForm(subject))
    setErrors({})
    setIsSubmitted(false)
  }, [isOpen, subject])

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => firstFieldRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeContact()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = getFocusableElements(dialogRef.current)
      if (!focusable.length) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [closeContact, isOpen])

  function updateField<Key extends keyof ContactForm>(key: Key, value: ContactForm[Key]) {
    setForm((current) => ({ ...current, [key]: value }))
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    const firstInvalidField = Object.keys(nextErrors)[0] as keyof ContactForm | undefined
    if (firstInvalidField) {
      const invalidElement = dialogRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)
      invalidElement?.focus()
      return
    }

    setIsSubmitted(true)
  }

  const modal = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeContact()
          }}
        >
          <motion.div
            ref={dialogRef}
            className="contact-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-description"
            tabIndex={-1}
            initial={{ opacity: 0, y: 38, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.82 }}
          >
            <button className="contact-modal__close" type="button" onClick={closeContact} aria-label="Close contact form">
              <X aria-hidden="true" size={20} strokeWidth={1.5} />
            </button>

            <div className="contact-modal__aside" aria-hidden="true">
              <p className="contact-modal__index">CONTACT / 01</p>
              <p className="contact-modal__aside-title">A conversation is where every great drive starts.</p>
              <div className="contact-modal__aside-contact">
                <Phone size={15} strokeWidth={1.5} />
                <span>+1 (701) 581-1331</span>
              </div>
            </div>

            <div className="contact-modal__content">
              <div className="contact-modal__heading">
                <p className="eyebrow">Tell us what you are looking for</p>
                <h2 id="contact-modal-title">Let&apos;s talk</h2>
                <p id="contact-modal-description">
                  Share a few details and our classic-car specialist will get back to you personally.
                </p>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {isSubmitted ? (
                  <motion.div
                    className="contact-modal__success"
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span className="contact-modal__success-icon">
                      <Check aria-hidden="true" size={28} strokeWidth={1.6} />
                    </span>
                    <p className="eyebrow">Enquiry received</p>
                    <h3>Thank you, {form.name.trim().split(/\s+/)[0]}.</h3>
                    <p>
                      We have your {form.service.toLowerCase()} request and will contact you shortly.
                    </p>
                    <div className="contact-modal__success-actions">
                      <button className="button button--dark" type="button" onClick={closeContact}>
                        Continue exploring
                      </button>
                      <a className="button button--ghost" href="tel:+17015811331">
                        Call us now
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    className="contact-form"
                    key="form"
                    noValidate
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="contact-form__row">
                      <div className="contact-form__field">
                        <label htmlFor="contact-name">Name</label>
                        <input
                          ref={firstFieldRef}
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          value={form.name}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          onChange={(event) => updateField('name', event.target.value)}
                        />
                        {errors.name ? (
                          <span className="contact-form__error" id="contact-name-error">
                            {errors.name}
                          </span>
                        ) : null}
                      </div>

                      <div className="contact-form__field">
                        <label htmlFor="contact-email">Email</label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="name@email.com"
                          value={form.email}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          onChange={(event) => updateField('email', event.target.value)}
                        />
                        {errors.email ? (
                          <span className="contact-form__error" id="contact-email-error">
                            {errors.email}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="contact-form__row">
                      <div className="contact-form__field">
                        <label htmlFor="contact-phone">Phone</label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+1 000 000 0000"
                          value={form.phone}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                          onChange={(event) => updateField('phone', event.target.value)}
                        />
                        {errors.phone ? (
                          <span className="contact-form__error" id="contact-phone-error">
                            {errors.phone}
                          </span>
                        ) : null}
                      </div>

                      <div className="contact-form__field">
                        <label htmlFor="contact-service">Interested in</label>
                        <select
                          id="contact-service"
                          name="service"
                          value={form.service}
                          aria-invalid={Boolean(errors.service)}
                          aria-describedby={errors.service ? 'contact-service-error' : undefined}
                          onChange={(event) => updateField('service', event.target.value)}
                        >
                          {subjectOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.service ? (
                          <span className="contact-form__error" id="contact-service-error">
                            {errors.service}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="contact-form__field">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        placeholder="Tell us about the car or service you have in mind"
                        value={form.message}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        onChange={(event) => updateField('message', event.target.value)}
                      />
                      {errors.message ? (
                        <span className="contact-form__error" id="contact-message-error">
                          {errors.message}
                        </span>
                      ) : null}
                    </div>

                    <div className="contact-form__consent-wrap">
                      <label className="contact-form__consent" htmlFor="contact-consent">
                        <input
                          id="contact-consent"
                          name="consent"
                          type="checkbox"
                          checked={form.consent}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
                          onChange={(event) => updateField('consent', event.target.checked)}
                        />
                        <span>I agree that Cars Classic Autotrader may contact me about this enquiry.</span>
                      </label>
                      {errors.consent ? (
                        <span className="contact-form__error" id="contact-consent-error">
                          {errors.consent}
                        </span>
                      ) : null}
                    </div>

                    <button className="button button--dark contact-form__submit" type="submit">
                      Send enquiry
                      <Send aria-hidden="true" size={16} strokeWidth={1.5} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return typeof document === 'undefined' ? null : createPortal(modal, document.body)
}

export default ContactModal
