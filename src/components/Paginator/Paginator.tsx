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
      Object.entries(searchParams).map(([key, value]) => [key, String(value)])
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
          className={`paginator-page-btn ${
            currentPage === i ? "paginator-active-page" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="paginator-container">
      <button
        onClick={() => handlePageChange(Math.max(0, (currentPage - 2) * limit))}
        disabled={currentPage === 1}
        className="paginator-nav-btn paginator-prev-btn"
      >
        <IoChevronBack className="paginator-nav-icon paginator-prev-icon" />
        Anterior
      </button>

      <div className="paginator-pages-container">{generatePageNumbers()}</div>

      <button
        onClick={() => handlePageChange(currentPage * limit)}
        disabled={currentPage === totalPages}
        className="paginator-nav-btn paginator-next-btn"
      >
        Siguiente
        <IoChevronForward className="paginator-nav-icon paginator-next-icon" />
      </button>
    </div>
  );
}
