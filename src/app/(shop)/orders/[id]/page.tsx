import { redirect } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@/auth';
import { Title } from '@/components';
import { currencyFormat } from '@/utils';
import { titleFont } from '@/config/fonts';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';
import { getOrderById } from '@/actions/admin/order-actions';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const order = await getOrderById(id);

  if (!order) {
    redirect('/orders');
  }

  // Verificar que la orden pertenezca al usuario (a menos que sea admin)
  if (order.userId !== session.user.id && session.user.role !== 'admin') {
    redirect('/orders');
  }

  const isPaid = order.isPaid ?? false;

  return (
    <div className="flex justify-center items-center mb-20 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col w-full max-w-6xl">
        <Title title={`Orden #${id.slice(0, 8)}`} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Productos */}
          <div className="flex flex-col mt-5">
            {/* Estado de pago */}
            <div
              className={clsx(
                'flex items-center rounded-lg py-3 px-4 text-xs font-bold text-white mb-6',
                {
                  'bg-red-600': !isPaid,
                  'bg-green-600': isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2 text-base sm:text-lg">
                {isPaid ? 'Orden Pagada' : 'Pendiente de Pago'}
              </span>
            </div>

            {/* Items */}
            {order.OrderItem.map((item) => (
              <div key={item.id} className="flex mb-4 p-3 border rounded-lg">
                <Image
                  src={`/products/${item.product.ProductImage[0]?.url || 'placeholder.jpg'}`}
                  width={100}
                  height={100}
                  style={{
                    width: '80px',
                    height: '100px',
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    Talla: {item.size} | Cantidad: {item.quantity}
                  </p>
                  <p className="text-sm">{currencyFormat(item.price)} c/u</p>
                  <p className="font-bold mt-2">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de la orden */}
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-7 h-fit sticky top-4">
            <h2 className={`text-2xl sm:text-3xl text-blue-900 font-bold ${titleFont.className} mb-4`}>
              Dirección de entrega
            </h2>
            
            {order.OrderAddress && (
              <div className="mb-6">
                <p className="font-medium">
                  {order.OrderAddress.firstName} {order.OrderAddress.lastName}
                </p>
                <p>{order.OrderAddress.address}</p>
                {order.OrderAddress.address2 && <p>{order.OrderAddress.address2}</p>}
                <p>
                  {order.OrderAddress.city}, CP {order.OrderAddress.postalCode}
                </p>
                <p>Tel: {order.OrderAddress.phone}</p>
              </div>
            )}

            {/* Línea divisoria */}
            <div className="w-full h-1 rounded bg-gray-200 mb-5" />

            {/* Resumen */}
            <div className="grid grid-cols-2 gap-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order.itemsInOrder} Artículo{order.itemsInOrder !== 1 ? 's' : ''}
              </span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>

              <span className="text-xl sm:text-2xl font-bold mt-5">Total:</span>
              <span className="text-xl sm:text-2xl font-bold mt-5 text-right">
                {currencyFormat(order.total)}
              </span>
            </div>

            {/* Estado de pago */}
            <div className="mt-7">
              <div
                className={clsx(
                  'flex items-center rounded-lg py-3 px-4 text-xs font-bold text-white',
                  {
                    'bg-red-600': !isPaid,
                    'bg-green-600': isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2 text-base sm:text-lg">
                  {isPaid ? 'Orden Pagada' : 'Pendiente de Pago'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
