// components/PropertyNotAvailable.tsx
import Link from "next/link";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function PropertyNotAvailable() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-4 rounded-full">
            <FaExclamationTriangle className="text-yellow-600 text-3xl" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Propiedad en Revisión
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          Esta propiedad no está completamente disponible en este momento.
          Nuestro equipo está trabajando para verificar toda la información y
          asegurar que cumpla con nuestros estándares de calidad.
        </p>

        <div className="space-y-4">
          <Link
            href="/inmuebles"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
          >
            <FaHome className="text-lg" />
            Explorar Más Propiedades
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  );
}
