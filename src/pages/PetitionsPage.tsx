import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { petitionService, mockPetitions } from '@/services/api'
import { usePageTracking, useAnalytics } from '@/hooks/useAnalytics'
import type { Petition, SortOption } from '@/types'
import { CATEGORIES } from '@/config'
import PetitionCard from '@/components/petitions/PetitionCard'
import Button from '@/components/common/Button'

export default function PetitionsPage() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { trackEvent } = useAnalytics()
  usePageTracking()

  const [petitions, setPetitions] = useState<Petition[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'popularity'
  )

  useEffect(() => {
    loadPetitions()
  }, [category, sort])

  const loadPetitions = async () => {
    setLoading(true)
    try {
      // Em produção, usar petitionService.getAll()
      // Por enquanto, usar mock data
      let data = [...mockPetitions]

      if (category) {
        data = data.filter((p) => p.category === category)
      }

      if (search) {
        const searchLower = search.toLowerCase()
        data = data.filter(
          (p) =>
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        )
      }

      // Ordenação
      data.sort((a, b) => {
        switch (sort) {
          case 'popularity':
            return b.signatures - a.signatures
          case 'date':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          case 'signatures':
            return b.signatures - a.signatures
          default:
            return 0
        }
      })

      setPetitions(data)
    } catch (error) {
      console.error('Error loading petitions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setSearchParams({ ...Object.fromEntries(searchParams), search: value })
    trackEvent('search', { query: value })
  }

  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
    setSearchParams({ ...Object.fromEntries(searchParams), category: cat })
  }

  const handleSortChange = (s: SortOption) => {
    setSort(s)
    setSearchParams({ ...Object.fromEntries(searchParams), sort: s })
  }

  const featuredPetitions = petitions.filter((p) => p.featured)

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {t('petitions.title')}
        </h1>
        <p className="text-gray-600">
          {t('petitions.all')}
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t('petitions.searchPlaceholder')}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="input"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="input md:w-48"
          >
            <option value="popularity">{t('petitions.popularity')}</option>
            <option value="date">{t('petitions.date')}</option>
            <option value="signatures">{t('petitions.signatures')}</option>
          </select>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t('common.all')}
          </button>
          {CATEGORIES.map((cat) => {
            const nameKey = i18n.language === 'pt-BR' ? 'name' : i18n.language === 'en' ? 'nameEn' : 'nameEs'
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat[nameKey]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Petições em Destaque */}
      {featuredPetitions.length > 0 && !category && !search && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('petitions.featured')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPetitions.map((petition) => (
              <PetitionCard key={petition.id} petition={petition} />
            ))}
          </div>
        </div>
      )}

      {/* Todas as Petições */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {featuredPetitions.length > 0 && !category && !search
            ? t('petitions.all')
            : t('petitions.title')}
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('common.loading')}</p>
          </div>
        ) : petitions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t('petitions.noResults')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petitions.map((petition) => (
              <PetitionCard key={petition.id} petition={petition} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
