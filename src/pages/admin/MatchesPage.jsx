import React from "react";
import SectionPage from "./SectionPage";

export default function MatchesPage() {
  return (
    <SectionPage
      title="Matches Intelligence"
      description="Analyze compatibility performance and conversation outcomes across match cohorts."
      points={[
        { title: "Match Success", text: "Measure accepted match ratio and first reply rate." },
        { title: "Smart Pairing", text: "Tune recommendation signals for better compatibility." },
        { title: "Ghosting Alerts", text: "Identify conversations with sudden drop-off." },
      ]}
    />
  );
}