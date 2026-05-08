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
  referred_by?: number | null;
  password?: string; // только для редактирования
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [edit, setEdit] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  /* ================= LOAD ================= */
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("No token");
        return;
      }

      const res = await fetch(`${API}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Server error");
        return;
      }

      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ================= DELETE ================= */
  const deleteUser = async (id: number) => {
    if (!confirm("Delete user?")) return;

    await fetch(`${API}/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadUsers();
    setSelected(null);
  };

  /* ================= SAVE EDIT ================= */
  const saveEdit = async () => {
    if (!edit) return;

    const res = await fetch(`${API}/admin/users/${edit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(edit),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Update failed");
      return;
    }

    setEdit(null);
    loadUsers();
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return <div className="p-6 text-white">Loading users...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">Error: {error}</div>;
  }

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {users.length === 0 ? (
        <div className="text-white/50">No users found</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">

          {users.map((u) => (
            <div key={u.id} className="bg-zinc-900 p-4 rounded-xl">

              <div className="font-bold">{u.name}</div>
              <div className="text-sm text-gray-400">{u.email}</div>
              <div className="text-xs text-white/40">
                Role: {u.role}
              </div>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => setEdit(u)}
                  className="bg-blue-500 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() => setSelected(u)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded"
                >
                  View
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold">{selected.name}</h2>

            <p>Email: {selected.email}</p>
            <p>Telegram: @{selected.telegram_username}</p>
            <p>Role: {selected.role}</p>
            <p>Ref count: {selected.ref_count}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded w-full"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* ================= EDIT MODAL (FULL POWER) ================= */}
      {edit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl w-[450px] space-y-2 max-h-[90vh] overflow-y-auto">

            <input value={edit.name || ""} onChange={e => setEdit({ ...edit, name: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Name" />

            <input value={edit.email || ""} onChange={e => setEdit({ ...edit, email: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Email" />

            <input type="password" onChange={e => setEdit({ ...edit, password: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="New password (optional)" />

            <input value={edit.role || ""} onChange={e => setEdit({ ...edit, role: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Role" />

            <input value={edit.telegram_username || ""} onChange={e => setEdit({ ...edit, telegram_username: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Telegram username" />

            <input value={edit.telegram_id || ""} onChange={e => setEdit({ ...edit, telegram_id: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Telegram ID" />

            <input value={edit.ref_code || ""} onChange={e => setEdit({ ...edit, ref_code: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Ref code" />

            <input value={edit.ref_count || 0} onChange={e => setEdit({ ...edit, ref_count: Number(e.target.value) })} className="w-full p-2 bg-black rounded" placeholder="Ref count" />

            <input value={edit.avatar || ""} onChange={e => setEdit({ ...edit, avatar: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Avatar URL" />

            <input value={edit.referred_by || ""} onChange={e => setEdit({ ...edit, referred_by: Number(e.target.value) })} className="w-full p-2 bg-black rounded" placeholder="Referred by ID" />

            <div className="flex gap-2 mt-3">

              <button onClick={saveEdit} className="bg-green-500 flex-1 py-2 rounded">
                Save
              </button>

              <button onClick={() => setEdit(null)} className="bg-gray-600 flex-1 py-2 rounded">
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}