import Pad from "@/components/Pad";
import SearchBar from "@/components/SearchBar";

export default function MainHero() {
  return (
    <section className="h-172.5 md:h-157 xl:bg-right bg-no-repeat xl:bg-contain w-full flex  ">
      <div className="relative xl:flex w-full xl:w-320 xl:container xl:mx-auto ">
        <div className="hidden pb-10 px-3  m:px-10 lg:px-30 xl:px-0  xl:w-177  xl:h-auto xl:flex flex-col items-center justify-end md:justify-center xl:items-start space-y-4 "></div>
        <div className="bg-[url('/img/main-hero.webp')]  bg-cover xl:bg-none   xl:z-10 xl:absolute xl:left-0 xl:top-0   w-full h-full xl:h-auto xl:mx-auto flex flex-col items-center justify-end md:justify-center xl:items-start space-y-4 ">
          <div className="w-full h-full flex flex-col px-10  bg-black/50  xl:bg-transparent items-center justify-center xl:items-start ">
            <h1 className="text-4xl  text-center xl:text-left text-white md:text-5xl md:w-130 lg:text-left xl:text-[#3559B6] lg:text-6xl lg:w-120 font-bold">
              Conecta con tu propiedad ideal
            </h1>
            <Pad amt={16} />
            <h4 className="text-white text-center text-2xl lg:text-3xl xl:text-left  md:text-2xl w-full xl:text-[#8F909A] xl:text-2xl xl:w-120">
              Descubre las nuevas propiedades que están disponibles en la zona
              que gustes habitar.
            </h4>
            <Pad amt={100} />
            <SearchBar />
          </div>
        </div>
        <div className="hidden xl:flex bg-[url('/img/main-hero.webp')]  bg-cover w-177"></div>
      </div>
    </section>
  );
}
