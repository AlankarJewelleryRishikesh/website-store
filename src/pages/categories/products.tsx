'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/products/ProductCard'; // Adjust path if needed
import ProductCardSkeleton from '@/components/products/skelton/ProductCardSkeleton';

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

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
}

export default function CategoryProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCategory = sessionStorage.getItem('selectedCategory');
    if (storedCategory) {
      const parsed = JSON.parse(storedCategory) as Category;
      setCategory(parsed);

      fetch(`/api/products?categoryId=${parsed.id}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error('Failed to fetch products', err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F7] py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1D3934] mb-4">
          {category ? `Products in ${category.name}` : 'Category not found'}
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {[...Array(6)].map((_, idx) => (
                      <ProductCardSkeleton key={idx} />
                    ))}
                  </div>
        ) : !category ? (
          <p className="text-gray-500">No category selected.</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found for this category.</p>
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
    </div>
  );
}
