import { GraphQLClient, ClientError } from "graphql-request";

import { TransactionInput, TransactionCreate } from "./graphql";
import { CREATE_TRANSACTION } from "./queries";

export class PayWithoutKYC {
  constructor(merchantToken: string) {
    this.graphQLClient = new GraphQLClient(
      `https://paywithoutkyc.com/graphql`,
      {
        headers: {
          "MERCHANT-TOKEN": merchantToken
        }
      }
    );
  }

  graphQLClient: GraphQLClient;

  public async createTransaction(input: TransactionInput) {
    try {
      const data = await this.graphQLClient.request<
        {
          createTransaction: TransactionCreate;
        },
        { input: TransactionInput }
      >(CREATE_TRANSACTION, {
        input
      });

      return data?.createTransaction;
    } catch (err) {
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
  }
}

export * from "./graphql";
