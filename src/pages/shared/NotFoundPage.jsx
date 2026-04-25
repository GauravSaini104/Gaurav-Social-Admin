import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="status-page">
      <h2>404 - Page Not Found</h2>
      <p>The route you requested does not exist in the admin panel.</p>
      <Link to="/dashboard" className="status-link">
        Go to Dashboard
      </Link>
    </section>
  );
}