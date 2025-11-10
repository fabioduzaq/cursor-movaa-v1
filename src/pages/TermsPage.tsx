import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'

export default function TermsPage() {
  const { t } = useTranslation()
  usePageTracking()

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.terms')}
        </h1>

        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Aceitação dos Termos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ao usar a plataforma MoVaa, você concorda com estes termos de uso.
              Se não concordar, por favor, não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Uso da Plataforma
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Você concorda em usar a plataforma de forma legal e ética, respeitando
              os direitos de outros usuários e não publicando conteúdo ofensivo,
              difamatório ou ilegal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Assinaturas e Doações
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ao assinar uma petição ou fazer uma doação, você confirma que as
              informações fornecidas são verdadeiras e que você tem autoridade
              para realizar essas ações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Modificações dos Termos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Reservamos o direito de modificar estes termos a qualquer momento.
              Alterações significativas serão comunicadas aos usuários.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
