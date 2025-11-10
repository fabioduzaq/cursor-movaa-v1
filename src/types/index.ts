export interface Petition {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  imageUrl?: string;
  videoUrl?: string;
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  signatureCount: number;
  goal?: number;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  trending?: boolean;
}

export interface Signature {
  id: string;
  petitionId: string;
  name: string;
  email: string;
  anonymous: boolean;
  createdAt: string;
}

export interface Donation {
  id: string;
  petitionId?: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  donorName: string;
  donorEmail: string;
  anonymous: boolean;
  message?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export type PaymentMethod = 'pix' | 'boleto' | 'creditCard' | 'paypal' | 'stripe';

export interface PaymentConfig {
  method: PaymentMethod;
  amount: number;
  currency: string;
  description: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface AnalyticsEvent {
  type: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: string;
}

export interface AnalyticsData {
  pageViews: number;
  buttonClicks: number;
  conversions: number;
  trafficSource: string;
  userBehavior: Record<string, any>;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FeedbackForm {
  name: string;
  email: string;
  type: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
}

export type SortOption = 'popularity' | 'date' | 'signatures' | 'recent' | 'trending';
export type FilterOption = string | 'all';
