import { GraphQLClient, ClientError } from "graphql-request";
import { generateHmacSignature } from "./utils";
import {
  Transaction,
  TransactionInput,
  TransactionCreate,
  TransactionCallback
} from "./types";
import { CREATE_TRANSACTION, GET_TRANSACTION } from "./queries";

export class PayWithoutKYC {
  publicKey: string;
  secretKey: string;

  constructor({
    publicKey,
    secretKey
  }: {
    publicKey: string;
    secretKey: string;
  }) {
    if (!publicKey) {
      throw new Error("Public key not initialized!");
    } else if (!secretKey) {
      throw new Error("Secret key not initialized!");
    }

    this.publicKey = publicKey;
    this.secretKey = secretKey;
    this.graphQLClient = new GraphQLClient(`https://paywithoutkyc.com/graphql`);
  }

  graphQLClient: GraphQLClient;

  formatError(err: Error) {
    if (err instanceof ClientError) {
      const {
        response: { errors, status }
      } = err as ClientError;

      if ([200, 400].includes(status)) {
        throw new Error(errors.map(({ message }) => message).join("\n"));
      } else {
        throw new Error("Internal Server Error!");
      }
    }

    throw err;
  }

  public async createTransaction(input: TransactionInput) {
    try {
      const data = await this.graphQLClient.request<
        {
          createTransaction: TransactionCreate;
        },
        { input: TransactionInput }
      >(
        CREATE_TRANSACTION,
        {
          input
        },
        {
          "x-api-signature": generateHmacSignature(
            input.orderId,
            input.merchantId,
            input.priceAmount,
            input.priceCurrency,
            this.publicKey
          )
        }
      );

      return data?.createTransaction;
    } catch (err) {
      return this.formatError(err);
    }
  }

  public async getTransaction(randomUUID: string) {
    try {
      const data = await this.graphQLClient.request<
        {
          getTransaction: Transaction;
        },
        { randomUUID: string }
      >(GET_TRANSACTION, {
        randomUUID
      });

      return data?.getTransaction;
    } catch (err) {
      return this.formatError(err);
    }
  }

  verifySignature(body: TransactionCallback, signature: string) {
    return (
      generateHmacSignature(
        body.orderId,
        body.merchantId,
        body.priceAmount,
        body.priceCurrency,
        this.secretKey
      ) === signature
    );
  }
}

export * from "./types";
