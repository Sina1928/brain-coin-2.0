import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import "./App.scss";
import apiService from "./services/api";
import { TableUser } from "./types";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import LandingPage from "./pages/LandingPage/LandingPage";
import BalancePage from "./pages/BalancePage/BalancePage";
import TopTenPage from "./pages/TopTenPage/TopTenPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Header from "./components/Header/Header";

function App() {
  const [users, setUsers] = useState<TableUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiService.getTopUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route
          path="/top-ten"
          element={<TopTenPage users={users} loading={loading} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
