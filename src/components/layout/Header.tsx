import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store'
import LanguageSelector from '@/components/common/LanguageSelector'
import { ROUTES } from '@/config'

export default function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const user = useAppStore((state) => state.user)

  const navItems = [
    { path: ROUTES.home, label: t('nav.home') },
    { path: ROUTES.petitions, label: t('nav.petitions') },
    { path: ROUTES.services, label: t('nav.services') },
    { path: ROUTES.products, label: t('nav.products') },
    { path: ROUTES.about, label: t('nav.about') },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to={ROUTES.home} className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">MoVaa</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {user ? (
              <div className="flex items-center space-x-2">
                {user.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="hidden sm:inline text-sm text-gray-700">
                  {user.name}
                </span>
              </div>
            ) : (
              <Link
                to={ROUTES.contact}
                className="btn-outline text-sm hidden sm:inline"
              >
                {t('nav.contact')}
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
