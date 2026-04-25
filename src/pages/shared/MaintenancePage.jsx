import React from "react";
import { Link } from "react-router-dom";

export default function MaintenancePage() {
  return (
    <section className="status-page">
      <h2>Under Maintenance</h2>
      <p>
        We are upgrading core matchmaking services for better performance. Please check back in a few minutes.
      </p>
      <Link to="/dashboard" className="status-link">
        Back to Dashboard
      </Link>
    </section>
  );
}