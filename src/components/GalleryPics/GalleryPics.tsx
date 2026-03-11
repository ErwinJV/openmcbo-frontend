import { PropertyImage } from "@/graphql/generated-types";
import Image from "next/image";
import Link from "next/link";

interface GalleryPicsProps {
  pics: PropertyImage[] | null;
}

export default function GalleryPics({ pics }: GalleryPicsProps) {
  if (!pics || pics.length === 0) {
    return (
      <span className="text-2xl font-bold  w-9/10 h- md:w-170 md:h-87.5  xl:w-282 xl:h-98">
        No hay imagenes....
      </span>
    );
  }
  return (
    <ul className="grid grid-cols-1 md:grid-cols-4  gap-3 w-9/10  md:w-170   xl:w-282  mx-auto ">
      <li className=" md:row-span-2 md:col-span-2 aspect-square">
        <Link
          className="w-full h-full"
          href={pics[0].url}
          data-fancybox="gallery"
        >
          <Image
            className="object-cover w-full h-full "
            src={pics[0].url}
            alt={pics[0].id}
            width={480}
            height={320}
            quality={30}
          />
        </Link>
      </li>
      <li className="hidden md:flex  aspect-square  ">
        <Link
          className="w-full h-full"
          href={pics[1].url}
          data-fancybox="gallery"
        >
          <Image
            className="object-cover w-full h-full overflow-hidden"
            src={pics[1].url}
            alt={pics[1].id}
            width={480}
            height={320}
            quality={30}
          />
        </Link>
      </li>
      <li className="hidden md:inline-block aspect-square ">
        <Link
          className="w-full h-full"
          href={pics[2].url}
          data-fancybox="gallery"
        >
          <Image
            className="object-cover w-full h-full overflow-hidden"
            src={pics[2].url}
            alt={pics[2].id}
            width={480}
            height={320}
            quality={30}
          />
        </Link>
      </li>
      <li className="hidden md:inline-block aspect-square ">
        <Link className="w-full" href={pics[3].url} data-fancybox="gallery">
          <Image
            className="object-cover w-full h-full aspect-square"
            src={pics[3].url}
            alt={pics[3].id}
            width={480}
            height={320}
            quality={30}
          />
        </Link>
      </li>
      <li className="hidden md:inline-block relative aspect-square ">
        <Link
          className="w-full h-full z-20"
          href={pics[4].url}
          data-fancybox="gallery"
        >
          <div className="absolute z-10 bottom-0 left-0 w-full h-full bg-black/40">
            <span className="text-white font-bold text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              +{pics.length - 5}
            </span>
          </div>
          <Image
            className="object-cover w-full h-full"
            src={pics[4].url}
            alt={pics[4].id}
            width={480}
            height={320}
            quality={30}
          />
        </Link>
        {pics.length > 5 && (
          <div className="hidden">
            {pics.slice(5).map((pic) => (
              <Link key={pic.id} href={pic.url} data-fancybox="gallery">
                {pic.id}
              </Link>
            ))}
          </div>
        )}
      </li>
    </ul>
  );
}
