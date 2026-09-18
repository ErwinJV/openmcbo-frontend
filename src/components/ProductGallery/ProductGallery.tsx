// components/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Thumbnail from "../Thumbnail";
import { MdCloseFullscreen, MdFullscreen } from "react-icons/md";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mainImage = images[activeIndex];

  const toggleFullscreen = () => {
    const el = document.getElementById("mainDisplayImage");
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      {/* Imagen principal */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface-subtle border border-line shadow-subtle group">
        <Image
          id="mainDisplayImage"
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Pantalla completa"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-heading hover:bg-white transition-colors"
        >
          {isFullscreen ? <MdCloseFullscreen /> : <MdFullscreen />}
        </button>
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {images.map((img, index) => (
          <Thumbnail
            key={img.src}
            src={img.src}
            alt={img.alt}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
