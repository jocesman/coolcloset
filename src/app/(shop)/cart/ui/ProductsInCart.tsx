'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p className="text-center py-4">Cargando...</p>;
  }

  if (productsInCart.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
        <Link href="/" className="btn-primary inline-block">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className="flex flex-col sm:flex-row mb-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
        >
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: '80px',
              height: '100px',
            }}
            alt={product.title}
            className="rounded mb-3 sm:mb-0 sm:mr-5 self-center sm:self-start"
          />
          <div className="flex-1">
            <Link 
              href={`/product/${product.slug}`} 
              className="hover:underline cursor-pointer font-medium text-sm sm:text-base"
            >
              {product.title}
            </Link>
            <p className="text-lg font-bold mt-1">${product.price}</p>
            <p className="text-sm text-gray-500">Talla: {product.size}</p>
            
            <div className="mt-3">
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
              />
            </div>
            
            <button 
              onClick={() => removeProduct(product)} 
              className="text-red-600 hover:text-red-800 underline mt-3 text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
