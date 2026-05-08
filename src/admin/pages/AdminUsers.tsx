import { useEffect, useState } from "react";

const API = "https://cpmmarker.onrender.com";

type User = {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  telegram_username?: string;
  telegram_id?: string;
  ref_code?: string;
  ref_count?: number;
  role?: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found (not logged in)");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("ADMIN USERS RESPONSE:", data);

      if (!res.ok) {
        setError(data?.error || "Server error");
        setUsers([]);
        return;
      }

      if (!Array.isArray(data)) {
        setError("Invalid response (not array)");
        setUsers([]);
        return;
      }

      setUsers(data);
    } catch (e: any) {
      console.log("FETCH ERROR:", e);
      setError("Network error");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {users.length === 0 ? (
        <div className="text-white/50">
          No users found
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {users.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelected(u)}
              className="bg-zinc-900 p-4 rounded-xl cursor-pointer hover:bg-zinc-800 transition"
            >

              {/* AVATAR */}
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
                Role: {u.role?.trim() || "user"}
              </div>

            </div>
          ))}

        </div>
      )}

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
              <p><b>Role:</b> {selected.role?.trim() || "user"}</p>
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