import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'

export default function CareersPage() {
  const { t } = useTranslation()
  usePageTracking()

  const positions = [
    {
      id: '1',
      title: 'Desenvolvedor Frontend',
      department: 'Tecnologia',
      location: 'Remoto',
      type: 'Tempo Integral',
    },
    {
      id: '2',
      title: 'Designer UX/UI',
      department: 'Design',
      location: 'Remoto',
      type: 'Tempo Integral',
    },
  ]

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.careers')}
        </h1>

        <div className="mb-8">
          <p className="text-lg text-gray-700">
            Junte-se à equipe MoVaa e ajude-nos a construir uma plataforma que
            promove mudanças positivas no mundo.
          </p>
        </div>

        <div className="space-y-6">
          {positions.map((position) => (
            <div key={position.id} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>{position.department}</span>
                    <span>•</span>
                    <span>{position.location}</span>
                    <span>•</span>
                    <span>{position.type}</span>
                  </div>
                </div>
                <button className="btn-primary mt-4 md:mt-0">
                  Candidatar-se
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Não encontrou a vaga ideal?
          </h2>
          <p className="text-gray-600 mb-6">
            Envie seu currículo para nosso banco de talentos.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </div>
  )
}
