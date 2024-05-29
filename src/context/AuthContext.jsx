import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadToken = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAuthToken(token);
      }
      setIsLoading(false);
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

  if (isLoading) {
    <BeatLoader color={"#ffffff"} />;
  }

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
