import { Title } from '@/components';
import Link from 'next/link';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

export default function CartPage() {
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
              <Link href="/checkout/address" className="flex btn-primary justify-center">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
