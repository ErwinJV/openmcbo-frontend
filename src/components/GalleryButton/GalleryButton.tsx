"use client";

import { useCallback } from "react";

interface GalleryButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  selected: boolean;
  text: string;
}

export default function GalleryButton({
  icon,
  onClick,
  selected,
  text,
}: GalleryButtonProps) {
  const handleOnClick = useCallback(() => {
    if (!selected) {
      onClick();
    }
  }, [onClick, selected]);
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
