"use client";

// import {
//   ApolloClient,
//   ApolloNextAppProvider,
//   InMemoryCache,
// } from "@apollo/client-integration-nextjs";

// import { HttpLink } from "@apollo/client";
import { PropertiesContext } from "./properties-filter-context";
import { PaginationDto, PropertyFilterInput } from "@/graphql/generated-types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PropertiesProvider({
  children,
  defaultSearchParams,
}: Readonly<{
  children: React.ReactElement;
  defaultSearchParams: PropertyFilterInput & PaginationDto;
}>) {
  const [searchParams, setSearchParams] = useState<
    PropertyFilterInput & PaginationDto
  >(defaultSearchParams);

  const router = useRouter();
  const filterNavigate = useCallback(() => {
    // Construir la URL con search params
    const filterSearchParams = new URLSearchParams(
      searchParams as Record<string, string>,
    ).toString();

    const url = `/inmuebles?${filterSearchParams}`;
    router.push(url, { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    // Prefetch rutas de administrador cuando el componente se monte
    const filterSearchParams = new URLSearchParams(
      searchParams as Record<string, string>,
    ).toString();
    const url = `/inmuebles?${filterSearchParams}`;
    router.prefetch(url);
  }, [router, searchParams]);

  const handleSearchParams = useCallback(
    (searchParams: PropertyFilterInput & PaginationDto) => {
      setSearchParams(searchParams);
    },
    [],
  );

  return (
    <>
      <PropertiesContext
        value={{ searchParams, filterNavigate, handleSearchParams }}
      >
        {/* <ApolloNextAppProvider makeClient={makeClient}> */}
        {children}
        {/* </ApolloNextAppProvider> */}
      </PropertiesContext>
    </>
  );
}
