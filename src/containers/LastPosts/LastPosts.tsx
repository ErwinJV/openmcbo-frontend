import Button from "@/components/Button";
import { PropertyStatus, PropertyType } from "@/graphql/generated-types";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

const rentApartmentParams = new URLSearchParams({
  type: PropertyType.Apartment,
  status: PropertyStatus.Rent,
}).toString();

const buyHouseParams = new URLSearchParams({
  type: PropertyType.House,
  status: PropertyStatus.Sale,
}).toString();

export default function LastPosts() {
  return (
    <section className="bg-white flex flex-col ">
      <h2 className="text-[#003593] font-bold text-3xl md:text-4xl lg:text-5xl my-10 text-center">
        Ultimas Publicaciones
      </h2>
      <div className="container mx-auto grid grid-flow-col grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-109 md:h-124.5 px-6 md:px-8  ">
        <Link
          href={`/inmuebles?${rentApartmentParams}`}
          className="row-span-1 bg-[url('/img/last-posts-buy.webp')]  bg-center bg-cover "
        >
          <div className="bg-black/50 h-full flex flex-col justify-center  px-12 space-y-0.5">
            <h3 className="text-[#FFDF9F]  md:text-lg uppercase">Alquiler</h3>
            <p className="text-white font-bold text-xl md:text-2xl lg:text-3xl ">
              Descubre sobre apartamentos en alquiler disponibles
            </p>
          </div>
        </Link>
        <Link
          href={`/inmuebles?${buyHouseParams}`}
          className="row-span-1  bg-[url('/img/last-posts-rent-1.webp')] bg-center bg-cover"
        >
          <div className="bg-black/50 h-full flex flex-col justify-center  px-12 space-y-0.5">
            <h3 className="text-[#FFDF9F]  md:text-lg uppercase">Compra</h3>
            <p className="text-white font-bold text-xl md:text-2xl lg:text-3xl  ">
              ¿Buscas comprar una propiedad?
            </p>
          </div>
        </Link>
        <div className="hidden md:block row-span-2 bg-[url('/img/last-posts-rent-2.webp')] bg-center bg-cover">
          <div className="bg-black/50 h-full flex flex-col pt-18  px-12 space-y-0.5">
            <h3 className="text-[#FFDF9F]  md:text-lg uppercase">Alquiler</h3>
            <p className="text-white font-bold text-xl md:text-2xl lg:text-3xl ">
              Temporales para vacacionar en la ciudad
            </p>
          </div>
        </div>
      </div>

      <Link href="/inmuebles" className="self-center mt-12">
        <Button
          text="Descubre más"
          variant="outlined"
          size="medium"
          rightIcon={<IoArrowForward className="text-blue-700 text-xl" />}
        />
      </Link>
    </section>
  );
}
