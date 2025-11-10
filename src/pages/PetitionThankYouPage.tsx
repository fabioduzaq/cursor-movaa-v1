import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageTracking } from '@/hooks/useAnalytics'
import { ROUTES } from '@/config'
import Button from '@/components/common/Button'
import SocialShare from '@/components/common/SocialShare'
import { mockPetitions } from '@/services/api'

export default function PetitionThankYouPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  usePageTracking()

  const petition = mockPetitions.find((p) => p.id === id)
  const shareUrl = petition ? `${window.location.origin}${ROUTES.petitionDetail(id!)}` : ''

  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('petitions.thankYou.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('petitions.thankYou.message')}
          </p>
        </div>

        {petition && shareUrl && (
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {petition.title}
            </h2>
            <p className="text-gray-600 mb-6">{petition.description}</p>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-700 mb-3">
                  {t('petitions.thankYou.share')}
                </p>
                <SocialShare url={shareUrl} title={petition.title} description={petition.description} />
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-gray-700 mb-4">
                  {t('petitions.thankYou.donate')}
                </p>
                <Link to={ROUTES.donate}>
                  <Button variant="secondary" className="w-full md:w-auto">
                    {t('common.donate')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ROUTES.petitions}>
            <Button variant="outline">{t('petitions.title')}</Button>
          </Link>
          <Link to={ROUTES.home}>
            <Button>{t('nav.home')}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
