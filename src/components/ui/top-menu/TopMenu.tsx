'use client';

import { logout } from '@/actions/auth/logout';
import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

interface Props {
  isAuthenticated: boolean;
  userName?: string;
}

export const TopMenu = ({ isAuthenticated, userName }: Props) => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex p-5 justify-between items-center w-full">
      {/* logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            CoolCloset
          </span>
          <span className="m-2">| Shop </span>
        </Link>
      </div>
      {/* Opciones del Menú */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/kid"
        >
          Niños
        </Link>
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-3">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link
          href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        {/* User Menu */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="text-sm hidden sm:block">Hola, {userName}</span>
            <button
              onClick={handleLogout}
              className="text-sm underline hover:text-blue-600"
            >
              Salir
            </button>
          </div>
        ) : (
          <Link href="/auth/login" className="text-sm underline hover:text-blue-600">
            Ingresar
          </Link>
        )}

        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
