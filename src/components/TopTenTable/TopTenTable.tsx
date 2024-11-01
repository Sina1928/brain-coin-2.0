import { useState, useEffect, useMemo } from "react";
import { TableUser } from "../../types";
import apiService from "../../services/api";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, X } from "lucide-react";
import "./TopTenTable.scss";

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

const TopTenTable: React.FC<TopTenTableProps> = () => {
  const [users, setUsers] = useState<TableUser[]>([]);
  const [sortField, setSortField] = useState<SortField>(
    "totalValueInMarkBucks"
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await apiService.getTopUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    // First filter users based on search query
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
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
  }, [users, searchQuery, sortField, sortOrder]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={16} />;
    return sortOrder === "asc" ? (
      <ArrowUp size={16} />
    ) : (
      <ArrowDown size={16} />
    );
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="top-ten-table">
      <div className="top-ten-table__header">
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="clear-search">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

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
            className={`filter-button ${
              sortField === "Kcoins" ? "active" : ""
            }`}
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
      </div>

      {filteredAndSortedUsers.length === 0 ? (
        <div className="no-results">
          <p>No users found matching "{searchQuery}"</p>
          <button onClick={clearSearch} className="clear-search-button">
            Clear Search
          </button>
        </div>
      ) : (
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
            {filteredAndSortedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={index < 3 ? `rank-${index + 1}` : ""}
              >
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
      )}
    </div>
  );
};

export default TopTenTable;

// import { useState, useMemo } from "react";
// import { TableUser } from "../../types";
// import apiService from "@/services/api";
// import { ArrowUpDown, ArrowUp, ArrowDown, Search, X } from "lucide-react";
// import "./TopTenTable.scss";

// interface TopTenTableProps {
//  users: TableUser[];
// }

// type SortField =
//   | "totalValueInMarkBucks"
//   | "Umer coins"
//   | "Mark bucks"
//   | "Kcoins"
//   | "CorgiCoins"
//   | "Neo Coins";
// type SortOrder = "asc" | "desc";

// const TopTenTable: React.FC<TopTenTableProps> = ({ users }) => {
//   const [sortField, setSortField] = useState<SortField>(
//     "totalValueInMarkBucks"
//   );
//   const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("desc");
//     }
//   };

//   const filteredAndSortedUsers = useMemo(() => {
//     // First filter users based on search query
//     const filtered = users.filter((user) =>
//       user.username.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Then sort the filtered results
//     return [...filtered].sort((a, b) => {
//       let aValue: number;
//       let bValue: number;

//       if (sortField === "totalValueInMarkBucks") {
//         aValue = a.totalValueInMarkBucks;
//         bValue = b.totalValueInMarkBucks;
//       } else {
//         aValue = a.balances[sortField];
//         bValue = b.balances[sortField];
//       }

//       return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
//     });
//   }, [users, searchQuery, sortField, sortOrder]);

//   const getSortIcon = (field: SortField) => {
//     if (sortField !== field) return <ArrowUpDown size={16} />;
//     return sortOrder === "asc" ? (
//       <ArrowUp size={16} />
//     ) : (
//       <ArrowDown size={16} />
//     );
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//   };

//   return (
//     <div className="top-ten-table">
//       <div className="top-ten-table__header">
//         <div className="search-container">
//           <div className="search-input-wrapper">
//             <Search size={20} className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search by username..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="search-input"
//             />
//             {searchQuery && (
//               <button onClick={clearSearch} className="clear-search">
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="top-ten-table__filters">
//           <span>Sort by:</span>
//           <button
//             className={`filter-button ${
//               sortField === "totalValueInMarkBucks" ? "active" : ""
//             }`}
//             onClick={() => handleSort("totalValueInMarkBucks")}
//           >
//             Total Value
//           </button>
//           <button
//             className={`filter-button ${
//               sortField === "Umer coins" ? "active" : ""
//             }`}
//             onClick={() => handleSort("Umer coins")}
//           >
//             Umer Coins
//           </button>
//           <button
//             className={`filter-button ${
//               sortField === "Mark bucks" ? "active" : ""
//             }`}
//             onClick={() => handleSort("Mark bucks")}
//           >
//             Mark Bucks
//           </button>
//           <button
//             className={`filter-button ${
//               sortField === "Kcoins" ? "active" : ""
//             }`}
//             onClick={() => handleSort("Kcoins")}
//           >
//             K-Coins
//           </button>
//           <button
//             className={`filter-button ${
//               sortField === "CorgiCoins" ? "active" : ""
//             }`}
//             onClick={() => handleSort("CorgiCoins")}
//           >
//             CorgiCoins
//           </button>
//           <button
//             className={`filter-button ${
//               sortField === "Neo Coins" ? "active" : ""
//             }`}
//             onClick={() => handleSort("Neo Coins")}
//           >
//             Neo Coins
//           </button>
//         </div>
//       </div>

//       {filteredAndSortedUsers.length === 0 ? (
//         <div className="no-results">
//           <p>No users found matching "{searchQuery}"</p>
//           <button onClick={clearSearch} className="clear-search-button">
//             Clear Search
//           </button>
//         </div>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Rank</th>
//               <th>Username</th>
//               <th className="sortable" onClick={() => handleSort("Umer coins")}>
//                 Umer Coins {getSortIcon("Umer coins")}
//               </th>
//               <th className="sortable" onClick={() => handleSort("Mark bucks")}>
//                 Mark Bucks {getSortIcon("Mark bucks")}
//               </th>
//               <th className="sortable" onClick={() => handleSort("Kcoins")}>
//                 K-Coins {getSortIcon("Kcoins")}
//               </th>
//               <th className="sortable" onClick={() => handleSort("CorgiCoins")}>
//                 CorgiCoins {getSortIcon("CorgiCoins")}
//               </th>
//               <th className="sortable" onClick={() => handleSort("Neo Coins")}>
//                 Neo Coins {getSortIcon("Neo Coins")}
//               </th>
//               <th
//                 className="sortable"
//                 onClick={() => handleSort("totalValueInMarkBucks")}
//               >
//                 Total Value (MB) {getSortIcon("totalValueInMarkBucks")}
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAndSortedUsers.map((user, index) => (
//               <tr
//                 key={user.id}
//                 className={index < 3 ? `rank-${index + 1}` : ""}
//               >
//                 <td className="rank-cell">
//                   <span className="rank">{index + 1}</span>
//                 </td>
//                 <td>{user.username}</td>
//                 <td>{user.balances["Umer coins"].toLocaleString()}</td>
//                 <td>{user.balances["Mark bucks"].toLocaleString()}</td>
//                 <td>{user.balances["Kcoins"].toLocaleString()}</td>
//                 <td>{user.balances["CorgiCoins"].toLocaleString()}</td>
//                 <td>{user.balances["Neo Coins"].toLocaleString()}</td>
//                 <td className="total-value">
//                   {user.totalValueInMarkBucks.toLocaleString(undefined, {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TopTenTable;
