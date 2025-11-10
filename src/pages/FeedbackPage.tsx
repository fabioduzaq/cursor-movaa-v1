import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTracking, useAnalytics } from '@/hooks/useAnalytics'
import { validateEmail } from '@/utils'
import Button from '@/components/common/Button'
import toast from 'react-hot-toast'

export default function FeedbackPage() {
  const { t } = useTranslation()
  const { trackEvent } = useAnalytics()
  usePageTracking()

  const [formData, setFormData] = useState({
    email: '',
    feedback: '',
    rating: 5,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(formData.email)) {
      toast.error('Por favor, informe um email válido')
      return
    }

    if (!formData.feedback.trim()) {
      toast.error('Por favor, escreva seu feedback')
      return
    }

    setLoading(true)
    try {
      // Em produção, enviar para API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      trackEvent('button_click', { action: 'feedback_submit', rating: formData.rating })
      toast.success('Feedback enviado com sucesso! Obrigado!')
      setFormData({ email: '', feedback: '', rating: 5 })
    } catch (error) {
      toast.error(t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('nav.feedback')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email (opcional)
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
              Avaliação: {formData.rating}/5
            </label>
            <input
              type="range"
              id="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Seu Feedback
            </label>
            <textarea
              id="feedback"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              rows={6}
              className="input"
              placeholder="Compartilhe suas sugestões, críticas ou elogios..."
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t('common.loading') : 'Enviar Feedback'}
          </Button>
        </form>
      </div>
    </div>
  )
}
