"use client";

import { PropertyPageContextType } from "@/types/context";
import { createContext } from "react";

export const PropertyContext = createContext<PropertyPageContextType>({
  galleryView: "pics",
  handleGalleryView: () => {},
});
