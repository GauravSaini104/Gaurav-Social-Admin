import React from "react";
import SectionPage from "./SectionPage";

export default function ReportsPage() {
  return (
    <SectionPage
      title="Reports Center"
      description="Generate and export operational reports for leadership and product teams."
      points={[
        { title: "Engagement Snapshot", text: "Daily and monthly traffic/activity summaries." },
        { title: "Funnel Breakdown", text: "Registration to premium conversion journey." },
        { title: "Custom Export", text: "Download selected metrics in CSV format." },
      ]}
    />
  );
}