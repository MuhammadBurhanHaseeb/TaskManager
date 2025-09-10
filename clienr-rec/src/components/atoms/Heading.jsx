// src/components/atoms/Heading.jsx
import React from "react";

const Heading = ({ children, level = 1, variant = "primary", className = "", ...props }) => {
  const Tag = `h${level}`; // dynamically choose h1, h2, h3...

  const variants = {
    DashBoardHeading: "text-3xl font-bold text-gray-900",
    CompletePendingTotal: "text-lg font-semibold",
    TasDis: "text-xl font-bold mb-4",

    DashBoardHeading: "text-3xl font-bold text-gray-900 text-center",
    CompletePendingTotal: "text-lg font-semibold",
    TasDis: "text-xl font-bold mb-4",
    Task:"text-3xl font-bold mb-4 text-center",
    registerLogin:"text-2xl font-bold mb-4",
    NavHead:"font-extrabold text-2xl tracking-wide",
    
  };

  return (
    <Tag className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
