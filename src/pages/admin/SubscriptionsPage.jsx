import React from "react";
import SectionPage from "./SectionPage";

export default function SubscriptionsPage() {
  return (
    <SectionPage
      title="Subscription & Revenue"
      description="Track premium memberships, renewals, refunds, and conversion campaigns."
      points={[
        { title: "Plan Mix", text: "See weekly trend across monthly and quarterly plans." },
        { title: "Revenue Heatmap", text: "View city-wise revenue opportunities." },
        { title: "Renewal Nudges", text: "Monitor reminder campaign performance." },
      ]}
    />
  );
}