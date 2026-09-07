"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface AdecuacionGalleryProps {
  images: { url: string; alt?: string | null; filename?: string | null }[];
  mainImageUrl?: string | null;
  adecuacionName: string;
}

export default function AdecuacionGallery({
  images,
  mainImageUrl,
  adecuacionName,
}: AdecuacionGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const allImages = mainImageUrl
    ? [{ url: mainImageUrl, alt: adecuacionName, filename: null }, ...images]
    : images;

  if (!allImages || allImages.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-[#8F909A]">Sin imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Thumbs, FreeMode]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="adecuacion-main-swiper w-full h-64 md:h-96 rounded-lg overflow-hidden mb-4"
      >
        {allImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full bg-gray-100">
              <Image
                src={image.url}
                alt={image.alt || `${adecuacionName} - imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {allImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="adecuacion-thumbs-swiper w-full h-20 md:h-24"
        >
          {allImages.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="relative w-full h-full bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt || `${adecuacionName} - miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
