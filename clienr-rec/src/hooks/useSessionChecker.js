import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { manualLogout } from "@/features/auth/authSlice";

export const useSessionChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          // 🔹 Check if token expired
          if (Date.now() >= payload.exp * 1000) {
            dispatch(manualLogout()); // Redux + localStorage cleanup
            navigate("/login"); // Redirect to login
          }
        } catch {
          dispatch(manualLogout());
          navigate("/login");
        }
      }
    }, 5000); // 🔹 5 sec interval for testing, production me 60000

    return () => clearInterval(interval);
  }, [dispatch, navigate]);
};
