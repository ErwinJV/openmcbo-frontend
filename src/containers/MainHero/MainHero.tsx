import SearchBar from "@/components/SearchBar";

export default function MainHero() {
  return (
    <main className="bg-[url('/img/main-hero.webp')]  bg-cover h-172.5 md:h-157 xl:bg-right bg-no-repeat xl:bg-contain  xl:h-138.5 w-full">
      <div className="pb-10 md:pb-0 xl:container h-full bg-gradient-to-t from-black/50 to-transparent  xl:from-transparent xl:bg-transparent xl:h-auto xl:mx-auto flex flex-col items-center justify-end md:justify-center xl:items-start space-y-4 ">
        <h1 className="text-4xl text-center text-white md:text-5xl md:w-130 lg:text-left xl:text-[#3559B6] lg:text-6xl lg:w-120 font-bold">
          Conecta con tu propiedad ideal
        </h1>
        <h4 className="text-white text-center text-lg w-100 xl:text-[#8F909A] xl:text-xl xl:w-120">
          Descubre las nuevas propiedades que están disponibles en la zona que
          gustes habitar.
        </h4>
        <SearchBar />
      </div>
    </main>
  );
}
