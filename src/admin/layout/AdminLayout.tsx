import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-zinc-950 border-r border-yellow-500/20 p-4">
        <h1 className="text-yellow-400 text-2xl font-black mb-6">
          ADMIN PANEL
        </h1>

        <div className="space-y-3">
          <button onClick={() => nav("/admin/users")}>👤 Users</button>
          <button onClick={() => nav("/admin/cars")}>🚗 Cars</button>
          <button onClick={() => nav("/admin/promos")}>🎟 Promos</button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}