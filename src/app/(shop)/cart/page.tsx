'use client';

import { useEffect, useState } from 'react';
import { Title } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';
import { useCartStore } from '@/store';

export default function CartPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Redirigir a /empty si el carrito está vacío después de cargar
  useEffect(() => {
    if (loaded && cart.length === 0) {
      router.push('/empty');
    }
  }, [loaded, cart.length, router]);

  if (!loaded) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>Cargando carrito...</p>
      </div>
    );
  }

  const isCartEmpty = cart.length === 0;

  return (
    <div className="flex justify-center items-center mb-20 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col w-full max-w-7xl">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-lg sm:text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5 text-sm sm:text-base">
              Continúa comprando
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout - Resumen de la Orden de Compra*/}
          <div className="bg-white rounded-xl shadow-xl p-4 sm:p-7 h-fit sticky top-4">
            <h2 className="text-xl sm:text-2xl mb-2 font-semibold">Resumen del Pedido</h2>

            <OrderSummary />

            <div className="mt-5 sm:mt-7 mb-2 w-full">
              {isCartEmpty ? (
                <button
                  disabled
                  className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-gray-400 cursor-not-allowed"
                >
                  Carrito vacío
                </button>
              ) : (
                <Link href="/checkout/address" className="flex btn-primary justify-center">
                  Checkout
                </Link>
              )}
            </div>

            {isCartEmpty && (
              <p className="text-sm text-gray-500 text-center mt-2">
                Agrega productos para continuar
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
