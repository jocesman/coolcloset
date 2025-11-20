import Link from 'next/link'

import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import { titleFont } from '@/config/fonts'
import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]

interface Props {
  params: {
    id: string
  }
}

export default async function ({ params }: Props) {
  const { id } = await params

  //Aqui va la verificación de id
  //si el id no corresponde a usuario logueado => "/"

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden No. ${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                'flex items-center rounded-lg py-3 px-3.5 text-xs font-bold text-white mb-6',
                {
                  'bg-red-600 ': false,
                  'bg-green-600 ': true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2 text-lg">Pendiente de Pago</span>
              <span className="mx-2 text-lg">Orden Pagada</span>
            </div>

            {/* Items */}
            {productsInCart.map(product => (
              <div key={product.slug} className="flex mb-3 p-2">
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
            <h2 className="text-2xl text-blue-900 font-bold">Dirección de entrega:</h2>
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
              <div
                className={clsx(
                  'flex items-center rounded-lg py-3 px-3.5 text-xs font-bold text-white mb-6',
                  {
                    'bg-red-600 ': false,
                    'bg-green-600 ': true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2 text-lg">Pendiente de Pago</span>
                <span className="mx-2 text-lg">Orden Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
