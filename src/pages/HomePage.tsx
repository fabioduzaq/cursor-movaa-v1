import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'
import { ROUTES } from '@/config'
import Button from '@/components/common/Button'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { t } = useTranslation()
  usePageTracking()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              MoVaa - A mudança que você quer ver no mundo
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Plataforma de Petições e Causas Sociais. Junte-se a milhares de pessoas
              fazendo a diferença.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.petitions}>
                <Button variant="secondary" size="lg">
                  {t('petitions.title')}
                </Button>
              </Link>
              <Link to={ROUTES.about}>
                <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                  {t('nav.about')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Assine Petições</h3>
              <p className="text-gray-600">
                Apoie causas importantes e faça sua voz ser ouvida
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Faça Doações</h3>
              <p className="text-gray-600">
                Apoie financeiramente causas que você acredita
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compartilhe</h3>
              <p className="text-gray-600">
                Espalhe a palavra e mobilize mais pessoas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-gray-600 mb-8">
            Explore nossas petições e encontre causas que ressoam com você
          </p>
          <Link to={ROUTES.petitions}>
            <Button size="lg">{t('petitions.title')}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
