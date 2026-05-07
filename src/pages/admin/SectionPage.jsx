import React from "react";

export default function SectionPage({ title, description, points }) {
  <style>{`
  .feature-card {
    background: #fff4e5;   /* light orange */
    border: 1px solid #ffd8a8;
    border-radius: 10px;
    padding: 12px;
  }
`}</style>
  return (
    <section className="single-page-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="bullet-grid">
        {points.map((point) => (
          <article key={point.title} className={`bullet-item ${point.className || ""}`}>
            <h4>{point.title}</h4>
            <p>{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}