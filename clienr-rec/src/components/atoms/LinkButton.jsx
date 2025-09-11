// src/components/atoms/LinkButton.jsx
import React from "react";
import { Link } from "react-router-dom";

  const baseStyles = ""; // BaseStyle : you can add common styles if needed

  const variants = {
    NavDashboard: "px-4 py-2 rounded-md hover:bg-green-700 transition-colors",
    NavTask: "px-4 py-2 rounded-md hover:bg-green-700 transition-colors",
    NavLogin: "px-4 py-2 rounded-md hover:bg-green-700 transition-colors border border-white",
    NavRegister: "px-4 py-2 rounded-md hover:bg-green-700 transition-colors border border-white",
  };



const LinkButton = ({ to, children, variant = "primary", ...props }) => {


  return (
    <Link
      to={to}
      className={`${baseStyles} ${variants[variant]} `}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
