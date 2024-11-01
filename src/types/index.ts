// Currency related types
export interface CurrencyRates {
  MarkBucks: number;
  UmerCoins: number;
  KBarDinar: number;
  CorgiCoin: number;
  NeoCoin: number;
}

export interface CurrencyConversion {
  amount: string;
  fromCurrency: keyof CurrencyRates;
  toCurrency: keyof CurrencyRates;
}

export interface Currency {
  name: string;
  description: string;
  conversionRateToMarkBucks: number;
}

// User and balance related types
export interface UserBalances {
  "Umer coins": number;
  "Mark bucks": number;
  Kcoins: number;
  CorgiCoins: number;
  "Neo Coins": number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  balances: UserBalances;
  totalValueInMarkBucks: number;
}

export interface TableUser extends UserBalances {
  id: number;
  username: string;
  totalValueInMarkBucks: number;
}

// Transaction related types
export interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  currency: string;
  from: string;
  date: string;
  userImage?: string;
}
