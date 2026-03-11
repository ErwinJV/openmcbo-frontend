"use client";

import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import Button from "../Button";

export default function MyCustomButton({
  onClick,
  isExpanded,
}: {
  onClick: () => void;
  isExpanded: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      text={isExpanded ? "Ver menos" : "Ver más"}
      variant="tonal"
      size="small"
      rightIcon={isExpanded ? <IoArrowUp /> : <IoArrowDown />}
    />
  );
}
