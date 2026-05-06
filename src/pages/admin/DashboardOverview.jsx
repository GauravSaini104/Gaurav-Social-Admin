import React, { useEffect, useState } from "react";

// --- Count Up Logic Component ---
const AnimatedNumber = ({ value }) => {
    const [count, setCount] = React.useState(0);
    const target = parseInt(value.replace(/,/g, ""));
    React.useEffect(() => {
        let start = 0;
        const duration = 2000; // 2 seconds animation
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else { setCount(Math.floor(start)); }
        }, 16);
        return () => clearInterval(timer);
    }, [target]);
    return <span>{count.toLocaleString()}</span>;
};


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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section className={`page-grid ${isLoaded ? "animate-in" : ""}`}>
            {/* Stats Cards */}
            <div className="stats-grid">
                {stats.map((item) => (
                    <article key={item.label} className="stat-card">
                        <p>{item.label}</p>
                       <h3><AnimatedNumber value={item.value} /></h3>
                        <span className={item.danger ? "delta-down" : "delta-up"}>{item.delta} vs last week</span>
                        <div className="mini-bars" aria-hidden>
                            {item.trend.map((point, i) => (
                                <span
                                    key={`${item.label}-${point}-${i}`}
                                    style={{ 
                                        height: isLoaded ? `${point * 4}px` : "0px",
                                        transitionDelay: `${i * 0.1}s` 
                                    }}
                                    className={item.danger ? "mini-bar danger" : "mini-bar"}
                                />
                            ))}
                        </div>
                    </article>
                ))}
            </div>

            <div className="overview-grid">
                {/* Line Chart Section */}
                <article className="panel-card chart-card">
                    <div className="panel-header">
                        <h2>Weekly Engagement Trend</h2>
                        <span>Updated 5 min ago</span>
                    </div>
                    <div className="line-chart-wrap">
                        <svg viewBox="0 0 324 100" className="line-chart">
                            <polyline 
                                className="line-chart-shadow" 
                                points={toPoints(engagementData.map((v) => v - 8))} 
                            />
                            <polyline 
                                className="line-chart-main animate-line" 
                                points={toPoints(engagementData)} 
                            />
                        </svg>
                        <div className="chart-label-row">
                            {engagementDays.map((day) => <span key={day}>{day}</span>)}
                        </div>
                    </div>
                </article>

                {/* Conversion Funnel Section */}
                <article className="panel-card">
                    <div className="panel-header">
                        <h2>Conversion Funnel</h2>
                        <span>7-day window</span>
                    </div>
                    <div className="funnel-list">
                        {conversionFunnel.map((item, index) => (
                            <div key={item.stage} className="funnel-row">
                                <div className="funnel-meta">
                                    <strong>{item.stage}</strong>
                                    <span>{item.count}</span>
                                </div>
                                <div className="funnel-track">
                                    <div 
                                        className="funnel-fill animated-fill" 
                                        style={{ 
                                            width: isLoaded ? `${item.width}%` : "0%",
                                            transitionDelay: `${index * 0.15}s`
                                        }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </div>

            {/* Activity Feed */}
            <article className="panel-card">
                <div className="panel-header">
                    <h2>Operational Highlights</h2>
                    <span>Today</span>
                </div>
                <ul className="panel-list">
                    {activityFeed.map((item, i) => (
                        <li key={item} style={{ animationDelay: `${i * 0.2}s` }}>{item}</li>
                    ))}
                </ul>
            </article>
        </section>
    );
}