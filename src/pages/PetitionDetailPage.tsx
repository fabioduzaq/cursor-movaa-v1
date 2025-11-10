import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { petitionService, mockPetitions } from '@/services/api'
import { usePageTracking, useAnalytics } from '@/hooks/useAnalytics'
import { formatNumber, formatDate, calculateProgress } from '@/utils'
import { ROUTES } from '@/config'
import type { Petition } from '@/types'
import Button from '@/components/common/Button'
import SocialShare from '@/components/common/SocialShare'
import { useAppStore } from '@/store'

export default function PetitionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { trackEvent } = useAnalytics()
  usePageTracking()

  const [petition, setPetition] = useState<Petition | null>(null)
  const [loading, setLoading] = useState(true)
  const addRecentPetition = useAppStore((state) => state.addRecentPetition)

  useEffect(() => {
    if (id) {
      loadPetition()
      addRecentPetition(id)
    }
  }, [id])

  const loadPetition = async () => {
    setLoading(true)
    try {
      // Em produção, usar petitionService.getById(id!)
      // Por enquanto, usar mock data
      const data = mockPetitions.find((p) => p.id === id) || null
      setPetition(data)
    } catch (error) {
      console.error('Error loading petition:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignClick = () => {
    if (id) {
      trackEvent('button_click', { action: 'sign_petition', petitionId: id })
      navigate(ROUTES.petitionSign(id))
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-gray-600">{t('common.loading')}</p>
      </div>
    )
  }

  if (!petition) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-gray-600">{t('common.error')}</p>
        <Link to={ROUTES.petitions} className="btn-primary mt-4 inline-block">
          {t('petitions.title')}
        </Link>
      </div>
    )
  }

  const progress = petition.goal ? calculateProgress(petition.signatures, petition.goal) : 0
  const shareUrl = `${window.location.origin}${ROUTES.petitionDetail(petition.id)}`

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        {/* Imagem/Vídeo */}
        {petition.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={petition.image}
              alt={petition.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Categoria e Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
            {petition.category}
          </span>
          {petition.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {petition.title}
        </h1>

        {/* Criador e Data */}
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span>
            {t('petitions.createdBy')} <strong>{petition.creator}</strong>
          </span>
          <span>•</span>
          <span>{formatDate(petition.createdAt, i18n.language)}</span>
        </div>

        {/* Estatísticas */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(petition.signatures, i18n.language)}
              </p>
              <p className="text-gray-600">
                {petition.signatures === 1
                  ? t('petitions.signature')
                  : t('petitions.signaturesPlural')}
              </p>
            </div>
            {petition.goal && (
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(petition.goal, i18n.language)}
                </p>
                <p className="text-gray-600">{t('petitions.goal')}</p>
              </div>
            )}
          </div>

          {petition.goal && (
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="mt-6">
            <Button onClick={handleSignClick} size="lg" className="w-full md:w-auto">
              {t('petitions.signPetition')}
            </Button>
          </div>
        </div>

        {/* Descrição */}
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {petition.description}
          </p>
        </div>

        {/* Compartilhamento */}
        <div className="border-t pt-8">
          <SocialShare url={shareUrl} title={petition.title} description={petition.description} />
        </div>
      </div>
    </div>
  )
}
