import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }: any) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return <Navigate to="/auth" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}