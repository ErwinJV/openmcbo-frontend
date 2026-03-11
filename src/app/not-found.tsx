import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

export default function NotFoundPage() {
  return (
    <main className="px-10 container h-[calc(100vh-270px)] md:h-[calc(100vh-200px)] lg:h-[calc(100vh-300px)]  mx-auto w-full lg:p-14 flex flex-col justify-center items-center bg-white">
      <Image
        src={"/img/404.svg"}
        className="w-[90%] sm:w-120 md:w-150"
        width={1080}
        height={720}
        alt="404 image"
      />
      <h1 className="text-[#3559B6] text-lg sm:text-xl text-center md:text-2xl mt-12 mb-3">
        La pagina que buscas no puede ser localizada
      </h1>
      <Link
        href="/"
        className="hidden self-center md:inline-block w-auto cursor-pointer"
      >
        <Button
          size="medium"
          variant="filled"
          text="Volver al Inicio"
          rightIcon={<IoArrowForward />}
        />
      </Link>
      <Link href="/" className="self-center md:hidden w-auto cursor-pointer">
        <Button
          size="small"
          variant="filled"
          text="Volver al Inicio"
          rightIcon={<IoArrowForward />}
        />
      </Link>
    </main>
  );
}
