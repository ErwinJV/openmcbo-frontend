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
  const isActive = arrayPath.includes(href.replace("/", ""));

  return (
    <Link
      className={`capitalize ${isActive ? "active-link" : "inactive-link"}`}
      
      href={href}
    >
      {label}
    </Link>
  );
}
