// import { useEffect, useState } from "react";

// const API = "https://cpmmarker.onrender.com";

// type User = {
//   id: number;
//   name: string;
//   email?: string;
//   avatar?: string;
//   telegram_username?: string;
//   telegram_id?: string;
//   ref_code?: string;
//   ref_count?: number;
//   role?: string;
//   referred_by?: number | null;
//   password?: string; // только для редактирования
// };

// export default function AdminUsers() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selected, setSelected] = useState<User | null>(null);
//   const [edit, setEdit] = useState<User | null>(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const token = localStorage.getItem("token");

//   /* ================= LOAD ================= */
//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       if (!token) {
//         setError("No token");
//         return;
//       }

//       const res = await fetch(`${API}/admin/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data?.error || "Server error");
//         return;
//       }

//       setUsers(Array.isArray(data) ? data : []);
//     } catch (e) {
//       setError("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   /* ================= DELETE ================= */
//   const deleteUser = async (id: number) => {
//     if (!confirm("Delete user?")) return;

//     await fetch(`${API}/admin/users/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     loadUsers();
//     setSelected(null);
//   };

//   /* ================= SAVE EDIT ================= */
//   const saveEdit = async () => {
//     if (!edit) return;

//     const res = await fetch(`${API}/admin/users/${edit.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(edit),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data?.error || "Update failed");
//       return;
//     }

//     setEdit(null);
//     loadUsers();
//   };

//   /* ================= UI STATES ================= */
//   if (loading) {
//     return <div className="p-6 text-white">Loading users...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-400">Error: {error}</div>;
//   }

//   return (
//     <div className="p-6 text-white">

//       <h1 className="text-2xl font-bold mb-4">Users</h1>

//       {users.length === 0 ? (
//         <div className="text-white/50">No users found</div>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-4">

//           {users.map((u) => (
//             <div key={u.id} className="bg-zinc-900 p-4 rounded-xl">

//               <div className="font-bold">{u.name}</div>
//               <div className="text-sm text-gray-400">{u.email}</div>
//               <div className="text-xs text-white/40">
//                 Role: {u.role}
//               </div>

//               <div className="flex gap-2 mt-3">

//                 <button
//                   onClick={() => setEdit(u)}
//                   className="bg-blue-500 px-3 py-1 rounded"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => deleteUser(u.id)}
//                   className="bg-red-500 px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>

//                 <button
//                   onClick={() => setSelected(u)}
//                   className="bg-yellow-400 text-black px-3 py-1 rounded"
//                 >
//                   View
//                 </button>

//               </div>

//             </div>
//           ))}

//         </div>
//       )}

//       {/* ================= VIEW MODAL ================= */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
//           <div className="bg-zinc-900 p-6 rounded-xl w-[400px]">

//             <h2 className="text-xl font-bold">{selected.name}</h2>

//             <p>Email: {selected.email}</p>
//             <p>Telegram: @{selected.telegram_username}</p>
//             <p>Role: {selected.role}</p>
//             <p>Ref count: {selected.ref_count}</p>

//             <button
//               onClick={() => setSelected(null)}
//               className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded w-full"
//             >
//               Close
//             </button>

//           </div>
//         </div>
//       )}

//       {/* ================= EDIT MODAL (FULL POWER) ================= */}
//       {edit && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
//           <div className="bg-zinc-900 p-6 rounded-xl w-[450px] space-y-2 max-h-[90vh] overflow-y-auto">

//             <input value={edit.name || ""} onChange={e => setEdit({ ...edit, name: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Name" />

//             <input value={edit.email || ""} onChange={e => setEdit({ ...edit, email: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Email" />

//             <input type="password" onChange={e => setEdit({ ...edit, password: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="New password (optional)" />

//             <input value={edit.role || ""} onChange={e => setEdit({ ...edit, role: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Role" />

//             <input value={edit.telegram_username || ""} onChange={e => setEdit({ ...edit, telegram_username: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Telegram username" />

//             <input value={edit.telegram_id || ""} onChange={e => setEdit({ ...edit, telegram_id: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Telegram ID" />

//             <input value={edit.ref_code || ""} onChange={e => setEdit({ ...edit, ref_code: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Ref code" />

//             <input value={edit.ref_count || 0} onChange={e => setEdit({ ...edit, ref_count: Number(e.target.value) })} className="w-full p-2 bg-black rounded" placeholder="Ref count" />

//             <input value={edit.avatar || ""} onChange={e => setEdit({ ...edit, avatar: e.target.value })} className="w-full p-2 bg-black rounded" placeholder="Avatar URL" />

//             <input value={edit.referred_by || ""} onChange={e => setEdit({ ...edit, referred_by: Number(e.target.value) })} className="w-full p-2 bg-black rounded" placeholder="Referred by ID" />

//             <div className="flex gap-2 mt-3">

//               <button onClick={saveEdit} className="bg-green-500 flex-1 py-2 rounded">
//                 Save
//               </button>

//               <button onClick={() => setEdit(null)} className="bg-gray-600 flex-1 py-2 rounded">
//                 Cancel
//               </button>

//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  password?: string;
};

