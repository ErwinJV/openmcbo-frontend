"use client";
import { useRef, useEffect } from "react";

import { Viewer } from "@photo-sphere-viewer/core";

import { IoImagesOutline } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "@photo-sphere-viewer/core/index.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type PropertyImage360 = {
  id: string;

  url: string;
};

interface Swiper360ImagesProps {
  images: PropertyImage360[] | null;
}

export default function Swiper360Images({ images }: Swiper360ImagesProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-9/10 h-48 md:w-170 md:h-87.5  xl:h-98 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 mx-auto">
        <div className="text-center text-gray-500">
          <IoImagesOutline className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium">No hay vistas 360 disponibles</p>
          <p className="text-xs mt-1">
            Esta propiedad no cuenta con imágenes esféricas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-9/10 h-48 md:w-170 md:h-87.5 xl:w-282 xl:h-98 mx-auto">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          allowTouchMove={false}
          pagination={{ clickable: true }}
        >
          {images.map((image, i) => (
            <SwiperSlide
              key={image.url}
              className="h-auto"
              contentEditable
              suppressContentEditableWarning
            >
              <Viewer360 panorama={image.url} key={image.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

const Viewer360 = ({ panorama }: { panorama: string }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = new Viewer({
        container: viewerRef.current,
        panorama,
      });

      return () => {
        viewer.destroy();
      };
    }
  }, [panorama]);

  return <div ref={viewerRef} className="w-full h-[320px]" />;
};
