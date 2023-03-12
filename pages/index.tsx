import { useEffect } from "react";
import dynamic from "next/dynamic";
import { getCsrfToken, signIn, signOut, getSession } from "next-auth/react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { storeTypes, supabase, SigninMessage, actionCardsData } from "@utils";
import bs58 from "bs58";
import styles from "../styles/home.module.scss";
import {
  Title,
  Content,
  Button,
  Card,
  Tile,
  Heading,
  Container,
  Breadcrumbs,
} from "@ui";
import { Divider, Icon } from "@helper";
import { Stores, Payment, Product, ActionCard } from "@components";

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
      <Divider height={100} />
      {/* {!userData.length && <Content text={"Connect your wallet"} />}
      {userData.length > 0 && <Content text={"Your stores"} />} */}
      <Divider height={20} />
      <Breadcrumbs
        items={[{ text: "Stores" }, { text: "Products", disabled: true }]}
      />
      <Divider height={20} />
      <Container>
        <div className={styles.wrapper}>
          <Heading
            title={{ text: "Dashboard", tag: "h4" }}
            content={{ text: "Take the Plunge into Solana-powered retail" }}
          />
          <div className={styles.wallet}>
            {!session && <WalletMultiButtonDynamic />}
            {session?.user && <WalletDisconnectButton onClick={signOut} />}
          </div>
        </div>
        <Divider height={40} />
        <div className={styles.actionCards}>
          {actionCardsData?.map((item, index) => (
            <ActionCard key={index} {...item} />
          ))}
        </div>
        <Divider height={80} />
        <Heading
          title={{ text: "Your stores", tag: "h5" }}
          content={{
            text: userData.length
              ? "Create your store and start adding products"
              : "Connect your wallet to start",
            size: "xs",
          }}
          icon={{
            name: userData.length ? false : "alert-square",
            size: "xxs",
            color: "energized",
            stroke: true,
          }}
        />
        <Divider height={40} />
        <Stores items={storesData} types={storeTypes} user={userData} />
      </Container>
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

  const { data: storeProducts, error } = await supabase
    .from("store_products")
    .select("*");

  const transformedStores = stores?.map((item) => {
    const product = storeProducts?.find((p) => p.store_id === item.store_id);
    return { ...item, ...product };
  });

  return {
    props: {
      session,
      userData: user || [],
      storesData: transformedStores || [],
    },
  };
}

export default Home;
