import { FiHome } from "react-icons/fi";

export default function EmptyState() {
  return (
    <div className="w-full flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#C5C6D0] p-6 rounded-full">
            <FiHome className="text-[#003593]" size={40} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#003593]">
          No encontramos propiedades
        </h2>

        {/* Description */}
        <p className="mt-4 text-[#8F909A] text-sm sm:text-base max-w-md mx-auto">
          No hay resultados para tu búsqueda actual. Intenta ajustar los
          filtros, cambiar la ubicación o explorar otras opciones disponibles.
        </p>

        {/* Actions */}
        {/* <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button className="flex items-center justify-center gap-2 bg-[#003593] text-white px-6 py-3 rounded-md font-medium hover:bg-[#3559B6] transition">
            <FiSearch />
            Nueva búsqueda
          </button>

          <button className="flex items-center justify-center gap-2 bg-[#C5C6D0] text-[#003593] px-6 py-3 rounded-md font-medium hover:bg-[#6C85C6] hover:text-white transition">
            <FiHome />
            Ver todas las propiedades
          </button>
        </div> */}
      </div>
    </div>
  );
}
