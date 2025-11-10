// Serviços de API e integrações

import axios from 'axios'
import type { Petition, Signature, Donation, AnalyticsEvent } from '@/types'
import { APP_CONFIG } from '@/config'

const api = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Petições
export const petitionService = {
  getAll: async (params?: {
    category?: string
    search?: string
    sort?: 'popularity' | 'date' | 'signatures'
    featured?: boolean
  }): Promise<Petition[]> => {
    const { data } = await api.get<Petition[]>('/petitions', { params })
    return data
  },

  getById: async (id: string): Promise<Petition> => {
    const { data } = await api.get<Petition>(`/petitions/${id}`)
    return data
  },

  sign: async (petitionId: string, signature: {
    name: string
    email: string
    anonymous: boolean
  }): Promise<Signature> => {
    const { data } = await api.post<Signature>(`/petitions/${petitionId}/signatures`, signature)
    return data
  },
}

// Doações
export const donationService = {
  create: async (donation: {
    petitionId?: string
    amount: number
    currency: string
    donorName: string
    donorEmail: string
    paymentMethod: 'pix' | 'boleto' | 'credit_card' | 'paypal' | 'stripe'
  }): Promise<Donation> => {
    const { data } = await api.post<Donation>('/donations', donation)
    return data
  },

  processPayment: async (donationId: string, paymentData: Record<string, unknown>): Promise<Donation> => {
    const { data } = await api.post<Donation>(`/donations/${donationId}/process`, paymentData)
    return data
  },
}

// Analytics
export const analyticsService = {
  trackEvent: async (event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> => {
    const eventData: AnalyticsEvent = {
      ...event,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    }
    
    // Salvar no localStorage para dashboard interno
    const events = JSON.parse(localStorage.getItem('analytics-events') || '[]')
    events.push(eventData)
    localStorage.setItem('analytics-events', JSON.stringify(events.slice(-1000))) // Manter últimos 1000 eventos
    
    // Enviar para API se disponível
    try {
      await api.post('/analytics/events', eventData)
    } catch (error) {
      console.warn('Failed to send analytics event:', error)
    }
  },

  getEvents: async (): Promise<AnalyticsEvent[]> => {
    const events = JSON.parse(localStorage.getItem('analytics-events') || '[]')
    return events
  },
}

// Mock data para desenvolvimento
export const mockPetitions: Petition[] = [
  {
    id: '1',
    title: 'Proteção das Florestas Amazônicas',
    description: 'Petição para aumentar a proteção das florestas amazônicas e combater o desmatamento ilegal.',
    creator: 'Movimento Ambiental Brasil',
    category: 'environment',
    tags: ['meio-ambiente', 'amazônia', 'desmatamento'],
    signatures: 125000,
    goal: 200000,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    status: 'active',
    featured: true,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  },
  {
    id: '2',
    title: 'Direito à Educação de Qualidade',
    description: 'Garantir acesso à educação de qualidade para todas as crianças e jovens do país.',
    creator: 'Associação de Educadores',
    category: 'education',
    tags: ['educação', 'direitos', 'crianças'],
    signatures: 89000,
    goal: 150000,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z',
    status: 'active',
    featured: true,
  },
]
