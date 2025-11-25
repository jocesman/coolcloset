import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/auth';
import { getUserOrders } from '@/actions/order/get-user-orders';
import { currencyFormat } from '@/utils';
import { Title } from '@/components';

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const { ok, orders } = await getUserOrders();

  if (!ok) {
    redirect('/');
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-6xl mx-auto">
        <Title title="Mis Órdenes" />

        {orders && orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No tienes órdenes aún</p>
            <Link href="/" className="btn-primary inline-block">
              Ir a comprar
            </Link>
          </div>
        )}

        {orders && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Orden #{order.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {currencyFormat(order.total)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.itemsInOrder} artículo{order.itemsInOrder !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Productos */}
                <div className="border-t pt-4 mb-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {order.OrderItem.slice(0, 4).map((item) => (
                      <div key={item.id} className="text-center">
                        <div className="aspect-square bg-gray-100 rounded mb-2 relative overflow-hidden">
                          <img
                            src={`/products/${item.product.ProductImage[0]?.url || 'placeholder.jpg'}`}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} x {item.size}
                        </p>
                      </div>
                    ))}
                    {order.OrderItem.length > 4 && (
                      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">
                          +{order.OrderItem.length - 4} más
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dirección */}
                {order.OrderAddress && (
                  <div className="border-t pt-4 mb-4">
                    <h4 className="font-medium mb-2 text-sm">Dirección de envío:</h4>
                    <p className="text-sm text-gray-600">
                      {order.OrderAddress.firstName} {order.OrderAddress.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.OrderAddress.address}
                      {order.OrderAddress.address2 && `, ${order.OrderAddress.address2}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.OrderAddress.city}, {order.OrderAddress.postalCode}
                    </p>
                  </div>
                )}

                <Link
                  href={`/orders/${order.id}`}
                  className="btn-primary w-full sm:w-auto text-center inline-block"
                >
                  Ver detalles
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
