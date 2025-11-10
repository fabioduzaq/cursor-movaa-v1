// Página de Dashboard de Analytics (opcional, para visualização interna)

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getAnalyticsDashboard, exportAnalyticsJSON } from '@/services/analyticsDashboard'
import Button from '@/components/common/Button'

export default function AnalyticsDashboardPage() {
  const { t } = useTranslation()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    try {
      const data = await getAnalyticsDashboard()
      setStats(data)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const json = await exportAnalyticsJSON()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting analytics:', error)
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-gray-600">{t('common.loading')}</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-gray-600">Nenhum dado disponível</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard de Analytics</h1>
        <Button onClick={handleExport}>Exportar JSON</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total de Eventos</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Visualizações</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.pageViews}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Assinaturas</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.signatures}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Doações</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.donations}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Páginas</h3>
          <div className="space-y-2">
            {stats.topPages.map((page: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{page.path}</span>
                <span className="font-semibold text-gray-900">{page.views}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Taxa de Conversão</h3>
          <p className="text-4xl font-bold text-primary-600">{stats.conversionRate}%</p>
          <p className="text-sm text-gray-600 mt-2">
            Assinaturas / Visualizações de Petições
          </p>
        </div>
      </div>
    </div>
  )
}
