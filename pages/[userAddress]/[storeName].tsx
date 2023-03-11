import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@utils";
import { Title, Heading, Container, Breadcrumbs } from "@ui";
import { Divider } from "@helper";
import { Products, Checkout, Transactions } from "@components";
import { getSession } from "next-auth/react";
import styles from "../../styles/store.module.scss";
export default function StorePage({
  session,
  store,
  products,
  transactions,
  admin,
}) {
  const [selectedData, setSelectedData] = useState();

  return (
    <div className={styles.store}>
      <Divider height={100} />
      <Breadcrumbs items={[{ text: "Stores" }, { text: "Products" }]} />
      <Divider height={20} />
      <div className={styles.wrapper}>
        <Container>
          <Heading
            title={{ text: "Products", tag: "h5" }}
            content={{
              text: "Start creating your products",
              size: "xs",
            }}
          />
          <Divider height={40} />
          <div className={styles.grid}>
            <Products
              items={products}
              store={store}
              onChange={(e) => setSelectedData(e)}
              admin={admin}
            />
          </div>
        </Container>
        <Checkout
          items={selectedData}
          receiverAddress={store?.user_address}
          store={store}
        />
      </div>
      <Divider height={20} />
      {admin && (
        <>
          <Heading
            title={{ text: "Recent transactions", tag: "h5" }}
            content={{
              text: "Track your order id on-chain",
              size: "xs",
            }}
          />
          <Divider height={20} />
          <Transactions items={transactions} />
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { params, query, req, res } = context;
  const session = await getSession({ req });

  const sessionAddress = session?.user?.name;
  const userAddress = params?.userAddress;
  const storeName = params?.storeName;
  const admin = sessionAddress === userAddress;

  // fetch stores that match userAddress + storeName in params
  const { data: store, error } = await supabase
    .from("stores")
    .select()
    .eq("user_address", userAddress)
    .eq("store_name", storeName);

  // return empty page if no store matches userAddress + storeName in params
  if (!store.length) {
    return {
      notFound: true,
    };
  }

  // select all products that match the store_id
  const { data: products } = await supabase
    .from("products")
    .select()
    .eq("store_id", store[0]?.store_id);

  // select all products that match the store_id
  const { data: transactions } = await supabase
    .from("transactions")
    .select()
    .order("created_at", { ascending: false })
    .eq("store_id", store[0]?.store_id);

  console.log(transactions);

  return {
    props: {
      session: session,
      store: store[0] || null,
      products: products || null,
      transactions: transactions || null,
      admin: admin,
    },
  };
}
