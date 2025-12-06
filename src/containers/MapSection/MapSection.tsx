import Button from "@/components/Button";
import Link from "next/link";
import PropertyMap from "../PropertyMap";

interface MapSectionProps {
  lat: number;
  long: number;
}

export default function MapSection({ lat, long }: MapSectionProps) {
  return (
    <section className="w-full">
      <div className="container mx-auto flex flex-col space-y-2 xl:px-20">
        <div className="flex w-full justify-between">
          <div className="flex flex-col w-full">
            <h2 className="text-[#3559B6] font-bold text-center text-2xl xl:text-left xl:text-4xl">
              Buscar Propiedad por ubicacion
            </h2>
            <p className="text-[#8F909A] text-center text-lg xl:text-left xl:text-xl">
              ¿Estás interesado en vivir en alguna zona en particular?, Revisa
              las propiedades disponibles según su ubicación.
            </p>
          </div>
          <Link href={"#"} className="hidden xl:inline-block">
            <Button size="medium" variant="filled" text="Contactar" />
          </Link>
        </div>

        <div className="bg-[#E9EDF7] px-3 pb-3 pt-1 xl:p-0 xl:bg-transparent flex flex-col space-y-3 w-full">
          <PropertyMap lat={lat} long={long} />
          <Link
            href={"#"}
            className="w-full md:w-auto md:self-center inline-block xl:hidden"
          >
            <Button size="medium" variant="filled" text="Contactar" />
          </Link>
        </div>
      </div>
    </section>
  );
}
