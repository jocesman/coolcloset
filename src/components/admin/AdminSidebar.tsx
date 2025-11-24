'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  IoShirtOutline,
  IoPeopleOutline,
  IoReceiptOutline,
  IoGridOutline,
  IoStatsChartOutline,
} from 'react-icons/io5';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: IoStatsChartOutline,
  },
  {
    title: 'Productos',
    path: '/admin/products',
    icon: IoShirtOutline,
  },
  {
    title: 'Categorías',
    path: '/admin/categories',
    icon: IoGridOutline,
  },
  {
    title: 'Usuarios',
    path: '/admin/users',
    icon: IoPeopleOutline,
  },
  {
    title: 'Órdenes',
    path: '/admin/orders',
    icon: IoReceiptOutline,
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <p className="text-sm text-gray-400">CoolCloset</p>
      </div>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');

          return (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors',
                {
                  'bg-blue-600 text-white': isActive,
                  'hover:bg-gray-700': !isActive,
                }
              )}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span>← Volver a la tienda</span>
        </Link>
      </div>
    </aside>
  );
};
