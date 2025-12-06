"use client";

import { PropertyContext } from "./property-page-context";
import { GalleryViewType } from "@/types/context";
import { useCallback, useState } from "react";

interface PropertyProviderProps {
  children: React.ReactNode;
}
export default function PropertyProvider({ children }: PropertyProviderProps) {
  const [galleryView, setGalleryView] = useState<GalleryViewType>("pics");
  const handleGalleryView = useCallback((view: GalleryViewType) => {
    setGalleryView(view);
  }, []);
  return (
    <>
      <PropertyContext value={{ galleryView, handleGalleryView }}>
        {children}
      </PropertyContext>
    </>
  );
}
