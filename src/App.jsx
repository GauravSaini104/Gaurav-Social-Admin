import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import DashboardOverview from "./pages/admin/DashboardOverview";
import UsersPage from "./pages/admin/UsersPage";
import MatchesPage from "./pages/admin/MatchesPage";
import SubscriptionsPage from "./pages/admin/SubscriptionsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import ModerationPage from "./pages/admin/ModerationPage";
import SettingsPage from "./pages/admin/SettingsPage";
import MaintenancePage from "./pages/shared/MaintenancePage";
import NotFoundPage from "./pages/shared/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<AdminLogin />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* ✅ Default dashboard page */}
        <Route index element={<DashboardOverview />} />

        <Route path="users" element={<UsersPage />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="moderation" element={<ModerationPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Other */}
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;