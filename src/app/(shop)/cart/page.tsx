import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Link from 'next/link'
import Image from 'next/image'
import { titleFont } from '@/config/fonts'

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]

export default function () {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {/* Items */}
            {productsInCart.map(product => (
              <div
                key={product.slug}
                className="flex mb-3 p-2 border border-green-400 hover:border-amber-400 hover:border-2"
              >
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={1} />
                  <button className="underline mt-3">Eliminar este Artículo</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de la Orden de Compra*/}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className={`text-xl mb-2 ${titleFont.className}`}>Resumen del Pedido</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 Artículos</span>
              <span>SubTotal</span>
              <span className="text-right">$ 100</span>
              <span>Impuestos (16 %)</span>
              <span className="text-right">$ 16</span>
              <span className="text-2xl text-bold mt-5">Total: </span>
              <span className="text-2xl text-bold mt-5 text-right">$ 116</span>
            </div>
            <div className="mt-7 mb-2 w-full">
              <Link href="/checkout/address" className="flex btn-primary justify-center">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
