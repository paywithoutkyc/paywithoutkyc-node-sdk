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

export enum TransactionStatus {
  CANCELLED = "CANCELLED",
  CONFIRMING = "CONFIRMING",
  EXPIRED = "EXPIRED",
  INVALID = "INVALID",
  NEW = "NEW",
  PAID = "PAID",
  PENDING = "PENDING",
  REFUNDED = "REFUNDED"
}

export interface TransactionInput {
  callbackUrl: string;
  cancelUrl?: Nullable<string>;
  merchantId: number;
  network: string;
  orderId: string;
  payCurrency: string;
  priceAmount: PositiveFloat;
  priceCurrency: CurrencyChar;
  successUrl?: Nullable<string>;
}

export interface Coin {
  description: string;
  id: number;
  symbol: string;
  logo: string;
  name: string;
}

export interface Network {
  description: string;
  getCoins: Coin[];
  id: number;
  symbol: string;
  logo: string;
  name: string;
}

export interface Merchant {
  domain: string;
  id: number;
}

export interface TransactionCreate {
  getCoin: Coin;
  getNetwork: Network;
  id: number;
  payAmount: PositiveFloat;
  paymentUrl: string;
  priceAmount: PositiveFloat;
  to: string;
}

export interface Transaction {
  createdAt: DateTime;
  paidetedAt: Nullable<DateTime>;
  getCoin: Coin;
  getMerchant: Merchant;
  getNetwork: Network;
  id: number;
  orderId: string;
  payAmount: PositiveFloat;
  payCurrency?: Nullable<string>;
  paymentUrl: string;
  priceAmount?: Nullable<PositiveFloat>;
  priceCurrency?: Nullable<CurrencyChar>;
  randomUUID: string;
  status: TransactionStatus;
  to: string;
  transactionId?: Nullable<string>;
  updatedAt: DateTime;
}

export interface TransactionCallback {
  id: number;
  merchantId: number;
  createdAt: DateTime;
  updatedAt: DateTime;
  paidetedAt: Nullable<DateTime>;
  orderId: string;
  payAmount: number;
  payCurrency: string;
  paymentUrl: string;
  callbackUrl: string;
  priceAmount: number;
  priceCurrency: string;
  randomUUID: string;
  status: TransactionStatus;
  to: string;
  from: Nullable<string>;
  transactionId: Nullable<string>;
}

export type BigInt = any;
export type DateTime = any;
export type PositiveFloat = any;
export type Timestamp = any;
type Nullable<T> = T | null;
