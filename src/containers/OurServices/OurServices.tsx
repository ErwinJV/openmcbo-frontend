import ImageCard from "@/components/ImageCard";
import {
  WHATSAPP_URL_BUY,
  WHATSAPP_URL_RENT,
  WHATSAPP_URL_SELL,
} from "@/schema/contact";

const services: {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}[] = [
  {
    title: "Comprar",
    description:
      "Encuentra tu hogar ideal en las mejores zonas con nuestro catálogo exclusivo y asesoría personalizada.",
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    link: WHATSAPP_URL_BUY,
  },
  {
    title: "Alquilar",
    description:
      "Descubre opciones flexibles que se adaptan a tu presupuesto con un proceso ágil y seguro.",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    link: WHATSAPP_URL_RENT,
  },
  {
    title: "Vender",
    description:
      "Vendemos tu propiedad al mejor precio del mercado con nuestra estrategia técnica y legal.",
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800",
    link: WHATSAPP_URL_SELL,
  },
];

export default function OurServices() {
  return (
    <section className="w-full">
      <div className="container flex  flex-col xl:flex-row space-y-2 mx-auto   lg:px-0">
        <div className="flex flex-col xl:w-[25%] p-3 ">
          <h2 className="capitalize text-[#003593] text-center xl:text-left text-3xl  font-bold">
            Nuestros Servicios
          </h2>
          <p className="text-[#9795B5] text-xl  text-center xl:text-left">
            Te acompañamos en todo el proceso para consignar el lugar de tus
            sueños
          </p>
        </div>

        <div className="w-full flex justify-center space-y-4 lg:space-y-0 space-x-2  flex-wrap ">
          {services.map((service) => (
            <ImageCard
              description={service.description}
              key={service.title + service.description}
              imageUrl={service.imageUrl}
              title={service.title}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
