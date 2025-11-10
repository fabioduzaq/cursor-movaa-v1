import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'

export default function PressPage() {
  const { t } = useTranslation()
  usePageTracking()

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.press')}
        </h1>

        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Kit de Imprensa
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Aqui você encontrará recursos para jornalistas e membros da imprensa,
              incluindo logos, imagens e informações sobre a MoVaa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Releases
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Acompanhe nossos comunicados e releases de imprensa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contato para Imprensa
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Para solicitações de imprensa, entre em contato através do nosso
              formulário de contato mencionando que é uma solicitação de imprensa.
            </p>
          </section>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <a href="/contact" className="btn-primary inline-block">
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </div>
  )
}
