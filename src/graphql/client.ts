import { HttpLink } from "@apollo/client";

import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        // fetchPolicy: "cache-first",
      },
    },
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri:
        typeof window === "undefined"
          ? "http://localhost:3000/graphql-proxy"
          : "/graphql-proxy",
      fetchOptions: {
        // you can pass additional options that should be passed to `fetch` here,
        // e.g. Next.js-related `fetch` options regarding caching and revalidation
        // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
      },
    }),
  });
});
