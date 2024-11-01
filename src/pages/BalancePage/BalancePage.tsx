import { useEffect, useState } from "react";
import { User, TableUser } from "../../types";
import { getBalances } from "../../services/api";
import BalanceTable from "../../components/BalanceTable/BalanceTable";
import "./BalancePage.scss";

const BalancePage: React.FC = () => {
  const [users, setUsers] = useState<TableUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformUserToTableUser = (user: User): TableUser => {
    return {
      id: user.id,
      username: user.username,
      "Umer coins": user.balances["Umer coins"],
      "Mark bucks": user.balances["Mark bucks"],
      Kcoins: user.balances["Kcoins"],
      CorgiCoins: user.balances["CorgiCoins"],
      "Neo Coins": user.balances["Neo Coins"],
      totalValueInMarkBucks: user.totalValueInMarkBucks,
    };
  };

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const data = await getBalances();
        const tableUsers = data.map(transformUserToTableUser);
        setUsers(tableUsers);
        setLoading(false);
      } catch (err) {
        setError("Error fetching balances");
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  if (loading) return <div className="balance__loading">Loading...</div>;
  if (error) return <div className="balance__error">{error}</div>;

  return (
    <div className="balance">
      <h1 className="balance__title">User Balances</h1>
      <BalanceTable users={users} />
    </div>
  );
};

export default BalancePage;
