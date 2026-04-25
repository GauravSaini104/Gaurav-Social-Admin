import React from "react";

export default function SectionPage({ title, description, points }) {
  return (
    <section className="single-page-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="bullet-grid">
        {points.map((point) => (
          <article key={point.title} className="bullet-item">
            <h4>{point.title}</h4>
            <p>{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}