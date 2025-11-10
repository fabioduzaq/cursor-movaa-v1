'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

export function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('petitions'), href: `/${locale}/petitions` },
    { name: t('services'), href: `/${locale}/services` },
    { name: t('products'), href: `/${locale}/products` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-x-12">
          <Link href={`/${locale}`} className="flex items-center gap-x-2">
            <span className="text-2xl font-bold text-primary-600">MoVaa</span>
          </Link>
          <div className="hidden lg:flex lg:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-semibold leading-6 transition-colors hover:text-primary-600',
                  isActive(item.href) ? 'text-primary-600' : 'text-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-foreground hover:text-primary-600 transition-colors"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>
          <LanguageSelector />
          <button
            type="button"
            className="lg:hidden p-2 text-foreground hover:text-primary-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Alternar menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-foreground hover:bg-accent'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {searchOpen && (
        <div className="border-t px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar petições..."
              className="input w-full pl-10"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
