import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  // Agar token hai : -> user authenticated hai
  if (token) {
    return <Outlet />;  // Router Ke Andr:  yahan nested routes render hongi (Dashboard, Tasks)
  }

  // Agar token nahi hai : -> redirect to login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
