import styles from "../styles/home.module.scss";

import { Title, Content, Button, Card, Tile } from "@ui";
import { Divider, Icon } from "@helper";
import { Stores, Payment, Product } from "@components";
import { storeTypes, supabase } from "@utils";

const Home = ({ storesData }) => {
  console.log(storesData);
  return (
    <div className={styles.home}>
      <Divider height={100} />
      <Title text={"Create your store"} tag={"h2"} />
      <Divider height={100} />
      <Stores items={storesData} types={storeTypes} />
      <Divider height={100} />
    </div>
  );
};

export async function getServerSideProps() {
  let { data } = await supabase.from("stores").select();

  return {
    props: {
      storesData: data,
    },
  };
}

export default Home;
