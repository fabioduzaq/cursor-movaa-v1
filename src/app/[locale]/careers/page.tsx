import { getTranslations } from 'next-intl/server';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const mockPositions = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack',
    location: 'Remoto',
    type: 'Tempo Integral',
    department: 'Tecnologia',
    description: 'Buscamos um desenvolvedor experiente para trabalhar em nossa plataforma.',
  },
  {
    id: '2',
    title: 'Designer UX/UI',
    location: 'São Paulo, SP',
    type: 'Tempo Integral',
    department: 'Design',
    description: 'Procuramos um designer criativo para melhorar a experiência do usuário.',
  },
];

export default async function CareersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('careers');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="space-y-6">
          {mockPositions.map((position) => (
            <div key={position.id} className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{position.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{position.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{position.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{position.department}</span>
                    </div>
                  </div>
                </div>
                <Button variant="primary" className="mt-4 sm:mt-0">
                  {t('apply')}
                </Button>
              </div>
              <p className="text-muted-foreground">{position.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Não encontrou a vaga ideal?</h2>
          <p className="text-muted-foreground mb-6">
            Envie seu currículo para nosso banco de talentos
          </p>
          <Button variant="outline">Enviar Currículo</Button>
        </div>
      </div>
    </div>
  );
}
