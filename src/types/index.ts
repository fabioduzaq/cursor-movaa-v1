// Tipos principais da aplicação

export interface Petition {
  id: string
  title: string
  description: string
  creator: string
  creatorEmail?: string
  image?: string
  video?: string
  category: string
  tags: string[]
  signatures: number
  goal?: number
  createdAt: string
  updatedAt: string
  status: 'active' | 'closed' | 'archived'
  featured?: boolean
}

export interface Signature {
  id: string
  petitionId: string
  name: string
  email: string
  anonymous: boolean
  createdAt: string
}

export interface Donation {
  id: string
  petitionId?: string
  amount: number
  currency: string
  donorName: string
  donorEmail: string
  paymentMethod: 'pix' | 'boleto' | 'credit_card' | 'paypal' | 'stripe'
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
  receiptUrl?: string
}

export interface Category {
  id: string
  name: string
  nameEn: string
  nameEs: string
  icon?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  link?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image?: string
  link?: string
}

export interface AnalyticsEvent {
  id: string
  type: 'page_view' | 'button_click' | 'signature' | 'donation' | 'share' | 'search'
  data: Record<string, unknown>
  timestamp: string
  userId?: string
  sessionId: string
}

export type SortOption = 'popularity' | 'date' | 'signatures'
export type Language = 'pt-BR' | 'en' | 'es'