interface InputBlockProps {
  label: string;
  value?: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [edit, setEdit] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!token) {
        setError("No token found");
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

  const deleteUser = async (id: number) => {
    if (!confirm("⚠️ Permanent delete this user?")) return;
    await fetch(`${API}/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadUsers();
    setSelected(null);
  };

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

  if (loading)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full"
          />
          <span className="text-zinc-500 font-mono text-xs animate-pulse tracking-[0.3em]">
            INITIALIZING DATABASE...
          </span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-400">
        <h3 className="font-black italic">ERROR_ACCESS_DENIED</h3>
        <p className="text-sm opacity-70 mt-1">{error}</p>
      </div>
    );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">
            USER <span className="text-yellow-500 underline decoration-4 underline-offset-4">BASE</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2">Manage user permissions and referral data</p>
        </div>
        <div className="text-right">
          <span className="text-zinc-600 text-[10px] font-bold block uppercase tracking-widest">
            Total Population
          </span>
          <span className="text-2xl font-mono text-white leading-none">{users.length}</span>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="p-20 text-center border border-dashed border-white/5 rounded-[3rem]">
          <span className="text-zinc-700 text-6xl block mb-4">📭</span>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Void - No users found</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {users.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="group relative bg-zinc-900/40 border border-white/5 p-5 rounded-[2rem] hover:bg-zinc-900/60 hover:border-yellow-500/30 transition-all duration-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 overflow-hidden shadow-inner">
                      {u.avatar ? (
                        <img src={u.avatar} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl grayscale opacity-50">👤</div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-zinc-100 group-hover:text-yellow-400 transition-colors">
                        {u.name}
                      </h3>
                      <p className="text-[10px] text-zinc-500 font-mono tracking-tight">
                        {u.email || "no-email@hidden.com"}
                      </p>
                    </div>
                  </div>
                  <div className="px-2 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase text-zinc-400 tracking-tighter border border-white/5 group-hover:border-yellow-500/20">
                    {u.role || "User"}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                  <button
                    onClick={() => setSelected(u)}
                    className="flex-1 py-2 bg-zinc-800 hover:bg-yellow-500 hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setEdit(u)}
                    className="flex-1 py-2 bg-zinc-800 hover:bg-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="w-10 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                  >
                    🗑
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* VIEW MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-zinc-950 border border-white/10 p-8 rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black italic pointer-events-none uppercase tracking-tighter">
                Profile
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl">
                    {selected.avatar && <img src={selected.avatar} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white italic leading-tight">{selected.name}</h2>
                    <span className="text-yellow-500 font-mono text-xs">
                      ID: {selected.id.toString().padStart(5, "0")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Role", value: selected.role },
                    { label: "TG Username", value: `@${selected.telegram_username || "none"}` },
                    { label: "TG ID", value: selected.telegram_id || "unlinked" },
                    { label: "Ref. Count", value: selected.ref_count },
                    { label: "Ref. Code", value: selected.ref_code || "---" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <span className="text-[9px] uppercase font-black text-zinc-600 block mb-1 tracking-widest">
                        {item.label}
                      </span>
                      <span className="text-xs font-bold text-zinc-200">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-black uppercase tracking-widest border border-white/5 transition-all"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {edit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEdit(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative bg-zinc-950 border border-white/10 p-8 rounded-[3rem] w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                  Update <span className="text-yellow-500">Record</span>
                </h2>
                <div className="text-[10px] bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-yellow-500/20">
                  Mod-Level Access
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputBlock label="Display Name" value={edit.name} onChange={(v) => setEdit({ ...edit, name: v })} />
                  <InputBlock
                    label="Email Address"
                    value={edit.email}
                    onChange={(v) => setEdit({ ...edit, email: v })}
                  />
                  <InputBlock label="Access Role" value={edit.role} onChange={(v) => setEdit({ ...edit, role: v })} />
                  <InputBlock
                    label="New Password"
                    placeholder="••••••••"
                    type="password"
                    onChange={(v) => setEdit({ ...edit, password: v })}
                  />
                  <InputBlock
                    label="Telegram Username"
                    value={edit.telegram_username}
                    onChange={(v) => setEdit({ ...edit, telegram_username: v })}
                  />
                  <InputBlock
                    label="Telegram ID"
                    value={edit.telegram_id}
                    onChange={(v) => setEdit({ ...edit, telegram_id: v })}
                  />
                  <InputBlock
                    label="Ref Code"
                    value={edit.ref_code}
                    onChange={(v) => setEdit({ ...edit, ref_code: v })}
                  />
                  <InputBlock
                    label="Ref Count"
                    type="number"
                    value={edit.ref_count}
                    onChange={(v) => setEdit({ ...edit, ref_count: Number(v) })}
                  />
                  <div className="col-span-2">
                    <InputBlock
                      label="Avatar URL"
                      value={edit.avatar}
                      onChange={(v) => setEdit({ ...edit, avatar: v })}
                    />
                  </div>
                  <div className="col-span-2">
                    <InputBlock
                      label="Referred By (ID)"
                      type="number"
                      value={edit.referred_by || ""}
                      onChange={(v) => setEdit({ ...edit, referred_by: Number(v) })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={saveEdit}
                  className="flex-[2] py-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl font-black uppercase tracking-widest transition-all"
                >
                  Synchronize Data
                </button>
                <button
                  onClick={() => setEdit(null)}
                  className="flex-1 py-4 bg-zinc-800 text-white rounded-2xl font-bold hover:bg-zinc-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
}

function InputBlock({ label, value, onChange, placeholder = "", type = "text" }: InputBlockProps) {
  return (
    <div className="space-y-1">
      <label className="text-[9px] uppercase font-black text-zinc-600 ml-1 tracking-[0.2em]">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className="w-full p-3 bg-zinc-900/50 border border-white/5 rounded-2xl text-zinc-100 text-xs focus:border-yellow-500/40 outline-none transition-all placeholder:text-zinc-700 font-bold"
      />
    </div>
  );
}