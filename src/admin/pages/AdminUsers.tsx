import { useEffect, useState } from "react";

const API = "https://cpmmarker.onrender.com";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.log("ADMIN USERS ERROR:", data);
          setUsers([]);
        }
      });
  }, []);

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="grid md:grid-cols-3 gap-4">

        {users.map(u => (
          <div
            key={u.id}
            onClick={() => setSelected(u)}
            className="bg-zinc-900 p-4 rounded-xl cursor-pointer hover:bg-zinc-800 transition"
          >

            {/* AVATAR FIX */}
            {u.avatar ? (
              <img
                src={u.avatar.startsWith("http") ? u.avatar : `${API}${u.avatar}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
                {u.name?.[0]}
              </div>
            )}

            <div className="font-bold mt-2">{u.name}</div>
            <div className="text-sm text-gray-400">{u.email}</div>

            <div className="text-xs text-white/40 mt-1">
              Role: {u.role || "user"}
            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-zinc-900 p-6 rounded-xl w-[420px]">

            <h2 className="text-xl font-bold mb-3">
              {selected.name}
            </h2>

            <div className="space-y-1 text-sm">

              <p><b>ID:</b> {selected.id}</p>
              <p><b>Email:</b> {selected.email}</p>
              <p><b>Telegram:</b> @{selected.telegram_username || "-"}</p>
              <p><b>Telegram ID:</b> {selected.telegram_id || "-"}</p>
              <p><b>Role:</b> {selected.role || "user"}</p>
              <p><b>Ref code:</b> {selected.ref_code || "-"}</p>
              <p><b>Ref count:</b> {selected.ref_count || 0}</p>

            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded w-full font-bold"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}