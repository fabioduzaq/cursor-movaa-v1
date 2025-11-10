import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PetitionCard } from '@/components/petitions/PetitionCard';
import { Petition } from '@/types';
import { Button } from '@/components/ui/Button';

// Mock data - em produção viria de uma API
const mockPetitions: Petition[] = [
  {
    id: '1',
    title: 'Proteção aos Animais de Rua',
    description: 'Campanha para criação de abrigos e programas de castração para animais de rua em nossa cidade.',
    creator: {
      id: '1',
      name: 'Associação Protetora dos Animais',
    },
    category: 'Meio Ambiente',
    tags: ['animais', 'proteção'],
    signatureCount: 1250,
    goal: 5000,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: 'Educação de Qualidade para Todos',
    description: 'Luta por melhorias na infraestrutura escolar e acesso igualitário à educação.',
    creator: {
      id: '2',
      name: 'Movimento pela Educação',
    },
    category: 'Educação',
    tags: ['educação', 'igualdade'],
    signatureCount: 3200,
    goal: 10000,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    featured: true,
  },
];

async function PetitionsList() {
  const t = await getTranslations('petitions');

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-muted-foreground">
            Descubra causas importantes e faça a diferença assinando petições
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="search"
              placeholder={t('search')}
              className="input w-full"
            />
          </div>
          <select className="input w-full sm:w-auto">
            <option>{t('filters.all')}</option>
            <option>{t('filters.popularity')}</option>
            <option>{t('filters.date')}</option>
            <option>{t('filters.signatures')}</option>
          </select>
        </div>

        {/* Petitions Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPetitions.map((petition) => (
            <PetitionCard key={petition.id} petition={petition} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Carregar Mais</Button>
        </div>
      </div>
    </div>
  );
}

export default function PetitionsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PetitionsList />
    </Suspense>
  );
}
