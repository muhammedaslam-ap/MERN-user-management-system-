import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = useSelector((state:any)=>state.user.user);
    if(!user){
        return <Navigate to={'/login'} />
    }
  return children
}
