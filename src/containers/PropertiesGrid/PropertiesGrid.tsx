"use client";
import Card from "@/components/Card";
import { Property } from "@/graphql/generated-types";

interface PropertiesGridProps {
  properties: Property[];
}

export default function PropertiesGrid({ properties }: PropertiesGridProps) {
  return (
    <div className="my-12 w-full flex justify-center">
      <div className=" w-[298.8px] sm:w-[calc(298.8px*2)] md:w-[calc(332px*2)] lg:w-[calc(360px*2)] xl:w-[calc(360px*3)] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 ">
        {properties.map((property, i) => (
          <Card
            description={property.description}
            price={property.price}
            srcImg={property.images?.map((image) => image.url) || []}
            title={property.title}
            url={`/inmuebles/${property.slug}`}
            key={property.id}
          />
        ))}
      </div>
    </div>
  );
}
