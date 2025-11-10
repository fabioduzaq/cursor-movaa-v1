// Configurações da aplicação

export const APP_CONFIG = {
  name: 'MoVaa',
  tagline: 'A mudança que você quer ver no mundo',
  version: '1.0.0',
  defaultLanguage: 'pt-BR' as const,
  supportedLanguages: ['pt-BR', 'en', 'es'] as const,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  gtmId: import.meta.env.VITE_GTM_ID || '',
  gaId: import.meta.env.VITE_GA_ID || '',
  asaasApiKey: import.meta.env.VITE_ASAAS_API_KEY || '',
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  paypalClientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
}

export const ROUTES = {
  home: '/',
  petitions: '/petitions',
  petitionDetail: (id: string) => `/petitions/${id}`,
  petitionSign: (id: string) => `/petitions/${id}/sign`,
  petitionThankYou: (id: string) => `/petitions/${id}/thank-you`,
  donate: '/donate',
  services: '/services',
  products: '/products',
  about: '/about',
  careers: '/careers',
  press: '/press',
  help: '/help',
  contact: '/contact',
  feedback: '/feedback',
  privacy: '/privacy',
  terms: '/terms',
} as const

export const CATEGORIES = [
  { id: 'environment', name: 'Meio Ambiente', nameEn: 'Environment', nameEs: 'Medio Ambiente' },
  { id: 'human-rights', name: 'Direitos Humanos', nameEn: 'Human Rights', nameEs: 'Derechos Humanos' },
  { id: 'education', name: 'Educação', nameEn: 'Education', nameEs: 'Educación' },
  { id: 'health', name: 'Saúde', nameEn: 'Health', nameEs: 'Salud' },
  { id: 'animals', name: 'Animais', nameEn: 'Animals', nameEs: 'Animales' },
  { id: 'politics', name: 'Política', nameEn: 'Politics', nameEs: 'Política' },
  { id: 'social', name: 'Social', nameEn: 'Social', nameEs: 'Social' },
  { id: 'other', name: 'Outros', nameEn: 'Other', nameEs: 'Otros' },
] as const
