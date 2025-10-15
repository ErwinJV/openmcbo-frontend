import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
export default function WhatWeDo() {
  return (
    <section className="w-full  p-5 bg-[#EFF2F9] py-12 ">
      <div className="w-full h-full grid md:grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="flex justify-center items-center col-span-1 lg:col-span-2">
          <Image
            src="/img/what-we-do.webp"
            alt="What we do"
            width={1080}
            height={720}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col space-y-6 col-span-1 lg:col-span-3 px-3 md:px-7 lg:px-0 ">
          <h2 className="text-[#3559B6] font-bold text-center lg:text-left text-3xl md:text-5xl">
            Somos tu asesoría inmobiliaria profesional
          </h2>
          <p className="text-[#8F909A] text-center  text-lg  md:text-xl lg:text-left  lg:text-2xl">
            Si tienes preguntas o consultas sobre la propiedad que deseas
            adquirir, no dudes en contactar nuestros servicios
          </p>
          <Link href="#" className="w-auto md:self-center lg:self-start">
            <Button size="medium" text="Contactanos" variant="filled" />
          </Link>
        </div>
      </div>
    </section>
  );
}
