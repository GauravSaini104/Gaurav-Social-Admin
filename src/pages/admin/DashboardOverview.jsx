import React from "react";

const stats = [
  { label: "New Members (24h)", value: "326", delta: "+12.4%" },
  { label: "Successful Matches", value: "1,192", delta: "+8.1%" },
  { label: "Premium Conversions", value: "87", delta: "+5.3%" },
  { label: "Flagged Profiles", value: "14", delta: "-2.8%" },
];

const modules = [
  { title: "Profile Verification", desc: "Review KYC queue and selfie checks." },
  { title: "Chat Safety", desc: "Scan reports and auto-block risky users." },
  { title: "Boost Campaigns", desc: "Schedule premium boosts for engagement." },
  { title: "Regional Insights", desc: "See active city-wise dating trends." },
];

export default function DashboardOverview() {
  return (
    <section className="page-grid">
      <div className="stats-grid">
        {stats.map((item) => (
          <article key={item.label} className="stat-card">
            <p>{item.label}</p>
            <h3>{item.value}</h3>
            <span>{item.delta} vs last week</span>
          </article>
        ))}
      </div>

      <article className="panel-card">
        <div className="panel-header">
          <h2>Today’s Highlights</h2>
          <span>Updated 5 min ago</span>
        </div>
        <ul className="panel-list">
          <li>Top engagement city: Mumbai</li>
          <li>Peak matching hour: 8 PM - 10 PM</li>
          <li>Highest conversion source: App notifications</li>
          <li>Average profile completion: 78%</li>
        </ul>
      </article>

      <article className="panel-card">
        <div className="panel-header">
          <h2>Quick Modules</h2>
          <span>Dummy routes</span>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <div key={module.title} className="module-card">
              <h4>{module.title}</h4>
              <p>{module.desc}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}