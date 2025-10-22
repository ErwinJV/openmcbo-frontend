"use client";

import useFancybox from "@/hooks/useFancybox";

export default function FancyBoxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fancyboxRef] = useFancybox({
    closeButton: true,
    wheel: "slide",
  });
  return <div ref={fancyboxRef}>{children}</div>;
}
