import React from "react";
import SectionPage from "./SectionPage";

export default function SettingsPage() {
  return (
    <SectionPage
      title="Platform Settings"
      description="Manage admin roles, app preferences, and notification templates."
      points={[
        { title: "Role Access", text: "Grant permissions for support, marketing and moderators." },
        { title: "Email Templates", text: "Update onboarding and winback communication." },
        { title: "Feature Flags", text: "Enable test features by market or user segment." },
      ]}
    />
  );
}