"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function NavLink({ href, label, onClick }: NavLinkProps) {
  const currentPath = usePathname();
  const arrayPath = currentPath.split("/");
  let isActive = arrayPath.includes(href.replace("/", ""));
  if (href === "/" && currentPath === "/") {
    isActive = true;
  } else if (href === "/" && currentPath !== "/") {
    isActive = false;
  } else if (href.replace("/", "") !== arrayPath[arrayPath.length - 1]) {
    isActive = false;
  }

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <Link
      className={`capitalize ${isActive ? "active-link" : "inactive-link"}`}
      href={href}
      prefetch={true}
      onClick={handleClick}
    >
      {label}
    </Link>
  );
}
