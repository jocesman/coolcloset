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
    return <p>Cargando...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className="flex mb-3 p-2 border border-green-400 hover:border-amber-400 hover:border-2"
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
            className="mr-5 rounded"
          />
          <div>
            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
              {product.title}
            </Link>
            <p>${product.price}</p>
            <p className="text-sm text-gray-500">Talla: {product.size}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            />
            <button onClick={() => removeProduct(product)} className="underline mt-3">
              Eliminar este Artículo
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
