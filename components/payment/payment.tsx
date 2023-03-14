import React, { useEffect, useRef } from "react";

import { PublicKey } from "@solana/web3.js";
import { encodeURL, createQR } from "@solana/pay";
import BigNumber from "bignumber.js";

interface IProps {
  receiverAddress: string;
  paymentAmount: number;
  reference: PublicKey;
  message: string;
  memo: string;
}

const Payment = ({
  receiverAddress,
  paymentAmount,
  reference,
  message,
  memo,
}: IProps) => {
  const ref: any = useRef();
  const recipient = new PublicKey(receiverAddress);
  const amount = new BigNumber(paymentAmount);
  const label = "Plunge store payment";

  const url = encodeURL({ recipient, amount, reference, label, message, memo });
  useEffect(() => {
    const qrCode = createQR(url, 350);
    qrCode.append(ref?.current);
  }, []);

  return <div ref={ref}></div>;
};

export default Payment;
