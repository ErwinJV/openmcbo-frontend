import Button from "@/components/Button";

import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

export default function AboutUsPage() {
  return (
    <main className="container mx-auto w-[90%]  md:w-169  xl:w-270 py-12">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:grid-rows-1 w-full h-full ">
        <div className="md:col-span-1 md:row-span-1 xl:row-span-2 xl:col-span-1">
          <Image
            src="/img/about-us.webp"
            className="w-full h-full object-cover"
            width={2040}
            height={1080}
            alt="Sobre Nosotros"
          />
        </div>
        <div className="md:col-span-1 md:row-span-1 xl:col-span-2 xl-row-span-1  flex flex-col space-y-3 self-center ">
          <h1 className="text-[#D9A300] text-center  xl:text-left text-lg md:text-xl   uppercase">
            Sobre Nosotros
          </h1>
          <h2 className="text-3xl md:text-5xl text-center xl:text-left xl:text-6xl font-extrabold text-[#003593]">
            Conectando familias con su espacio ideal en Maracaibo
          </h2>
          <p className="text-[#8F909A] text-xl md:text-2xl xl:w-[80%] text-center xl:text-left">
            En Open Maracaibo entendemos que buscar una propiedad es mucho más
            que una simple transacción; es el comienzo de una nueva etapa. Por
            eso, hemos creado un espacio diseñado para simplificar el mercado
            inmobiliario local, conectándote con las mejores opciones de la
            ciudad de forma rápida, directa y segura.
          </p>
        </div>
        <div className="md:col-span-1 md:row-span-1 xl:col-span-2 xl-row-span-1 flex flex-col md:justify-between items-center space-y-8">
          <div className="flex w-full  flex-wrap  md:justify-between xl:justify-start space-y-8 md:space-x-8 xl:space-x-0 ">
            <div className="flex flex-col space-y-2 w-full md:w-[45%] xl:w-auto items-center xl:items-start">
              <Image
                alt="house icon"
                className="w-[54px] h-[54px]  md:w-[80px] md:h-[80px] "
                height={120}
                src="/icons/house-1.svg"
                width={120}
              />
              <h3 className="text-[#0D263B] text-2xl">Asesoramiento</h3>
              <p className="text-[#7C8893] text-lg md:text-xl text-center xl:text-left">
                Guía experta y personalizada en cada paso de tu proceso de
                compra, venta o alquiler.
              </p>
            </div>
            <div className="flex flex-col space-y-2 w-full md:w-[45%] xl:w-auto items-center xl:items-start">
              <Image
                alt="money icon"
                className="w-[54] h-[54] md:w-[80px] md:h-[80px] "
                height={120}
                src="/icons/money-1.svg"
                width={120}
              />
              <h3 className="text-[#0D263B] text-2xl">Confianza</h3>
              <p className="text-[#7C8893] text-lg md:text-xl text-center xl:text-left">
                Transacciones transparentes, respaldadas por un profundo
                conocimiento del mercado local.
              </p>
            </div>
          </div>

          <Link className="md:self-center xl:self-start" href="/inmuebles">
            <Button
              size="medium"
              removePadding
              rightIcon={<IoArrowForward />}
              variant="text"
              text="Ver propiedades"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
