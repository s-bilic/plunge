import styles from "../styles/home.module.scss";

import { Title, Content, Button, Card, Tile } from "@ui";
import { Divider, Icon } from "@helper";

export default function Home() {
  return (
    <div className={styles.home}>
      <Divider height={100} />
      <Title text={"Create your store"} tag={"h2"} />
      <Divider height={100} />
      <Tile borderRadius padding boxShadow>
        <Icon name={"store"} />
      </Tile>
      <Divider height={100} />
    </div>
  );
}
