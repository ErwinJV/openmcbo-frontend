"use client";

import { useCallback } from "react";

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
}

export default function IconButton({ onClick, icon }: IconButtonProps) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <button className="md:hidden" onClick={handleClick}>
      {icon}
    </button>
  );
}
