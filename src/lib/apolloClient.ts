import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// HTTP Link
const httpLink = new HttpLink({
  uri: "https://inctagram.work/api/v1/graphql",
  credentials: "same-origin",
});

// WebSocket Link
const wsClient =
  typeof window !== "undefined"
    ? createClient({
        url: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL || "",
        connectionParams: () => {
          const auth = Cookies.get("auth");
          return {
            authorization: auth ? `Basic ${auth}` : "",
          };
        },
      })
    : null;

const wsLink = wsClient ? new GraphQLWsLink(wsClient) : null;

// Auth Middleware
const authLink = setContext((_, { headers }) => {
  const auth = typeof window !== "undefined" ? Cookies.get("auth") : null;

  return {
    headers: {
      ...headers,
      Authorization: auth ? `Basic ${auth}` : "",
    },
  };
});

// Split Link
const splitLink =
  typeof window !== "undefined" && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);

          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        authLink.concat(httpLink),
      )
    : authLink.concat(httpLink);

// Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       getPosts: {
    //         keyArgs: ["searchTerm"],
    //         merge(existing, incoming, { args }) {
    //           // Для пагинации (когда есть endCursorPostId не равный INITIAL_CURSOR)
    //           if (
    //             args?.endCursorPostId &&
    //             args.endCursorPostId !== INITIAL_CURSOR
    //           ) {
    //             return {
    //               ...incoming,
    //               items: [
    //                 ...(existing?.items || []),
    //                 ...(incoming?.items || []),
    //               ],
    //             };
    //           }
    //
    //           // Для обновлений от подписок или первого запроса - просто заменяем данные
    //           return incoming;
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});

export default client;
