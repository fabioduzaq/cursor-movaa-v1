import { getTranslations } from 'next-intl/server';
import { FileText, Scale, AlertTriangle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function TermsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('terms');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Scale className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-muted-foreground">
            {t('lastUpdated')}: {formatDate(new Date(), locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'es-ES')}
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('acceptance')}</h2>
            <p className="text-muted-foreground">
              Ao acessar e usar a plataforma MoVaa, você concorda em cumprir e estar 
              vinculado a estes Termos de Uso. Se você não concordar com qualquer parte 
              destes termos, não deve usar nossa plataforma.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('use')}</h2>
            <p className="text-muted-foreground mb-4">
              Você concorda em usar a plataforma apenas para fins legais e de acordo com 
              estes termos. Você não deve:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Usar a plataforma de forma fraudulenta ou enganosa</li>
              <li>Criar petições com informações falsas ou enganosas</li>
              <li>Assinar petições múltiplas vezes usando identidades falsas</li>
              <li>Interferir no funcionamento da plataforma</li>
              <li>Violar direitos de propriedade intelectual</li>
            </ul>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('userContent')}</h2>
            <p className="text-muted-foreground">
              Você mantém todos os direitos sobre o conteúdo que cria na plataforma. 
              Ao publicar conteúdo, você concede à MoVaa uma licença não exclusiva para 
              usar, exibir e distribuir esse conteúdo na plataforma. Você é responsável 
              por garantir que possui todos os direitos necessários sobre o conteúdo que publica.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary-600" />
              {t('prohibited')}
            </h2>
            <p className="text-muted-foreground mb-4">
              É proibido usar a plataforma para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Atividades ilegais ou fraudulentas</li>
              <li>Assédio, discriminação ou discurso de ódio</li>
              <li>Spam ou envio de mensagens não solicitadas</li>
              <li>Coleta não autorizada de dados de outros usuários</li>
              <li>Uso de bots ou automação para manipular assinaturas</li>
            </ul>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('intellectualProperty')}</h2>
            <p className="text-muted-foreground">
              Todo o conteúdo da plataforma MoVaa, incluindo design, logotipos, textos, 
              gráficos e software, é propriedade da MoVaa ou de seus licenciadores e está 
              protegido por leis de direitos autorais e outras leis de propriedade intelectual.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('limitation')}</h2>
            <p className="text-muted-foreground">
              A MoVaa não se responsabiliza por danos diretos, indiretos, incidentais ou 
              consequenciais resultantes do uso ou incapacidade de usar a plataforma. 
              Não garantimos que a plataforma estará sempre disponível, segura ou livre de erros.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">Alterações nos Termos</h2>
            <p className="text-muted-foreground">
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
              Alterações significativas serão comunicadas através da plataforma. O uso 
              continuado da plataforma após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('contact')}</h2>
            <p className="text-muted-foreground">
              Para questões sobre estes termos, entre em contato:
            </p>
            <p className="mt-2">
              <strong>E-mail:</strong> legal@movaa.com.br<br />
              <strong>Telefone:</strong> +55 (11) 9999-9999
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
