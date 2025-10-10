import { PaginationDto, PropertyFilterInput } from "@/graphql/generated-types";

export type GalleryViewType = "pics" | "pics360" | "videos" | "virtualTour";

export type PropertyPageContextType = {
  galleryView: GalleryViewType;
  handleGalleryView: (view: GalleryViewType) => void;
};

export type PropertiesPageContextType = {
  searchParams: PropertyFilterInput & PaginationDto;
  filterNavigate: () => void;
  handleSearchParams: (
    searchParams: PropertyFilterInput & PaginationDto
  ) => void;
};
