'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const footerNavigation = {
    about: [
      { name: t('navigation.about'), href: `/${locale}/about` },
      { name: t('navigation.careers'), href: `/${locale}/careers` },
      { name: t('navigation.press'), href: `/${locale}/press` },
      { name: t('navigation.help'), href: `/${locale}/help` },
    ],
    legal: [
      { name: t('navigation.privacy'), href: `/${locale}/privacy` },
      { name: t('navigation.terms'), href: `/${locale}/terms` },
      { name: t('navigation.feedback'), href: `/${locale}/feedback` },
    ],
    social: [
      { name: 'Facebook', icon: Facebook, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
    ],
  };

  return (
    <footer className="bg-muted border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">MoVaa</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('common.tagline')}
            </p>
            <div className="flex gap-4">
              {footerNavigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary-600 transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2">
              {footerNavigation.about.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('footer.newsletter')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receba atualizações sobre nossas causas
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full"
              />
              <Button type="submit" className="w-full">
                {t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} MoVaa. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
