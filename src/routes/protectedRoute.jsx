import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext";

const ProtectedRoute = ({ path, element, ...rest }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? (
    <Route path={path} element={element} {...rest} />
  ) : null;
};

export default ProtectedRoute;
