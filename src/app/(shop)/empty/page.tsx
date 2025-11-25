import Link from 'next/link';
import { IoCartOutline, IoArrowForwardOutline } from 'react-icons/io5';

export default function EmptyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        {/* Ícono de carrito vacío */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <IoCartOutline size={120} className="text-gray-300" />
            <div className="absolute -top-2 -right-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-gray-500 text-sm font-bold">0</span>
            </div>
          </div>
        </div>

        {/* Mensaje */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-500 mb-8 text-sm sm:text-base">
          Parece que aún no has agregado ningún producto. ¡Explora nuestro catálogo y encuentra lo que buscas!
        </p>

        {/* Botón de acción */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Ver productos
          <IoArrowForwardOutline size={20} />
        </Link>

        {/* Links secundarios */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">¿Necesitas ayuda?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link href="/search" className="text-blue-600 hover:text-blue-700 hover:underline">
              Buscar productos
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link href="/orders" className="text-blue-600 hover:text-blue-700 hover:underline">
              Ver mis órdenes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
