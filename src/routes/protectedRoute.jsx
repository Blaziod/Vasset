import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const { logout } = useAuth();

  if (!token) {
    return logout(), (<Navigate to="/login" replace />);
  }

  return children;
};

export default ProtectedRoute;
