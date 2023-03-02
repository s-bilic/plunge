import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Layout } from "@ui";
import { Wallet } from "@components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Wallet session={pageProps.session}>
        <Component {...pageProps} />
      </Wallet>
    </Layout>
  );
}
