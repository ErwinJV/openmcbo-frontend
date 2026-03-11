"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "../../components/Card";

interface CardData {
  description: string;
  price: number;
  srcImg: string[];
  title: string;
  url: string;
}

interface PropertiesSliderProps {
  cards: CardData[];
}

export default function PropertiesSlider({ cards }: PropertiesSliderProps) {
  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
        }}
        breakpoints={{
          // Mobile: 1 card
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          // Small tablet: 1.3 cards (muestra parte de la siguiente)
          480: {
            slidesPerView: 1.3,
            spaceBetween: 24,
          },

          // Large tablet: 2.2 cards
          680: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          // Desktop: 3 cards exactas

          // Large desktop: 3.5 cards (muestra parte de la siguiente)
          1440: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          // Extra large desktop: 4 cards
          1920: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className="w-full">
            {" "}
            {/* Padding bottom para la paginación */}
            <Card
              description={card.description}
              price={card.price}
              srcImg={
                card.srcImg
                  ? [card.srcImg[0], card.srcImg[1], card.srcImg[2]]
                  : []
              }
              title={card.title}
              url={card.url}
            />
          </SwiperSlide>
        ))}

        {/* Navigation buttons - solo visible en desktop */}
        {/* <div className="swiper-button-prev !hidden lg:!flex after:!text-gray-600 after:!text-2xl after:!font-bold hover:after:!text-blue-600 !w-10 !h-10 !bg-white !rounded-full !shadow-lg" />
        <div className="swiper-button-next !hidden lg:!flex after:!text-gray-600 after:!text-2xl after:!font-bold hover:after:!text-blue-600 !w-10 !h-10 !bg-white !rounded-full !shadow-lg" /> */}

        {/* Pagination */}
        {/* <div className="swiper-pagination !relative !mt-6" /> */}
      </Swiper>

      {/* Estilos globales para Swiper */}
      <style jsx global>{`
        .swiper {
          padding-bottom: 2rem;
        }
        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 0.6;
          width: 10px;
          height: 10px;
          margin: 0 6px;
        }
        .swiper-pagination-bullet-active {
          background: #2563eb;
          opacity: 1;
          transform: scale(1.2);
        }
        .swiper-button-prev,
        .swiper-button-next {
          background: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          transition: all 0.3s ease;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 16px;
          font-weight: bold;
          color: #4b5563;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #2563eb;
        }
        .swiper-button-prev:hover:after,
        .swiper-button-next:hover:after {
          color: white;
        }
        .swiper-button-disabled {
          opacity: 0.3;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
