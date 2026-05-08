import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }: any) {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return <Navigate to="/auth" replace />;
  }

  const user = JSON.parse(userStr);

  // 🔥 защита админки
  if (user.role !== "admin") {
    return <Navigate to="/market" replace />;
  }

  return children;
}