import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { FaArrowLeft } from "react-icons/fa";

export const PageNotFound = () => {
  return (
    <div
      className={`${titleFont.className}
                  flex items-center justify-center
                  h-screen w-screen 
                  bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800`}
    >
      <div
        className="flex flex-col md:flex-row items-center justify-between
                   h-[80%] w-[80%]
                   bg-gray-50 rounded-2xl shadow-lg
                   p-8 md:p-12 gap-8"
      >
        {/* 🧭 Texto principal */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="text-6xl md:text-7xl animate-bounce select-none">🧭</div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-red-800 tracking-tight drop-shadow-sm leading-none">
            404
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-gray-700 leading-tight">
            Página no encontrada
          </p>

          <p className="text-gray-500 max-w-md text-base md:text-lg leading-relaxed mx-auto md:mx-0">
            Lo sentimos, la página que buscas no existe o ha sido movida.  
            Usa el compás 🧭 para volver a tu camino.
          </p>
        </div>

        {/* 🔙 Botón elegante */}
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 
                       px-6 py-3 bg-red-900 text-white rounded-full 
                       hover:bg-red-700 transition-all shadow-md font-bold
                       text-sm md:text-base"
          >
            <FaArrowLeft className="text-sm" />
            Regresar al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
