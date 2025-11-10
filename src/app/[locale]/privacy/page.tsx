import { getTranslations } from 'next-intl/server';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default async function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('privacy');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-muted-foreground">
            {t('lastUpdated')}: {new Date().toLocaleDateString(locale)}
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary-600" />
              {t('introduction')}
            </h2>
            <p className="text-muted-foreground">
              A MoVaa está comprometida em proteger sua privacidade. Esta Política de 
              Privacidade descreve como coletamos, usamos e protegemos suas informações 
              pessoais quando você usa nossa plataforma.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary-600" />
              {t('dataCollection')}
            </h2>
            <p className="text-muted-foreground mb-4">
              Coletamos informações que você nos fornece diretamente, incluindo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Nome e endereço de e-mail ao assinar petições</li>
              <li>Informações de pagamento ao fazer doações</li>
              <li>Conteúdo que você cria ou compartilha na plataforma</li>
              <li>Informações de uso e interações com a plataforma</li>
            </ul>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('dataUse')}</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Processar assinaturas e doações</li>
              <li>Melhorar nossos serviços</li>
              <li>Enviar comunicações importantes sobre sua conta</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary-600" />
              {t('dataProtection')}
            </h2>
            <p className="text-muted-foreground">
              Implementamos medidas de segurança técnicas e organizacionais para proteger 
              suas informações pessoais contra acesso não autorizado, alteração, divulgação 
              ou destruição. Todas as transações financeiras são processadas através de 
              provedores seguros e certificados.
            </p>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('yourRights')}</h2>
            <p className="text-muted-foreground mb-4">
              De acordo com a LGPD e GDPR, você tem direito a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir dados incorretos ou incompletos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Portabilidade dos dados</li>
            </ul>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold mb-4">{t('contact')}</h2>
            <p className="text-muted-foreground">
              Para questões sobre privacidade ou para exercer seus direitos, entre em contato:
            </p>
            <p className="mt-2">
              <strong>E-mail:</strong> privacidade@movaa.com.br<br />
              <strong>Telefone:</strong> +55 (11) 9999-9999
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
