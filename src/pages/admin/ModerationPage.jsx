import React from "react";
import SectionPage from "./SectionPage";

export default function ModerationPage() {
  return (
    <SectionPage
      title="Moderation Console"
      description="Handle profile reports, abusive chats, and platform trust signals from one place."
      points={[
        { title: "Priority Tickets", text: "Escalate high-risk reports to trust team instantly." },
        { title: "Auto Filters", text: "Review AI-flagged content and actions taken." },
        { title: "Action Log", text: "Audit bans, warnings, and reinstatement requests." },
      ]}
    />
  );
}