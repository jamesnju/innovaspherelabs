// src/app/(marketing)/products/page.tsx
import { Metadata } from 'next';
import { getAllProducts } from '../../services/products';
import { ProductGrid } from '../../components/common/marketing/Products/ProductGrid';

export const metadata: Metadata = {
  title: 'Our Products - Business Management Solutions',
  description: 'Explore our suite of business management products including POS, E-commerce, and Inventory solutions.',
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container-custom section-spacing">
      <div className="text-center mb-12">
        <h1 className="section-title mb-4">
          Our <span className="gradient-text">Products</span>
        </h1>
        <p className="section-subtitle">
          Choose the right solution for your business needs
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}