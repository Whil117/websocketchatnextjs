import client from "@/apollo";
import LayoutFC from "@/layout";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import "@/styles/normalize.css";
import { ApolloProvider } from "@apollo/client";
import type { AppPropsWithLayout } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ApolloProvider client={client}>
      <ToastContainer />
      <LayoutFC type={Component.type}>
        <Component {...pageProps} />
      </LayoutFC>
    </ApolloProvider>
  );
}
