'use client';

import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

export const Sidemenu = () => {

  const isSideOpenMenu = useUIStore( state => state.isSideMenuOpen );
  const closeMenu = useUIStore( state => state.closeSideMenu );

  return (
    <div>

      {/* Background Green*/ }
      {
        isSideOpenMenu && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-gray-400 opacity-10"
          />
        )
      }

      { /* blur */ }
      {isSideOpenMenu && (
        <div 
          onClick={ closeMenu }
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
        )
      }

      { /* Sidemenu */ }
      <nav 
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-80 sm:w-[400px] h-screen bg-blue-100 z-20 shadow-2xl transform transition-all duration-75 ",
            {
              "translate-x-full": !isSideOpenMenu
            }
          )
        }>
        
        <IoCloseOutline 
          size={ 30 }
          className="absolute top-5 right-0 cursor-pointer"
          onClick={() => closeMenu()}
        />
        
        {/* Input */  }
        <div className="relative mt-14">
          <IoSearchOutline size={ 30 } className="absolute top-2 left-2"/>
          <input 
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200
                       focus:outline-none focus:border-blue-500"    
          />
        </div>

        {/*Menú*/}
        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={ 30 } />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={ 30 } />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={ 30 } />
          <span className="ml-3 text-xl">Ingresar</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={ 30 } />
          <span className="ml-3 text-xl">Salir</span>
        </Link>

        { /*Linea de Separación */}
        <div className="w-full h-px bg-blue-400 my-10" />

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={ 30 } />
          <span className="ml-3 text-xl">Productos</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={ 30 } />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={ 30 } />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link>


      </nav>

    </div>
  )
}
