import Button from "@/components/Button";
import { IoArrowForward } from "react-icons/io5";
import PropertiesSlider from "../PropertiesSlider";

import { Property } from "@/graphql/generated-types";
import Link from "next/link";

interface AvailableOptionsProps {
  properties: Property[];
}
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
    <section className="w-full container mx-auto px-6 md:px-8  ">
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
        <PropertiesSlider cards={cards} />
      </div>
    </section>
  );
}
