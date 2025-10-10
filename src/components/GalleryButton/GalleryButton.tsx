"use client";

import { GalleryViewType } from "@/types/context";
import { useCallback } from "react";

interface GalleryButtonProps {
  icon: React.ReactNode;
  onClick: (view: GalleryViewType) => void;
  selected: boolean;
  text: string;
  view: GalleryViewType;
}

export default function GalleryButton({
  icon,
  onClick,
  selected,
  text,
  view,
}: GalleryButtonProps) {
  const handleOnClick = useCallback(() => {
    if (!selected) {
      onClick(view);
    }
  }, [onClick, selected, view]);
  return (
    <button
      className={`gallery-button gallery-button-${
        selected ? "selected" : "unselected"
      }`}
      aria-pressed={selected}
      type="button"
      onClick={handleOnClick}
    >
      {icon}
      <span
        className={`gallery-button-text gallery-button-text-${
          selected ? "selected" : "unselected"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
