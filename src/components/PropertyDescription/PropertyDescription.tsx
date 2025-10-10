import { PropertyType } from "@/graphql/generated-types";
import Image from "next/image";
import TextFade from "../TextFade";

import MyCustomButton from "./MyCustomButton";

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
    <article className=" grid grid-cols-1 xl:grid-cols-5 xl:grid-rows-5  w-9/10  md:w-170 xl:h-162 xl:w-282 mx-auto gap-2">
      <div className="hidden xl:inline-block xl:col-span-2 xl:row-span-4">
        <Image
          alt="Property article image"
          className="object-cover w-full h-full"
          height={720}
          quality={70}
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
        <h3 className=" text-black  text-lg md:text-xl xl:text-2xl ">
          {place}
        </h3>
        <ul className="flex space-x-4 w-full justify-between flex-wrap ">
          <li className="flex flex-col justify-center ">
            <h5 className="lg:text-lg font-bold">Area</h5>
            <p className="text-[14px] text-[#8F909A] ">
              {area.toLocaleString("ve")} m2
            </p>
          </li>
          <li className="flex flex-col justify-center">
            <h5 className="lg:text-lg font-bold">Habitaciones</h5>
            <p className="text-[14px] text-[#8F909A] ">{num_bedrooms}</p>
          </li>
          <li className="flex flex-col justify-center">
            <h5 className="lg:text-lg font-bold">Banos</h5>
            <p className="text-[14px] text-[#8F909A] ">{num_baths}</p>
          </li>
          <li className="flex flex-col justify-center">
            <h5 className="lg:text-lg font-bold">Tipo de inmueble</h5>
            <p className="text-[14px] text-[#8F909A] ">
              {type === PropertyType.Apartment ? "Apartamento" : "Casa"}
            </p>
          </li>
        </ul>
        <TextFade buttonComponent={MyCustomButton} maxHeight="120px">
          <p className="text-[#757680] text-[16px] h-full ">
            {description} Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Fuga assumenda quidem placeat accusantium, voluptas corporis
            qui asperiores dolorum cum, quibusdam vel veniam illo itaque? Omnis
            laudantium voluptate quos molestias optio. Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Quibusdam recusandae pariatur
            obcaecati, aperiam optio, molestias vitae soluta impedit atque,
            eligendi consectetur natus odio veritatis rem veniam debitis
            doloribus reprehenderit et. Velit blanditiis rerum cupiditate
            voluptates illum? At sequi, rem odio, aut commodi veniam inventore
            natus cupiditate aperiam, voluptates repudiandae perspiciatis quasi
            impedit amet! Cum repudiandae libero nesciunt rem tenetur quidem.
            Blanditiis obcaecati, esse sed magni cum optio. Pariatur odio
            voluptatum blanditiis officiis numquam culpa cum, repellat, a unde
            voluptas eligendi. Quae veritatis praesentium ullam velit, facere
          </p>
        </TextFade>
      </div>
    </article>
  );
}
