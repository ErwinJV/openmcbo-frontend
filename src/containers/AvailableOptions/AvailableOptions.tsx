import Button from "@/components/Button";
import { IoArrowForward } from "react-icons/io5";
import PropertiesSlider from "../PropertiesSlider";
import { propertiesImages } from "@/utils/test";

export default async function AvailableOptions() {
  return (
    <section className="w-full lg:h-243.5 ">
      <div className="px-20 xl:px-0 xl:container flex flex-col mx-auto justify-center space-y-6 w-full">
        <div className="flex w-full justify-between">
          <div className="flex flex-col space-y-1">
            <h2 className="text-[#D9A300] text-lg uppercase ">
              Listado de Propiedades
            </h2>
            <h3 className="text-[#003593] font-bold text-4xl">
              Explora las Opciones disponibles
            </h3>
            <p className="text-[12px] text-[#8F909A]">
              Selecciona las propiedades disponibles y revisa sus detalles
            </p>
          </div>
          <div className="w-auto self-center">
            <Button
              text="Mas Opciones"
              variant="tonal"
              size="small"
              rightIcon={<IoArrowForward className="text-blue-700" />}
            />
          </div>
        </div>
        <PropertiesSlider cards={propertiesImages} />
      </div>
    </section>
  );
}
