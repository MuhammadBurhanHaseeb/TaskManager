// src/components/atoms/Label.jsx
import React from "react";
 const baseClass = "block font-medium mb-1"; //BaseStyle :  basic label styling

  const variants = {
    primary: "text-gray-800",
    
  };

const Label = ({ htmlFor, children, variant = "primary", className = "", ...props }) => {
 

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
