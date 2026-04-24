import Image from "next/image";
import React from "react";
import Button from "../Button";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";

interface IconCardProps {
  iconSrc: string;
  title: string;
  description: string;
  className?: string;
  link: string;
}

export default function IconCard({
  iconSrc,
  title,
  description,
  link,
}: IconCardProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className="
        flex flex-col items-center justify-center
        bg-[#F5F7FB] rounded-2xl
        w-full max-w-[360px] h-auto min-h-[460px]
        md:max-w-[320px] md:min-h-[460px]
        sm:max-w-[280px] sm:min-h-[360px]
        px-6 py-8
        md:px-5 md:py-6
        sm:px-4 sm:py-4
        transition-transform duration-300 ease-in-out hover:scale-105
      "
    >
      {/* Contenedor del icono - CÍRCULO FIJO Y UNIFORME */}
      <div
        className="
          relative flex-shrink-0
          flex items-center justify-center
          bg-white rounded-full
          w-28 h-28
          md:w-32 md:h-32
          sm:w-24 sm:h-24
          mb-6
          md:mb-5
          sm:mb-4
        "
        style={{
          aspectRatio: "1/1",
          minWidth: "96px",
          maxWidth: "128px",
        }}
      >
        {/* Contenedor interno con padding para el icono */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "65%",
            height: "65%",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={iconSrc}
              alt={title}
              className=""
              width={110}
              height={110}
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* Título */}
      <h3
        className="
          text-[#3559B6] font-bold
          text-2xl mb-3
          md:text-3xl md:mb-2
          sm:text-xl sm:mb-2
          w-full
          text-center
        "
      >
        {title}
      </h3>

      {/* Descripción */}
      <p
        className="
          text-[#757680] font-normal
          text-base mb-4
          md:text-xl md:mb-4
          sm:text-lg sm:mb-3
          w-full
          text-justify
        "
      >
        {description}
      </p>

      {/* Botón */}
      <div className="w-auto self-center mt-auto pt-2">
        <Button
          size="large"
          rightIcon={<IoArrowForward className="text-blue-700" />}
          variant="text"
          text="Contactanos"
        />
      </div>
    </Link>
  );
}
