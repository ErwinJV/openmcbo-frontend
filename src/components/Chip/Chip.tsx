"use client";

import { useCallback } from "react";
import { IoClose } from "react-icons/io5";

export interface ChipProps {
  label: string;
  onDelete?: () => void;
}

export default function Chip({ label, onDelete }: ChipProps) {
  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete();
    }
  }, [onDelete]);

  return (
    <button className="btn-chip">
      <span>{label}</span>
      <IoClose size={16} className="cursor-pointer" onClick={handleDelete} />
    </button>
  );
}
