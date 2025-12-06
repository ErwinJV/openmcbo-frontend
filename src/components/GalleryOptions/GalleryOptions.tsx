"use client";

import {
  IoArrowForwardSharp,
  IoCamera,
  IoGlassesOutline,
  IoVideocam,
} from "react-icons/io5";

import GalleryButton from "../GalleryButton";
import { useContext } from "react";
import { PropertyContext } from "@/providers/PropertyProvider/property-page-context";

interface GalleryOptionsProps {
  hasVideos: boolean;
  hasPics: boolean;
  has360Pics: boolean;
  hasVirtualTour: boolean;
}

export default function GalleryOptions({
  has360Pics,
  hasPics,
  hasVideos,
  hasVirtualTour,
}: GalleryOptionsProps) {
  const { galleryView, handleGalleryView } = useContext(PropertyContext);
  return (
    <div className="flex w-full md:w-170 xl:w-140 lg:justify-end">
      {hasPics && (
        <GalleryButton
          icon={
            <IoCamera
              className={`gallery-button-icon gallery-button-icon-${
                galleryView === "pics" ? "selected" : "unselected"
              }`}
            />
          }
          text="Fotos"
          selected={galleryView === "pics"}
          onClick={handleGalleryView}
          view="pics"
        />
      )}
      {has360Pics && (
        <GalleryButton
          icon={
            <IoArrowForwardSharp
              className={`gallery-button-icon gallery-button-icon-${
                galleryView === "pics360" ? "selected" : "unselected"
              }`}
            />
          }
          text="Fotos 360 "
          selected={galleryView === "pics360"}
          onClick={handleGalleryView}
          view="pics360"
        />
      )}

      {hasVideos && (
        <GalleryButton
          icon={
            <IoVideocam
              className={`gallery-button-icon gallery-button-icon-${
                galleryView === "videos" ? "selected" : "unselected"
              }`}
            />
          }
          text="Videos"
          selected={galleryView === "videos"}
          onClick={handleGalleryView}
          view="videos"
        />
      )}
      {hasVirtualTour && (
        <GalleryButton
          icon={
            <IoGlassesOutline
              className={`gallery-button-icon gallery-button-icon-${
                galleryView === "virtualTour" ? "selected" : "unselected"
              }`}
            />
          }
          text="Recorrido 3D"
          selected={galleryView === "virtualTour"}
          onClick={handleGalleryView}
          view="virtualTour"
        />
      )}
    </div>
  );
}
