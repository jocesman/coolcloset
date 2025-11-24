'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { placeOrder } from '@/actions/order/place-order';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { cart, clearCart } = useCartStore((state) => state);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size as any, // TODO: Fix type
    }));

    // Server Action
    const resp = await placeOrder(productsToOrder, address);
    
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    // Todo salio bien!
    clearCart();
    router.replace('/orders/' + resp.order?.id);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      {/* Carrito */}
      <div className="flex flex-col mt-5">
        <span className="text-xl">Ajustar Elementos</span>
        <Link href="/cart" className="underline mb-5">
          Editar Carrito
        </Link>

        {/* Items */}
        {cart.map((product) => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-3 p-2">
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
              <p>
                {product.title} - {product.size} ({product.quantity})
              </p>
              <p className="font-bold">
                {currencyFormat(product.price * product.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout - Resumen de la Orden de Compra*/}
      <div className="bg-white rounded-xl shadow-xl p-7">
        <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
        <div className="mb-10">
          <p className="text-xl">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.address}</p>
          <p>{address.address2}</p>
          <p>{address.postalCode}</p>
          <p>
            {address.city}, {address.country}
          </p>
          <p>{address.phone}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

        <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

        {/* Order Summary */}
        <OrderSummary />

        <div className="mt-5 mb-2 w-full">
          <p className="mb-5">
            {/* Disclaimer */}
            <span className="text-xs">
              Al hacer click en "Colocar Orden", aceptas nuestros{' '}
              <a href="#" className="underline">
                términos y condiciones
              </a>{' '}
              y{' '}
              <a href="#" className="underline">
                políticas de privacidad
              </a>
            </span>
          </p>

          <p className="text-red-500">{errorMessage}</p>

          <button
            onClick={onPlaceOrder}
            className={clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder,
            })}
          >
            Colocar Orden
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = () => {
  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

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

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
