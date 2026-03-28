import Image from "next/image";
import FilterSection from "@/containers/FilterSection";
import PropertiesGrid from "@/containers/PropertiesGrid";
import PropertiesHero from "@/containers/PropertiesHero";
import { getClient } from "@/graphql/client";
import {
  PaginationDto,
  PropertiesDataResponse,
  PropertyFilterInput,
  PropertyStatus,
  PropertyType,
} from "@/graphql/generated-types";
import PropertiesProvider from "@/providers/PropertiesProvider";
import { gql } from "@apollo/client";
import Paginator from "@/components/Paginator";
import SearchResults from "@/components/SearchResults";

interface PropertiesPageProps {
  searchParams: Promise<PropertyFilterInput & PaginationDto>;
}

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
          total
          properties {
            id
            title
            type
            status
            num_bedrooms
            num_bathrooms
            num_parking_lot
            area
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

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const {
    max_area,
    min_area,
    num_bathrooms,
    num_bedrooms,
    num_parking_lot,
    term,
    status,
    type,
    limit,
    offset,
    order,
  } = await searchParams;

  const {
    filterProperties: { properties, total },
  } = await getFilteredProperties(
    {
      max_area: Number(max_area),
      min_area: Number(min_area),
      num_bathrooms: Number(num_bathrooms),
      num_bedrooms: Number(num_bedrooms),
      num_parking_lot: Number(num_parking_lot),
      term,
      status,
      type,
    },
    { limit: Number(limit), offset: Number(offset), order },
  );

  const isPropertiesEmptyOrNull =
    properties === undefined || properties.length === 0 || properties === null;

  return (
    <PropertiesProvider
      defaultSearchParams={{
        limit: limit || 12,
        max_area,
        min_area,
        num_bathrooms,
        num_bedrooms,
        num_parking_lot,
        offset: offset || 0,
        order: order || "created_at",
        term: term || "",
        status,
        type,
      }}
    >
      <>
        <PropertiesHero
          propertyStatus={status as PropertyStatus}
          propertyType={type as PropertyType}
        />

        <SearchResults total={total} />

        <FilterSection />

        {isPropertiesEmptyOrNull ? (
          <section className="w-full flex flex-col justify-center items-center p-13">
            <Image
              src={"/img/404.svg"}
              className="w-[90%] sm:w-150 "
              width={1080}
              height={720}
              alt="404 image"
            />
            <h1 className="text-[#3559B6] text-2xl mt-12 mb-3">
              Oops! no hay resultados!
            </h1>
          </section>
        ) : (
          <>
            <PropertiesGrid properties={properties} />
            <Paginator totalElements={total} />
          </>
        )}
      </>
    </PropertiesProvider>
  );
}
