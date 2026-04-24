import GalleryOptions from "@/components/GalleryOptions";
import { Property } from "@/graphql/generated-types";
import GalleryWrapper from "../GalleryWrapper";
import GalleryPics from "@/components/GalleryPics";
import PropertyDescription from "@/components/PropertyDescription";
import Pad from "@/components/Pad";
import SwiperVideos from "../SwiperVideos";
import Swiper360Images from "@/components/Swiper360Images";
import FancyBoxWrapper from "../FancyBoxWrapper";

interface PropertySectionProps {
  property: Property;
}

export default function PropertySection({ property }: PropertySectionProps) {
  return (
    <main className="container mx-auto flex flex-col ">
      <div className="grid xl:grid-cols-2 w-9/10 md:w-170  xl:w-282 mx-auto">
        <div className="flex mx-auto justify-start w-full ">
          <h1 className="text-[#3559B6]  text-3xl   md:text-left md:w-162  md:text-4xl xl:w-auto xl:text-4xl font-bold  ">
            {property.title}
          </h1>
        </div>
        <div className="xl:flex justify-end h-auto hidden ">
          <GalleryOptions
            has360Pics={
              property.images360 && property.images360.length > 0 ? true : false
            }
            hasPics={
              !!property.images &&
              property.images.length > 0 &&
              ((property.videos && property.videos.length > 0) ||
                (property.images360 && property.images360.length > 0))
                ? true
                : false
            }
            hasVideos={
              property.videos && property.videos.length > 0 ? true : false
            }
            hasVirtualTour={false}
          />
        </div>
      </div>
      {property.images && (
        <GalleryWrapper targetView="pics">
          <FancyBoxWrapper>
            <GalleryPics
              pics={property.images ? property.images : null}
              main_picture={property.main_picture_url || ""}
            />
          </FancyBoxWrapper>
        </GalleryWrapper>
      )}
      {property.videos && (
        <GalleryWrapper targetView="videos">
          <SwiperVideos videos={property.videos} />
        </GalleryWrapper>
      )}

      {property.images360 && (
        <GalleryWrapper targetView="pics360">
          <Swiper360Images images={property.images360} />
        </GalleryWrapper>
      )}
      <div className="flex justify-center h-auto xl:hidden">
        <GalleryOptions
          has360Pics={
            property.images360 && property.images360.length > 0 ? true : false
          }
          hasPics={
            !!property.images &&
            property.images.length > 0 &&
            ((property.videos && property.videos.length > 0) ||
              (property.images360 && property.images360.length > 0))
              ? true
              : false
          }
          hasVideos={
            property.videos && property.videos.length > 0 ? true : false
          }
          hasVirtualTour={false}
        />
      </div>
      <Pad amt={40} />
      {property?.images?.length && (
        <PropertyDescription
          area={100}
          description={property.description}
          imgUrl={property?.main_picture_url || ""}
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
