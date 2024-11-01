import { TableUser } from "../../types";
import TopTenTable from "../../components/TopTenTable/TopTenTable";
import "./TopTenPage.scss";

interface TopTenPageProps {
  users: TableUser[];
  loading: boolean;
}
const TopTenPage: React.FC<TopTenPageProps> = ({ users, loading }) => {
  if (loading) return <div className="top-ten__loading">Loading...</div>;

  return (
    <div className="top-ten-page">
      <h1 className="top-ten-page__title">Richest of the Rich 💰</h1>
      <TopTenTable users={users} />
    </div>
  );
};

export default TopTenPage;
