import { getTranslations } from 'next-intl/server';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="card p-8">
              <Mail className="h-12 w-12 text-primary-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Informações de Contato</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">E-mail</p>
                  <p>contato@movaa.com.br</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Telefone</p>
                  <p>+55 (11) 9999-9999</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Endereço</p>
                  <p>São Paulo, SP<br />Brasil</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-4">{t('form.title')}</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {t('form.name')}
                  </label>
                  <Input id="name" type="text" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('form.email')}
                  </label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    {t('form.subject')}
                  </label>
                  <Input id="subject" type="text" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t('form.message')}
                  </label>
                  <Textarea id="message" rows={5} required />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {t('form.submit')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
