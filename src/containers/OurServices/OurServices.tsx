import IconCard from "@/components/IconCard";
import {
  WHATSAPP_URL_BUY,
  WHATSAPP_URL_RENT,
  WHATSAPP_URL_SELL,
} from "@/schema/contact";

const services: {
  iconSrc: string;
  title: string;
  description: string;
  link: string;
}[] = [
  {
    description:
      "Haz realidad el sueño de tener casa propia. Contamos con un catálogo exclusivo de propiedades en las mejores zonas y te guiamos en cada paso del proceso de compra.",
    iconSrc: "/icons/house-service.svg",
    title: "Comprar",
    link: WHATSAPP_URL_BUY,
  },
  {
    description:
      "¿Buscas un nuevo comienzo? Te ofrecemos opciones flexibles de alquiler que se ajustan a tu presupuesto, con un proceso de selección ágil y acompañamiento legal garantizado.",
    iconSrc: "/icons/building-service.svg",
    title: "Alquilar",
    link: WHATSAPP_URL_RENT,
  },
  {
    description:
      "Ponemos tu inmueble frente a los compradores correctos. Con nuestra asesoría técnica y legal, vendes más rápido, de forma segura y al mejor precio del mercado actual.",
    iconSrc: "/icons/key-service.svg",
    title: "Vender",
    link: WHATSAPP_URL_SELL,
  },
];
export default function OurServices() {
  return (
    <section className="w-full">
      <div className="container flex flex-col space-y-8 mx-auto px-5 lg:px-0">
        <h2 className="capitalize text-[#003593] text-4xl md:text-5xl text-center font-bold">
          Nuestros Servicios
        </h2>
        <p className="text-[#9795B5] text-xl md:text-2xl  xl:text-3xl text-center">
          Te acompañamos en todo el proceso para consignar el lugar de tus
          sueños
        </p>
        <div className="w-full flex justify-center space-y-4 lg:space-y-0 space-x-4  flex-wrap ">
          {services.map((service) => (
            <IconCard
              description={service.description}
              key={service.title + service.description}
              iconSrc={service.iconSrc}
              title={service.title}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
