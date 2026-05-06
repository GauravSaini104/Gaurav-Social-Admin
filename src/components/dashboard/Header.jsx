import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: "📊" },
  { to: "/dashboard/users", label: "Members", icon: "👥" },
  { to: "/dashboard/SuccessStories", label: "Success Stories", icon: "💞" },
  { to: "/dashboard/spam-control", label: "Spam Control", icon: "💳" },
  { to: "/dashboard/verified-document", label: "Verified Documents", icon: "📄" },
  { to: "/dashboard/reports", label: "Reports", icon: "📁" },
  { to: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  { to: "/maintenance", label: "Maintenance", icon: "🚧" },
];

export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  // ✅ load from localStorage first (fast render)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
  }, []);

  // ✅ GET PROFILE API CALL
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://social-taste-matrimony.onrender.com/api/auth/user/69f1ec87ccc0ebf5c5e3a8df",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          setProfile(data); // ✅ REAL DATA SET
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
  <div className="status-pill-container">
    <span className="status-pill">
      <span className="live-indicator"></span>
      Live •
    </span>
  </div>

  {/* Notification Button with Animation Wrapper */}
  <button className="premium-icon-btn notification-wrapper" type="button">
    <svg viewBox="0 0 24 24" className="premium-icon-svg" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
    <span className="notification-glow-badge">3</span>
  </button>

  {/* Profile with subtle glow */}
  <button className="premium-profile-trigger" type="button">
  <div className="avatar-wrapper">
    {profile?.primaryPhoto ? (
      <img
        src={profile.primaryPhoto}
        alt="Admin"
        className="premium-avatar-img"
        onError={(e) => {
          e.target.src = "https://ui-avatars.com/api/?name=Admin&background=facc15&color=000";
        }}
      />
    ) : (
      <div className="default-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    )}
  </div>
</button>

  {/* Refined Logout Button */}
  <button className="premium-logout-action" type="button" onClick={handleLogout}>
    <span>Log Out</span>
    <svg viewBox="0 0 24 24" className="logout-arrow-icon" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  </button>
</div>
    </header>
  );
}