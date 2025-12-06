import IconCard from "@/components/IconCard";

const services: {
  iconSrc: string;
  title: string;
  description: string;
}[] = [
  {
    description:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
    iconSrc: "/icons/house-service.svg",
    title: "Comprar",
  },
  {
    description:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
    iconSrc: "/icons/building-service.svg",
    title: "Alquilar",
  },
  {
    description:
      "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
    iconSrc: "/icons/key-service.svg",
    title: "Vender",
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
        <div className="w-full flex justify-center space-x-3 flex-wrap space-y-3">
          {services.map((service) => (
            <IconCard
              description={service.description}
              key={service.title + service.description}
              iconSrc={service.iconSrc}
              title={service.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
