"use client";

import { Property, PropertyStatus } from "@/graphql/generated-types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

function Card({
  title,
  price,
  slug,
  main_picture_url,
}: {
  title: string;
  price: number;
  slug: string;
  main_picture_url: string;
}) {
  return (
    <Link
      className="group relative flex h-full w-full overflow-hidden  shadow-md transition-shadow duration-300 hover:shadow-xl"
      href={`/inmuebles/${slug}`}
      target="_blank"
    >
      {/* Imagen con efecto de zoom al pasar el cursor */}
      <Image
        alt={title}
        src={main_picture_url}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        width={1080}
        height={720}
      />

      {/* Gradiente superpuesto para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Contenedor de Texto */}
      <div className="absolute bottom-0 flex w-full flex-col justify-end p-5">
        <h3 className="mb-1 line-clamp-2 text-lg font-bold leading-tight text-white sm:text-xl">
          {title}
        </h3>
        <p className="text-xl font-extrabold text-white sm:text-2xl">
          ${price.toLocaleString("en-US")}
        </p>
      </div>
    </Link>
  );
}

export default function MainHeroMotion({
  properties,
}: {
  properties: Property[];
}) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<PropertyStatus>(PropertyStatus.Sale);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const slides = useMemo(
    () =>
      (properties || []).map((prop) => ({
        id: prop.id,
        component: (
          <Card
            title={prop.title}
            price={prop.price}
            slug={prop.slug}
            main_picture_url={prop.main_picture_url || ""}
          />
        ),
      })),
    [properties],
  );

  const handleSearch = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const filterSearchParams = new URLSearchParams({
        term: searchTerm,
        status: mode,
      }).toString();

      const url = `/inmuebles?${filterSearchParams}`;
      router.push(url);
    },
    [searchTerm, mode, router],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section className="w-full flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* LEFT CONTENT */}
        <div className="max-w-lg w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#003593] leading-tight">
            Conecta con tu
            <br />
            propiedad ideal
          </h1>

          <p className="mt-4 text-[#8F909A] text-base lg:text-lg">
            Descubre las nuevas propiedades que están disponibles en la zona que
            gustes habitar.
          </p>

          {/* Toggle buttons */}
          <div className="flex  mt-6">
            <button
              onClick={() => setMode(PropertyStatus.Rent)}
              className={`px-5 py-2  font-medium transition ${
                mode === PropertyStatus.Rent
                  ? "bg-[#003593] text-white"
                  : "bg-[#C5C6D0] text-[#003593]"
              }`}
            >
              Alquilar
            </button>

            <button
              onClick={() => setMode(PropertyStatus.Sale)}
              className={`px-5 py-2  font-medium transition ${
                mode === PropertyStatus.Sale
                  ? "bg-[#003593] text-white"
                  : "bg-[#C5C6D0] text-[#003593]"
              }`}
            >
              Comprar
            </button>
          </div>

          {/* Search */}
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Buscar por Ubicación, Título o Descripción..."
              className="flex-1 px-4 py-3  border border-[#C5C6D0] focus:outline-none focus:ring-2 focus:ring-[#3559B6]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              type="submit"
              className="bg-[#003593] text-white px-6 py-3  font-medium hover:bg-[#3559B6] transition cursor-pointer"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* RIGHT ANIMATION */}
        <div className="relative w-full max-w-md h-[300px] sm:h-[350px] lg:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id}
              className="absolute w-full h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              {current?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
