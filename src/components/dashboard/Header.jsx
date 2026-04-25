import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: "📊" },
  { to: "/dashboard/users", label: "Members", icon: "👥" },
  { to: "/dashboard/matches", label: "Matches", icon: "💞" },
  { to: "/dashboard/subscriptions", label: "Plans", icon: "💳" },
  { to: "/dashboard/moderation", label: "Moderation", icon: "🛡️" },
  { to: "/dashboard/reports", label: "Reports", icon: "📁" },
  { to: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  { to: "/maintenance", label: "Maintenance", icon: "🚧" },
];

export default function Header({ onToggleSidebar }) {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>
        <div>
          <p className="header-kicker">Admin Console</p>
          <h1>Overview</h1>
        </div>
</div>
        <div className="header-right">
        <span className="status-pill">Live • Updated every 5 min</span>
        <button className="primary-action">Export Report</button>
      </div>
    </header>
  );
}