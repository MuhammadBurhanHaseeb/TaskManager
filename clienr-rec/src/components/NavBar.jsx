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
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()); // Redux se logout
    navigate("/login"); // Login page per redirect
  };

  return (
    <nav className="bg-green-600 fixed top-0 w-full z-50 shadow-md  text-white p-4 flex justify-between items-center">
      {/* <h1 className="font-extrabold text-2xl tracking-wide">Task Manager</h1> */}
      <Heading  level={1} variant= "NavHead" >Task Manager</Heading>

      <Div 
      variant ="NavBarDiv"
      // className="space-x-4 flex items-center"
      >
        {token ? (
          <>
            <LinkButton
              to="/"
              variant="NavDashboard"
              // className="px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Dashboard
            </LinkButton>
            <LinkButton
              to="/tasks"
              variant="NavTask"
              // className="px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Tasks
            </LinkButton>
            <Button
            variant="NavLogout"
              onClick={handleLogout}

              // className="px-4 py-2 rounded-md hover:bg-red-600 transition-colors border border-white"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <LinkButton
              to="/login"
              variant ="NavLogin"
              // className="px-4 py-2 rounded-md hover:bg-green-700 transition-colors border border-white"
            >
              Login
            </LinkButton>
            <LinkButton
              to="/register"
              variant="NavRegister"
              // className="px-4 py-2 rounded-md hover:bg-green-700 transition-colors border border-white"
            >
              Register
            </LinkButton>
          </>
        )}
      </Div>
    </nav>
  );
};

export default Navbar;
