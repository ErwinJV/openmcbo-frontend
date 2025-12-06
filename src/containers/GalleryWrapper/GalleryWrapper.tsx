"use client";

import { PropertyContext } from "@/providers/PropertyProvider/property-page-context";
import { GalleryViewType } from "@/types/context";
import { useContext } from "react";

interface GalleryWrapperProps {
  targetView: GalleryViewType;
  readonly children: React.ReactNode;
}

export default function GalleryView({
  children,
  targetView,
}: GalleryWrapperProps) {
  const { galleryView } = useContext(PropertyContext);
  return (
    <div className={`${galleryView !== targetView ? "not-show" : ""}`}>
      {children}
    </div>
  );
}
