export enum Coin {
  TRX = "TRX",
  TUSD = "TUSD",
  USDC = "USDC",
  USDT = "USDT"
}

export enum CurrencyChar {
  AUD = "AUD",
  BRL = "BRL",
  CAD = "CAD",
  CHF = "CHF",
  CZK = "CZK",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  RUB = "RUB",
  TRY = "TRY",
  UAH = "UAH",
  USD = "USD"
}

export enum Network {
  TRON = "TRON"
}

export enum Standard {
  BEP2 = "BEP2",
  BEP20 = "BEP20",
  ERC20 = "ERC20",
  OMNI = "OMNI",
  TRC10 = "TRC10",
  TRC20 = "TRC20"
}

export enum TransactionStatus {
  CANCALED = "CANCALED",
  CONFIRMING = "CONFIRMING",
  EXPIRED = "EXPIRED",
  INVALID = "INVALID",
  NEW = "NEW",
  PAID = "PAID",
  REFUNED = "REFUNED"
}

export interface TransactionInput {
  callbackUrl: string;
  cancelUrl?: Nullable<string>;
  hashToken?: Nullable<string>;
  network: Network;
  orderId: string;
  payCurrency: Coin;
  priceAmount: PositiveFloat;
  priceCurrency: CurrencyChar;
  successUrl?: Nullable<string>;
}

export interface Merchant {
  domain: string;
  id: number;
}

export interface TransactionCreate {
  hashToken: string;
  id: number;
  network: Network;
  payAmount: PositiveFloat;
  paymentUrl: string;
  priceAmount: PositiveFloat;
  standard?: Nullable<Standard>;
  to: string;
}

export interface Transaction {
  createdAt: DateTime;
  getMerchant: Merchant;
  id: number;
  network?: Nullable<Network>;
  orderId: string;
  payAmount: PositiveFloat;
  payCurrency?: Nullable<Coin>;
  priceAmount?: Nullable<PositiveFloat>;
  priceCurrency?: Nullable<CurrencyChar>;
  randomUUID: string;
  standard?: Nullable<Standard>;
  status: TransactionStatus;
  to: string;
  transactionId?: Nullable<string>;
  updatedAt: DateTime;
}

export type DateTime = any;
export type PositiveFloat = number;
export type Nullable<T> = T | null;
