// src/components/atoms/Textarea.jsx
import React from "react";

 const baseClass =
    "p-2 rounded border focus:outline-none focus:ring-2 focus:ring-offset-1 transition resize-none";

  const variants = {
    TaskFormTextArea: "border p-2 rounded",
    secondary: "border-gray-400 focus:ring-green-500",
    error: "border-red-500 focus:ring-red-500",
  };

const TextArea = ({
  value,
  onChange,
  placeholder = "",
  variant = "primary",
  rows = 4,
  className = "",
  ...props
}) => {
 

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export default TextArea;
