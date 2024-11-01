import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import "./BalanceCard.scss";

interface Transaction {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  currency: string;
  from: string;
  date: string;
  userImage?: string;
}

interface BalanceCardProps {
  username: string;
  balances: {
    "Umer coins": number;
    "Mark bucks": number;
    Kcoins: number;
    CorgiCoins: number;
    "Neo Coins": number;
  };
  totalValueInMarkBucks: number;
  recentTransactions?: Transaction[];
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  username,
  balances,
  totalValueInMarkBucks,
  recentTransactions = [],
}) => {
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>("Mark bucks");

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="balance-card">
      <div className="balance-card__header">
        <h2>{username}'s Balance</h2>
        <Wallet className="header-icon" size={24} />
      </div>

      <div className="balance-card__balance">
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="currency-select"
        >
          {Object.entries(balances).map(([currency]) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span className="amount">
          {formatCurrency(balances[selectedCurrency as keyof typeof balances])}
        </span>
      </div>

      <div className="balance-card__total">
        <span className="label">Total Value in Mark Bucks</span>
        <span className="total-amount">
          {formatCurrency(totalValueInMarkBucks)} MB
        </span>
      </div>

      <div className="balance-card__actions">
        <button className="action-button">Send</button>
        <button className="action-button secondary">Convert</button>
      </div>

      <div className="balance-card__transactions">
        <div className="transactions-title">
          <span>Recent Transactions</span>
          <span className="subtitle">Today</span>
        </div>

        <div className="transactions-list">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-item__info">
                {transaction.userImage ? (
                  <img
                    src={transaction.userImage}
                    alt={transaction.from}
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    {transaction.from[0].toUpperCase()}
                  </div>
                )}
                <div className="transaction-details">
                  <span className="name">{transaction.from}</span>
                  <span className="date">{transaction.date}</span>
                </div>
              </div>

              <div className={`transaction-item__amount ${transaction.type}`}>
                {transaction.type === "incoming" ? (
                  <ArrowDownCircle
                    className="transaction-icon incoming"
                    size={16}
                  />
                ) : (
                  <ArrowUpCircle
                    className="transaction-icon outgoing"
                    size={16}
                  />
                )}
                <span>
                  {transaction.type === "incoming" ? "+" : "-"}
                  {formatCurrency(transaction.amount)} {transaction.currency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
