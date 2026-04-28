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

import VisualLoadingTrigger from "@/components/VisualLoadingTrigger";
import EmptyState from "@/components/EmptyState";
import Pad from "@/components/Pad";

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
        <VisualLoadingTrigger />
        <PropertiesHero
          propertyStatus={status as PropertyStatus}
          propertyType={type as PropertyType}
          total={total}
        />
        <Pad amt={20} />
        {isPropertiesEmptyOrNull ? (
          <section className="w-full flex flex-col justify-center items-center ">
            <EmptyState />
          </section>
        ) : (
          <>
            <PropertiesGrid properties={properties} />

            <Paginator
              totalElements={total}
              searchParams={{
                limit,
                max_area,
                min_area,
                num_bathrooms,
                num_bedrooms,
                num_parking_lot,
                term,
                status,
                type,
                offset,
                order,
              }}
            />
          </>
        )}
      </>
    </PropertiesProvider>
  );
}
