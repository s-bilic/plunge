import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "@ui";
import { Wallet } from "@components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Wallet>
        <Component {...pageProps} />
      </Wallet>
    </Layout>
  );
}
