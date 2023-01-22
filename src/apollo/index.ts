import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import CONFIG from "../config";

export const isServer = typeof window !== `undefined`;

const httpLink = new HttpLink({
  uri: `${CONFIG.GRAPHQL_URL}`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

  return forward(operation);
});

const httpAuthLink = from([authMiddleware, httpLink]);
const splitLink = isServer
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === `OperationDefinition` &&
          definition.operation === `subscription`
        );
      },
      // new WebSocketLink({
      //   uri: `${CONFIG.GRAPHQL_URL_WS}`,
      //   options: {
      //     reconnect: true,
      //   },
      // }),
      httpAuthLink
    )
  : httpAuthLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  ssrMode: isServer,
});
export default client;
