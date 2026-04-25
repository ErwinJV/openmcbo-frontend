import Pad from "@/components/Pad";

import PropertiesSlider from "@/containers/PropertiesSlider";
import PropertySection from "@/containers/PropertySection";
import PropertyNotAvailable from "@/components/PropertyNotAvailable";
import { getClient } from "@/graphql/client";
import {
  GetPropertiesQuery,
  PaginationDto,
  PropertiesDataResponse,
  Property,
  PropertyFilterInput,
} from "@/graphql/generated-types";
import { GetPropertyQuery } from "@/graphql/queries";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";
import { SwiperOptions } from "swiper/types";

import PropertyMap from "@/containers/PropertyMap";
import ContactProperty from "@/components/ContactProperty";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

const getProperties = async () => {
  const { data } = await getClient().query<GetPropertiesQuery>({
    query: gql`
        query {
          properties(paginationDto: { limit:${50}, offset: 0, order: "DESC" }) {
            properties {
              slug    
            }
            
          }
        }
      `,
  });

  return data;
};

export async function generateStaticParams() {
  const properties = await getProperties();

  const propertiesSlug = properties.properties.properties.map((property) => ({
    slug: property.slug,
  }));

  if (!properties) {
    return [{ slug: "" }];
  }
  return propertiesSlug;
}

const getProperty = async (slug: string) => {
  const { data } = await getClient().query<GetPropertyQuery>({
    query: gql`
      query GetProperty($slug: String!) {
        propertyBySlug(slug: $slug) {
          id
          title
          description
          place
          type
          status
          price
          lat
          long
          num_bedrooms
          main_picture_url
          images {
            id
            url
          }
          images360 {
            id
            url
          }
          videos {
            id
            url
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });

  return data;
};

const getFilteredProperties = async (
  searchParams: PropertyFilterInput,
  pagination: PaginationDto,
) => {
  const { data } = await getClient().query<{
    filterProperties: PropertiesDataResponse;
  }>({
    query: gql`
      query GetFilteredProperties(
        $paginationDto: PaginationDto!
        $filters: PropertyFilterInput!
      ) {
        filterProperties(paginationDto: $paginationDto, filters: $filters) {
          properties {
            id
            title
            price
            slug
            lat
            long
            description
            main_picture_url
            images {
              id
              url
            }
          }
        }
      }
    `,
    variables: {
      filters: searchParams,
      paginationDto: pagination,
    },
  });

  return data;
};

// Función para validar si la propiedad está completa
const isPropertyComplete = async (property: Property) => {
  const hasMinimumImages = property.images && property.images.length >= 5;
  const hasRequiredFields =
    property.description && property.title && property.price;

  return hasMinimumImages && hasRequiredFields;
};

const breakpoints: SwiperOptions["breakpoints"] = {
  // Mobile: 1 card
  320: {
    slidesPerView: 1,
    spaceBetween: 16,
  },
  // Small tablet: 1.3 cards
  480: {
    slidesPerView: 1.3,
    spaceBetween: 16,
  },
  500: {
    slidesPerView: 1.4,
    spaceBetween: 16,
  },

  560: {
    slidesPerView: 1.5,
    spaceBetween: 16,
  },
  610: {
    slidesPerView: 1.6,
    spaceBetween: 16,
  },

  630: {
    slidesPerView: 1.7,
    spaceBetween: 10,
  },

  650: {
    slidesPerView: 1.8,
    spaceBetween: 10,
  },

  700: {
    slidesPerView: 1.9,
    spaceBetween: 10,
  },
  // Tablet estándar (actualizado de 680 a 768)
  768: {
    slidesPerView: 2,
    spaceBetween: 24,
  },
  // Desktop estándar (faltaba este salto, de 680 a 1440 era muy brusco)
  1024: {
    slidesPerView: 1.8,
    spaceBetween: 24,
  },
  1280: {
    slidesPerView: 2.6,
    spaceBetween: 24,
  },
  // Large desktop: 3.5 cards
};

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;

  const { propertyBySlug } = await getProperty(slug);

  if (!propertyBySlug) {
    notFound();
  }

  const propertyComplete = await isPropertyComplete(propertyBySlug);

  if (!propertyComplete) {
    return <PropertyNotAvailable />;
  }

  const {
    filterProperties: { properties },
  } = await getFilteredProperties(
    {
      status: propertyBySlug?.status,
      type: propertyBySlug?.type,
      min_area: null,
      max_area: null,
    },
    { limit: 10, offset: 0 },
  );

  const cards = properties
    .filter((prop) => prop.id !== propertyBySlug?.id)
    .map((prop) => ({
      main_picture: prop.main_picture_url || "",
      description: prop.description,
      price: prop.price,
      srcImg: prop.images ? prop.images.map((img) => img.url) : [],
      title: prop.title,
      url: `/inmuebles/${prop.slug}`,
    }));

  const locations = properties.map((prop) => ({
    lat: prop.lat || 0,
    long: prop.long || 0,
    title: prop.title,
  }));

  const mainLocation = {
    lat: propertyBySlug.lat || 0,
    long: propertyBySlug.long || 0,
    title: propertyBySlug.title,
  };

  return (
    <>
      <PropertySection property={propertyBySlug} />
      <Pad amt={30} />

      <section className="w-9/10 md:w-170  xl:w-282 flex flex-col mx-auto ps-4">
        <PropertyMap
          main_property={mainLocation}
          relatives_properties={locations}
        />
      </section>

      <Pad amt={30} />
      {cards.length !== 0 ? (
        <section className="w-9/10 md:w-170  xl:w-282 flex flex-col mx-auto ps-4">
          <h2 className="font-bold text-xl lg:text-2xl mb-5 ">
            Otras opciones que podrian interesarte
          </h2>
          <PropertiesSlider cards={cards} breakpoints={breakpoints} />
        </section>
      ) : (
        <></>
      )}
      <ContactProperty
        price={propertyBySlug.price.toLocaleString("us")}
        title={propertyBySlug.title}
      />
    </>
  );
}
