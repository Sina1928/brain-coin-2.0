import { useEffect, useState } from "react";
import { TableUser } from "../../types";
import { getTopTen } from "../../services/api";
import TopTenTable from "../../components/TopTenTable/TopTenTable";
import "./TopTenPage.scss";

const TopTenPage: React.FC = () => {
  const [users, setUsers] = useState<TableUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTen = async () => {
      try {
        const data = await getTopTen();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching top users");
        setLoading(false);
      }
    };

    fetchTopTen();
  }, []);

  if (loading) return <div className="top-ten-page__loading">Loading...</div>;
  if (error) return <div className="top-ten-page__error">{error}</div>;

  return (
    <div className="top-ten-page">
      <h1 className="top-ten-page__title">Top BrainCoin Holders 🏆</h1>
      <TopTenTable users={users} />
    </div>
  );
};

export default TopTenPage;
