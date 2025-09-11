import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/auth/authSlice";
import Button from "@/components/atoms/Button";
import LinkButton from "@/components/atoms/LinkButton";
import Heading from "@/components/atoms/Heading";
import Div from "@/components/atoms/Div";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

 const handleLogout = async () => {
  try {
    await dispatch(logoutUser()).unwrap(); // optional: backend logout
  } catch (err) {
    console.error("Logout failed:", err);
  }
  dispatch(manualLogout()); // Redux + localStorage cleanup
  navigate("/login");
};
  return (
    <nav className="bg-green-600 fixed top-0 w-full z-50 shadow-md text-white p-4 flex justify-between items-center">
      <Heading level={1} variant="NavHead">Task Manager</Heading>

      <Div variant="NavBarDiv">
        {isAuthenticated ? (
          <>
            <LinkButton to="/" variant="NavDashboard">Dashboard</LinkButton>
            <LinkButton to="/tasks" variant="NavTask">Tasks</LinkButton>
            <Button variant="NavLogout" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <LinkButton to="/login" variant="NavLogin">Login</LinkButton>
            <LinkButton to="/register" variant="NavRegister">Register</LinkButton>
          </>
        )}
      </Div>
    </nav>
  );
};


export default Navbar;
