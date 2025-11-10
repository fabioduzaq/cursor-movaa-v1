import { getTranslations } from 'next-intl/server';
import { HelpCircle, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const faqs = [
  {
    question: 'Como posso criar uma petição?',
    answer: 'Para criar uma petição, você precisa fazer login na plataforma e clicar no botão "Criar Petição". Preencha todas as informações necessárias e publique sua causa.',
  },
  {
    question: 'As petições são gratuitas?',
    answer: 'Sim, criar e assinar petições é completamente gratuito. Apenas as doações são opcionais e têm custos de processamento.',
  },
  {
    question: 'Como funciona o sistema de doações?',
    answer: 'Você pode fazer doações através de PIX, boleto, cartão de crédito, PayPal ou Stripe. Todas as transações são seguras e processadas por parceiros confiáveis.',
  },
  {
    question: 'Posso assinar petições anonimamente?',
    answer: 'Sim, ao assinar uma petição você pode optar por manter sua assinatura anônima. Seu nome não será exibido publicamente.',
  },
  {
    question: 'Como posso compartilhar uma petição?',
    answer: 'Cada petição possui botões de compartilhamento para Facebook, Twitter, WhatsApp e também permite copiar o link diretamente.',
  },
];

export default async function HelpPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('help');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary-600" />
            {t('faq')}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8">
          <div className="flex items-start gap-4 mb-6">
            <MessageCircle className="h-8 w-8 text-primary-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('contactSupport')}</h2>
              <p className="text-muted-foreground">
                Não encontrou a resposta que procurava? Entre em contato conosco!
              </p>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nome
              </label>
              <Input id="name" type="text" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-mail
              </label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Assunto
              </label>
              <Input id="subject" type="text" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Mensagem
              </label>
              <Textarea id="message" rows={5} required />
            </div>
            <Button type="submit" variant="primary">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
