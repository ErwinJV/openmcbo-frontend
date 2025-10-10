import { gql } from "@apollo/client";
import { PropertiesDataResponse, Property } from "./generated-types";

export interface GetPropertiesQuery {
  properties: PropertiesDataResponse;
}

export interface GetPropertyQuery {
  propertyBySlug: Property;
}
export interface GetPropertiesQueryVariables {
  paginationDto: {
    limit: number;
    offset: number;
    order: "ASC" | "DESC";
  };
}
export const GET_PROPERTIES = gql`
  query GetProperties($paginationDto: PaginationDto!) {
    properties(paginationDto: $paginationDto) {
      total
      properties {
        id
        title
        slug
        status
        type
        description
        place
        lat
        long
        num_bathrooms
        num_bedrooms
        num_pools
        num_parking_lot
        created_at
        updated_at
        user {
          id
          name
          last_name
          email
        }
        images {
          url
        }
      }
    }
  }
`;

export interface GetPropertyQuery {
  property: Property;
}
export interface GetPropertyQueryVariables {
  term: string;
}

export const GET_PROPERTY_QUERY = gql`
  query GetProperty($term: String!) {
    property(term: $term) {
      id
      title
      description
      type
      status
      place
      long
      lat
      num_bathrooms
      num_bedrooms
      num_parking_lot
    }
  }
`;
