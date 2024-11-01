import { useState } from "react";
import { TableUser } from "../../types";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import "./TopTenPage.scss";

interface TopTenTableProps {
  users: TableUser[];
}

type SortField =
  | "totalValueInMarkBucks"
  | "Umer coins"
  | "Mark bucks"
  | "Kcoins"
  | "CorgiCoins"
  | "Neo Coins";
type SortOrder = "asc" | "desc";

const TopTenTable: React.FC<TopTenTableProps> = ({ users }) => {
  const [sortField, setSortField] = useState<SortField>(
    "totalValueInMarkBucks"
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getSortedUsers = () => {
    return [...users].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      if (sortField === "totalValueInMarkBucks") {
        aValue = a.totalValueInMarkBucks;
        bValue = b.totalValueInMarkBucks;
      } else {
        aValue = a.balances[sortField];
        bValue = b.balances[sortField];
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={16} />;
    return sortOrder === "asc" ? (
      <ArrowUp size={16} />
    ) : (
      <ArrowDown size={16} />
    );
  };

  const sortedUsers = getSortedUsers();

  return (
    <div className="top-ten-table">
      <div className="top-ten-table__filters">
        <span>Sort by:</span>
        <button
          className={`filter-button ${
            sortField === "totalValueInMarkBucks" ? "active" : ""
          }`}
          onClick={() => handleSort("totalValueInMarkBucks")}
        >
          Total Value
        </button>
        <button
          className={`filter-button ${
            sortField === "Umer coins" ? "active" : ""
          }`}
          onClick={() => handleSort("Umer coins")}
        >
          Umer Coins
        </button>
        <button
          className={`filter-button ${
            sortField === "Mark bucks" ? "active" : ""
          }`}
          onClick={() => handleSort("Mark bucks")}
        >
          Mark Bucks
        </button>
        <button
          className={`filter-button ${sortField === "Kcoins" ? "active" : ""}`}
          onClick={() => handleSort("Kcoins")}
        >
          K-Coins
        </button>
        <button
          className={`filter-button ${
            sortField === "CorgiCoins" ? "active" : ""
          }`}
          onClick={() => handleSort("CorgiCoins")}
        >
          CorgiCoins
        </button>
        <button
          className={`filter-button ${
            sortField === "Neo Coins" ? "active" : ""
          }`}
          onClick={() => handleSort("Neo Coins")}
        >
          Neo Coins
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th className="sortable" onClick={() => handleSort("Umer coins")}>
              Umer Coins {getSortIcon("Umer coins")}
            </th>
            <th className="sortable" onClick={() => handleSort("Mark bucks")}>
              Mark Bucks {getSortIcon("Mark bucks")}
            </th>
            <th className="sortable" onClick={() => handleSort("Kcoins")}>
              K-Coins {getSortIcon("Kcoins")}
            </th>
            <th className="sortable" onClick={() => handleSort("CorgiCoins")}>
              CorgiCoins {getSortIcon("CorgiCoins")}
            </th>
            <th className="sortable" onClick={() => handleSort("Neo Coins")}>
              Neo Coins {getSortIcon("Neo Coins")}
            </th>
            <th
              className="sortable"
              onClick={() => handleSort("totalValueInMarkBucks")}
            >
              Total Value (MB) {getSortIcon("totalValueInMarkBucks")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.id} className={index < 3 ? `rank-${index + 1}` : ""}>
              <td className="rank-cell">
                <span className="rank">{index + 1}</span>
              </td>
              <td>{user.username}</td>
              <td>{user.balances["Umer coins"].toLocaleString()}</td>
              <td>{user.balances["Mark bucks"].toLocaleString()}</td>
              <td>{user.balances["Kcoins"].toLocaleString()}</td>
              <td>{user.balances["CorgiCoins"].toLocaleString()}</td>
              <td>{user.balances["Neo Coins"].toLocaleString()}</td>
              <td className="total-value">
                {user.totalValueInMarkBucks.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTenTable;
