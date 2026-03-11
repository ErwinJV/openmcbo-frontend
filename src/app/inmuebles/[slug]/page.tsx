// page.tsx (modificado)
import Pad from "@/components/Pad";
import MapSection from "@/containers/MapSection";
import PropertiesSlider from "@/containers/PropertiesSlider";
import PropertySection from "@/containers/PropertySection";
import PropertyNotAvailable from "@/components/PropertyNotAvailable";
import { getClient } from "@/graphql/client";
import {
  PaginationDto,
  PropertiesDataResponse,
  Property,
  PropertyFilterInput,
} from "@/graphql/generated-types";
import { GetPropertyQuery } from "@/graphql/queries";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
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
  pagination: PaginationDto
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
            description
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

  // const images360 = property.images360
  //   ? property.images360.map((image360) => image360.url)
  //   : [];

  // const allAvailableImages360 = property.images360
  //   ? await allAvailableFiles(images360)
  //   : false;

  // const videos = property.videos
  //   ? property.videos.map((video) => video.url)
  //   : [];
  // const allAvailableVideos = property.videos
  //   ? await allAvailableFiles(videos)
  //   : true;

  // const images = property.images
  //   ? property.images.map((image) => image.url)
  //   : [];

  // const allAvailableImages = property.images
  //   ? await allAvailableFiles(images)
  //   : true;

  return hasMinimumImages && hasRequiredFields;
};

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  console.log({ slug });
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
    { limit: 10, offset: 0 }
  );

  const cards = properties
    .filter((prop) => prop.id !== propertyBySlug?.id)
    .map((prop) => ({
      description: prop.description,
      price: prop.price,
      srcImg: prop.images ? prop.images.map((img) => img.url) : [],
      title: prop.title,
      url: `/inmuebles/${prop.slug}`,
    }));

  return (
    <>
      <PropertySection property={propertyBySlug} />
      <Pad amt={100} />
      <MapSection
        lat={propertyBySlug.lat || 0}
        long={propertyBySlug.long || 0}
      />
      <Pad amt={30} />
      <section className="w-full flex flex-col ps-4">
        <h2 className="font-bold text-xl lg:text-2xl mb-5 ">
          Otras opciones que podrian interesarte
        </h2>
        <PropertiesSlider cards={cards} />
      </section>
    </>
  );
}
