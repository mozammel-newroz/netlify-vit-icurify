import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { app_auth } = useContext(AuthContext);
  if (!app_auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default PrivateRouter;
