import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> },
  { to: "/dashboard/users", label: "Members", icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path> },
  { to: "/dashboard/Success-Stories", label: "Success Stories", icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path> },
  { to: "/dashboard/spam-control", label: "Spam Control", icon: <rect x="2" y="5" width="20" height="14" rx="2"></rect> },
  { to: "/dashboard/verified-document", label: "Verified Documents", icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path> },
  { to: "/dashboard/reports", label: "Reports", icon: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path> },
  { to: "/dashboard/settings", label: "Settings", icon: <circle cx="12" cy="12" r="3"></circle> },
  { to: "/maintenance", label: "Maintenance", icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path> },
];

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      <aside className={`admin-sidebar-premium ${isOpen ? "open" : ""}`}>
        <div className="brand-section">
          <div className="brand-logo">
            <span className="logo-icon">ST</span>
            <div>
              <h2 className="brand-name">Social Taste</h2>
              <p className="brand-status">Online Terminal</p>
            </div>
          </div>
        </div>

        <nav className="premium-nav">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `premium-link ${isActive ? "active" : ""}`
              }
              style={{ "--i": index }} // For staggered animation
              end={item.to === "/dashboard"}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="nav-icon-svg"
              >
                {item.icon}
              </svg>
              <span className="link-text">{item.label}</span>
              <div className="active-indicator"></div>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="pro-badge">v2.4.0 Premium</div>
        </div>
      </aside>

      {isOpen && (
        <div className="mobile-overlay-glass" onClick={closeSidebar} />
      )}
    </>
  );
}