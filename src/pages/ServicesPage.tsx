import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'

export default function ServicesPage() {
  const { t } = useTranslation()
  usePageTracking()

  const services = [
    {
      id: '1',
      title: 'Plataforma de Petições',
      description: 'Crie e gerencie petições online de forma fácil e eficiente.',
    },
    {
      id: '2',
      title: 'Sistema de Doações',
      description: 'Integração com múltiplos métodos de pagamento para facilitar doações.',
    },
    {
      id: '3',
      title: 'Analytics e Relatórios',
      description: 'Acompanhe o desempenho de suas campanhas com dados detalhados.',
    },
    {
      id: '4',
      title: 'Suporte e Consultoria',
      description: 'Oferecemos suporte especializado para organizações e movimentos sociais.',
    },
  ]

  return (
    <div className="container-custom py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.services')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-gray-600 mb-6">
            Interessado em nossos serviços? Entre em contato conosco para mais informações.
          </p>
          <a
            href="/contact"
            className="btn-primary inline-block"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </div>
  )
}
