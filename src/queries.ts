import { gql } from "graphql-request";

export const CREATE_TRANSACTION = gql`
  mutation($input: TransactionInput!) {
    createTransaction(input: $input) {
      id
      priceAmount
      payAmount
      paymentUrl
      to
      standard
      network
      hashToken
    }
  }
`;
