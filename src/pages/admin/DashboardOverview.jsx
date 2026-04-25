import React from "react";

const stats = [
    { label: "New Members (24h)", value: "326", delta: "+12.4%", trend: [6, 8, 7, 9, 10, 12, 14] },
    { label: "Successful Matches", value: "1,192", delta: "+8.1%", trend: [9, 10, 11, 10, 12, 13, 15] },
    { label: "Premium Conversions", value: "87", delta: "+5.3%", trend: [3, 4, 4, 5, 6, 6, 7] },
    { label: "Flagged Profiles", value: "14", delta: "-2.8%", trend: [6, 6, 5, 4, 4, 3, 3], danger: true },
];

const engagementData = [42, 48, 44, 61, 58, 69, 77];
const engagementDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const conversionFunnel = [
    { stage: "Profile Viewed", count: "18.2k", width: 100 },
    { stage: "Like Sent", count: "9.4k", width: 74 },
    { stage: "Mutual Match", count: "3.8k", width: 52 },
    { stage: "First Chat", count: "1.6k", width: 33 },
    { stage: "Premium Upgrade", count: "410", width: 18 },
];

const activityFeed = [
    "210 users completed profile verification in the last hour.",
    "Auto moderation removed 32 risky messages from chat rooms.",
    "Delhi and Bengaluru crossed 80% response-rate on match prompts.",
    "Push campaign ‘Weekend Spark’ generated 1.8x click-through rate.",
];
const toPoints = (series) =>
    series
        .map((value, index) => {
            const x = index * 54;
            const y = 90 - value;
            return `${x},${y}`;
        })
        .join(" ");

export default function DashboardOverview() {
    return (
        <section className="page-grid">
            <div className="stats-grid">
                {stats.map((item) => (
                    <article key={item.label} className="stat-card">
                        <p>{item.label}</p>
                        <h3>{item.value}</h3>
                        <span className={item.danger ? "delta-down" : "delta-up"}>{item.delta} vs last week</span>
                        <div className="mini-bars" aria-hidden>
                            {item.trend.map((point, i) => (
                                <span
                                    key={`${item.label}-${point}-${i}`}
                                    style={{ height: `${point * 4}px` }}
                                    className={item.danger ? "mini-bar danger" : "mini-bar"}
                                />
                            ))}
                        </div>
                    </article>
                ))}
            </div>

            <div className="overview-grid">
                <article className="panel-card chart-card">
                    <div className="panel-header">
                        <h2>Weekly Engagement Trend</h2>
                        <span>Updated 5 min ago</span>
                    </div>
                    <div className="line-chart-wrap">
                        <svg viewBox="0 0 324 100" className="line-chart" role="img" aria-label="Weekly engagement trend">
                            <polyline className="line-chart-shadow" points={toPoints(engagementData.map((value) => value - 8))} />
                            <polyline className="line-chart-main" points={toPoints(engagementData)} />
                        </svg>
                        <div className="chart-label-row">
                            {engagementDays.map((day) => (
                                <span key={day}>{day}</span>
                            ))}
                        </div>
                    </div>
                </article>

                <article className="panel-card">
                    <div className="panel-header">
                        <h2>Conversion Funnel</h2>
                        <span>7-day window</span>
                    </div>
                    <div className="funnel-list">
                        {conversionFunnel.map((item) => (
                            <div key={item.stage} className="funnel-row">
                                <div className="funnel-meta">
                                    <strong>{item.stage}</strong>
                                    <span>{item.count}</span>
                                </div>
                                <div className="funnel-track">
                                    <div className="funnel-fill" style={{ width: `${item.width}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </div>

            <article className="panel-card">
                <div className="panel-header">
                    <h2>Operational Highlights</h2>
                    <span>Today</span>
                </div>
                <ul className="panel-list">
                    {activityFeed.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </article>
        </section>
    );
}