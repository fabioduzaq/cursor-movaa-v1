import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations('common');

  return {
    title: 'MoVaa - A mudança que você quer ver no mundo',
    description: t('tagline'),
    openGraph: {
      title: 'MoVaa',
      description: t('tagline'),
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'MoVaa',
      description: t('tagline'),
    },
  };
}
