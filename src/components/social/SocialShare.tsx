'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, MessageCircle, Link as LinkIcon, Check } from 'lucide-react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { getShareUrl, copyToClipboard } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const t = useTranslations('social');
  const [linkCopied, setLinkCopied] = useState(false);
  const shareUrl = getShareUrl(url);
  const shareTitle = title;
  const shareDescription = description || '';

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FacebookShareButton url={shareUrl} quote={shareTitle}>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Facebook className="h-4 w-4" />
          <span className="hidden sm:inline">{t('facebook')}</span>
        </Button>
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={shareTitle}>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Twitter className="h-4 w-4" />
          <span className="hidden sm:inline">{t('twitter')}</span>
        </Button>
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={shareTitle}>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">{t('whatsapp')}</span>
        </Button>
      </WhatsappShareButton>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="flex items-center gap-2"
      >
        {linkCopied ? (
          <>
            <Check className="h-4 w-4" />
            <span>{t('linkCopied')}</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t('copyLink')}</span>
          </>
        )}
      </Button>
    </div>
  );
}
