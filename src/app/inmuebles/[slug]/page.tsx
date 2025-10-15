import Pad from "@/components/Pad";
import MapSection from "@/containers/MapSection";
import PropertiesSlider from "@/containers/PropertiesSlider";
import PropertySection from "@/containers/PropertySection";
import { getClient } from "@/graphql/client";
import {
  PaginationDto,
  PropertiesDataResponse,
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
          # Use the variable here
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
    // context: {
    //   fetchOptions: {
    //     next: { revalidate: 60 * 60 },
    //   },
    // },
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
    // context: {
    //   fetchOptions: {
    //     next: { revalidate: 60 * 60 },
    //   },
    // },
  });

  return data;
};

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  console.log({ slug });
  const { propertyBySlug } = await getProperty(slug);
  if (!propertyBySlug) {
    notFound();
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
      <section className="container mx-auto flex flex-col w-9/10 md:w-170  xl:w-282">
        <h2 className="font-bold text-xl lg:text-2xl mb-5 ">
          Otras opciones que podrian interesarte
        </h2>
        <PropertiesSlider cards={cards} />
      </section>
    </>
  );
}
