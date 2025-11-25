import { getOrderById } from '@/actions/admin/order-actions';
import { currencyFormat } from '@/utils';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  const isPaid = order.isPaid ?? false;

  return (
    <div className="px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Orden #{order.id.slice(0, 8)}</h1>
          {/* Badge de estado */}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
              isPaid
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full mr-2 ${isPaid ? 'bg-green-500' : 'bg-red-500'}`} />
            {isPaid ? 'Pagada' : 'Pendiente de pago'}
          </span>
        </div>
        <Link href="/admin/orders" className="text-blue-600 hover:text-blue-800">
          ← Volver a órdenes
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Información del cliente */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Información del Cliente</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Nombre:</span> {order.user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.user.email}
            </p>
            <p>
              <span className="font-medium">Fecha:</span>{' '}
              {new Date(order.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Dirección de envío */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Dirección de Envío</h2>
          {order.OrderAddress && (
            <div className="space-y-1">
              <p>
                {order.OrderAddress.firstName} {order.OrderAddress.lastName}
              </p>
              <p>{order.OrderAddress.address}</p>
              {order.OrderAddress.address2 && <p>{order.OrderAddress.address2}</p>}
              <p>
                {order.OrderAddress.city}, {order.OrderAddress.postalCode}
              </p>
              <p>{order.OrderAddress.phone}</p>
            </div>
          )}
        </div>

        {/* Estado de pago */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Estado de Pago</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Estado:</span>{' '}
              <span className={isPaid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {isPaid ? 'Pagada' : 'Pendiente'}
              </span>
            </p>
            {isPaid && order.paidAt && (
              <p>
                <span className="font-medium">Pagada el:</span>{' '}
                {new Date(order.paidAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
            {order.transactionId && (
              <p className="text-sm">
                <span className="font-medium">ID Transacción:</span>{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">{order.transactionId}</code>
              </p>
            )}
          </div>
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Resumen</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>{order.itemsInOrder}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{currencyFormat(order.subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos (15%):</span>
              <span>{currencyFormat(order.tax)}</span>
            </div>
            <div className="flex justify-between text-lg sm:text-xl font-bold border-t pt-2">
              <span>Total:</span>
              <span className="text-blue-600">{currencyFormat(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 lg:col-span-2">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Productos</h2>
          <div className="space-y-4">
            {order.OrderItem.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                <Image
                  src={`/products/${item.product.ProductImage[0]?.url || 'placeholder.jpg'}`}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.title}</h3>
                  <p className="text-sm text-gray-600">
                    Talla: {item.size} | Cantidad: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currencyFormat(item.price)} c/u
                  </p>
                  <p className="font-bold mt-2">
                    {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
