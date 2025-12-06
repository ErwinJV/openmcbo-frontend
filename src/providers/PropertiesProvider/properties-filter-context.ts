"use client";

import { PropertiesPageContextType } from "@/types/context";

import { createContext } from "react";

export const PropertiesContext = createContext<PropertiesPageContextType>({
  filterNavigate: () => {},
  handleSearchParams: () => {},
  searchParams: {},
});
