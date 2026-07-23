// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  slug: string;
  category: string;
  image?: string;
  price?: string;
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: string;
  image?: string;
}