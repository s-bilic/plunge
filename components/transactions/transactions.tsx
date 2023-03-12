import React from "react";
import Link from "next/link";
import styles from "./transactions.module.scss";
import classNames from "classnames/bind";
import { Content, Card } from "@ui";
import { Icon } from "@helper";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: ITransaction[];
}

interface ITransaction {
  transaction_subtotal: number;
  transaction_signature: string;
  created_at: string;
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
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Transactions;
