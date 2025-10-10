import Button from "@/components/Button";
import { IoArrowForward } from "react-icons/io5";

export default function LastPosts() {
  return (
    <section className="bg-white w-screen  flex flex-col h-169.5 md:h-192  lg:h-209.5">
      <h2 className="text-[#003593] font-bold text-2xl lg:text-4xl my-10 text-center">
        Ultimas Publicaciones
      </h2>
      <div className=" mx-auto grid grid-flow-col grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-109 md:h-124.5 px-6 md:px-8  lg:h-125 xl:px-0 xl:container ">
        <div className="row-span-1 bg-[url('/img/last-posts-buy.webp')]  bg-cover ">
          <div className="bg-black/50 h-full flex flex-col justify-center  px-12 space-y-0.5">
            <h3 className="text-[#FFDF9F]  md:text-lg uppercase">Alquiler</h3>
            <p className="text-white font-bold md:text-xl lg:text-2xl ">
              Descubre sobre departamentos en alquiler disponibles
            </p>
          </div>
        </div>
        <div className="row-span-1  bg-[url('/img/last-posts-rent-1.webp')] bg-cover">
          <div className="bg-black/50 h-full flex flex-col justify-center  px-12 space-y-0.5">
            <h3 className="text-[#FFDF9F]  md:text-lg uppercase">Compra</h3>
            <p className="text-white font-bold md:text-xl lg:text-2xl ">
              ¿Buscas comprar una propiedad?
            </p>
          </div>
        </div>
        <div className="hidden md:block row-span-2 bg-[url('/img/last-posts-rent-2.webp')] bg-cover">
          <div className="bg-black/50 h-full flex flex-col pt-18  px-12 space-y-0.5">
            <h3 className="text-[#FFDF9F]  md:text-lg uppercase">Alquiler</h3>
            <p className="text-white font-bold md:text-xl lg:text-2xl ">
              Temporales para vacacionar en la ciudad
            </p>
          </div>
        </div>
      </div>

      <div className="self-center mt-12">
        <Button
          text="Descubre más"
          variant="outlined"
          size="medium"
          rightIcon={<IoArrowForward className="text-blue-700 text-xl" />}
        />
      </div>
    </section>
  );
}
