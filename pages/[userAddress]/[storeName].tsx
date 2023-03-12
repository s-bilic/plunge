import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@utils";
import {
  Title,
  Heading,
  Container,
  Breadcrumbs,
  Chart,
  Empty,
  Snackbar,
} from "@ui";
import { Divider } from "@helper";
import { Products, Checkout, Transactions, TotalCard } from "@components";
import { getSession } from "next-auth/react";
import styles from "../../styles/store.module.scss";

export default function StorePage({
  session,
  store,
  products,
  transactions,
  admin,
  dailySales,
  totalSales,
}) {
  const [selectedData, setSelectedData] = useState();
  const [publicView, setPublicView] = useState(false);

  const chartData = {
    series: [
      {
        name: "Sales",
        data: dailySales?.map((item) => item.total),
      },
    ],
    options: {
      colors: ["#512da8"],
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
        categories: dailySales?.map((item) => item.transaction_date),
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  console.log(publicView);

  return (
    <div className={styles.store}>
      <Divider height={100} />
      <div className={styles.header}>
        <Breadcrumbs items={[{ text: "Stores" }, { text: "Products" }]} />
        <Snackbar
          className={styles.snackbar}
          title={{ text: "See public view" }}
          content={{
            text: "This is what a buyer will see",
            size: "xs",
          }}
          icon={{ name: "elektro" }}
          // button={{ text: "Visit", link: true, textColor: "royal" }}
          toggle={{ onChange: () => setPublicView(!publicView) }}
        />
      </div>
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
              publicView={publicView}
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
        {admin && !publicView && (
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
              {transactions.length ? (
                <Transactions items={transactions} />
              ) : (
                <Empty
                  title={{ text: "No transactions found" }}
                  content={{
                    text: "Transactions appear after store purchases",
                    size: "xs",
                  }}
                />
              )}
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
              <TotalCard
                title={{ text: totalSales || 0 }}
                content={{ text: "Total revenue" }}
                icon={{ name: "earn" }}
                currency={{ name: "sol" }}
              />
              <Chart
                className={styles.chart}
                type={"area"}
                width={500}
                height={320}
                {...chartData}
              />
              <Divider height={40} />
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
  const { data: store } = await supabase
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
    .eq("store_id", store[0]?.store_id)
    .range(0, 5);

  let { data: dailySales } = await supabase.rpc(
    "get_daily_transactions_total",
    {
      store_id: store[0]?.store_id,
    }
  );

  let { data: totalSales } = await supabase.rpc("get_transactions_total", {
    store_id: store[0]?.store_id,
  });

  return {
    props: {
      session: session,
      store: store[0] || null,
      products: products || null,
      transactions: transactions || null,
      dailySales: dailySales || null,
      totalSales: totalSales,
      admin: admin,
    },
  };
}
