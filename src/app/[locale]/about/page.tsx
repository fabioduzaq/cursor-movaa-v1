import { getTranslations } from 'next-intl/server';
import { Heart, Users, Target, Lightbulb } from 'lucide-react';

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('about');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">
            Conectando pessoas e causas para criar um mundo melhor
          </p>
        </div>

        <div className="space-y-12">
          <section className="card p-8">
            <div className="flex items-start gap-4 mb-4">
              <Target className="h-8 w-8 text-primary-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">{t('mission')}</h2>
                <p className="text-muted-foreground">
                  Nossa missão é democratizar o acesso à participação cidadã, 
                  oferecendo uma plataforma onde qualquer pessoa pode criar, 
                  assinar e promover causas que acreditam. Acreditamos que 
                  juntos podemos fazer a diferença e criar o mundo que queremos ver.
                </p>
              </div>
            </div>
          </section>

          <section className="card p-8">
            <div className="flex items-start gap-4 mb-4">
              <Lightbulb className="h-8 w-8 text-secondary-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">{t('vision')}</h2>
                <p className="text-muted-foreground">
                  Ser a principal plataforma de mobilização social do Brasil, 
                  conectando milhões de pessoas em causas que transformam 
                  comunidades e impactam positivamente a sociedade.
                </p>
              </div>
            </div>
          </section>

          <section className="card p-8">
            <div className="flex items-start gap-4 mb-4">
              <Heart className="h-8 w-8 text-primary-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">{t('values')}</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Transparência:</strong> Acreditamos em processos claros e abertos</li>
                  <li><strong>Democracia:</strong> Cada voz importa e merece ser ouvida</li>
                  <li><strong>Impacto:</strong> Focamos em resultados reais e mensuráveis</li>
                  <li><strong>Inclusão:</strong> Nossa plataforma é para todos, sem exceção</li>
                  <li><strong>Inovação:</strong> Buscamos sempre melhorar e evoluir</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="card p-8">
            <div className="flex items-start gap-4 mb-4">
              <Users className="h-8 w-8 text-secondary-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">{t('history')}</h2>
                <p className="text-muted-foreground">
                  A MoVaa nasceu em 2024 da necessidade de criar uma plataforma 
                  brasileira focada em causas sociais e participação cidadã. 
                  Desde então, temos trabalhado incansavelmente para construir 
                  uma ferramenta que realmente faça a diferença na vida das pessoas 
                  e nas comunidades que servimos.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
