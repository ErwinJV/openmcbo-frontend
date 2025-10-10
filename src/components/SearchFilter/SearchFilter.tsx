"use client";
import { useCallback } from "react";
import Button from "../Button";
import { IoTrashBin } from "react-icons/io5";

interface SearchFilterProps {
  inputs: { key: string; element: React.ReactNode }[];
  clear?: () => void;
  submit?: () => void;
}

export default function SearchFilter({
  inputs,
  submit,
  clear,
}: SearchFilterProps) {
  const handleSubmit = useCallback(() => {
    if (submit) submit();
  }, [submit]);

  const handleClear = useCallback(() => {
    if (clear) clear();
  }, [clear]);

  return (
    <ul className="flex flex-col space-y-3.5 py-4 px-5 w-80 md:w-137.5 lg:w-105 ">
      {inputs.map((input) => (
        <li key={input.key} className="w-full">
          {input.element}
        </li>
      ))}
      <li className="w-full flex flex-col md:flex-row md:space-x-2.5">
        <Button
          text="Aplicar"
          variant="filled"
          size="small"
          onClick={handleSubmit}
          removePadding
        />
        <Button
          text="Limpiar"
          variant="text"
          size="small"
          onClick={handleClear}
          leftIcon={<IoTrashBin className="text-sm" />}
          removePadding
        />
      </li>
    </ul>
  );
}
