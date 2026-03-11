"use client";
import Card from "@/components/Card";
import { Property } from "@/graphql/generated-types";

interface PropertiesGridProps {
  properties: Property[];
}

export default function PropertiesGrid({ properties }: PropertiesGridProps) {
  return (
    <div className="my-12 w-full flex justify-center">
      <div className="  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-24 ">
        {properties.map((property) => (
          <Card
            description={property.description}
            price={property.price}
            srcImg={
              property.images && property.images.length >= 3
                ? [
                    property.images[0].url,
                    property.images[1].url,
                    property.images[2].url,
                  ]
                : []
            }
            title={property.title}
            url={`/inmuebles/${property.slug}`}
            key={property.id}
          />
        ))}
      </div>
    </div>
  );
}
