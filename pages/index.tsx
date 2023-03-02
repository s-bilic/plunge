import { useEffect } from "react";
import dynamic from "next/dynamic";
import { getCsrfToken, signIn, signOut, getSession } from "next-auth/react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { storeTypes, supabase, SigninMessage } from "@utils";
import bs58 from "bs58";
import styles from "../styles/home.module.scss";
import { Title, Content, Button, Card, Tile } from "@ui";
import { Divider, Icon } from "@helper";
import { Stores, Payment, Product } from "@components";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const WalletDisconnectButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
);

const Home = ({ storesData, userData, session }) => {
  const wallet = useWallet();
  const walletModal = useWalletModal();

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) {
        walletModal.setVisible(true);
      }

      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: csrf,
      });

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: true,
        signature: serializedSignature,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      const createUser = async () => {
        if (!userData.length) {
          await supabase
            .from("users")
            .insert({ user_address: session.user?.name });
        } else {
          return console.log("user already exists");
        }
      };
      createUser();
    }
  }, [session]);

  useEffect(() => {
    if (wallet.connected && !session) {
      handleSignIn();
    }
  }, [wallet.connected]);

  console.log(userData, "user");

  return (
    <div className={styles.home}>
      {!session && <WalletMultiButtonDynamic />}
      {session?.user && <WalletDisconnectButton onClick={signOut} />}
      <Divider height={100} />
      <Title text={"Create your store"} tag={"h2"} />
      <Divider height={100} />
      <Stores items={storesData} types={storeTypes} user={userData} />
      <Divider height={100} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("user_address", session?.user?.name);

  const { data: stores } = await supabase
    .from("stores")
    .select()
    .eq("user_id", user[0]?.user_id);

  console.log(stores, "stores");
  return {
    props: {
      session,
      userData: user || [],
      storesData: stores || [],
    },
  };
}

export default Home;
