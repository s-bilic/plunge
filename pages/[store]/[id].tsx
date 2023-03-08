import { useState } from "react";
import { supabase } from "@utils";
import { Title, Heading, Container, Breadcrumbs } from "@ui";
import { Divider } from "@helper";
import { Products, Checkout } from "@components";
import { getSession } from "next-auth/react";
import styles from "../../styles/store.module.scss";

export default function StorePage({
  productsData,
  storeId,
  storeAddress,
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
              items={productsData}
              storeId={storeId}
              onChange={(e) => setSelectedData(e)}
              admin={admin}
            />
          </div>
        </Container>
        <Checkout items={selectedData} receiverAddress={storeAddress} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { id, store } = context.params;
  const storeAddress = store;

  const { data: products } = await supabase
    .from("products")
    .select()
    .eq("store_id", id);

  // If you only want the store to be visible to the owner (after connecting)
  // if (session?.user?.name !== storeAddress) {
  //   return {
  //     notFound: true,
  //   };
  // }

  console.log(store);
  return {
    props: {
      session,
      storeAddress,
      admin: session?.user?.name === storeAddress ? true : false,
      storeId: id,
      productsData: products || [],
    },
  };
}
