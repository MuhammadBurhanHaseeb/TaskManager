import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()); // Redux se logout
    navigate("/login"); // Login page per redirect
  };

  return (
    <nav className="bg-green-600 shadow-md text-white p-4 flex justify-between items-center">
      <h1 className="font-extrabold text-2xl tracking-wide">Task Manager</h1>

      <div className="space-x-4 flex items-center">
        {token ? (
          <>
            <Link
              to="/"
              className="px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className="px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Tasks
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md hover:bg-red-600 transition-colors border border-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md hover:bg-green-700 transition-colors border border-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md hover:bg-green-700 transition-colors border border-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
