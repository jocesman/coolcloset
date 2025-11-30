'use client';

import { logout } from '@/actions/auth/logout';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

interface Props {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const Sidemenu = ({ isAuthenticated, isAdmin }: Props) => {
  const isSideOpenMenu = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  
  // Estado para controlar la hidratación y evitar bloqueos iniciales
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Efecto para asegurar que el menú esté cerrado al cargar la página
  useEffect(() => {
    closeMenu();
  }, [closeMenu]);

  if (!loaded) {
    return null; // O retornar solo el nav oculto si es necesario para SEO, pero para un menú lateral está bien esperar
  }

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  return (
    <div>
      {/* Background */}
      {/* Background */}
      {isSideOpenMenu && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-gray-400 opacity-10" />
      )}

      {/* blur */}
      {isSideOpenMenu && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-80 sm:w-[400px] h-screen bg-blue-100 z-20 shadow-2xl transform transition-all duration-75 ',
          {
            'translate-x-full': !isSideOpenMenu,
          }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-0 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/* Input de búsqueda */}
        <div className="relative mt-14">
          <IoSearchOutline size={30} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200
                       focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const query = e.currentTarget.value;
                if (query.trim()) {
                  closeMenu();
                  window.location.href = `/search?q=${encodeURIComponent(query)}`;
                }
              }
            }}
          />
        </div>

        {/* Menú Usuario Autenticado */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href="/orders"
              onClick={closeMenu}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Órdenes</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all w-full"
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          </>
        )}

        {/* Menú Usuario No Autenticado */}
        {!isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={closeMenu}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {/* Línea de Separación */}
        {isAdmin && <div className="w-full h-px bg-blue-400 my-10" />}

        {/* Link destacado al Panel Admin */}
        {isAdmin && (
          <Link
            href="/admin"
            onClick={closeMenu}
            className="flex items-center p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg mb-4"
          >
            <IoShirtOutline size={30} />
            <div className="ml-3">
              <p className="text-lg font-bold">Panel de Administración</p>
              <p className="text-xs opacity-90">Gestionar tienda</p>
            </div>
          </Link>
        )}

        {/* Menú Admin */}
        {isAdmin && (
          <>
            <Link
              href="/admin/products"
              onClick={closeMenu}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href="/admin/orders"
              onClick={closeMenu}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Órdenes</span>
            </Link>

            <Link
              href="/admin/users"
              onClick={closeMenu}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
