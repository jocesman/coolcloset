import { PageNotFound } from '@/components'

export default function () {
  return <PageNotFound />
}

// import Link from "next/link";
// import { titleFont } from "@/config/fonts";
// import { FaArrowLeft } from "react-icons/fa";

// export default function NotFoundPage() {
//   return (
//       <div className={`${titleFont.className}
//                       flex flex-col items-center justify-center min-h-screen bg-blue-100
//                       from-gray-50 to-gray-100 text-gray-800`}>
//         <div className="text-center space-y-6">
//           <h1 className="text-7xl font-extrabold text-red-800 tracking-tight drop-shadow-sm">
//             404
//           </h1>
//           <p className="text-2xl font-semibold text-gray-700">
//             Página no encontrada
//           </p>
//           <p className="text-gray-500 max-w-md mx-auto">
//             Lo sentimos, la página que buscas no existe o ha sido movida.
//           </p>

//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-red-900 text-white
//             rounded-full hover:bg-red-700 transition-all shadow-md font-bold"
//           >
//             <FaArrowLeft className="text-sm" />
//             Regresar al inicio
//           </Link>
//         </div>
//     </div>
//   );
// }
