import React from "react";
import { Outlet } from "react-router-dom";
import CookieConsent from "@/components/CookieConsent";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Outlet />
      <CookieConsent />
    </div>
  );
}