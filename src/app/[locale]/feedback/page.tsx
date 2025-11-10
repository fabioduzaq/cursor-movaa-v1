import { getTranslations } from 'next-intl/server';
import { MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export default async function FeedbackPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('feedback');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <MessageSquare className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">{t('form.title')}</h2>
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
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                {t('form.type')}
              </label>
              <select id="type" className="input" required>
                <option value="">Selecione um tipo</option>
                <option value="suggestion">Sugestão</option>
                <option value="bug">Reportar Bug</option>
                <option value="compliment">Elogio</option>
                <option value="complaint">Reclamação</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                {t('form.message')}
              </label>
              <Textarea id="message" rows={6} required />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              <Star className="h-4 w-4 mr-2" />
              {t('form.submit')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
