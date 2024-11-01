import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import apiService from "../../services/api";
import { User } from "../../types";
import "./DashboardPage.scss";
import BalanceCard from "../../components/BalanceCard/BalanceCard";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiService.getUserProfile();
        setUserData(data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Failed to load profile");
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (!userData) return <div>Error loading profile</div>;

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
            // recentTransactions={sampleTransactions}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
