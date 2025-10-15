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

// function makeClient() {
//   const httpLink = new HttpLink({
//     // this needs to be an absolute url, as relative urls cannot be used in SSR
//     uri: process.env["NEXT_PUBLIC_GRAPHQL_ENDPOINT"],
//     // you can disable result caching here if you want to
//     // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
//     fetchOptions: {
//       // you can pass additional options that should be passed to `fetch` here,
//       // e.g. Next.js-related `fetch` options regarding caching and revalidation
//       // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
//     },

//     // you can override the default `fetchOptions` on a per query basis
//     // via the `context` property on the options passed as a second argument
//     // to an Apollo Client data fetching hook, e.g.:
//     // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { ... }}});
//   });

//   // use the `ApolloClient` from "@apollo/client-integration-nextjs"
//   return new ApolloClient({
//     // use the `InMemoryCache` from "@apollo/client-integration-nextjs"
//     cache: new InMemoryCache(),
//     link: httpLink,
//   });
// }

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
      searchParams as Record<string, string>
    ).toString();

    const url = `/inmuebles?${filterSearchParams}`;
    router.push(url, { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    // Prefetch rutas de administrador cuando el componente se monte
    const filterSearchParams = new URLSearchParams(
      searchParams as Record<string, string>
    ).toString();
    const url = `/inmuebles?${filterSearchParams}`;
    router.prefetch(url);
  }, [router, searchParams]);

  const handleSearchParams = useCallback(
    (searchParams: PropertyFilterInput & PaginationDto) => {
      setSearchParams(searchParams);
    },
    []
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
