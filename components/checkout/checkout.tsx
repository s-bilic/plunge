import React from "react";
import styles from "./checkout.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Card } from "@ui";
import { Icon } from "@helper";
import { ProductOverview } from "@components";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
}

const Checkout = ({ className }: IProps) => {
  const classes = cx(
    {
      checkout: true,
    },
    className
  );

  return (
    <Card className={classes} color={"light"} boxShadow borderRadius padding>
      <ProductOverview
        title={{ text: "Apple" }}
        content={{ text: "3" }}
        icon={{ name: "juice" }}
      />
    </Card>
  );
};

export default Checkout;
