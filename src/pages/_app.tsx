import client from "@/apollo";
import LayoutChat from "@/layout/chat";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutChat>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </LayoutChat>
  );
}
