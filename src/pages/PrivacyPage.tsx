import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'

export default function PrivacyPage() {
  const { t } = useTranslation()
  usePageTracking()

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.privacy')}
        </h1>

        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Coleta de Dados
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Coletamos informações que você nos fornece diretamente, como nome,
              email e outras informações fornecidas ao assinar petições ou fazer doações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Uso dos Dados
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos seus dados para processar assinaturas, doações, enviar
              confirmações e melhorar nossos serviços. Não compartilhamos seus dados
              com terceiros sem seu consentimento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Seus Direitos (LGPD/GDPR)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Você tem direito a acessar, corrigir, excluir ou portar seus dados pessoais.
              Para exercer esses direitos, entre em contato conosco através do formulário
              de contato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Cookies e Tecnologias Similares
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência,
              analisar o uso do site e personalizar conteúdo.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
