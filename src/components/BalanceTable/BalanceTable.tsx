import { TableUser } from "../../types";
import "./BalanceTable.scss";

interface BalanceTableProps {
  users: TableUser[];
}

const BalanceTable: React.FC<BalanceTableProps> = ({ users }) => {
  const calculateTotalValue = (user: TableUser): number => {
    return (
      (user["Umer coins"] || 0) * (100 / 500) +
      (user["Mark bucks"] || 0) +
      (user["Kcoins"] || 0) * 500 +
      (user["CorgiCoins"] || 0) * 500 +
      (user["Neo Coins"] || 0) * 1000
    );
  };

  return (
    <table className="balance-table">
      <thead className="balance-table__header">
        <tr>
          <th className="balance-table__header-cell">Username</th>
          <th className="balance-table__header-cell">Umer Coins</th>
          <th className="balance-table__header-cell">Mark Bucks</th>
          <th className="balance-table__header-cell">K-Coins</th>
          <th className="balance-table__header-cell">CorgiCoins</th>
          <th className="balance-table__header-cell">Neo Coins</th>
          <th className="balance-table__header-cell">
            Total Value in Mark Bucks
          </th>
        </tr>
      </thead>
      <tbody className="balance-table__body">
        {users.map((user) => {
          const totalValue = calculateTotalValue(user);

          return (
            <tr className="balance-table__row" key={user.id}>
              <td className="balance-table__cell">{user.username}</td>
              <td className="balance-table__cell">{user["Umer coins"]}</td>
              <td className="balance-table__cell">{user["Mark bucks"]}</td>
              <td className="balance-table__cell">{user["Kcoins"]}</td>
              <td className="balance-table__cell">{user["CorgiCoins"]}</td>
              <td className="balance-table__cell">{user["Neo Coins"]}</td>
              <td className="balance-table__cell">{totalValue.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BalanceTable;
