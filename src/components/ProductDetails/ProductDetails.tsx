import { MdNorthEast } from "react-icons/md";
import SpecRow from "../SpecRow";
import CopyLinkButton from "../CopyLinkButton";

interface Spec {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ProductDetailsProps {
  brand: string;
  category: string;
  title: string;
  specs: Spec[];
  storeUrl: string;
}

export default function ProductDetails({
  brand,
  category,
  title,
  specs,
  storeUrl,
}: ProductDetailsProps) {
  return (
    <div className="lg:col-span-5 flex flex-col justify-center align-middle">
      <div className="bg-[#FFFFFF] border border-line rounded-2xl p-6 sm:p-8 shadow-subtle flex flex-col">
        {/* Etiqueta de fabricante / categoría */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-brand-500 text-white text-[11px] font-extrabold uppercase tracking-wider">
              {brand}
            </span>
            <span className="text-xs font-bold text-muted uppercase tracking-wider">
              {category}
            </span>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight leading-tight mb-6">
          {title}
        </h1>

        {/* Especificaciones técnicas */}
        <div className="border-t border-b border-line py-4 mb-6 flex flex-col divide-y divide-line/60">
          {specs.map((spec) => (
            <SpecRow
              key={spec.label}
              icon={spec.icon}
              label={spec.label}
              value={spec.value}
            />
          ))}
        </div>

        {/* CTA principal */}
        <div className="flex flex-col gap-3">
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-cta transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            <span>Ir a la tienda oficial del fabricante</span>
            <MdNorthEast size={20} />
          </a>

          <p className="text-xs text-muted text-center leading-relaxed px-1">
            Serás redirigido a la plataforma del fabricante para consultar
            disponibilidad, fichas técnicas completas y compras.
          </p>

          <CopyLinkButton />
        </div>
      </div>
    </div>
  );
}
