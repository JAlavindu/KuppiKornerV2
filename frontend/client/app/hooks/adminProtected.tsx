import { redirect, useSelectedLayoutSegment } from "next/navigation";
import userAuth from "./userAuth";
import React from "react";
import { useSelector, UseSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  // const isAuthenticated = userAuth();
  const { user } = useSelector((state: any) => state.auth);
  if (user) {
    const isAdmin = user?.role === "admin";
    return isAdmin ? children : redirect("/");
  }
  // return isAuthenticated ? children : redirect("/");
}
