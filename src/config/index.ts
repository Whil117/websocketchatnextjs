const CONFIG = {
  GRAPHQL_URL:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    "https://webwhilsocket.onrender.com/graphql",
  GRAPHQL_URL_WS:
    process.env.NEXT_PUBLIC_GRAPHQL_URL_WS ??
    "wss://webwhilsocket.onrender.com/graphql",
};

export default CONFIG;
