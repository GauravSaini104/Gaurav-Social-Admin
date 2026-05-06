import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import DashboardOverview from "./pages/admin/DashboardOverview";
import UsersPage from "./pages/admin/UsersPage";
import SuccessStories from "./pages/admin/SuccessStories";

import ReportsPage from "./pages/admin/ReportsPage";

import SettingsPage from "./pages/admin/SettingsPage";
import MaintenancePage from "./pages/shared/MaintenancePage";
import NotFoundPage from "./pages/shared/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SuccessStoriesPage from "./pages/admin/SuccessStories";
import SpamControl from "./pages/admin/Spamcontrol";
import VerifiedDocument from "./pages/admin/verifieddocument";

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
        <Route path="success-stories" element={<SuccessStoriesPage />} />
        <Route path="spam-control" element={<SpamControl />} />
        <Route path="verified-document" element={<VerifiedDocument />} />
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