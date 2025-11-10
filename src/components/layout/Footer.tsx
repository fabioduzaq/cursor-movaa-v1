import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/config'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('footer.about')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.about} className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.careers} className="hover:text-white transition-colors">
                  {t('nav.careers')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.press} className="hover:text-white transition-colors">
                  {t('nav.press')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.privacy} className="hover:text-white transition-colors">
                  {t('nav.privacy')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.terms} className="hover:text-white transition-colors">
                  {t('nav.terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('footer.connect')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.contact} className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.help} className="hover:text-white transition-colors">
                  {t('nav.help')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.feedback} className="hover:text-white transition-colors">
                  {t('nav.feedback')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {t('footer.newsletter')}
            </h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="btn-primary w-full text-sm">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} MoVaa. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
