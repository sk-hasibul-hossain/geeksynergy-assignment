import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const AuthNavigator = ({ children }) => {
  const { isLogin } = useAuth();
  const { pathname } = useLocation();

  return isLogin ? (
    children
  ) : (
    <Navigate to="/login" state={{ prevPath: pathname }} />
  );
};

export default AuthNavigator;
