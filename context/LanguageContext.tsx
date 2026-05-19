'use client'
import { createContext, useContext, useState, useEffect } from 'react'

export type Lang = 'id' | 'en'

const LanguageContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: 'id',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('id')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'en' || saved === 'id') setLang(saved)
  }, [])

  function toggle() {
    setLang(l => {
      const next = l === 'id' ? 'en' : 'id'
      localStorage.setItem('lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
