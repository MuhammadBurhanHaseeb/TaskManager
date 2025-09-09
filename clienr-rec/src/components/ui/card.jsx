import React from "react";

export function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl shadow-md border border-gray-200 bg-white p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`mt-2 ${className}`}>{children}</div>;
}
