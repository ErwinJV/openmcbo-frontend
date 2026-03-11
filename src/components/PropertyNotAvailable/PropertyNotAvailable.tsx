// components/PropertyNotAvailable.tsx
import Link from "next/link";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import PreviousPageButton from "./PreviousPageButton";
import Button from "../Button";
import Pad from "../Pad";

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
          <Link href="/inmuebles">
            <Button
              size="small"
              variant="filled"
              text="Explorar Más Propiedades"
              leftIcon={<FaHome className="text-lg" />}
              removePadding
            />
          </Link>
          <Pad amt={10} />
          <PreviousPageButton />
        </div>
      </div>
    </div>
  );
}
