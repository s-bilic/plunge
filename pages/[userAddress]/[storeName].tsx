import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@utils";
import { Title, Heading, Container, Breadcrumbs, Chart } from "@ui";
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
  sales,
}) {
  const [selectedData, setSelectedData] = useState();

  const chartData = {
    series: [
      {
        name: "Sales",
        data: sales?.map((item) => item.total_sales),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: sales?.map((item) => item.date),
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

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
      <Divider height={40} />
      <div className={styles.analytics}>
        {admin && (
          <>
            <div className={styles.transactions}>
              <Heading
                title={{ text: "Recent transactions", tag: "h5" }}
                content={{
                  text: "Track your order id on-chain",
                  size: "xs",
                }}
              />
              <Divider height={40} />
              <Transactions items={transactions} />
            </div>
            <div>
              <Heading
                title={{ text: "Daily sales", tag: "h5" }}
                content={{
                  text: "Overview of daily amount sold",
                  size: "xs",
                }}
              />
              <Divider height={40} />
              <Chart type={"area"} width={500} height={320} {...chartData} />
            </div>
          </>
        )}
      </div>
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

  const { data: dailySales } = await supabase.from("daily_sales").select("*");
  console.log(dailySales);
  return {
    props: {
      session: session,
      store: store[0] || null,
      products: products || null,
      transactions: transactions || null,
      sales: dailySales || null,
      admin: admin,
    },
  };
}
