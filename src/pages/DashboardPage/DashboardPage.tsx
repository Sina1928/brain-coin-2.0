import { useState, useEffect } from "react";
import BalanceCard from "../../components/BalanceCard/BalanceCard";
import { Transaction, UserBalances } from "../../types";
import api from "../../services/api";
import "./DashboardPage.scss";

interface UserData {
  username: string;
  balances: UserBalances;
  totalValueInMarkBucks: number;
}

const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    balances: {
      "Umer coins": 0,
      "Mark bucks": 0,
      Kcoins: 0,
      CorgiCoins: 0,
      "Neo Coins": 0,
    },
    totalValueInMarkBucks: 0,
  });

  // Sample transactions with correct type
  const sampleTransactions: Transaction[] = [
    {
      id: "1",
      type: "incoming",
      amount: 50,
      currency: "Mark bucks",
      from: "Alice Smith",
      date: "2024-10-31 14:30",
      userImage: "/images/alice.jpg",
    },
    {
      id: "2",
      type: "outgoing",
      amount: 25,
      currency: "Umer coins",
      from: "Bob Johnson",
      date: "2024-10-31 12:15",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get<UserData>("/users/profile");
        setUserData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) return <div className="dashboard__loading">Loading...</div>;
  if (error) return <div className="dashboard__error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Welcome back, {userData.username}!</h1>
      </div>

      <div className="dashboard__content">
        <div className="dashboard__balance-card">
          <BalanceCard
            username={userData.username}
            balances={userData.balances}
            totalValueInMarkBucks={userData.totalValueInMarkBucks}
            recentTransactions={sampleTransactions}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
