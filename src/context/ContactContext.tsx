import {
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { ContactContext } from './contact-context'

export function ContactProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)
  const [subject, setSubject] = useState('General enquiry')

  const openContact = useCallback((nextSubject = 'General enquiry') => {
    setSubject(nextSubject)
    setIsOpen(true)
  }, [])

  const closeContact = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, subject, openContact, closeContact }),
    [closeContact, isOpen, openContact, subject],
  )

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
}
