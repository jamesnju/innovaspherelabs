// src/app/(marketing)/products/[slug]/page.tsx

import { ProductDetails } from '@/src/app/components/common/marketing/Products/ProductDetails';
import { RelatedProducts } from '@/src/app/components/common/marketing/Products/RelatedProducts';
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/src/app/services/products';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>; // Changed to Promise
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await the params Promise
  const { slug } = await params;
  
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

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
  // Await the params Promise
  const { slug } = await params;
  
  const product = await getProductBySlug(slug);
  
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
