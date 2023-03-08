import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Layout } from "@ui";
import { Wallet } from "@components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Wallet session={pageProps.session}>
        <Component {...pageProps} />
      </Wallet>
    </Layout>
  );
}
