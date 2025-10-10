import Image from "next/image";
import React from "react";
import Button from "../Button";
import { IoArrowForward } from "react-icons/io5";

interface IconCardProps {
  iconSrc: string;
  title: string;
  description: string;
  className?: string;
}

export default function IconCard({
  iconSrc,
  title,
  description,
}: IconCardProps) {
  return (
    <div
      className="
      flex flex-col items-center justify-center text-center p-8
      bg-[#F5F7FB] rounded-2xl
      w-[360px] h-[428px]
      md:w-[320px] md:h-[380px] md:p-6
      sm:w-[280px] sm:h-[340px] sm:p-4
      ${className}
    "
    >
      {/* Contenedor del icono */}
      <div
        className="
        flex items-center justify-center
        bg-white rounded-full
        w-40 h-40 mb-6
     md:mb-4
        sm:mb-4
      "
      >
        <Image src={iconSrc} alt={title} width={108} height={106} />
      </div>

      {/* Título */}
      <h3
        className="
        text-[#3559B6] font-bold
        text-2xl mb-4
        md:text-xl md:mb-3
        sm:text-lg sm:mb-3
      "
      >
        {title}
      </h3>

      {/* Descripción */}
      <p
        className="
        text-[#757680] font-normal
        text-base mb-6
        md:text-sm md:mb-5
        sm:text-sm sm:mb-4
      "
      >
        {description}
      </p>

      {/* [ESPACIO PARA BOTÓN] */}
      <div className="w-auto self-center">
        <Button
          size="small"
          rightIcon={<IoArrowForward className="text-blue-700 " />}
          variant="text"
          text="Contactanos"
        />
      </div>
    </div>
  );
}
