"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
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

  return (
    <Link
      className={`capitalize ${isActive ? "active-link" : "inactive-link"}`}
      href={href}
      prefetch={true}
    >
      {label}
    </Link>
  );
}
