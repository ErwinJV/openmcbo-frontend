"use client";
import { useCallback, useState } from "react";
import Button from "../Button";
import { PropertyStatus } from "@/graphql/generated-types";
import Input from "../Input";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const [status, setStatus] = useState<PropertyStatus>(PropertyStatus.Rent);
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log({ searchTerm });
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );
  return (
    <>
      {/* SEARCH BAR LG */}
      <div className="hidden lg:flex flex-col w-240">
        <div className="flex ">
          <Button
            variant={status === PropertyStatus.Rent ? "text" : "filled"}
            text="Alquilar"
            size="small"
            onClick={() => setStatus(PropertyStatus.Rent)}
          />
          <Button
            variant={status === PropertyStatus.Sale ? "text" : "filled"}
            text="Comprar"
            size="small"
            onClick={() => setStatus(PropertyStatus.Sale)}
          />
        </div>
        <div className="w-full flex items-center h-23 bg-[#F5F7FB]">
          <span className="w-full">
            <Input
              bg="transparent"
              label=""
              name="search-property"
              size="small"
              type="search"
              variant="text"
              placeholder="Buscar por Ubicacion"
              onChange={handleSearchChange}
            />
          </span>
          <Button
            variant="filled"
            text="Buscar"
            size="small"
            rightIcon={<IoSearch className="text-sm font-bold" />}
          />
        </div>
      </div>
    </>
  );
}
