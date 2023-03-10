import React, { useState, useEffect } from "react";
import styles from "./checkout.module.scss";
import classNames from "classnames/bind";
import { useConnection } from "@solana/wallet-adapter-react";
import { Tile, Title, Content, Card, Button } from "@ui";
import { Icon } from "@helper";
import { ProductOverview, Payment } from "@components";
import { supabase } from "@utils";
import {
  findReference,
  FindReferenceError,
  validateTransfer,
} from "@solana/pay";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import BigNumber from "bignumber.js";

const cx = classNames.bind(styles);

interface IProps {
  className?: string;
  items: any;
  receiverAddress: any;
}

const Checkout = ({ className, items, receiverAddress, store }: IProps) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const { connection } = useConnection();
  const reference = new Keypair().publicKey;
  const [countData, setCountData] = useState(new Array(items?.length).fill(1));
  const [totalPrice, setTotalPrice] = useState();
  const [active, setActive] = useState(false);
  const orderId = uuidv4();

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

  console.log(countData);
  // Creates new array of selected items with quantity for each selected product.
  const transformedItems = items?.map((item, index) => ({
    ...item,
    product_quantity: countData[index],
  }));

  useEffect(() => {
    const newTotalPrice = items?.reduce(
      (acc, item, i) => acc + item.product_price * countData[i],
      0
    );

    const totalPrice = new BigNumber(newTotalPrice);
    const roundedTotalPrice = totalPrice.toFixed(3);

    setTotalPrice(roundedTotalPrice);
  }, [items, countData]);

  useEffect(() => {
    setActive(false);
    setPaymentStatus("");
    // setPaymentStatus("");
  }, [totalPrice]);

  useEffect(() => {
    let interval: number;
    if (active) {
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
            validateTransfer(connection, signatureInfo?.signature, {
              recipient: new PublicKey(receiverAddress),
              totalPrice,
            }),
            {
              error: "Something went wrong",
              pending: "Processing",
              success: "Payment received!",
            }
          );

          // Update payment status
          setPaymentStatus("validated");

          await supabase.from("transactions").insert({
            transaction_id: orderId,
            transaction_signature: signatureInfo?.signature,
            transaction_reference: reference?.toBase58(),
            transaction_subtotal: totalPrice,
            user_id: store?.user_id,
            store_id: store?.store_id,
          });

          const transactionDetails = transformedItems?.map((item) => ({
            transaction_id: orderId,
            product_id: item?.product_id,
            transaction_detail_quantity: item?.product_quantity,
            transaction_detail_price: item?.product_price,
          }));

          await supabase.from("transaction_details").insert(transactionDetails);

          console.log("✅ Payment validated");
        } catch (error) {
          setPaymentStatus("");
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
                message={"order-id: " + orderId}
                memo={orderId}
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
          disabled={totalPrice === 0 || active}
        />
      </div>
    </Card>
  );
};

export default Checkout;
