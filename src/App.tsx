import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Helmet } from 'react-helmet-async'
import Layout from '@/components/layout/Layout'
import { APP_CONFIG } from '@/config'
import { useGTM, useGoogleAnalytics } from '@/hooks/useGTM'

// Pages
import HomePage from '@/pages/HomePage'
import PetitionsPage from '@/pages/PetitionsPage'
import PetitionDetailPage from '@/pages/PetitionDetailPage'
import PetitionSignPage from '@/pages/PetitionSignPage'
import PetitionThankYouPage from '@/pages/PetitionThankYouPage'
import DonationPage from '@/pages/DonationPage'
import ServicesPage from '@/pages/ServicesPage'
import ProductsPage from '@/pages/ProductsPage'
import AboutPage from '@/pages/AboutPage'
import CareersPage from '@/pages/CareersPage'
import PressPage from '@/pages/PressPage'
import HelpPage from '@/pages/HelpPage'
import ContactPage from '@/pages/ContactPage'
import FeedbackPage from '@/pages/FeedbackPage'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import { ROUTES } from '@/config'

function App() {
  useGTM()
  useGoogleAnalytics()

  return (
    <GoogleOAuthProvider clientId={APP_CONFIG.googleClientId}>
      <BrowserRouter>
        <Helmet>
          <title>{APP_CONFIG.name} - {APP_CONFIG.tagline}</title>
          <meta name="description" content="Plataforma de Petições e Causas Sociais" />
          <meta property="og:title" content={`${APP_CONFIG.name} - ${APP_CONFIG.tagline}`} />
          <meta property="og:description" content="Plataforma de Petições e Causas Sociais" />
          <meta property="og:type" content="website" />
        </Helmet>

        <Layout>
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.petitions} element={<PetitionsPage />} />
            <Route path={ROUTES.petitionDetail(':id')} element={<PetitionDetailPage />} />
            <Route path={ROUTES.petitionSign(':id')} element={<PetitionSignPage />} />
            <Route path={ROUTES.petitionThankYou(':id')} element={<PetitionThankYouPage />} />
            <Route path={ROUTES.donate} element={<DonationPage />} />
            <Route path={ROUTES.services} element={<ServicesPage />} />
            <Route path={ROUTES.products} element={<ProductsPage />} />
            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path={ROUTES.careers} element={<CareersPage />} />
            <Route path={ROUTES.press} element={<PressPage />} />
            <Route path={ROUTES.help} element={<HelpPage />} />
            <Route path={ROUTES.contact} element={<ContactPage />} />
            <Route path={ROUTES.feedback} element={<FeedbackPage />} />
            <Route path={ROUTES.privacy} element={<PrivacyPage />} />
            <Route path={ROUTES.terms} element={<TermsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
