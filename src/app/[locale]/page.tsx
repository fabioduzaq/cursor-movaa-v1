import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PetitionCard } from '@/components/petitions/PetitionCard';
import { Petition } from '@/types';

// Mock data - em produção viria de uma API
const mockPetitions: Petition[] = [
  {
    id: '1',
    title: 'Proteção aos Animais de Rua',
    description: 'Campanha para criação de abrigos e programas de castração para animais de rua em nossa cidade.',
    fullDescription: 'Esta petição busca criar uma rede de proteção animal com abrigos adequados, programas de castração gratuita e adoção responsável.',
    imageUrl: '/images/petition-1.jpg',
    creator: {
      id: '1',
      name: 'Associação Protetora dos Animais',
      avatar: '/images/avatar-1.jpg',
    },
    category: 'Meio Ambiente',
    tags: ['animais', 'proteção', 'bem-estar'],
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
    fullDescription: 'Buscamos garantir que todas as crianças tenham acesso a uma educação de qualidade, independentemente de sua origem ou condição social.',
    creator: {
      id: '2',
      name: 'Movimento pela Educação',
    },
    category: 'Educação',
    tags: ['educação', 'igualdade', 'futuro'],
    signatureCount: 3200,
    goal: 10000,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    featured: true,
  },
];

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('common');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-4">
              {t('welcome')}
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-primary-100">
              {t('tagline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/petitions`}
                className="btn-primary px-8 py-3 rounded-md text-lg font-semibold"
              >
                Ver Petições
              </a>
              <a
                href={`/${locale}/about`}
                className="btn-outline bg-white/10 border-white text-white hover:bg-white/20 px-8 py-3 rounded-md text-lg font-semibold"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Petitions */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Petições em Destaque
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockPetitions.map((petition) => (
              <PetitionCard key={petition.id} petition={petition} />
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={`/${locale}/petitions`}
              className="btn-primary px-6 py-3 rounded-md"
            >
              Ver Todas as Petições
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Crie Petições</h3>
              <p className="text-muted-foreground">
                Dê voz às causas que importam para você
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Faça a Diferença</h3>
              <p className="text-muted-foreground">
                Junte-se a milhares de pessoas em causas importantes
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-bold mb-2">Apoie com Doações</h3>
              <p className="text-muted-foreground">
                Contribua financeiramente para causas que você acredita
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
