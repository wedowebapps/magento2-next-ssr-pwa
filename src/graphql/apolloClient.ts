import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  const uri: string | URL = process.browser
    ? new URL("/graphql", location.href)
    : new URL("/graphql", process.env.GRAPHQL_URL).href;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: uri as string,
    }),
  });
});
