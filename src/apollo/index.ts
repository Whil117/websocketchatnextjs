import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import CONFIG from "../config";

export const isServer = typeof window !== `undefined`;

const wsLink = isServer
  ? new GraphQLWsLink(
      createClient({
        url: "ws://localhost:4000/graphql",
      })
    )
  : null;

const httpLink = new HttpLink({
  uri: `${CONFIG.GRAPHQL_URL}`,
});

const link =
  isServer && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
