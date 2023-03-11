import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./transactions.module.scss";
import classNames from "classnames/bind";
import { Badge, Title, Content, Card } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: any;
}

const Transactions = ({ className, items }: IProps) => {
  const classes = cx(
    {
      transactions: true,
    },
    className
  );

  return (
    <Card className={classes}>
      <div className={styles.items}>
        {items?.map((item, index) => {
          const date = new Date(item.created_at);
          const formattedDate = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });

          console.log(date); // Output the Date object to the console for debugging
          console.log(formattedDate); // Output the formatted date to the console for debugging
          return (
            <div key={index} className={styles.item}>
              {item?.transaction_subtotal && (
                <div className={styles.iconWrapper}>
                  <Icon
                    className={styles.currency}
                    name={"sol"}
                    size={"xxxs"}
                  />

                  <Content
                    className={styles.subtotal}
                    size={"xs"}
                    text={item.transaction_subtotal}
                    emphasize
                  />
                </div>
              )}
              {item?.transaction_signature && (
                <div className={styles.iconWrapper}>
                  <Link
                    href={`https://solscan.io/tx/${item?.transaction_signature}?cluster=devnet`}
                  >
                    <Content
                      className={styles.signature}
                      size={"xs"}
                      text={item.transaction_signature}
                      emphasize
                    />
                    <Icon name={"external"} size={"xxxxs"} />
                  </Link>
                </div>
              )}
              {item?.created_at && (
                <div className={styles.iconWrapper}>
                  <Content
                    className={styles.date}
                    color={"stable-500"}
                    size={"xs"}
                    text={formattedDate}
                  />
                </div>
              )}

              {/* {item?.transaction_id && (
                <div className={styles.iconWrapper}>
                  <Icon />
                  <Content
                    className={styles.id}
                    size={"xs"}
                    text={item.transaction_id}
                    emphasize
                  />
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Transactions;
