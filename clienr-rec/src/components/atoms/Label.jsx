// src/components/atoms/Label.jsx
import React from "react";

const Label = ({ htmlFor, children, variant = "primary", className = "", ...props }) => {
  const baseClass = "block font-medium mb-1"; // basic label styling

  const variants = {
    primary: "text-gray-800",
    
  };

  return (
    <label
      htmlFor={htmlFor}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
