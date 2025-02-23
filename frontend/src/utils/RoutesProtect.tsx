import React from "react";
import { Outlet, Navigate } from "react-router";

export const RoutesProtect = (): React.ReactElement => {
  const token: string | null = localStorage.getItem("token");
  const isAuthenticated: boolean = !!token;

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};
