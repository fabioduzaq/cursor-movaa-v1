import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Heart, TrendingUp, Clock, User, Share2 } from 'lucide-react';
import { formatNumber, calculateProgress } from '@/lib/utils';
import { Petition } from '@/types';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SocialShare } from '@/components/social/SocialShare';
import { SignPetitionForm } from '@/components/petitions/SignPetitionForm';
import { DonationForm } from '@/components/donations/DonationForm';

// Mock data - em produção viria de uma API
const mockPetition: Petition = {
  id: '1',
  title: 'Proteção aos Animais de Rua',
  description: 'Campanha para criação de abrigos e programas de castração para animais de rua em nossa cidade.',
  fullDescription: `Esta petição busca criar uma rede de proteção animal com abrigos adequados, programas de castração gratuita e adoção responsável.

Nossa cidade enfrenta um grave problema com animais abandonados nas ruas. Estes animais sofrem com fome, doenças, maus-tratos e acidentes. Precisamos de uma solução urgente e humanitária.

Objetivos:
- Criar abrigos municipais adequados para animais de rua
- Implementar programa de castração gratuita
- Estabelecer programa de adoção responsável
- Educar a população sobre posse responsável de animais

Com sua assinatura, você está ajudando a salvar vidas e tornar nossa cidade um lugar melhor para todos os seres vivos.`,
  imageUrl: '/images/petition-1.jpg',
  creator: {
    id: '1',
    name: 'Associação Protetora dos Animais',
    avatar: '/images/avatar-1.jpg',
  },
  category: 'Meio Ambiente',
  tags: ['animais', 'proteção', 'bem-estar', 'cidadania'],
  signatureCount: 1250,
  goal: 5000,
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  featured: true,
  trending: true,
};

async function PetitionDetails({ params }: { params: { id: string; locale: string } }) {
  const t = await getTranslations('petitions');
  const locale = params.locale;

  // Em produção, buscar petição por ID da API
  const petition = mockPetition;
  if (!petition) {
    notFound();
  }

  const progress = calculateProgress(petition.signatureCount, petition.goal);

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <a
            href={`/${locale}/petitions`}
            className="text-primary-600 hover:underline mb-4 inline-block"
          >
            ← Voltar para Petições
          </a>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-primary-600 uppercase">
              {petition.category}
            </span>
            {petition.trending && (
              <span className="flex items-center gap-1 text-sm text-secondary-600">
                <TrendingUp className="h-4 w-4" />
                Em Alta
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">{petition.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {petition.imageUrl && (
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={petition.imageUrl}
                  alt={petition.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-4">{t('description')}</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-muted-foreground">
                  {petition.fullDescription || petition.description}
                </p>
              </div>
            </div>

            {petition.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {petition.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Compartilhar</h3>
              <SocialShare
                url={`/${locale}/petitions/${petition.id}`}
                title={petition.title}
                description={petition.description}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary-600" />
                <span className="text-2xl font-bold text-foreground">
                  {formatNumber(petition.signatureCount)}
                </span>
                <span className="text-muted-foreground">
                  {t('signatures')}
                </span>
              </div>
              {petition.goal && (
                <>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('goal')}</span>
                      <span className="font-semibold">
                        {formatNumber(petition.goal)} {t('signatures')}
                      </span>
                    </div>
                    <ProgressBar value={progress} showLabel />
                  </div>
                </>
              )}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{t('createdBy')}: {petition.creator.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(petition.createdAt).toLocaleDateString(locale)}
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Form */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">{t('signForm.title')}</h3>
              <SignPetitionForm petitionId={petition.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PetitionDetailPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  return <PetitionDetails params={params} />;
}
