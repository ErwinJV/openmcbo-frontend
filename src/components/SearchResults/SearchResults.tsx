"use client";

import { PropertiesContext } from "@/providers/PropertiesProvider/properties-filter-context";

import { ChangeEvent, useCallback, useContext, useRef, memo } from "react";

export default memo(function SearchResults({ total }: { total: number }) {
  const { filterNavigate, handleSearchParams, searchParams } =
    useContext(PropertiesContext);

  const handleTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      handleSearchParams({ ...searchParams, term: e.target.value });
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
    <section className="w-full mt-8 mb-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-[90%] md:w-170 lg:w-230 xl:w-282">
        {/* 1. Texto de resultados */}
        <div className="flex-1">
          {total > 0 ? (
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Mostrando <span className="font-bold">{total}</span> propiedades
              para{" "}
              <span className="text-[#003593]">{`"${defaultTerm.current}"`}</span>
            </h2>
          ) : (
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Lo sentimos! no hay resultados para su busqueda, intenta con otra
              palabra
            </h2>
          )}
        </div>

        {/* 2. Input de nueva búsqueda */}
        <div className="flex w-full md:w-auto shadow-sm">
          <input
            type="text"
            placeholder="Cambiar término de búsqueda..."
            defaultValue={searchParams.term || ""}
            onChange={handleTerm}
            className="w-full md:w-72 px-4 py-2 text-[16px] border border-gray-300 rounded-l-md focus:outline-none focus:border-[#003593] focus:ring-1 focus:ring-[#003593]"
          />
          <button
            onClick={handleSearch}
            type="button"
            className="bg-[#003593] cursor-pointer text-white px-5 py-2 rounded-r-md font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center"
          >
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
});
