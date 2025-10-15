import SearchBar from "@/components/SearchBar";

export default function MainHero() {
  return (
    <section className="bg-[url('/img/main-hero.webp')]  bg-cover h-172.5 md:h-157 xl:bg-right bg-no-repeat xl:bg-contain  xl:h-138.5 ">
      <div className="pb-10 px-3  sm:px-10 lg:px-30 xl:px-0 xl:container mx-auto    w-full h-full bg-gradient-to-t from-black/70 to-transparent  xl:from-transparent xl:bg-transparent xl:h-auto xl:mx-auto flex flex-col items-center justify-end md:justify-center xl:items-start space-y-4 ">
        <h1 className="text-4xl  text-center xl:text-left text-white md:text-5xl md:w-130 lg:text-left xl:text-[#3559B6] lg:text-6xl lg:w-120 font-bold">
          Conecta con tu propiedad ideal
        </h1>
        <h4 className="text-white text-center text-2xl lg:text-3xl xl:text-left  md:text-2xl w-full xl:text-[#8F909A] xl:text-2xl xl:w-120">
          Descubre las nuevas propiedades que están disponibles en la zona que
          gustes habitar.
        </h4>
        <SearchBar />
      </div>
    </section>
  );
}
