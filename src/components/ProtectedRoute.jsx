import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

function ProtectedRoute({ redirectTo = "/login" }) {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
