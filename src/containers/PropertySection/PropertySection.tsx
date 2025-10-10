import GalleryOptions from "@/components/GalleryOptions";
import { Property } from "@/graphql/generated-types";
import GalleryWrapper from "../GalleryWrapper";
import GalleryPics from "@/components/GalleryPics";
import PropertyDescription from "@/components/PropertyDescription";
import Pad from "@/components/Pad";

interface PropertySectionProps {
  property: Property;
}

export default function PropertySection({ property }: PropertySectionProps) {
  return (
    <main className="container mx-auto flex flex-col ">
      <div className="grid xl:grid-cols-2 w-9/10 md:w-170  xl:w-282 mx-auto">
        <div className="flex mx-auto">
          <h1 className="text-[#3559B6] text-3xl text-center md:text-left md:w-162  md:text-4xl xl:w-auto xl:text-4xl font-bold  ">
            {property.title}
          </h1>
        </div>
        <div className="xl:flex justify-end h-auto hidden ">
          <GalleryOptions
            has360Pics={false}
            hasPics
            hasVideos
            hasVirtualTour={false}
          />
        </div>
      </div>
      {property.images && (
        <GalleryWrapper targetView="pics">
          <GalleryPics pics={property.images ? property.images : null} />
        </GalleryWrapper>
      )}
      <div className="flex justify-center h-auto xl:hidden">
        <GalleryOptions
          has360Pics={false}
          hasPics
          hasVideos
          hasVirtualTour={false}
        />
      </div>
      <Pad amt={20} />
      {property?.images?.length && (
        <PropertyDescription
          area={100}
          description={property.description}
          imgUrl={property?.images[0].url}
          place={property.place}
          price={property.price}
          title={property.title}
          type={property.type}
          num_baths={property.num_bathrooms || 0}
          num_bedrooms={property.num_bedrooms || 0}
        />
      )}
    </main>
  );
}
