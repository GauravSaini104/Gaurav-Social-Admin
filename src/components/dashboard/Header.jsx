import React, { useEffect } from "react"; // ✅ useEffect add
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  const navigate = useNavigate();

  // ✅ GET PROFILE API CALL
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://social-taste-matrimony.onrender.com/api/auth/user/69eb51f0bbf97301c832b058",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ token pass
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          // optional: save/update user data
          localStorage.setItem("user", JSON.stringify(data));
          console.log("Profile Data:", data);
        } else {
          toast.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Profile Error:", err);
        toast.error("Something went wrong");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully 👋");

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

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

        <button
          className="icon-btn profile-btn"
          type="button"
          aria-label="Profile"
          title="Profile"
        >
          <img
            src="https://pxcollections.co.in/wp-content/uploads/2025/08/instagram-dp-download-7.jpg"
            alt=""
            className="avatar"
            width="32"
            height="32"
          />
          <span className="sr-only">Open profile menu</span>
        </button>

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