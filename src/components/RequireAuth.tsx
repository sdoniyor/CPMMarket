import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }: any) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if ((user.role || "").trim() !== "admin") {
    return <Navigate to="/market" replace />;
  }

  return children;
}