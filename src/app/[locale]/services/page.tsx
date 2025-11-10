import { getTranslations } from 'next-intl/server';
import { Briefcase, Users, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const mockServices = [
  {
    id: '1',
    title: 'Criação de Petições',
    description: 'Ferramentas completas para criar e gerenciar petições online',
    icon: Briefcase,
  },
  {
    id: '2',
    title: 'Mobilização Social',
    description: 'Ajudamos a promover causas e alcançar mais pessoas',
    icon: Users,
  },
  {
    id: '3',
    title: 'Gestão de Campanhas',
    description: 'Ferramentas profissionais para organizações e ONGs',
    icon: Target,
  },
  {
    id: '4',
    title: 'Sistema de Doações',
    description: 'Plataforma segura para coletar doações para causas',
    icon: Heart,
  },
];

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('services');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {mockServices.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="card p-8">
                <Icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="outline">Saiba Mais</Button>
              </div>
            );
          })}
        </div>

        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('contact')}</h2>
          <p className="text-muted-foreground mb-6">
            Entre em contato para saber mais sobre nossos serviços
          </p>
          <Button variant="primary">Entre em Contato</Button>
        </div>
      </div>
    </div>
  );
}
