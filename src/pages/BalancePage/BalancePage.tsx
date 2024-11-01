import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TableUser } from "../../types";
import apiService from "../../services/api";
import BalanceTable from "../../components/BalanceTable/BalanceTable";
import "./BalancePage.scss";

const BalancePage: React.FC = () => {
  const [users, setUsers] = useState<TableUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiService.getTopUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching user balances";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="balance__loading">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="balance__error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="balance">
      <h1 className="balance__title">User Balances</h1>
      {users.length > 0 ? (
        <BalanceTable users={users} />
      ) : (
        <p className="balance__no-data">No users found</p>
      )}
    </div>
  );
};

export default BalancePage;
