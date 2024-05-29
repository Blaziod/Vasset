import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const UnProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default UnProtectedRoute;
