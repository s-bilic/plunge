import styles from "../styles/home.module.scss";

import { Title, Content, Button, Card, Tile } from "@ui";
import { Divider, Icon } from "@helper";
import { Stores } from "@components";
import { storesData, storeTypes } from "@utils";

export default function Home() {
  return (
    <div className={styles.home}>
      <Divider height={100} />
      <Title text={"Create your store"} tag={"h2"} />
      <Divider height={100} />
      <Stores items={storesData} types={storeTypes} />
      <Divider height={100} />
    </div>
  );
}
