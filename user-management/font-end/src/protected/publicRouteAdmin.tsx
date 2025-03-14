import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRouteAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = useSelector((state: any) => state.admin.admin);
  if (admin) {
    return <Navigate to={"/admin/home"} />;
  }
  return children;
}
