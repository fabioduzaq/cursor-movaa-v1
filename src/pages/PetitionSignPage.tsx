import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GoogleLogin } from '@react-oauth/google'
import { petitionService } from '@/services/api'
import { usePageTracking, useAnalytics } from '@/hooks/useAnalytics'
import { validateEmail } from '@/utils'
import { ROUTES, APP_CONFIG } from '@/config'
import Button from '@/components/common/Button'
import toast from 'react-hot-toast'
import { useAppStore } from '@/store'

export default function PetitionSignPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { trackEvent } = useAnalytics()
  usePageTracking()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    anonymous: false,
  })
  const [loading, setLoading] = useState(false)
  const setUser = useAppStore((state) => state.setUser)

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

    if (!id) {
      toast.error('Petição não encontrada')
      return
    }

    setLoading(true)
    try {
      await petitionService.sign(id, {
        name: formData.name,
        email: formData.email,
        anonymous: formData.anonymous,
      })

      trackEvent('signature', { petitionId: id })
      toast.success(t('petitions.thankYou.message'))
      navigate(ROUTES.petitionThankYou(id))
    } catch (error) {
      console.error('Error signing petition:', error)
      toast.error(t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: { credential: string }) => {
    // Em produção, decodificar o JWT e usar os dados do usuário
    // Por enquanto, simular sucesso
    try {
      // Decodificar JWT (em produção usar biblioteca adequada)
      setUser({
        id: 'google-user',
        name: 'Usuário Google',
        email: 'user@example.com',
      })

      if (id) {
        await petitionService.sign(id, {
          name: 'Usuário Google',
          email: 'user@example.com',
          anonymous: false,
        })

        trackEvent('signature', { petitionId: id, method: 'google' })
        toast.success(t('petitions.thankYou.message'))
        navigate(ROUTES.petitionThankYou(id))
      }
    } catch (error) {
      console.error('Error with Google sign:', error)
      toast.error(t('common.error'))
    }
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t('petitions.signatureForm.title')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('petitions.signatureForm.name')}
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
              {t('petitions.signatureForm.email')}
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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.anonymous}
              onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
              {t('petitions.signatureForm.anonymous')}
            </label>
          </div>

          {APP_CONFIG.googleClientId && (
            <div className="border-t pt-6">
              <p className="text-sm text-gray-600 mb-4 text-center">
                {t('petitions.signatureForm.signWithGoogle')}
              </p>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error(t('common.error'))}
                />
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600">
            {t('petitions.signatureForm.terms')}{' '}
            <a href={ROUTES.terms} className="text-primary-600 hover:underline">
              {t('petitions.signatureForm.termsLink')}
            </a>{' '}
            {t('common.and')}{' '}
            <a href={ROUTES.privacy} className="text-primary-600 hover:underline">
              {t('petitions.signatureForm.privacyLink')}
            </a>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t('common.loading') : t('petitions.signatureForm.submit')}
          </Button>
        </form>
      </div>
    </div>
  )
}
