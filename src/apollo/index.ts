import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import cookie from "js-cookie";
import CONFIG from "../config";

export const isServer = typeof window !== `undefined`;

const wsLink = isServer
  ? new GraphQLWsLink(
      createClient({
        url: `${CONFIG.GRAPHQL_URL_WS}`,
      })
    )
  : null;

const httpLink = new HttpLink({
  uri: `${CONFIG.GRAPHQL_URL}`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const bearer = `${cookie.get("cookie_user")}`;
    return {
      headers: {
        authorization: `Bearer ${bearer}`,
        ...headers,
      },
    };
  });

  return forward(operation);
});
const httpAuthLink = from([authMiddleware, httpLink]);

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
        httpAuthLink
      )
    : httpAuthLink;

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
