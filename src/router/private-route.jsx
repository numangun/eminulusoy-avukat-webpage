import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && (!Array.isArray(roles) || !roles.includes(userRole)))
    return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
