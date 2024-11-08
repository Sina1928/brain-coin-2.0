import { TableUser } from "../../types";
import "./BalanceTable.scss";

interface BalanceTableProps {
  users: TableUser[];
}

const BalanceTable: React.FC<BalanceTableProps> = ({ users }) => {
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
        {users.map((user) => (
          <tr className="balance-table__row" key={user.id}>
            <td className="balance-table__cell">{user.username}</td>
            <td className="balance-table__cell">
              {user.balances["Umer coins"]}
            </td>
            <td className="balance-table__cell">
              {user.balances["Mark bucks"]}
            </td>
            <td className="balance-table__cell">{user.balances["Kcoins"]}</td>
            <td className="balance-table__cell">
              {user.balances["CorgiCoins"]}
            </td>
            <td className="balance-table__cell">
              {user.balances["Neo Coins"]}
            </td>
            <td className="balance-table__cell">
              {user.totalValueInMarkBucks.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BalanceTable;
