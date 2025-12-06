"use client";
import Button from "../Button";

export default function PreviousPageButton() {
  return (
    <Button
      size="small"
      variant="outlined"
      text="Cerrar Pestana"
      onClick={() => window.close()}
      removePadding
    />
  );
}
