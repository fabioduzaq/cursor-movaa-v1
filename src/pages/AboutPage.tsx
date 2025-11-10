import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'

export default function AboutPage() {
  const { t } = useTranslation()
  usePageTracking()

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.about')}
        </h1>

        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nossa História</h2>
            <p className="text-gray-700 leading-relaxed">
              O MoVaa nasceu da necessidade de criar uma plataforma onde pessoas possam
              se unir para promover mudanças positivas no mundo. Acreditamos que cada
              voz importa e que juntos podemos fazer a diferença.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nossa Missão</h2>
            <p className="text-gray-700 leading-relaxed">
              Facilitar a mobilização social através de petições e causas, conectando
              pessoas que desejam ver mudanças positivas em suas comunidades e no mundo.
              Queremos ser a ponte entre a vontade de mudar e a ação efetiva.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nossos Valores</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Transparência em todas as nossas ações</li>
              <li>Democracia e participação cidadã</li>
              <li>Respeito à diversidade e inclusão</li>
              <li>Compromisso com causas sociais e ambientais</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
