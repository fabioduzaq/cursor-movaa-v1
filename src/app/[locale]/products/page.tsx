import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const mockProducts = [
  {
    id: '1',
    name: 'Kit de Mobilização Social',
    description: 'Ferramentas completas para organizações',
    price: 299.90,
    image: '/images/product-1.jpg',
  },
  {
    id: '2',
    name: 'Plataforma White Label',
    description: 'Sua própria plataforma de petições',
    price: 999.90,
    image: '/images/product-2.jpg',
  },
  {
    id: '3',
    name: 'Consultoria em Campanhas',
    description: 'Acompanhamento especializado para sua causa',
    price: 1499.90,
    image: '/images/product-3.jpg',
  },
];

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('products');

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <div key={product.id} className="card overflow-hidden">
              <div className="relative h-48 w-full bg-muted">
                <ShoppingBag className="h-24 w-24 text-muted-foreground/20 absolute inset-0 m-auto" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Button variant="primary">{t('buyNow')}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
