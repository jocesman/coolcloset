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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orden #{order.id.slice(0, 8)}</h1>
        <Link href="/admin/orders" className="text-blue-600 hover:text-blue-800">
          ← Volver a órdenes
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información del cliente */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Información del Cliente</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Nombre:</span> {order.user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.user.email}
            </p>
          </div>
        </div>

        {/* Dirección de envío */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Dirección de Envío</h2>
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

        {/* Productos */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Productos</h2>
          <div className="space-y-4">
            {order.OrderItem.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
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
                  <p className="font-bold mt-2">
                    {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Resumen</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{currencyFormat(order.subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos:</span>
              <span>{currencyFormat(order.tax)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>{currencyFormat(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
