"use client";

import { PropertiesContext } from "@/providers/PropertiesProvider/properties-filter-context";

import { ChangeEvent, useCallback, useContext, useRef, memo } from "react";

export default memo(function SearchResults({ total }: { total: number }) {
  const { filterNavigate, handleSearchParams, searchParams } =
    useContext(PropertiesContext);

  const handleTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      handleSearchParams({ ...searchParams, term: e.target.value, offset: 0 });
    }
  }, []);
  const defaultTerm = useRef(searchParams.term || "");

  const handleSearch = useCallback(() => {
    if (searchParams.term) {
      defaultTerm.current = searchParams.term;
    }
    filterNavigate();
  }, [filterNavigate]);

  return (
    <div className="flex w-full md:w-auto shadow-sm">
      <input
        type="text"
        placeholder="Cambiar término de búsqueda..."
        defaultValue={searchParams.term || ""}
        onChange={handleTerm}
        className="w-full bg-white md:w-72 px-4 py-2 text-[16px] border border-gray-300  focus:outline-none focus:border-[#003593] focus:ring-1 focus:ring-[#003593]"
      />
      <button
        onClick={handleSearch}
        type="button"
        className="bg-[#003593] cursor-pointer text-white px-5 py-2 rounded-r-md font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center"
      >
        Buscar
      </button>
    </div>
  );
});
