"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { PropertiesContext } from "@/providers/PropertiesProvider/properties-filter-context";

interface PaginatorProps {
  totalElements: number;
}

export default function Paginator({ totalElements }: PaginatorProps) {
  const router = useRouter();
  const { searchParams, handleSearchParams } = useContext(PropertiesContext);
  const limit = 12;
  const totalPages = Math.ceil(totalElements / limit);
  const currentPage = Math.floor((searchParams.offset || 0) / limit) + 1;

  const handlePageChange = (newOffset: number) => {
    const stringSearchParams = Object.fromEntries(
      Object.entries(searchParams).map(([key, value]) => [key, String(value)]),
    );
    const filterSearchParams = new URLSearchParams({
      ...stringSearchParams,
      offset: newOffset.toString(),
      limit: limit.toString(),
    }).toString();

    handleSearchParams({ ...searchParams, offset: newOffset, limit });

    const url = `/inmuebles?${filterSearchParams}`;
    router.push(url, { scroll: false });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange((i - 1) * limit)}
          className={`
            flex items-center justify-center
            px-2 py-1 mx-0.5 rounded-md transition-colors duration-200 
            bg-white text-black border border-gray-300
            hover:bg-white hover:text-black
            sm:px-3 sm:py-2 sm:mx-1
            ${currentPage === i ? "bg-blue-600 text-white hover:text-white" : ""}
          `}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-6 sm:my-8 md:space-x-2">
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange(Math.max(0, (currentPage - 2) * limit))}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center order-2 sm:order-1
          px-3 py-2 rounded-md bg-[#003593] border border-gray-300 
          text-white transition-colors duration-200
          disabled:opacity-70
          disabled:cursor-not-allowed
          hover:bg-white hover:text-black
          w-full sm:w-auto text-sm sm:text-base
        `}
      >
        <IoChevronBack className="mr-1 text-base sm:text-lg" />
        <span className="sm:hidden">Prev</span>
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de página */}
      <div className="flex items-center justify-center order-1 sm:order-2 overflow-x-auto w-full sm:w-auto">
        <div className="flex space-x-1 px-2 sm:px-0">
          {generatePageNumbers()}
        </div>
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange(currentPage * limit)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center order-3
          px-3 py-2 rounded-md bg-[#003593] border border-gray-300 
          text-white transition-colors duration-200
          disabled:cursor-not-allowed
          disabled:opacity-70
          hover:bg-white hover:text-black
          w-full sm:w-auto text-sm sm:text-base
        `}
      >
        <span className="sm:hidden">Next</span>
        <span className="hidden sm:inline">Siguiente</span>
        <IoChevronForward className="ml-1 text-base sm:text-lg" />
      </button>
    </div>
  );
}
