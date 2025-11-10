'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/lib/i18n/config';
import { Button } from './Button';

export function LanguageSelector() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        aria-label="Selecionar idioma"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
      </Button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-background border rounded-md shadow-lg z-50">
            <div className="py-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    handleLocaleChange(loc);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors ${
                    loc === locale ? 'bg-accent font-semibold' : ''
                  }`}
                >
                  {localeNames[loc]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
