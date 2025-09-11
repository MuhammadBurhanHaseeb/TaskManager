// src/components/atoms/Paragraph.jsx
import React from "react";
const baseClass = ""; // base text size and line height

  const variants = {
    Error: "text-red-500 mt-2",
    CompletePara:"text-2xl font-bold text-green-700",
    PendingPara:"text-2xl font-bold text-yellow-700",
    TotalPara:"text-2xl font-bold text-blue-700",
    
  };



const Paragraph = ({ children, variant = "primary", className = "", ...props }) => {
  
  return (
    <p className={`${baseClass} ${variants[variant]} ${className}`} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
