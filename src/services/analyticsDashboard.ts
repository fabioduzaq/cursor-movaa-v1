// Dashboard interno de Analytics (arquivo JSON)

import { analyticsService } from '@/services/api'
import type { AnalyticsEvent } from '@/types'

export async function getAnalyticsDashboard() {
  const events = await analyticsService.getEvents()
  
  // Processar eventos para gerar estatísticas
  const stats = {
    totalEvents: events.length,
    pageViews: events.filter((e) => e.type === 'page_view').length,
    signatures: events.filter((e) => e.type === 'signature').length,
    donations: events.filter((e) => e.type === 'donation').length,
    shares: events.filter((e) => e.type === 'share').length,
    buttonClicks: events.filter((e) => e.type === 'button_click').length,
    searches: events.filter((e) => e.type === 'search').length,
    
    // Top páginas visitadas
    topPages: getTopPages(events),
    
    // Taxa de conversão (assinaturas / visualizações de petições)
    conversionRate: calculateConversionRate(events),
    
    // Origem de tráfego (se disponível)
    trafficSources: getTrafficSources(events),
    
    // Eventos por dia
    eventsByDay: getEventsByDay(events),
  }
  
  return stats
}

function getTopPages(events: AnalyticsEvent[]): Array<{ path: string; views: number }> {
  const pageViews = events.filter((e) => e.type === 'page_view')
  const pageCounts: Record<string, number> = {}
  
  pageViews.forEach((event) => {
    const path = (event.data as { path?: string }).path || 'unknown'
    pageCounts[path] = (pageCounts[path] || 0) + 1
  })
  
  return Object.entries(pageCounts)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
}

function calculateConversionRate(events: AnalyticsEvent[]): number {
  const pageViews = events.filter((e) => e.type === 'page_view' && 
    (e.data as { path?: string }).path?.includes('/petitions/')).length
  const signatures = events.filter((e) => e.type === 'signature').length
  
  if (pageViews === 0) return 0
  return Math.round((signatures / pageViews) * 100 * 100) / 100
}

function getTrafficSources(events: AnalyticsEvent[]): Record<string, number> {
  // Em produção, isso viria de dados de referrer ou UTM parameters
  return {
    direct: events.length * 0.6,
    social: events.length * 0.3,
    search: events.length * 0.1,
  }
}

function getEventsByDay(events: AnalyticsEvent[]): Array<{ date: string; count: number }> {
  const dayCounts: Record<string, number> = {}
  
  events.forEach((event) => {
    const date = new Date(event.timestamp).toISOString().split('T')[0]
    dayCounts[date] = (dayCounts[date] || 0) + 1
  })
  
  return Object.entries(dayCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Função para exportar dados como JSON
export async function exportAnalyticsJSON(): Promise<string> {
  const dashboard = await getAnalyticsDashboard()
  return JSON.stringify(dashboard, null, 2)
}
