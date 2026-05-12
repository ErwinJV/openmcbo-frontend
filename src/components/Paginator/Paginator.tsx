"use client";

import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { PaginationDto, PropertyFilterInput } from "@/graphql/generated-types";

interface PaginatorProps {
  totalElements: number;
  searchParams: PropertyFilterInput & PaginationDto;
}

export default function Paginator({
  totalElements,
  searchParams,
}: PaginatorProps) {
  const router = useRouter();

  const limit = 12;
  const totalPages = Math.ceil(totalElements / limit);
  const currentPage = Math.floor((searchParams?.offset || 0) / limit) + 1;

  const handlePageChange = (newOffset: number) => {
    const stringSearchParams = Object.fromEntries(
      Object.entries(searchParams).map(([key, value]) => [key, String(value)]),
    );
    const filterSearchParams = new URLSearchParams({
      ...stringSearchParams,
      offset: newOffset.toString(),
      limit: limit.toString(),
    }).toString();

    const url = `/inmuebles?${filterSearchParams}`;
    router.push(url, { scroll: true });
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
      const isActive = currentPage === i;
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange((i - 1) * limit)}
          aria-current={isActive ? "page" : undefined}
          className={`
            min-w-[2.5rem] h-10 flex items-center justify-center
            px-3 py-2 mx-0.5 rounded-md transition-all duration-200 
            text-sm font-medium
            
            ${
              isActive
                ? "bg-[#003593] text-white shadow-md border border-[#003593] "
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-[#003593] cursor-pointer"
            }
          `}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  if (totalPages <= 1) return null; // No renderizar si solo hay 1 página

  return (
    <nav
      aria-label="Navegación de páginas"
      className="flex flex-wrap items-center justify-center gap-2 my-8 w-full"
      role="nav-paginator"
    >
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange(Math.max(0, (currentPage - 2) * limit))}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className={`
            flex items-center justify-center h-10 px-3 sm:px-4 rounded-md 
            transition-all duration-200 text-sm font-medium
            ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-[#003593] active:bg-gray-100 cursor-pointer"
            }
          `}
      >
        <IoChevronBack className="mr-1 text-lg" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Números de página */}
      <div className="flex items-center justify-center overflow-x-auto no-scrollbar">
        {generatePageNumbers()}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange(currentPage * limit)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className={`
            flex items-center justify-center h-10 px-3 sm:px-4 rounded-md 
            transition-all duration-200 text-sm font-medium
            ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-[#003593] active:bg-gray-100 cursor-pointer"
            }
          `}
      >
        <span className="hidden sm:inline">Siguiente</span>
        <IoChevronForward className="ml-1 text-lg" />
      </button>
    </nav>
  );
}
