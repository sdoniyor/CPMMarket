import { useEffect, useState } from "react";

const API = "https://cpmmarker.onrender.com";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="grid md:grid-cols-3 gap-4">

        {users.map(u => (
          <div
            key={u.id}
            onClick={() => setSelected(u)}
            className="bg-zinc-900 p-4 rounded-xl cursor-pointer"
          >
            <img
              src={u.avatar ? `${API}${u.avatar}` : ""}
              className="w-12 h-12 rounded-full"
            />

            <div className="font-bold">{u.name}</div>
            <div className="text-sm text-gray-400">{u.email}</div>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-zinc-900 p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-2">{selected.name}</h2>

            <p>Email: {selected.email}</p>
            <p>Telegram: @{selected.telegram_username}</p>
            <p>Role: {selected.role}</p>
            <p>Ref: {selected.ref_count}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}