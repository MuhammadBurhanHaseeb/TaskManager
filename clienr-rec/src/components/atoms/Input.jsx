// src/components/atoms/Input.jsx
import React from "react";

 const baseClass =
    "p-2 rounded border focus:outline-none focus:ring-2 focus:ring-offset-1 transition";

  const variants = {
    TaskFormInputsTitle: "border p-2 rounded",
    secondary: "border-gray-400 focus:ring-green-500",
    error: "border-red-500 focus:ring-red-500",
    radio: "mr-2 accent-blue-500",
    checkbox: "mr-2 accent-green-500",
  };


const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  variant = "primary",
  label, // for radio/checkbox labels
  checked,
  name,
  className = "",
  ...props
}) => {
 

  // For radio and checkbox, render differently
  if (type === "radio" || type === "checkbox") {
    return (
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={`${variants[type]} ${className}`}
          {...props}
        />
        {label}
      </label>
    );
  }

  // Default input (text, email, password, etc.)
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export default Input;
