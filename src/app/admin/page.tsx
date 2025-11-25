import Link from 'next/link';
import prisma from '@/lib/prisma';
import { IoStatsChartOutline, IoPeopleOutline, IoShirtOutline, IoReceiptOutline, IoCheckmarkCircleOutline, IoTimeOutline } from 'react-icons/io5';

async function getStats() {
  try {
    const [
      usersCount,
      productsCount,
      ordersCount,
      totalSales,
      paidOrders,
      paidSales,
      pendingOrders,
      pendingSales,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
      }),
      // Órdenes pagadas
      prisma.order.count({
        where: { isPaid: true },
      }),
      prisma.order.aggregate({
        where: { isPaid: true },
        _sum: { total: true },
      }),
      // Órdenes pendientes
      prisma.order.count({
        where: { isPaid: false },
      }),
      prisma.order.aggregate({
        where: { isPaid: false },
        _sum: { total: true },
      }),
    ]);

    return {
      usersCount,
      productsCount,
      ordersCount,
      totalSales: totalSales._sum.total || 0,
      paidOrders,
      paidSales: paidSales._sum.total || 0,
      pendingOrders,
      pendingSales: pendingSales._sum.total || 0,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      usersCount: 0,
      productsCount: 0,
      ordersCount: 0,
      totalSales: 0,
      paidOrders: 0,
      paidSales: 0,
      pendingOrders: 0,
      pendingSales: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const generalCards = [
    {
      title: 'Total Usuarios',
      value: stats.usersCount,
      icon: IoPeopleOutline,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Productos',
      value: stats.productsCount,
      icon: IoShirtOutline,
      color: 'bg-green-500',
    },
    {
      title: 'Total Órdenes',
      value: stats.ordersCount,
      icon: IoReceiptOutline,
      color: 'bg-purple-500',
    },
    {
      title: 'Ventas Totales',
      value: `$${stats.totalSales.toFixed(2)}`,
      icon: IoStatsChartOutline,
      color: 'bg-orange-500',
    },
  ];

  const paidCards = [
    {
      title: 'Órdenes Pagadas',
      value: stats.paidOrders,
      icon: IoCheckmarkCircleOutline,
      color: 'bg-green-500',
    },
    {
      title: 'Ventas Pagadas',
      value: `$${stats.paidSales.toFixed(2)}`,
      icon: IoStatsChartOutline,
      color: 'bg-green-600',
    },
  ];

  const pendingCards = [
    {
      title: 'Órdenes Pendientes',
      value: stats.pendingOrders,
      icon: IoTimeOutline,
      color: 'bg-red-500',
    },
    {
      title: 'Ventas Pendientes',
      value: `$${stats.pendingSales.toFixed(2)}`,
      icon: IoStatsChartOutline,
      color: 'bg-red-600',
    },
  ];

  return (
    <div className="px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Dashboard</h1>

      {/* Estadísticas Generales */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">Estadísticas Generales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {generalCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`${card.color} p-2 sm:p-3 rounded-lg`}>
                    <Icon className="text-white" size={20} />
                  </div>
                </div>
                <h3 className="text-gray-500 text-xs sm:text-sm mb-1">{card.title}</h3>
                <p className="text-xl sm:text-2xl font-bold">{card.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Órdenes Pagadas */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
          <IoCheckmarkCircleOutline size={24} />
          Pagadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {paidCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`${card.color} p-2 sm:p-3 rounded-lg`}>
                    <Icon className="text-white" size={20} />
                  </div>
                </div>
                <h3 className="text-gray-500 text-xs sm:text-sm mb-1">{card.title}</h3>
                <p className="text-xl sm:text-2xl font-bold text-green-700">{card.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Órdenes Pendientes */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
          <IoTimeOutline size={24} />
          Pendientes de Pago
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {pendingCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`${card.color} p-2 sm:p-3 rounded-lg`}>
                    <Icon className="text-white" size={20} />
                  </div>
                </div>
                <h3 className="text-gray-500 text-xs sm:text-sm mb-1">{card.title}</h3>
                <p className="text-xl sm:text-2xl font-bold text-red-700">{card.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Link
            href="/admin/products/new"
            className="btn-primary text-center py-3"
          >
            + Nuevo Producto
          </Link>
          <Link
            href="/admin/categories"
            className="btn-primary text-center py-3"
          >
            Gestionar Categorías
          </Link>
          <Link
            href="/admin/orders"
            className="btn-primary text-center py-3"
          >
            Ver Órdenes
          </Link>
        </div>
      </div>
    </div>
  );
}
