import React from "react";
import styles from "./checkout.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Card } from "@ui";
import { Icon } from "@helper";
import { ProductOverview } from "@components";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: any;
}

const Checkout = ({ className, items }: IProps) => {
  const classes = cx(
    {
      checkout: true,
    },
    className
  );

  return (
    <Card className={classes} color={"light"} boxShadow borderRadius padding>
      {items?.map((item, index) => (
        <ProductOverview
          key={index}
          className={styles.item}
          title={{ text: item?.product_name }}
          content={{ text: item?.product_price }}
          icon={{ name: item?.product_icon }}
          {...item}
        />
      ))}
    </Card>
  );
};

export default Checkout;
