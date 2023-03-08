import React, { useState, useEffect } from "react";
import styles from "./checkout.module.scss";
import classNames from "classnames/bind";
import { useConnection } from "@solana/wallet-adapter-react";
import { Tile, Title, Content, Card, Button } from "@ui";
import { Icon } from "@helper";
import { ProductOverview, Payment } from "@components";
import {
  findReference,
  FindReferenceError,
  validateTransfer,
} from "@solana/pay";
import { PublicKey, Keypair } from "@solana/web3.js";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: any;
  receiverAddress: any;
}

const Checkout = ({ className, items, receiverAddress }: IProps) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const { connection } = useConnection();
  const reference = new Keypair().publicKey;
  // const { validatePayment } = usePayment();
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
    // setPaymentStatus("");
  }, [totalPrice]);

  // if (paymentStatus !== "validated") {
  //   toast("Wow so easy!");
  // }

  useEffect(() => {
    let interval: number;
    if (active) {
      let paymentStatus;
      let signatureInfo;

      const checkTransaction = async () => {
        console.count("Checking for transaction...");
        try {
          // Only continues if reference has been found
          signatureInfo = await findReference(connection, reference, {
            finality: "confirmed",
          });
          console.log("\n 🖌  Signature found: ", signatureInfo.signature);
          clearInterval(interval);
          validatePayment(signatureInfo);
        } catch (error: any) {
          if (!(error instanceof FindReferenceError)) {
            console.error(error);
            clearInterval(interval);
          }
        }
      };

      const validatePayment = async (signatureInfo) => {
        // Update payment status
        setPaymentStatus("confirmed");
        try {
          await toast.promise(
            validateTransfer(connection, signatureInfo.signature, {
              recipient: new PublicKey(receiverAddress),
              totalPrice,
            }),
            {
              pending: "Processing",
              success: "Payment received!",
            }
          );

          // Update payment status
          setPaymentStatus("validated");
          console.log("✅ Payment validated");
          console.log("📦 Ship order to customer");
        } catch (error) {
          console.error("❌ Payment failed", error);
        }
      };

      interval = setInterval(checkTransaction, 1000);
    }

    return () => clearInterval(interval);
  }, [active]);

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
            {paymentStatus !== "validated" && (
              <Payment
                receiverAddress={receiverAddress}
                reference={reference}
                paymentAmount={totalPrice}
              />
            )}
          </div>
        )}
        <Button
          onClick={() => setActive(true)}
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
