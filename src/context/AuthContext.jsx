import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadToken = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAuthToken(token);
      }
    };

    loadToken();
  }, []);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
