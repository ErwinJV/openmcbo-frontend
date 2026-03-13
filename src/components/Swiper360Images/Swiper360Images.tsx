"use client";
import { useRef, useEffect } from "react";

import { Viewer } from "@photo-sphere-viewer/core";

import {
  IoChevronBack,
  IoChevronForward,
  IoImagesOutline,
} from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
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
  const swiperRef = useRef<SwiperType | null>(null);
  if (!images || images.length === 0) {
    return (
      <div className=" h-48 w-170 md:h-87.5  xl:h-98 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 mx-auto">
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
    <div className=" md:w-170 md:h-87.5 xl:w-282 xl:h-98 mx-auto">
      <div className="relative w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          allowTouchMove={false}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {images.map((image) => (
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
        <button className="swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-200">
          <IoChevronBack className="w-6 h-6 text-white" />
        </button>
        <button className="swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-200">
          <IoChevronForward className="w-6 h-6 text-white" />
        </button>

        <div className="swiper-pagination absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1" />
      </div>
    </div>
  );
}

const Viewer360 = ({ panorama }: { panorama: string }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (viewerRef.current) {
        const viewer = new Viewer({
          container: viewerRef.current,
          panorama,
        });

        return () => {
          viewer.destroy();
        };
      }
    } catch {
      alert(
        `Tenemos problemas para cargar una de las imagenes 360, lamentamos las molestias`,
      );
    }
  }, [panorama]);

  return <div ref={viewerRef} className="w-full h-[320px]" />;
};
