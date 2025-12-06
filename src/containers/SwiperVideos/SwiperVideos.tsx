"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  IoVideocamOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export interface PropertyVideo {
  id: string;
  url: string;
}

interface SwiperVideosProps {
  videos: PropertyVideo[] | null;
}

export default function SwiperVideos({ videos }: SwiperVideosProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Función para manejar la reproducción/pausa de video

  // Si no hay videos, mostrar mensaje
  if (!videos || videos.length === 0) {
    return (
      <div className="w-9/10 h-48 md:w-170 md:h-87.5 xl:w-282 xl:h-98 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 mx-auto">
        <div className="text-center text-gray-500">
          <IoVideocamOutline className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium">No hay videos disponibles</p>
          <p className="text-xs mt-1">Esta propiedad no cuenta con videos</p>
        </div>
      </div>
    );
  }

  console.log({ videos });

  return (
    <div className="relative w-9/10 h-48 md:w-170 md:h-87.5 xl:w-282 xl:h-98 mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
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
        className="w-full h-full rounded-lg overflow-hidden"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={video.id}>
            <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="w-full h-full object-cover"
                controls={true}
              >
                <source src={video.url} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>

              {/* Overlay de controles personalizados */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                {isPlaying !== index && (
                  <button
                    onClick={() => togglePlayPause(index)}
                    className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all duration-200"
                  >
                    <IoPlay className="w-8 h-8 text-white" />
                  </button>
                )}
                {isPlaying === index && (
                  <button
                    onClick={() => togglePlayPause(index)}
                    className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all duration-200"
                  >
                    <IoPause className="w-8 h-8 text-white" />
                  </button>
                )}
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botones de navegación personalizados */}
      <button className="swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-200">
        <IoChevronBack className="w-6 h-6 text-white" />
      </button>
      <button className="swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-200">
        <IoChevronForward className="w-6 h-6 text-white" />
      </button>

      {/* Paginación personalizada */}
      <div className="swiper-pagination absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1" />
    </div>
  );
}
