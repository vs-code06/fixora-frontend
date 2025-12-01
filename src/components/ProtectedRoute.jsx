import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user, bootstrapping } = useAuth();
  if (bootstrapping) return null; 
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
