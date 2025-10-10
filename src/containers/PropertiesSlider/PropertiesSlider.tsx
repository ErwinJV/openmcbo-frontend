"use client";
import Card from "@/components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCards } from "swiper/modules";

interface PropertiesSliderProps {
  cards: {
    description: string;
    price: number;
    srcImg: string[];
    title: string;
    url: string;
  }[];
}

export default function PropertiesSlider({ cards }: PropertiesSliderProps) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        loop
        autoplay
        modules={[EffectCards]}
        slidesPerView={1}
        breakpoints={{
          700: {
            slidesPerView: 2,
          },
          1240: {
            slidesPerView: 3,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="w-full"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.url}>
            <Card
              description={card.description}
              price={card.price}
              srcImg={card.srcImg}
              title={card.title}
              url={card.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
