import { PropertyType } from "@/graphql/generated-types";
import Image from "next/image";
import TextFade from "../TextFade";

import MyCustomButton from "./MyCustomButton";
import Pad from "../Pad";

interface PropertyDescriptionProps {
  area: number;
  description: string;
  imgUrl: string;
  num_baths?: number;
  num_bedrooms?: number;
  place: string;
  price: number;
  title: string;
  type: PropertyType;
}

export default function PropertyDescription({
  description,
  imgUrl,
  title,
  num_baths,
  num_bedrooms,

  price,
  place,
  type,
  area,
}: PropertyDescriptionProps) {
  return (
    <article className=" grid grid-cols-1 xl:grid-cols-5 xl:grid-rows-4  w-9/10  md:w-170 xl:h-162 xl:w-282 mx-auto gap-2">
      <div className="hidden xl:inline-block xl:col-span-2 xl:row-span-4">
        <Image
          alt="Property article image"
          className="object-cover w-full h-full"
          height={720}
          src={imgUrl}
          width={1080}
        />
      </div>
      <div className="col-span-1 xl:col-span-3 xl:row-span-4 xl:flex xl:flex-col space-y-2 xl:p-4">
        <h1 className="text-[#3559B6] text-3xl text-center md:text-left md:w-162  md:text-4xl xl:w-auto xl:text-4xl font-bold">
          {title}
        </h1>
        <h2 className="text-[#2E3038] font-bold text-2xl md:text-3xl xl:text-4xl ">
          {price.toLocaleString("ve")} $
        </h2>
        <h3 className=" text-[#757680]  text-lg md:text-xl xl:text-2xl ">
          {place}
        </h3>
        <Pad amt={20} />
        <ul className="flex space-x-4 w-full justify-between flex-wrap ">
          <li className="flex flex-col justify-center ">
            <h5 className="lg:text-xl font-bold">Area</h5>
            <p className="text-lg text-[#8F909A] ">
              {area.toLocaleString("ve")} m2
            </p>
          </li>
          {num_bedrooms && num_bedrooms > 0 ? (
            <li className="flex flex-col justify-center">
              <h5 className="lg:text-xl font-bold">Habitaciones</h5>
              <p className="text-lg text-[#8F909A] ">{num_bedrooms}</p>
            </li>
          ) : (
            <></>
          )}
          {num_baths && num_baths > 0 ? (
            <li className="flex flex-col justify-center">
              <h5 className="lg:text-xl font-bold">Banos</h5>
              <p className="text-lg text-[#8F909A] ">{num_baths}</p>
            </li>
          ) : (
            <></>
          )}
          <li className="flex flex-col justify-center">
            <h5 className="lg:text-xl font-bold">Tipo de inmueble</h5>
            <p className="text-lg text-[#8F909A] ">
              {type === PropertyType.Apartment ? "Apartamento" : "Casa"}
            </p>
          </li>
        </ul>
        <Pad amt={20} />

        <p className="text-[#757680] text-xl md:text-2xl overflow-y-auto w-full whitespace-pre-wrap break-words ">
          {description}
        </p>
      </div>
    </article>
  );
}
