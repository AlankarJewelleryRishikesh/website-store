'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard'; // Update if needed

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  price?: number;
  weight?: string;
  category: {
    name: string;
  };
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = categoryId
          ? `/api/products?categoryId=${encodeURIComponent(categoryId)}`
          : '/api/products';

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-[#FFF9F7] py-10 px-6">
      <h1 className="text-2xl font-bold text-[#1D3934] mb-6">
        {categoryId ? `Products in Category: ${categoryId}` : 'All Products'}
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageUrl}
              description={product.description}
              weight={product.weight || ''}
              originalPrice={product.price}
              category={product.category?.name || 'Product'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
