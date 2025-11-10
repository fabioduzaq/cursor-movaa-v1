// Hook para tracking de analytics

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { analyticsService } from '@/services/api'
import { useAppStore } from '@/store'

export function usePageTracking() {
  const location = useLocation()
  const user = useAppStore((state) => state.user)

  useEffect(() => {
    analyticsService.trackEvent({
      type: 'page_view',
      data: {
        path: location.pathname,
        search: location.search,
      },
      sessionId: sessionStorage.getItem('sessionId') || `session-${Date.now()}`,
      userId: user?.id,
    })
  }, [location, user])
}

export function useAnalytics() {
  const user = useAppStore((state) => state.user)

  const trackEvent = (
    type: 'button_click' | 'signature' | 'donation' | 'share' | 'search',
    data: Record<string, unknown>
  ) => {
    const sessionId = sessionStorage.getItem('sessionId') || `session-${Date.now()}`
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', sessionId)
    }

    analyticsService.trackEvent({
      type,
      data,
      sessionId,
      userId: user?.id,
    })
  }

  return { trackEvent }
}
