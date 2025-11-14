import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { titleFont } from "@/config/fonts";

export const PageNotFound = () => {
  return (
    <div
      className={`${titleFont.className}
        flex items-center justify-center 
        h-screen w-screen 
        bg-linear-to-br from-blue-100 via-blue-200 to-blue-300
        text-gray-800 overflow-hidden`}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 items-center justify-center
                   h-auto md:h-[70%] w-[90%] md:w-[75%] lg:w-[60%]
                   bg-white/70 backdrop-blur-sm
                   rounded-3xl shadow-2xl
                   p-8 sm:p-10 md:p-14 gap-10
                   animate-fade-in-up"
      >
        {/* 🧭 Texto principal */}
        <div className="text-center md:text-left space-y-4">
          <div className="text-6xl md:text-7xl animate-bounce select-none">🧭</div>

          <h1 className="text-6xl md:text-8xl font-extrabold text-red-800 tracking-tight drop-shadow-sm leading-none">
            404
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-gray-700 leading-tight">
            Página no encontrada
          </p>

          <p className="text-gray-600 max-w-md text-base md:text-lg leading-relaxed mx-auto md:mx-0">
            Lo sentimos, la página que buscas no existe o ha sido movida.  
            Usa el compás 🧭 para volver a tu camino.
          </p>
        </div>

        {/* 🔙 Botón elegante */}
        <div className="flex justify-center md:justify-end w-full">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 
                       px-7 py-3 bg-red-800 text-white rounded-full 
                       hover:bg-red-700 hover:shadow-lg hover:shadow-red-300/50
                       active:scale-95 transition-all font-bold
                       text-sm md:text-base"
          >
            <FaArrowLeft className="text-sm" />
            Regresar al inicio
          </Link>
        </div>
      </div>

      {/* ✨ Animación de fondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] 
                        bg-gradient-radial from-blue-300/40 via-blue-200/20 to-transparent 
                        blur-3xl animate-pulse-slow -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};
