// Configuração do Google Tag Manager e Google Analytics

import { useEffect } from 'react'
import { APP_CONFIG } from '@/config'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function useGTM() {
  useEffect(() => {
    if (APP_CONFIG.gtmId) {
      // GTM Script
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = `https://www.googletagmanager.com/gtm.js?id=${APP_CONFIG.gtmId}`
      document.head.appendChild(script1)

      // GTM Noscript
      const noscript = document.createElement('noscript')
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${APP_CONFIG.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
      document.body.appendChild(noscript)

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      })
    }
  }, [])
}

export function useGoogleAnalytics() {
  useEffect(() => {
    if (APP_CONFIG.gaId) {
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${APP_CONFIG.gaId}`
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${APP_CONFIG.gaId}');
      `
      document.head.appendChild(script2)
    }
  }, [])
}

export function trackGAEvent(action: string, category: string, label?: string, value?: number) {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
