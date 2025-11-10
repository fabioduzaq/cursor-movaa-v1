'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { validateEmail } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const signPetitionSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  anonymous: z.boolean().default(false),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'Você deve concordar com os termos',
  }),
});

type SignPetitionForm = z.infer<typeof signPetitionSchema>;

interface SignPetitionFormProps {
  petitionId: string;
  onSuccess?: () => void;
}

export function SignPetitionForm({ petitionId, onSuccess }: SignPetitionFormProps) {
  const t = useTranslations('petitions.signForm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignPetitionForm>({
    resolver: zodResolver(signPetitionSchema),
    defaultValues: {
      anonymous: false,
      agreeToTerms: false,
    },
  });

  const anonymous = watch('anonymous');
  const agreeToTerms = watch('agreeToTerms');

  const onSubmit = async (data: SignPetitionForm) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Implementar chamada à API
      const response = await fetch('/api/petitions/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petitionId,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao assinar petição');
      }

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implementar OAuth com Google
    console.log('Google sign in');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-1">
          {t('fullName')}
        </label>
        <Input
          id="fullName"
          {...register('fullName')}
          placeholder={t('fullNamePlaceholder')}
          disabled={isSubmitting}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t('email')}
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder={t('emailPlaceholder')}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
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
          {t('anonymous')}
        </label>
      </div>
      {anonymous && (
        <p className="text-xs text-muted-foreground">{t('anonymousDescription')}</p>
      )}

      <div className="border-t pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full mb-4"
          onClick={handleGoogleSignIn}
        >
          {t('googleSignIn')}
        </Button>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="agreeToTerms"
          checked={agreeToTerms}
          onChange={(e) => setValue('agreeToTerms', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-0.5"
        />
        <label htmlFor="agreeToTerms" className="text-sm">
          {t('terms')}{' '}
          <a href="/terms" className="text-primary-600 hover:underline">
            {t('termsLink')}
          </a>{' '}
          e{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">
            {t('privacyLink')}
          </a>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>
      )}

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
        disabled={!agreeToTerms}
      >
        {isSubmitting ? t('validating') : t('submit')}
      </Button>
    </form>
  );
}
