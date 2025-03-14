import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = useSelector((state: any) => state.admin.admin);
  console.log('Admin:',admin)
  if (!admin) {
    return <Navigate to={"/admin/login"} />;
  }
  return children;
}
