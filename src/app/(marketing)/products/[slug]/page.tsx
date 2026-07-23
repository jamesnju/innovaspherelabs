// src/app/(marketing)/products/[slug]/page.tsx

import { ProductDetails } from '@/src/app/components/common/marketing/Products/ProductDetails';
import { RelatedProducts } from '@/src/app/components/common/marketing/Products/RelatedProducts';
import { getProductBySlug, getRelatedProducts } from '@/src/app/services/products';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  // Handle undefined image
  const images = product.image ? [product.image] : [];

  return {
    title: `${product.name} - Business Management Solution`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: images.length > 0 ? images : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category);

  return (
    <div className="container-custom section-spacing">
      <ProductDetails product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}