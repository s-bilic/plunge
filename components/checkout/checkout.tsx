import React, { useState, useEffect } from "react";
import styles from "./checkout.module.scss";
import classNames from "classnames/bind";
import { Tile, Title, Content, Card, Button } from "@ui";
import { Icon } from "@helper";
import { ProductOverview, Payment } from "@components";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: any;
  receiverAddress: any;
}

const Checkout = ({ className, items, receiverAddress }: IProps) => {
  const [countData, setCountData] = useState(new Array(items?.length).fill(1));
  const [totalPrice, setTotalPrice] = useState(0);
  const [active, setActive] = useState(false);
  const classes = cx(
    {
      checkout: true,
    },
    className
  );

  const handleCountChange = (index, newCount) => {
    const newCounts = [...countData];
    newCounts[index] = newCount;
    setCountData(newCounts);
  };

  useEffect(() => {
    const newTotalPrice = items?.reduce(
      (acc, item, i) => acc + item.product_price * countData[i],
      0
    );

    setTotalPrice(newTotalPrice);
  }, [items, countData]);

  useEffect(() => {
    setActive(false);
  }, [totalPrice]);

  return (
    <Card className={classes} color={"light"} borderRadius outline>
      <div className={styles.items}>
        {items?.map((item, index) => {
          return (
            <ProductOverview
              key={index}
              className={styles.item}
              title={{ text: item?.product_name }}
              content={{ text: item?.product_price }}
              icon={{ name: item?.product_icon }}
              counter={{
                value: 1,
                onChange: (e) => handleCountChange(index, e),
              }}
              {...item}
            />
          );
        })}
      </div>
      <div>
        <div className={styles.subtotal}>
          <Content text={"Subtotal"} size={"xs"} color={"stable-700"} />
          <div className={styles.currency}>
            <Content text={totalPrice} emphasize />
            <Icon className={styles.iconCurrency} name={"sol"} size={"xxxxs"} />
          </div>
        </div>
        {active && receiverAddress && (
          <div className={styles.payment}>
            <Payment
              receiverAddress={receiverAddress}
              paymentAmount={totalPrice}
            />
          </div>
        )}
        <Button
          onClick={(e) => setActive(e)}
          className={styles.button}
          text={"Pay"}
          color={"royal"}
          grow
        />
      </div>
    </Card>
  );
};

export default Checkout;
