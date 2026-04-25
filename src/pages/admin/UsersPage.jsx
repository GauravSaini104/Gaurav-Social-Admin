import React from "react";
import SectionPage from "./SectionPage";

export default function UsersPage() {
  return (
    <SectionPage
      title="Members Management"
      description="Monitor registrations, profile completion and user lifecycle for the dating platform."
      points={[
        { title: "New Signups", text: "Review daily onboarding funnel by region and source." },
        { title: "Verification Queue", text: "Approve identities and remove fake profiles quickly." },
        { title: "Retention", text: "Track returning users and churn warning segments." },
      ]}
    />
  );
}