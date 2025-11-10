import { getTranslations } from 'next-intl/server';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const mockReleases = [
  {
    id: '1',
    title: 'MoVaa Lança Nova Plataforma de Petições',
    date: '2024-01-15',
    summary: 'Plataforma revoluciona participação cidadã no Brasil',
  },
  {
    id: '2',
    title: 'Parceria com Organizações Não Governamentais',
    date: '2024-01-10',
    summary: 'MoVaa anuncia parcerias estratégicas com ONGs',
  },
];

export default async function PressPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('press');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="card p-8 mb-8 text-center">
          <FileText className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Kit de Imprensa</h2>
          <p className="text-muted-foreground mb-6">
            Baixe nosso kit completo com logos, imagens e informações sobre a MoVaa
          </p>
          <Button variant="primary" className="flex items-center gap-2 mx-auto">
            <Download className="h-5 w-5" />
            {t('downloadKit')}
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">{t('releases')}</h2>
          <div className="space-y-4">
            {mockReleases.map((release) => (
              <div key={release.id} className="card p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">{release.title}</h3>
                  <span className="text-sm text-muted-foreground sm:ml-4">
                    {new Date(release.date).toLocaleDateString(locale)}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{release.summary}</p>
                <Button variant="outline" size="sm">Ler Mais</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 card p-8">
          <h2 className="text-2xl font-bold mb-4">Contato para Imprensa</h2>
          <p className="text-muted-foreground mb-4">
            Para solicitações de entrevista ou informações adicionais, entre em contato:
          </p>
          <p className="font-semibold">imprensa@movaa.com.br</p>
          <p className="text-muted-foreground">+55 (11) 9999-9999</p>
        </div>
      </div>
    </div>
  );
}
