import { supabase } from "@utils";
import { Title } from "@ui";
import { Divider } from "@helper";
import { Products } from "@components";
import { getSession } from "next-auth/react";

export default function StorePage({ productsData, storeId }) {
  return (
    <div>
      <Divider height={100} />
      <Title text={"Choose your products"} tag={"h2"} />
      <Divider height={100} />
      <Products items={productsData} storeId={storeId} />
      <Divider height={100} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { id, store } = context.params;
  const storeAddress = store;
  // const { data: user } = await supabase
  //   .from("users")
  //   .select()
  //   .eq("user_address", session?.user?.name);

  // const { data: stores } = await supabase
  //   .from("stores")
  //   .select()
  //   .eq("user_id", user[0]?.user_id);
  // console.log(stores, "storess");

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
  console.log();
  return {
    props: {
      session,
      storeId: id,
      productsData: products || [],
    },
  };
}
