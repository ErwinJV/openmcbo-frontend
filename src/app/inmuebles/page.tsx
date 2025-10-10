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

interface PropertiesPageProps {
  searchParams: Promise<PropertyFilterInput & PaginationDto>;
}

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
    place,
    status,
    type,
    limit,
    offset,
    order,
  } = await searchParams;

  const {
    filterProperties: { properties },
  } = await getFilteredProperties(
    {
      max_area: Number(max_area),
      min_area: Number(min_area),
      num_bathrooms: Number(num_bathrooms),
      num_bedrooms: Number(num_bedrooms),
      num_parking_lot: Number(num_parking_lot),
      place,
      status,
      type,
    },
    { limit: Number(limit), offset: Number(offset), order }
  );
  console.log({ properties });
  return (
    <PropertiesProvider
      defaultSearchParams={{
        limit,
        max_area,
        min_area,
        num_bathrooms,
        num_bedrooms,
        num_parking_lot,
        offset,
        order,
        place,
        status,
        type,
      }}
    >
      <>
        <PropertiesHero
          propertyStatus={status as PropertyStatus}
          propertyType={type as PropertyType}
        />
        <FilterSection />
        <PropertiesGrid properties={properties} />
      </>
    </PropertiesProvider>
  );
}
