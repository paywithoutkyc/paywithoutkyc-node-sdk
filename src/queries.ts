import { gql } from "graphql-request";

export const CREATE_TRANSACTION = gql`
  mutation($input: TransactionInput!) {
    createTransaction(input: $input) {
      id
      priceAmount
      payAmount
      paymentUrl
      to
      getNetwork {
        description
        id
        symbol
        logo
        name
      }
      getCoin {
        description
        id
        symbol
        logo
        name
      }
    }
  }
`;

export const GET_TRANSACTION = gql`
  query($randomUUID: String!) {
    getTransaction(randomUUID: $randomUUID) {
      id
      createdAt
      id
      orderId
      payAmount
      payCurrency
      paymentUrl
      priceAmount
      priceCurrency
      randomUUID
      status
      to
      transactionId
      updatedAt
      paidetedAt
      getNetwork {
        description
        id
        symbol
        logo
        name
      }
      getCoin {
        description
        id
        symbol
        logo
        name
      }
      getMerchant {
        id
        domain
      }
    }
  }
`;
