import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserRoles from "../../hooks/useUserRoles";
// import React from "react";

const OrganiserRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRoles();
  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  if (!user || role !== "organiser") {
    return <Navigate state={{ from: location.pathname}} to="/forbidden"></Navigate>;
  }
  return children;
};

export default OrganiserRoutes;
