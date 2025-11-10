import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTracking, useAnalytics } from '@/hooks/useAnalytics'
import { validateEmail, formatCurrency } from '@/utils'
import Button from '@/components/common/Button'
import toast from 'react-hot-toast'
import { donationService } from '@/services/api'

export default function DonationPage() {
  const { t, i18n } = useTranslation()
  const { trackEvent } = useAnalytics()
  usePageTracking()

  const [formData, setFormData] = useState({
    amount: '',
    currency: 'BRL',
    donorName: '',
    donorEmail: '',
    paymentMethod: 'pix' as 'pix' | 'boleto' | 'credit_card' | 'paypal' | 'stripe',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Por favor, informe um valor válido')
      return
    }

    if (!formData.donorName.trim()) {
      toast.error('Por favor, informe seu nome')
      return
    }

    if (!validateEmail(formData.donorEmail)) {
      toast.error('Por favor, informe um email válido')
      return
    }

    setLoading(true)
    try {
      const donation = await donationService.create({
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        donorName: formData.donorName,
        donorEmail: formData.donorEmail,
        paymentMethod: formData.paymentMethod,
      })

      trackEvent('donation', { donationId: donation.id, amount: donation.amount })
      toast.success(t('donations.success'))
      
      // Em produção, redirecionar para processamento de pagamento
      // Por enquanto, apenas mostrar sucesso
    } catch (error) {
      console.error('Error creating donation:', error)
      toast.error(t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  const quickAmounts = [50, 100, 250, 500, 1000]

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('donations.title')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Valor */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              {t('donations.amount')}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">{formData.currency === 'BRL' ? 'R$' : '$'}</span>
              <input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="input flex-1"
                min="1"
                step="0.01"
                required
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {formatCurrency(amount, formData.currency, i18n.language)}
                </button>
              ))}
            </div>
          </div>

          {/* Moeda */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              {t('donations.currency')}
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="input"
            >
              <option value="BRL">BRL (Real Brasileiro)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
            </select>
          </div>

          {/* Dados do Doador */}
          <div>
            <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('donations.donorName')}
            </label>
            <input
              type="text"
              id="donorName"
              value={formData.donorName}
              onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700 mb-2">
              {t('donations.donorEmail')}
            </label>
            <input
              type="email"
              id="donorEmail"
              value={formData.donorEmail}
              onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
              className="input"
              required
            />
          </div>

          {/* Método de Pagamento */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
              {t('donations.paymentMethod')}
            </label>
            <select
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentMethod: e.target.value as typeof formData.paymentMethod,
                })
              }
              className="input"
            >
              {formData.currency === 'BRL' && (
                <>
                  <option value="pix">{t('donations.pix')}</option>
                  <option value="boleto">{t('donations.boleto')}</option>
                  <option value="credit_card">{t('donations.creditCard')}</option>
                </>
              )}
              {(formData.currency === 'USD' || formData.currency === 'EUR') && (
                <>
                  <option value="paypal">{t('donations.paypal')}</option>
                  <option value="stripe">{t('donations.stripe')}</option>
                </>
              )}
            </select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t('common.loading') : t('donations.process')}
          </Button>
        </form>
      </div>
    </div>
  )
}
