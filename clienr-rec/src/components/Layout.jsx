// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useSessionChecker } from "@/hooks/useSessionChecker";

export default function Layout() {
  useSessionChecker(); // ✅ ab Router context available hai

  return (
    <div>
      <Outlet />
    </div>
  );
}
