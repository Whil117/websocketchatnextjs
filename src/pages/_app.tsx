import client from "@/apollo";
import LayoutFC from "@/layout";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import "@/styles/normalize.css";
import { ApolloProvider } from "@apollo/client";
import type { AppPropsWithLayout } from "next/app";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ApolloProvider client={client}>
      <LayoutFC type={Component.type}>
        <Component {...pageProps} />
      </LayoutFC>
    </ApolloProvider>
  );
}
