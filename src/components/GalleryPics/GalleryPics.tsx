import { PropertyImage } from "@/graphql/generated-types";
import Image from "next/image";

interface GalleryPicsProps {
  pics: PropertyImage[] | null;
}

export default function GalleryPics({ pics }: GalleryPicsProps) {
  if (!pics || pics.length === 0) {
    return <span className="text-2xl font-bold my-3">No hay imagenes....</span>;
  }
  return (
    <ul className="grid grid-cols-1 md:grid-cols-4  gap-3 w-9/10 h- md:w-170 md:h-87.5  xl:w-282 xl:h-98 mx-auto">
      <li className=" md:row-span-2 md:col-span-2">
        <Image
          className=" object-cover w-full h-full"
          src={pics[0].url}
          alt={pics[0].id}
          width={1080}
          height={720}
          quality={70}
        />
      </li>
      <li className="hidden md:flex ">
        <Image
          className="object-cover w-full h-full"
          src={pics[1].url}
          alt={pics[1].id}
          width={1080}
          height={720}
          quality={70}
        />
      </li>
      <li className="hidden md:inline-block ">
        <Image
          className="object-cover w-full h-full"
          src={pics[2].url}
          alt={pics[2].id}
          width={1080}
          height={720}
          quality={70}
        />
      </li>
      <li className="hidden md:inline-block ">
        <Image
          className="object-cover w-full h-full"
          src={pics[3].url}
          alt={pics[3].id}
          width={1080}
          height={720}
          quality={70}
        />
      </li>
      <li className="hidden md:inline-block ">
        <Image
          className="object-cover w-full h-full"
          src={pics[4].url}
          alt={pics[4].id}
          width={1080}
          height={720}
          quality={70}
        />
      </li>
    </ul>
  );
}
