import { PropertyStatus, PropertyType } from "@/graphql/generated-types";
import FilterSection from "../FilterSection";
import SearchResults from "@/components/SearchResults";

interface PropertiesHeroProps {
  propertyType: PropertyType;
  propertyStatus: PropertyStatus;
  total: number;
}

// Mapeo de contenido para cada combinación
const contentMap = {
  [PropertyType.Apartment]: {
    [PropertyStatus.Rent]: {
      title: "Apartamentos en Alquiler",
      description:
        "Encuentra el apartamento perfecto para alquilar. Amplia selección de apartamentos modernos y bien ubicados para tu comodidad.",
    },
    [PropertyStatus.Sale]: {
      title: "Apartamentos en Venta",
      description:
        "Descubre apartamentos en venta con las mejores ubicaciones y amenities. Tu nuevo hogar te espera.",
    },
  },
  [PropertyType.House]: {
    [PropertyStatus.Rent]: {
      title: "Casas en Alquiler",
      description:
        "Encuentra casas espaciosas para alquilar. Perfectas para familias que buscan comodidad y privacidad.",
    },
    [PropertyStatus.Sale]: {
      title: "Casas en Venta",
      description:
        "Explora nuestra selección de casas en venta. Desde acogedoras viviendas hasta lujosas residencias.",
    },
  },
};

export default function PropertiesHero({
  propertyType,
  propertyStatus,
  total,
}: PropertiesHeroProps) {
  // Obtener el contenido basado en los props
  const content = contentMap[propertyType]?.[propertyStatus] || {
    title: "Propiedades Disponibles",
    description:
      "Descubre nuestra selección de propiedades que se adaptan a tus necesidades.",
  };

  return (
    <section className="w-full">
      <div className="container  mx-auto bg-[url('/img/panorama-mcbo.webp')] bg-cover md:w-170 w-full h-auto md:h-70  lg:w-230 xl:w-282  flex flex-col ">
        <div className="px-8 md:px-14 flex flex-col justify-center space-y-5 py-4  h-full w-full bg-black/40">
          <div className="flex flex-col">
            <h1 className="text-white  text-2xl md:text-left xl:text-4xl font-bold">
              {content.title}
            </h1>
            <p className="text-white hidden md:contents  md:text-left text-lg xl:text-xl  xl:w-141.5">
              {content.description}
            </p>
          </div>

          <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row space-x-2.5">
            <SearchResults total={total} />

            <FilterSection />
          </div>
        </div>
      </div>
    </section>
  );
}
