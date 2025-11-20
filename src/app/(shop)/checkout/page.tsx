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
        <Title title="Verificar Orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar Elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar Carrito
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
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3} </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de la Orden de Compra*/}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className={`text-3xl font-bold text-blue-800 mb-5 ${titleFont.className}`}>
              Resumen del Pedido
            </h2>
            <div className="w-full h-1 rounded bg-gray-200 mb-2" />

            <h2 className="text-xl font-bold">Dirección de entrega:</h2>
            <div className="mb-2">
              <p>Av.Jimenez # 25-58</p>
              <p>Colonia Colón</p>
              <p>San Francisco de Santander</p>
              <p>CP 25698</p>
              <p>Tel: 98569854789</p>
            </div>
            {/* Linea divisoria */}
            <div className="w-full h-1 rounded bg-gray-200 mb-5" />
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
              <Link href="/orders/1234" className="flex btn-primary justify-center">
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
