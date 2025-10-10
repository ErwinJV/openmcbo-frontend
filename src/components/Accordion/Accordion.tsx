"use client";
import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Cerrar el accordion al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={accordionRef} className="relative w-full">
      {/* Botón para abrir/cerrar el accordion */}
      <button
        type="button"
        className="accordion-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <IoChevronDown
          className={`accordion-icon ${isOpen ? "accordion-icon-open" : ""}`}
        />
      </button>

      {/* Contenido del accordion */}
      <div
        ref={contentRef}
        className="accordion-content"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div className="p-0">{children}</div>
      </div>
    </div>
  );
}
