import express from "express";
import crypto from "node:crypto";
import bodyParser from "body-parser";

import { PayWithoutKYC, CurrencyChar } from "../src/index";
import { TransactionCallback } from "../src/types";

let payWithoutKYC = new PayWithoutKYC({
  publicKey: process.env.publicKey,
  secretKey: process.env.secretKey
});

/*
payWithoutKYC
  .createTransaction({
    orderId: crypto.randomUUID(),
    merchantId: 1,
    callbackUrl: process.env.callbackUrl,
    payCurrency: "TRX",
    priceAmount: 1,
    priceCurrency: CurrencyChar.RUB,
    network: "TRON"
  })
  .then(console.log);
*/

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/getTransaction/:randomUUID", async (request, response) => {
  try {
    let getTransaction = await payWithoutKYC.getTransaction(
      request.params.randomUUID
    );

    response.json(getTransaction);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

app.post("/webhooks/paywithoutkyc", (request, response) => {
  const getTransaction = request.body as TransactionCallback;
  const signature = request.get("x-callback-signature") || "";

  if (!payWithoutKYC.verifySignature(getTransaction, signature)) {
    return response.status(500).send("Invalid signature!");
  }

  response.status(200).send("OK");
});

app.listen(3000);
