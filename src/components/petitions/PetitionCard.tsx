import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Petition } from '@/types'
import { formatNumber, calculateProgress } from '@/utils'
import { ROUTES } from '@/config'

interface PetitionCardProps {
  petition: Petition
}

export default function PetitionCard({ petition }: PetitionCardProps) {
  const { t, i18n } = useTranslation()
  const progress = petition.goal ? calculateProgress(petition.signatures, petition.goal) : 0

  return (
    <div className="card">
      {petition.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={petition.image}
            alt={petition.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded">
            {petition.category}
          </span>
          {petition.featured && (
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
              {t('petitions.featured')}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {petition.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {petition.description}
        </p>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-700 font-medium">
              {formatNumber(petition.signatures, i18n.language)} {t('petitions.signatures')}
            </span>
            {petition.goal && (
              <span className="text-gray-500">
                {t('petitions.goal')}: {formatNumber(petition.goal, i18n.language)}
              </span>
            )}
          </div>
          {petition.goal && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {t('petitions.createdBy')} {petition.creator}
          </span>
          <Link
            to={ROUTES.petitionDetail(petition.id)}
            className="btn-primary text-sm"
          >
            {t('common.readMore')}
          </Link>
        </div>
      </div>
    </div>
  )
}
