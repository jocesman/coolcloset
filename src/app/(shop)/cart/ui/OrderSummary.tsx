'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
  const cart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const { subTotal, tax, total, itemsInCart } = useMemo(() => {
    const subTotal = cart.reduce(
      (total, product) => product.quantity * product.price + total,
      0
    );
    const tax = subTotal * 0.15;
    const total = subTotal + tax;
    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return { subTotal, tax, total, itemsInCart };
  }, [cart]);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="text-2xl mt-5 text-right">
        {currencyFormat(total)}
      </span>
    </div>
  );
};
