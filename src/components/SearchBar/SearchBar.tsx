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
        <div className="flex w-79 ">
          <Button
            variant={status === PropertyStatus.Rent ? "text" : "filled"}
            text="Alquilar"
            size="small"
            onClick={() => setStatus(PropertyStatus.Rent)}
            removePadding
          />
          <Button
            variant={status === PropertyStatus.Sale ? "text" : "filled"}
            text="Comprar"
            size="small"
            onClick={() => setStatus(PropertyStatus.Sale)}
            removePadding
          />
        </div>
        <div className="w-full flex items-center h-23 bg-[#F5F7FB]">
          <span className="w-[86%]">
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
          <span className="w-[10%]">
            <Button
              variant="filled"
              text="Buscar"
              size="small"
              rightIcon={<IoSearch className="text-xl font-bold" />}
              removePadding
            />
          </span>
        </div>
      </div>
      <div className="hidden md:flex lg:hidden flex-col w-148 ">
        <div className="flex w-full">
          <Button
            variant={status === PropertyStatus.Rent ? "text" : "filled"}
            text="Alquilar"
            size="small"
            onClick={() => setStatus(PropertyStatus.Rent)}
            removePadding
          />
          <Button
            variant={status === PropertyStatus.Sale ? "text" : "filled"}
            text="Comprar"
            size="small"
            onClick={() => setStatus(PropertyStatus.Sale)}
            removePadding
          />
        </div>

        <div className="w-full flex items-center h-17 bg-[#F5F7FB] mt-3">
          <Input
            bg="transparent"
            label=""
            name="search-property"
            size="small"
            type="text"
            variant="text"
            placeholder="Buscar por Ubicacion"
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="filled"
          text="Buscar"
          size="small"
          rightIcon={<IoSearch className="text-xl font-bold" />}
          removePadding
        />
      </div>
      <div className="flex md:hidden flex-col w-80">
        <div className="flex w-full">
          <Button
            variant={status === PropertyStatus.Rent ? "text" : "filled"}
            text="Alquilar"
            size="small"
            onClick={() => setStatus(PropertyStatus.Rent)}
            removePadding
          />
          <Button
            variant={status === PropertyStatus.Sale ? "text" : "filled"}
            text="Comprar"
            size="small"
            onClick={() => setStatus(PropertyStatus.Sale)}
            removePadding
          />
        </div>
        <div className="w-full flex items-center h-17 bg-[#F5F7FB] mt-3">
          <span className="w-[86%]">
            <Input
              bg="transparent"
              label=""
              name="search-property"
              size="small"
              type="text"
              variant="text"
              placeholder="Buscar por Ubicacion"
              onChange={handleSearchChange}
            />
          </span>
          <span className="w-[23%]">
            <Button
              variant="filled"
              size="small"
              rightIcon={<IoSearch className="text-xl font-bold" />}
              removePadding
            />
          </span>
        </div>
      </div>
    </>
  );
}
