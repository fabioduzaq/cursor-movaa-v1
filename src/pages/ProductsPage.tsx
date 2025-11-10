import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'

export default function ProductsPage() {
  const { t } = useTranslation()
  usePageTracking()

  const products = [
    {
      id: '1',
      name: 'MoVaa Pro',
      description: 'Plataforma completa para organizações e movimentos sociais.',
      price: 299,
      currency: 'BRL',
    },
    {
      id: '2',
      name: 'MoVaa Enterprise',
      description: 'Solução empresarial com recursos avançados e suporte dedicado.',
      price: 999,
      currency: 'BRL',
    },
  ]

  return (
    <div className="container-custom py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.products')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary-600">
                  R$ {product.price.toLocaleString('pt-BR')}
                </span>
                <button className="btn-primary">Saiba Mais</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
