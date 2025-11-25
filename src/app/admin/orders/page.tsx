import Link from 'next/link';
import { getOrdersPaginated } from '@/actions/admin/order-actions';
import { currencyFormat } from '@/utils';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const { orders, totalPages } = await getOrdersPaginated(page, 10);

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Gestión de Órdenes</h1>

      {/* Vista de tabla para desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Usuario
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Items
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fecha
              </th>
              <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => {
              const isPaid = order.isPaid ?? false;
              return (
                <tr key={order.id}>
                  <td className="px-4 lg:px-6 py-4 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                  <td className="px-4 lg:px-6 py-4">{order.user.name}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isPaid
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-1.5 ${isPaid ? 'bg-green-500' : 'bg-red-500'}`} />
                      {isPaid ? 'Pagada' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 font-bold">{currencyFormat(order.total)}</td>
                  <td className="px-4 lg:px-6 py-4">{order.itemsInOrder}</td>
                  <td className="px-4 lg:px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas para móvil */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => {
          const isPaid = order.isPaid ?? false;
          return (
            <div key={order.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</p>
                  <p className="font-medium">{order.user.name}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isPaid
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${isPaid ? 'bg-green-500' : 'bg-red-500'}`} />
                  {isPaid ? 'Pagada' : 'Pendiente'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-bold text-blue-600">{currencyFormat(order.total)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Items</p>
                  <p className="font-medium">{order.itemsInOrder}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Fecha</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <Link
                href={`/admin/orders/${order.id}`}
                className="block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ver Detalle
              </Link>
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/orders?page=${p}`}
              className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
                p === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
