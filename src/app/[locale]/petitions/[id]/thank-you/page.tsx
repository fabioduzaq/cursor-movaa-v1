import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { CheckCircle, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SocialShare } from '@/components/social/SocialShare';
import { DonationForm } from '@/components/donations/DonationForm';

export default async function ThankYouPage({
  params,
}: {
  params: { locale: string; id?: string };
}) {
  const t = await getTranslations('petitions.thankYou');
  const locale = params.locale;

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <CheckCircle className="h-20 w-20 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground mb-8">{t('message')}</p>
        </div>

        <div className="card p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Compartilhe esta Causa</h2>
          <SocialShare
            url={`/${locale}/petitions/${params.id || ''}`}
            title="Petição MoVaa"
            description="Ajude a fazer a diferença!"
          />
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Fazer uma Doação</h2>
          <p className="text-muted-foreground mb-6">
            Sua doação ajuda a promover e ampliar esta causa
          </p>
          <DonationForm petitionId={params.id} />
        </div>

        <div className="mt-8">
          <a href={`/${locale}/petitions`} className="btn-outline">
            Ver Outras Petições
          </a>
        </div>
      </div>
    </div>
  );
}
