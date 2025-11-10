'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const donationSchema = z.object({
  amount: z.number().min(1, 'Valor mínimo é R$ 1,00'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  anonymous: z.boolean().default(false),
  message: z.string().optional(),
  paymentMethod: z.enum(['pix', 'boleto', 'creditCard', 'paypal', 'stripe']),
});

type DonationForm = z.infer<typeof donationSchema>;

interface DonationFormProps {
  petitionId?: string;
  onSuccess?: () => void;
}

export function DonationForm({ petitionId, onSuccess }: DonationFormProps) {
  const t = useTranslations('donations');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      anonymous: false,
      paymentMethod: 'pix',
    },
  });

  const paymentMethod = watch('paymentMethod');
  const anonymous = watch('anonymous');

  const onSubmit = async (data: DonationForm) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Implementar chamada à API de pagamento
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petitionId,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar doação');
      }

      const result = await response.json();
      // Redirecionar para página de pagamento ou agradecimento
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          {t('form.amount')}
        </label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="1"
          {...register('amount', { valueAsNumber: true })}
          placeholder="0.00"
          disabled={isSubmitting}
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {t('form.name')}
        </label>
        <Input
          id="name"
          {...register('name')}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t('form.email')}
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">
          {t('method')}
        </label>
        <select
          id="paymentMethod"
          {...register('paymentMethod')}
          className="input"
          disabled={isSubmitting}
        >
          <option value="pix">{t('methods.pix')}</option>
          <option value="boleto">{t('methods.boleto')}</option>
          <option value="creditCard">{t('methods.creditCard')}</option>
          <option value="paypal">{t('methods.paypal')}</option>
          <option value="stripe">{t('methods.stripe')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {t('form.message')}
        </label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder={t('form.messagePlaceholder')}
          disabled={isSubmitting}
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="anonymous"
          checked={anonymous}
          onChange={(e) => setValue('anonymous', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="anonymous" className="text-sm">
          {t('form.anonymous')}
        </label>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        isLoading={isSubmitting}
      >
        {isSubmitting ? t('form.processing') : t('form.submit')}
      </Button>
    </form>
  );
}
