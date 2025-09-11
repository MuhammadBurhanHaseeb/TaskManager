// src/hooks/useSessionChecker.js
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
          if (Date.now() >= payload.exp * 1000) {
            dispatch(manualLogout());
            navigate("/login");
          }
        } catch {
          dispatch(manualLogout());
          navigate("/login");
        }
      }
    }, 60000); //CheckingTime :  Every 60 sec check session 

    return () => clearInterval(interval);
  }, [dispatch, navigate]);
};
