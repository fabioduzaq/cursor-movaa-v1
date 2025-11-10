import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store'
import { APP_CONFIG } from '@/config'
import type { Language } from '@/types'

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const language = useAppStore((state) => state.language)
  const setLanguage = useAppStore((state) => state.setLanguage)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {APP_CONFIG.supportedLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang === 'pt-BR' ? 'PT' : lang === 'en' ? 'EN' : 'ES'}
          </option>
        ))}
      </select>
    </div>
  )
}
