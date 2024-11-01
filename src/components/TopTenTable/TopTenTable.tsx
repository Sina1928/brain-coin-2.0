import { TableUser } from "../../types";
import "./TopTenTable.scss";

interface TopTenTableProps {
  users: TableUser[];
}

const TopTenTable: React.FC<TopTenTableProps> = ({ users }) => {
  return (
    <div className="top-ten-table">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Umer Coins</th>
            <th>Mark Bucks</th>
            <th>K-Coins</th>
            <th>CorgiCoins</th>
            <th>Neo Coins</th>
            <th>Total Value (MB)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index < 3 ? `rank-${index + 1}` : ""}>
              <td className="rank-cell">
                <span className="rank">{index + 1}</span>
              </td>
              <td>{user.username}</td>
              <td>{user["Umer coins"]}</td>
              <td>{user["Mark bucks"]}</td>
              <td>{user["Kcoins"]}</td>
              <td>{user["CorgiCoins"]}</td>
              <td>{user["Neo Coins"]}</td>
              <td className="total-value">
                {user.totalValueInMarkBucks.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTenTable;
