import Button from "@/components/Button";
import { IoArrowForward } from "react-icons/io5";
import PropertiesSlider from "../PropertiesSlider";

import { Property } from "@/graphql/generated-types";
import Link from "next/link";
import { SwiperOptions } from "swiper/types";

interface AvailableOptionsProps {
  properties: Property[];
}

const breakpoints: SwiperOptions["breakpoints"] = {
  320: {
    slidesPerView: 1,
    spaceBetween: 16,
  },

  360: {
    slidesPerView: 1.2,
    spaceBetween: 16,
  },

  400: {
    slidesPerView: 1.3,
    spaceBetween: 16,
  },

  480: {
    slidesPerView: 1.4,
    spaceBetween: 10,
  },

  520: {
    slidesPerView: 1.5,
    spaceBetween: 10,
  },

  550: {
    slidesPerView: 1.7,
    spaceBetween: 10,
  },

  615: {
    slidesPerView: 1.9,
    spaceBetween: 10,
  },

  640: {
    slidesPerView: 2,
    spaceBetween: 10,
  },

  768: {
    slidesPerView: 2,
    spaceBetween: 24,
  },

  820: {
    slidesPerView: 2.3,
    spaceBetween: 24,
  },

  920: {
    slidesPerView: 2.5,
    spaceBetween: 24,
  },

  1024: {
    slidesPerView: 2.6,
    spaceBetween: 24,
  },

  1060: {
    slidesPerView: 2.7,
    spaceBetween: 24,
  },

  1130: {
    slidesPerView: 2.9,
    spaceBetween: 24,
  },

  1244: {
    slidesPerView: 3,
    spaceBetween: 24,
  },

  1320: {
    slidesPerView: 3.2,
    spaceBetween: 24,
  },

  1440: {
    slidesPerView: 3.5,
    spaceBetween: 24,
  },

  1500: {
    slidesPerView: 3.7,
    spaceBetween: 24,
  },

  1600: {
    slidesPerView: 4,
    spaceBetween: 24,
  },

  1725: {
    slidesPerView: 4.4,
    spaceBetween: 24,
  },

  1920: {
    slidesPerView: 4.5,
    spaceBetween: 24,
  },

  2260: {
    slidesPerView: 6,
    spaceBetween: 24,
  },
};
export default async function AvailableOptions({
  properties,
}: AvailableOptionsProps) {
  const cards = properties.map((property) => ({
    description: property.description,
    price: property.price,
    srcImg: property.images ? property.images.map((img) => img.url) : [],
    title: property.title,
    url: `/inmuebles/${property.slug}`,
  }));

  return (
    <section className="w-full  px-1 sm:px-6 md:px-8  ">
      <div className=" flex flex-col mx-auto justify-center space-y-6 w-full">
        <div className="flex flex-col lg:flex-row w-full lg:justify-between">
          <div className="flex flex-col space-y-1">
            <h2 className="text-[#D9A300] text-center lg:text-left text-lg md:text-xl uppercase ">
              Listado de Propiedades
            </h2>
            <h3 className="text-[#003593] text-center lg:text-left font-bold text-3xl sm:text-4xl">
              Explora las Opciones disponibles
            </h3>
            <p className=" text-xl sm:text-2xl text-center lg:text-left text-[#8F909A]">
              Selecciona las propiedades disponibles y revisa sus detalles
            </p>
          </div>
          <Link href="/inmuebles" className="w-auto self-center">
            <Button
              rightIcon={<IoArrowForward className="text-blue-700 text-2xl" />}
              size="small"
              text="Mas Opciones"
              variant="tonal"
            />
          </Link>
        </div>
        <PropertiesSlider cards={cards} breakpoints={breakpoints} />
      </div>
    </section>
  );
}
