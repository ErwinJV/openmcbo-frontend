import Image from "next/image";
import React from "react";
import Button from "../Button";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
  link: string;
}

export default function ImageCard({
  imageUrl,
  title,
  description,
  link,
  className = "",
}: CardProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className={`
        flex flex-col
        bg-[#F5F7FB]  overflow-hidden
        w-full max-w-[360px] h-[460px] lg:w-[320px] lg:h-[480px]
        transition-transform duration-300 ease-in-out hover:scale-105 
        ${className}
      `}
    >
      {/* Contenedor de la Imagen - 70% de la altura */}
      <div className="relative w-full h-[60%]">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Contenedor de Texto y Botón - 30% de la altura */}
      <div className="flex flex-col justify-between p-4 h-[40%] w-full">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 truncate">{title}</h3>
          <p className="text-lg text-gray-600 mt-1 ">{description}</p>
        </div>

        {/* Botón */}
        <div className="w-auto self-start mt-auto">
          <Button
            size="small"
            removePadding
            rightIcon={<IoArrowForward className="text-blue-700" />}
            variant="text"
            text="Contactanos"
          />
        </div>
      </div>
    </Link>
  );
}
