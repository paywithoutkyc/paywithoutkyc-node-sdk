import crypto from "node:crypto";

export type SignatureHmacFunction = (
  orderId: string,
  merchantId: number,
  priceAmount: number,
  priceCurrency: string,
  key: string
) => string;

export let generateHmacSignature: SignatureHmacFunction = (
  orderId,
  merchantId,
  priceAmount,
  priceCurrency,
  key
) => {
  return crypto
    .createHmac("sha512", key)
    .update(`${orderId}:${merchantId}:${priceAmount}:${priceCurrency}`, "utf8")
    .digest("hex");
};
