"use client";

import { customMessagesByProperty } from "@/schema/contact";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ContactProperty({
  price = "500 $",
  title = "Apartamento en Av. 8 Santa Rita",
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Busca los elementos en el DOM.
    // IMPORTANTE: Debes agregar id="navbar" a tu componente Navbar y id="footer" al Footer.
    const navbar = document.getElementById("navbar");
    const footer = document.getElementById("footer");

    if (!navbar || !footer) {
      console.warn("Navbar o Footer no encontrados en el DOM. Revisa los IDs.");
      return;
    }

    let isNavbarVisible = true;
    let isFooterVisible = false;

    // Lógica principal: mostrar solo si el navbar y el footer están fuera de la pantalla
    const updateVisibility = () => {
      setIsVisible(!isNavbarVisible && !isFooterVisible);
    };

    // Observer para el Navbar
    const navbarObserver = new IntersectionObserver(([entry]) => {
      isNavbarVisible = entry.isIntersecting;
      updateVisibility();
    });

    // Observer para el Footer
    const footerObserver = new IntersectionObserver(([entry]) => {
      isFooterVisible = entry.isIntersecting;
      updateVisibility();
    });

    navbarObserver.observe(navbar);
    footerObserver.observe(footer);

    return () => {
      navbarObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
        {/* Información del inmueble (Precio y Título) */}
        <div className="flex flex-col overflow-hidden">
          <span className="text-xl md:text-2xl font-bold text-gray-900">
            {price}
          </span>
          <span className="text-sm text-gray-500 truncate hidden sm:block">
            {title}
          </span>
        </div>

        {/* Botón de acción */}
        <Link
          href={customMessagesByProperty(title)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2b50aa] hover:bg-[#1e3a8a] text-white font-medium py-2.5 px-8 rounded-md transition-colors w-full sm:w-auto text-center whitespace-nowrap shadow-sm"
        >
          Contactar
        </Link>
      </div>
    </div>
  );
}
