import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTracking, useAnalytics } from '@/hooks/useAnalytics'
import { validateEmail } from '@/utils'
import Button from '@/components/common/Button'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const { t } = useTranslation()
  const { trackEvent } = useAnalytics()
  usePageTracking()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('Por favor, informe seu nome')
      return
    }

    if (!validateEmail(formData.email)) {
      toast.error('Por favor, informe um email válido')
      return
    }

    if (!formData.message.trim()) {
      toast.error('Por favor, escreva sua mensagem')
      return
    }

    setLoading(true)
    try {
      // Em produção, enviar para API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      trackEvent('button_click', { action: 'contact_form_submit' })
      toast.success('Mensagem enviada com sucesso!')
      setFormData({ name: '', email: '', subject: '', message: '' })
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
          {t('nav.contact')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Assunto
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="input"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t('common.loading') : 'Enviar Mensagem'}
          </Button>
        </form>
      </div>
    </div>
  )
}
