import Image from "next/image";
import Button from "../Button";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import { useState, useCallback } from "react";

interface CardProps {
  description: string;
  price: number;
  srcImg: string[];
  title: string;
  url: string;
}

export default function Card({
  description,
  price,
  srcImg,
  title,
  url,
}: CardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev === srcImg.length - 1 ? 0 : prev + 1));
  }, [srcImg.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev === 0 ? srcImg.length - 1 : prev - 1));
  }, [srcImg.length]);

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  // Manejo de eventos táctiles y de mouse
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startX - currentX;
    const threshold = 50; // Umbral mínimo de desplazamiento

    if (diff > threshold) {
      nextImage();
    } else if (diff < -threshold) {
      prevImage();
    }
  };

  // Eventos de mouse
  const onMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const onMouseUp = () => {
    handleEnd();
  };

  // Eventos táctiles
  const onTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleEnd();
  };

  // Auto-play opcional (descomenta si lo quieres)
  /*
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);
  */

  return (
    <div className="flex flex-col w-[298.8px] md:w-[332px] lg:w-[360px] h-[431.1px] md:h-[479px] lg:h-[519px] shadow-xl">
      <div
        className="relative w-full h-[286.65px] md:h-[318.28px] lg:h-[346px] bg-[#EFF2F9] overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Contenedor de imágenes con transición */}
        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {srcImg.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              {!src ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">Sin imagen</span>
                </div>
              ) : (
                <Image
                  alt={`${title} - Imagen ${index + 1}`}
                  className="object-cover w-full h-full"
                  height={346}
                  src={src}
                  width={360}
                  quality={50}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>

        {/* Indicadores de puntos */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {srcImg.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage ? "bg-white scale-125" : "bg-white/50"
              }`}
              onClick={() => goToImage(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-1  justify-between w-full h-[144.45px] md:h-[160.72px] lg:h-[173px] py-[13.21px] px-[19.81px] md:py-[14.67px] md:px-[22.01px] lg:py-4 lg:px-6">
        <div className="flex flex-col  justify-between w-full">
          <h1 className=" font-bold text-[19.81px] md:text-xl  ">{title}</h1>
          <h2 className="font-semibold text-[#8F909A] text-[14.56px] md:text-[16.51px] lg:text-[18px] w-[50px] md:w-[56px] lg:w-[61px] ">
            ${price.toLocaleString("us")}
          </h2>
        </div>

        <Link href={url} className="md:hidden self-start" target="_blank">
          <Button
            size="small"
            variant="text"
            rightIcon={<IoArrowForward size={14} />}
            text="Ver completo"
            removePadding
          />
        </Link>
        <Link
          href={url}
          className="hidden md:inline lg:hidden self-start"
          target="_blank"
        >
          <Button
            size="medium"
            variant="text"
            rightIcon={<IoArrowForward size={14} />}
            text="Ver completo"
            removePadding
          />
        </Link>
        <Link
          href={url}
          className="hidden lg:inline self-start"
          target="_blank"
        >
          <Button
            size="large"
            variant="text"
            rightIcon={<IoArrowForward size={14} />}
            text="Ver completo"
            removePadding
          />
        </Link>
      </div>
    </div>
  );
}
