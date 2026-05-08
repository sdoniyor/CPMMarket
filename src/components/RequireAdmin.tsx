import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }: any) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // если нет пользователя
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // если не админ
  if (user.role !== "admin") {
    return <Navigate to="/market" replace />;
  }

  return children;
}