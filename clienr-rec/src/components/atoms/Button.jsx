// src/components/atoms/Button.jsx
import React from "react";

const baseStyles="";

  const variants = {
    NavDashboard:"px-4 py-2 rounded-md hover:bg-green-700 transition-colors",
    NavTask:"px-4 py-2 rounded-md hover:bg-green-700 transition-colors",
    NavLogout:"px-4 py-2 rounded-md hover:bg-red-600 transition-colors border border-white",
    NavLogin:"px-4 py-2 rounded-md hover:bg-green-700 transition-colors border border-white",
    NavRegister:"px-4 py-2 rounded-md hover:bg-green-700 transition-colors border border-white",
    TaskAddUpdatetask:"bg-blue-500 text-white px-4 py-2 rounded",
    FillterAll:"p-2 rounded bg-gray-500 text-white",
    FillterNotAll:"p-2 rounded bg-gray-300",

    FillterComplete:"p-2 rounded bg-green-500 text-white",
    FillterNotComplete:"p-2 rounded bg-green-300",

    FillterPending:"p-2 rounded bg-yellow-500 text-white",
    FillterNotPending:"p-2 rounded bg-yellow-300",

    EditTasklist:"bg-blue-500 text-white px-2 rounded",
    DeleteTasklist:"bg-red-500 text-white px-2 rounded",

    LoginButton:"bg-green-500 text-white p-2 rounded",
    RegisterButton:"bg-green-500 text-white p-2 rounded",
  };


const Button = ({ children, variant = "primary", onClick, ...props }) => {


  return (
    <button
      onClick={onClick} // 🔹FunctionRecieved: parent se function receive karega
      className={`${baseStyles} ${variants[variant]} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
