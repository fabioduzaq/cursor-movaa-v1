'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Heart, TrendingUp, Clock, User } from 'lucide-react';
import { Petition } from '@/types';
import { formatNumber, calculateProgress, truncateText, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface PetitionCardProps {
  petition: Petition;
}

export function PetitionCard({ petition }: PetitionCardProps) {
  const t = useTranslations('petitions');
  const locale = useLocale();

  const progress = calculateProgress(petition.signatureCount, petition.goal);

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      {petition.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={petition.imageUrl}
            alt={petition.title}
            fill
            className="object-cover"
          />
          {petition.featured && (
            <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {t('featured')}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-primary-600 uppercase">
            {petition.category}
          </span>
          {petition.trending && (
            <TrendingUp className="h-4 w-4 text-secondary-600" />
          )}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          {petition.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {truncateText(petition.description, 150)}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{petition.creator.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDate(petition.createdAt, locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'es-ES')}</span>
          </div>
        </div>
        {petition.goal && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">{t('progress')}</span>
              <span className="text-muted-foreground">
                {formatNumber(petition.signatureCount)} / {formatNumber(petition.goal)}
              </span>
            </div>
            <ProgressBar value={progress} />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary-600" />
            <span className="font-semibold text-foreground">
              {formatNumber(petition.signatureCount)} {t('signatures')}
            </span>
          </div>
          <Link href={`/petitions/${petition.id}`}>
            <Button variant="primary" size="sm">
              {t('sign')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
