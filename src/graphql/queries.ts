import { gql } from "@apollo/client";
import {
  PaginatedProducts,
  Product,
  PropertiesDataResponse,
  Property,
} from "./generated-types";

export interface GetPropertiesQuery {
  properties: PropertiesDataResponse;
}

export interface GetPropertyQuery {
  propertyBySlug: Property | null | undefined;
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

        images {
          id
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
      images {
        id
        url
      }
    }
  }
`;

export interface GetAdecuacionesQuery {
  products: PaginatedProducts;
}

export interface GetAdecuacionesQueryVariables {
  filters?: {
    brandId?: string;
    status?: string;
  };
  pagination?: {
    limit?: number;
    offset?: number;
    order?: string;
  };
}

export const GET_ADECUACIONES = gql`
  query GetAdecuaciones($filters: ProductFiltersInput, $pagination: PaginationDto) {
    products(filters: $filters, pagination: $pagination) {
      items {
        id
        name
        slug
        description
        details
        status
        mainImageUrl
        brand {
          id
          name
          logoUrl
          slug
        }
        tenant {
          id
          name
          logo
          website
        }
        subcategory {
          id
          name
          slug
          category {
            id
            name
            slug
          }
        }
        images {
          url
          alt
          filename
        }
      }
      total
      limit
      totalPages
    }
  }
`;

export interface GetAdecuacionBySlugQuery {
  productBySlug: Product;
}

export interface GetAdecuacionBySlugQueryVariables {
  slug: string;
}

export const GET_ADECUACION_BY_SLUG = gql`
  query GetAdecuacionBySlug($slug: String!) {
    productBySlug(slug: $slug) {
      id
      name
      slug
      description
      details
      status
      mainImageUrl
      brand {
        id
        name
        logoUrl
        slug
      }
      subcategory {
        id
        name
        slug
        category {
          id
          name
          slug
        }
      }
      images {
        url
        alt
        filename
      }
      created_at
      updated_at
    }
  }
`;
