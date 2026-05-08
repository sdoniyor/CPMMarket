import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const nav = useNavigate();
  const location = useLocation();

  const menu = [
    { path: "/admin/users", label: "Users", icon: "👤" },
    { path: "/admin/cars", label: "Cars", icon: "🚗" },
    { path: "/admin/promos", label: "Promos", icon: "🎟" },
  ];

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-zinc-950 border-r border-yellow-500/20 p-5 flex flex-col">

        <h1 className="text-yellow-400 text-2xl font-black mb-8 tracking-wider">
          ADMIN PANEL
        </h1>

        <div className="flex flex-col gap-2">

          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => nav(item.path)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-left transition
                  ${active
                    ? "bg-yellow-400 text-black font-bold"
                    : "text-white hover:bg-zinc-900"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

        </div>

        {/* bottom info */}
        <div className="mt-auto text-xs text-white/30 pt-6">
          v1.0 admin panel
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>

    </div>
  );
}