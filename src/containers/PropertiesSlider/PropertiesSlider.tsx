"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "../../components/Card";
import { SwiperOptions } from "swiper/types";

interface CardData {
  description: string;
  price: number;
  srcImg: string[];
  title: string;
  url: string;
}

interface PropertiesSliderProps {
  cards: CardData[];
  breakpoints?: SwiperOptions["breakpoints"];
}

const defaultBreakpoints: SwiperOptions["breakpoints"] = {
  320: {
    slidesPerView: 1,
    spaceBetween: 16,
  },

  480: {
    slidesPerView: 1.3,
    spaceBetween: 20,
  },

  768: {
    slidesPerView: 2,
    spaceBetween: 24,
  },

  1024: {
    slidesPerView: 2.5,
    spaceBetween: 24,
  },

  1440: {
    slidesPerView: 3.5,
    spaceBetween: 24,
  },

  1920: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

export default function PropertiesSlider({
  breakpoints,
  cards,
}: PropertiesSliderProps) {
  return (
    <div className="w-full max-w-full min-w-0 mx-auto relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
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
        breakpoints={breakpoints ? breakpoints : defaultBreakpoints}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="h-full">
              <Card
                description={card.description}
                price={card.price}
                srcImg={card.srcImg ? card.srcImg.slice(0, 3) : []}
                title={card.title}
                url={card.url}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* <div className="swiper-button-prev !hidden lg:!flex after:!text-gray-600 after:!text-2xl after:!font-bold hover:after:!text-blue-600 !w-10 !h-10 !bg-white !rounded-full !shadow-lg" />
        <div className="swiper-button-next !hidden lg:!flex after:!text-gray-600 after:!text-2xl after:!font-bold hover:after:!text-blue-600 !w-10 !h-10 !bg-white !rounded-full !shadow-lg" /> */}
        {/* <div className="swiper-pagination !relative !mt-6" /> */}
      </Swiper>

      <style jsx global>{`
        .swiper {
          padding-bottom: 2rem !important; /* Asegura espacio para la paginación */
        }
        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 0.6;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
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
