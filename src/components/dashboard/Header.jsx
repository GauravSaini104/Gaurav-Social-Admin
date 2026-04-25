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

export default function Header({ onToggleSidebar, onLogout }) {
  const handleLogout = typeof onLogout === "function" ? onLogout : () => {};

  return (
    <header className="admin-header" role="banner">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <div>
          <p className="header-kicker">Admin Console</p>
          <h1>Overview</h1>
        </div>
      </div>

      <div className="header-right" role="navigation" aria-label="Header actions">
        <span className="status-pill" aria-hidden>
          Live • Updated every 5 min
        </span>

        {/* Notification button */}
        <button
          className="icon-btn notification-btn"
          type="button"
          aria-label="Notifications"
          title="Notifications"
        >
          <span aria-hidden>🔔</span>
          <span className="notification-badge" aria-hidden>
            3
          </span>
        </button>

        {/* Profile button */}
        <button
          className="icon-btn profile-btn"
          type="button"
          aria-label="Profile"
          title="Profile"
        >
          {/* Replace src with real avatar URL or use initials */}
          <img
            src="https://pxcollections.co.in/wp-content/uploads/2025/08/instagram-dp-download-7.jpg"
            alt=""
            className="avatar"
            width="32"
            height="32"
          />
          <span className="sr-only">Open profile menu</span>
        </button>

        {/* Log out (keeps original label and behavior; optional onLogout prop) */}
        <button
          className="primary-action logout-btn"
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
