'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { searchProducts } from '@/actions/products/search-products';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 0) {
        setIsSearching(true);
        const products = await searchProducts(query);
        setResults(products);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Barra de búsqueda */}
        <div className="mb-8">
          <div className="relative">
            <IoSearchOutline
              size={24}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <IoCloseOutline size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Estado de carga */}
        {isSearching && (
          <div className="text-center py-8">
            <p className="text-gray-500">Buscando...</p>
          </div>
        )}

        {/* Resultados */}
        {!isSearching && query && results.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron productos para "{query}"</p>
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              {results.length} resultado{results.length !== 1 ? 's' : ''} para "{query}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4"
                >
                  <div className="aspect-square relative mb-3 bg-gray-100 rounded">
                    <Image
                      src={`/products/${product.ProductImage[0]?.url || 'placeholder.jpg'}`}
                      alt={product.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-lg font-bold text-blue-600">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mensaje inicial */}
        {!query && (
          <div className="text-center py-12">
            <IoSearchOutline size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Escribe para buscar productos</p>
          </div>
        )}
      </div>
    </div>
  );
}
