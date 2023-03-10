import React, { useEffect, useState, useRef } from "react";

import { PublicKey, Keypair } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  encodeURL,
  createQR,
  findReference,
  FindReferenceError,
  validateTransfer,
} from "@solana/pay";
import BigNumber from "bignumber.js";

const Payment = ({
  receiverAddress,
  paymentAmount,
  reference,
  message,
  memo,
}) => {
  const ref: any = useRef();
  const recipient = new PublicKey(receiverAddress);
  const amount = new BigNumber(paymentAmount);
  const label = "Plunge store payment";

  const url = encodeURL({ recipient, amount, reference, label, message, memo });
  console.log(memo);
  console.log(message);
  useEffect(() => {
    const qrCode = createQR(url, 350);
    qrCode.append(ref?.current);
  }, []);

  return <div ref={ref}></div>;
};

export default Payment;
