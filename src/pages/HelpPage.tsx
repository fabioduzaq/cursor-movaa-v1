import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'

export default function HelpPage() {
  const { t } = useTranslation()
  usePageTracking()

  const faqs = [
    {
      question: 'Como posso criar uma petição?',
      answer: 'Para criar uma petição, você precisa se cadastrar na plataforma e seguir o processo de criação disponível no menu.',
    },
    {
      question: 'Como funcionam as doações?',
      answer: 'As doações podem ser feitas através de diversos métodos de pagamento, incluindo PIX, boleto, cartão de crédito, PayPal e Stripe.',
    },
    {
      question: 'Minha assinatura é pública?',
      answer: 'Você pode escolher assinar anonimamente. Caso contrário, apenas seu nome será exibido publicamente.',
    },
    {
      question: 'Como compartilhar uma petição?',
      answer: 'Cada petição possui botões de compartilhamento para Facebook, Twitter/X, WhatsApp e opção de copiar o link.',
    },
  ]

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.help')}
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ainda precisa de ajuda?
          </h2>
          <p className="text-gray-600 mb-6">
            Entre em contato conosco através do formulário de contato.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </div>
  )
}
