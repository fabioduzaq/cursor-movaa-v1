'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    trackEvent('page_view', {
      category: 'navigation',
      action: 'page_view',
      label: pathname,
    });
  }, [pathname]);

  const trackEvent = async (
    type: string,
    data: {
      category: string;
      action: string;
      label?: string;
      value?: number;
    }
  ) => {
    try {
      // Send to internal analytics
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          ...data,
        }),
      });

      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', data.action, {
          event_category: data.category,
          event_label: data.label,
          value: data.value,
        });
      }

      // Send to GTM if available
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: data.action,
          category: data.category,
          label: data.label,
          value: data.value,
        });
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  return { trackEvent };
}
