import React from "react";
import { NavLink } from "react-router-dom";
const navItems = [
  { to: "/dashboard", label: "Overview", icon: "📊" },
  { to: "/dashboard/users", label: "Members", icon: "👥" },
  { to: "/dashboard/Success-Stories", label: "Success Stories", icon: "💞" },
  { to: "/dashboard/spam-control", label: "Spam Control", icon: "💳" },
  {
    to: "/dashboard/verified-document",
    label: "Verified Documents",
    icon: "📄",
  },
  { to: "/dashboard/reports", label: "Reports", icon: "📁" },
  { to: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  { to: "/maintenance", label: "Maintenance", icon: "🚧" },
];

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="brand-block">
          {/* <p className="brand-kicker">Dating Admin</p> */}
          <h2>Social Taste</h2>
          <p className="brand-subtitle">Smart matchmaking operations</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              end={item.to === "/dashboard"}
            >
              <span aria-hidden>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <button
          className="mobile-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}
    </>
  );
}

// import React from "react";
// import { NavLink } from "react-router-dom";
// const navItems = [
//   { to: "/dashboard", label: "Overview", icon: "📊" },
//   { to: "/dashboard/users", label: "Members", icon: "👥" },
//   { to: "/dashboard/Success-Stories", label: "Success Stories", icon: "💞" },
//   { to: "/dashboard/spam-control", label: "Spam Control", icon: "💳" },
//   { to: "/dashboard/verified-document", label: "Verified Documents", icon: "📄" },
//   { to: "/dashboard/reports", label: "Reports", icon: "📁" },
//   { to: "/dashboard/settings", label: "Settings", icon: "⚙️" },
//   { to: "/maintenance", label: "Maintenance", icon: "🚧" },
// ];

// export default function Sidebar({ isOpen, closeSidebar }) {
//   return (
//     <>
//       <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
//         <div className="brand-block">
//           {/* <p className="brand-kicker">Dating Admin</p> */}
//           <h2>Social Taste</h2>
//           <p className="brand-subtitle">Smart matchmaking operations</p>
//         </div>
//         <nav className="sidebar-nav">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               onClick={closeSidebar}
//               className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
//               end={item.to === "/dashboard"}
//             >
//               <span aria-hidden>{item.icon}</span>
//               <span>{item.label}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </aside>

//       {isOpen && (
//         <button className="mobile-overlay" onClick={closeSidebar} aria-label="Close sidebar" />
//       )}
//     </>
//   );
// }
