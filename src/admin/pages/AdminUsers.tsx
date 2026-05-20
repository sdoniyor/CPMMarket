
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

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
//   password?: string;
// };

// interface InputBlockProps {
//   label: string;
//   value?: string | number;
//   onChange: (v: string) => void;
//   placeholder?: string;
//   type?: string;
// }

// export default function AdminUsers() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selected, setSelected] = useState<User | null>(null);
//   const [edit, setEdit] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const token = localStorage.getItem("token");

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       if (!token) {
//         setError("No token found");
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

//   const deleteUser = async (id: number) => {
//     if (!confirm("⚠️ Permanent delete this user?")) return;
//     await fetch(`${API}/admin/users/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     loadUsers();
//     setSelected(null);
//   };

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

//   if (loading)
//     return (
//       <div className="h-full flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//             className="w-12 h-12 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full"
//           />
//           <span className="text-zinc-500 font-mono text-xs animate-pulse tracking-[0.3em]">
//             INITIALIZING DATABASE...
//           </span>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-400">
//         <h3 className="font-black italic">ERROR_ACCESS_DENIED</h3>
//         <p className="text-sm opacity-70 mt-1">{error}</p>
//       </div>
//     );

//   return (
//     <div className="space-y-8 max-w-[1400px] mx-auto">
//       {/* HEADER */}
//       <div className="flex justify-between items-end">
//         <div>
//           <h1 className="text-4xl font-black tracking-tighter text-white">
//             USER <span className="text-yellow-500 underline decoration-4 underline-offset-4">BASE</span>
//           </h1>
//           <p className="text-zinc-500 text-sm mt-2">Manage user permissions and referral data</p>
//         </div>
//         <div className="text-right">
//           <span className="text-zinc-600 text-[10px] font-bold block uppercase tracking-widest">
//             Total Population
//           </span>
//           <span className="text-2xl font-mono text-white leading-none">{users.length}</span>
//         </div>
//       </div>

//       {users.length === 0 ? (
//         <div className="p-20 text-center border border-dashed border-white/5 rounded-[3rem]">
//           <span className="text-zinc-700 text-6xl block mb-4">📭</span>
//           <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Void - No users found</p>
//         </div>
//       ) : (
//         <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//           <AnimatePresence>
//             {users.map((u, i) => (
//               <motion.div
//                 key={u.id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.03 }}
//                 className="group relative bg-zinc-900/40 border border-white/5 p-5 rounded-[2rem] hover:bg-zinc-900/60 hover:border-yellow-500/30 transition-all duration-500"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 overflow-hidden shadow-inner">
//                       {u.avatar ? (
//                         <img src={u.avatar} className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-xl grayscale opacity-50">👤</div>
//                       )}
//                     </div>
//                     <div>
//                       <h3 className="font-black text-zinc-100 group-hover:text-yellow-400 transition-colors">
//                         {u.name}
//                       </h3>
//                       <p className="text-[10px] text-zinc-500 font-mono tracking-tight">
//                         {u.email || "no-email@hidden.com"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="px-2 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase text-zinc-400 tracking-tighter border border-white/5 group-hover:border-yellow-500/20">
//                     {u.role || "User"}
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
//                   <button
//                     onClick={() => setSelected(u)}
//                     className="flex-1 py-2 bg-zinc-800 hover:bg-yellow-500 hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
//                   >
//                     Profile
//                   </button>
//                   <button
//                     onClick={() => setEdit(u)}
//                     className="flex-1 py-2 bg-zinc-800 hover:bg-white hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
//                   >
//                     Modify
//                   </button>
//                   <button
//                     onClick={() => deleteUser(u.id)}
//                     className="w-10 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
//                   >
//                     🗑
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}

//       {/* VIEW MODAL */}
//       <AnimatePresence>
//         {selected && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setSelected(null)}
//               className="absolute inset-0 bg-black/90 backdrop-blur-md"
//             />
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="relative bg-zinc-950 border border-white/10 p-8 rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl"
//             >
//               <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black italic pointer-events-none uppercase tracking-tighter">
//                 Profile
//               </div>
//               <div className="relative z-10 space-y-6">
//                 <div className="flex items-center gap-6">
//                   <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl">
//                     {selected.avatar && <img src={selected.avatar} className="w-full h-full object-cover" />}
//                   </div>
//                   <div>
//                     <h2 className="text-3xl font-black text-white italic leading-tight">{selected.name}</h2>
//                     <span className="text-yellow-500 font-mono text-xs">
//                       ID: {selected.id.toString().padStart(5, "0")}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {[
//                     { label: "Role", value: selected.role },
//                     { label: "TG Username", value: `@${selected.telegram_username || "none"}` },
//                     { label: "TG ID", value: selected.telegram_id || "unlinked" },
//                     { label: "Ref. Count", value: selected.ref_count },
//                     { label: "Ref. Code", value: selected.ref_code || "---" },
//                   ].map((item, idx) => (
//                     <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/5">
//                       <span className="text-[9px] uppercase font-black text-zinc-600 block mb-1 tracking-widest">
//                         {item.label}
//                       </span>
//                       <span className="text-xs font-bold text-zinc-200">{item.value}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setSelected(null)}
//                   className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-black uppercase tracking-widest border border-white/5 transition-all"
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* EDIT MODAL */}
//       <AnimatePresence>
//         {edit && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setEdit(null)}
//               className="absolute inset-0 bg-black/90 backdrop-blur-sm"
//             />
//             <motion.div
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.95 }}
//               className="relative bg-zinc-950 border border-white/10 p-8 rounded-[3rem] w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col"
//             >
//               <div className="mb-6 flex justify-between items-center">
//                 <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
//                   Update <span className="text-yellow-500">Record</span>
//                 </h2>
//                 <div className="text-[10px] bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-yellow-500/20">
//                   Mod-Level Access
//                 </div>
//               </div>

//               <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <InputBlock label="Display Name" value={edit.name} onChange={(v) => setEdit({ ...edit, name: v })} />
//                   <InputBlock
//                     label="Email Address"
//                     value={edit.email}
//                     onChange={(v) => setEdit({ ...edit, email: v })}
//                   />
//                   <InputBlock label="Access Role" value={edit.role} onChange={(v) => setEdit({ ...edit, role: v })} />
//                   <InputBlock
//                     label="New Password"
//                     placeholder="••••••••"
//                     type="password"
//                     onChange={(v) => setEdit({ ...edit, password: v })}
//                   />
//                   <InputBlock
//                     label="Telegram Username"
//                     value={edit.telegram_username}
//                     onChange={(v) => setEdit({ ...edit, telegram_username: v })}
//                   />
//                   <InputBlock
//                     label="Telegram ID"
//                     value={edit.telegram_id}
//                     onChange={(v) => setEdit({ ...edit, telegram_id: v })}
//                   />
//                   <InputBlock
//                     label="Ref Code"
//                     value={edit.ref_code}
//                     onChange={(v) => setEdit({ ...edit, ref_code: v })}
//                   />
//                   <InputBlock
//                     label="Ref Count"
//                     type="number"
//                     value={edit.ref_count}
//                     onChange={(v) => setEdit({ ...edit, ref_count: Number(v) })}
//                   />
//                   <div className="col-span-2">
//                     <InputBlock
//                       label="Avatar URL"
//                       value={edit.avatar}
//                       onChange={(v) => setEdit({ ...edit, avatar: v })}
//                     />
//                   </div>
//                   <div className="col-span-2">
//                     <InputBlock
//                       label="Referred By (ID)"
//                       type="number"
//                       value={edit.referred_by || ""}
//                       onChange={(v) => setEdit({ ...edit, referred_by: Number(v) })}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-8">
//                 <button
//                   onClick={saveEdit}
//                   className="flex-[2] py-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl font-black uppercase tracking-widest transition-all"
//                 >
//                   Synchronize Data
//                 </button>
//                 <button
//                   onClick={() => setEdit(null)}
//                   className="flex-1 py-4 bg-zinc-800 text-white rounded-2xl font-bold hover:bg-zinc-700 transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }
//       `,
//         }}
//       />
//     </div>
//   );
// }

// function InputBlock({ label, value, onChange, placeholder = "", type = "text" }: InputBlockProps) {
//   return (
//     <div className="space-y-1">
//       <label className="text-[9px] uppercase font-black text-zinc-600 ml-1 tracking-[0.2em]">{label}</label>
//       <input
//         type={type}
//         value={value ?? ""}
//         placeholder={placeholder}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
//         className="w-full p-3 bg-zinc-900/50 border border-white/5 rounded-2xl text-zinc-100 text-xs focus:border-yellow-500/40 outline-none transition-all placeholder:text-zinc-700 font-bold"
//       />
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, User, Trash2, Pencil, Eye, X, Save, ChevronRight,
  ShieldCheck, Link2, Send, TriangleAlert,
} from "lucide-react";

const API = "https://cpmmarker.onrender.com";

type UserT = {
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

/* ─── INPUT ─── */
function Field({
  label, value, onChange, placeholder = "", type = "text",
}: {
  label: string;
  value?: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <p className="font-black uppercase tracking-[0.22em] mb-1.5" style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
        {label}
      </p>
      <div
        className="flex items-center px-3 transition-all duration-200"
        style={{
          height: 40,
          background: "rgba(0,0,0,0.3)",
          border: `1px solid ${focused ? "#FF3D0050" : "rgba(255,255,255,0.07)"}`,
          borderRadius: 2,
        }}
      >
        <input
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent border-none focus:outline-none font-bold"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", caretColor: "#FF3D00" }}
        />
      </div>
    </div>
  );
}

/* ─── MODAL SHELL ─── */
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
      />
      {children}
    </div>
  );
}

/* ─── AVATAR ─── */
function Avatar({ src, name, size = 44 }: { src?: string | null; name: string; size?: number }) {
  return (
    <div
      className="overflow-hidden flex items-center justify-center font-black italic shrink-0"
      style={{
        width: size, height: size,
        background: src ? "#000" : "#FF3D0018",
        border: "1px solid #FF3D0040",
        clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
        fontSize: size * 0.38,
        color: "#FF3D00",
      }}
    >
      {src
        ? <img src={src} className="w-full h-full object-cover" />
        : name?.[0]?.toUpperCase()
      }
    </div>
  );
}

/* ─── ROLE BADGE ─── */
function RoleBadge({ role }: { role?: string }) {
  const isAdmin = role?.toLowerCase() === "admin";
  return (
    <div
      className="flex items-center gap-1 px-2 py-1 font-black uppercase tracking-widest"
      style={{
        fontSize: 8,
        background: isAdmin ? "#FF3D0018" : "rgba(255,255,255,0.04)",
        border: `1px solid ${isAdmin ? "#FF3D0045" : "rgba(255,255,255,0.08)"}`,
        color: isAdmin ? "#FF3D00" : "rgba(255,255,255,0.3)",
        clipPath: "polygon(0 0, 90% 0, 100% 35%, 100% 100%, 10% 100%, 0 65%)",
      }}
    >
      {isAdmin && <ShieldCheck size={9} />}
      {role || "User"}
    </div>
  );
}

/* ════════════════════════════════════ */
export default function AdminUsers() {
  const [users, setUsers] = useState<UserT[]>([]);
  const [selected, setSelected] = useState<UserT | null>(null);
  const [edit, setEdit] = useState<UserT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    try {
      setLoading(true); setError(null);
      if (!token) { setError("No token found"); return; }
      const res = await fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) { setError(data?.error || "Server error"); return; }
      setUsers(Array.isArray(data) ? data : []);
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadUsers(); }, []);

  const deleteUser = async (id: number) => {
    if (!confirm("Permanently delete this user?")) return;
    await fetch(`${API}/admin/users/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    loadUsers(); setSelected(null);
  };

  const saveEdit = async () => {
    if (!edit) return;
    const res = await fetch(`${API}/admin/users/${edit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(edit),
    });
    const data = await res.json();
    if (!res.ok) { alert(data?.error || "Update failed"); return; }
    setEdit(null); loadUsers();
  };

  /* LOADING */
  if (loading)
    return (
      <div className="h-full flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-14 h-14">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid transparent", borderTopColor: "#FF3D00", borderRightColor: "#FF3D0033" }}
            />
            <Flame size={18} className="absolute inset-0 m-auto" style={{ color: "#FF3D00" }} />
          </div>
          <span className="font-black uppercase tracking-[0.35em] animate-pulse" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
            Initializing Database...
          </span>
        </div>
      </div>
    );

  /* ERROR */
  if (error)
    return (
      <div
        className="flex items-center gap-4 p-5 m-4"
        style={{ background: "#FF3D000C", border: "1px solid #FF3D0030", borderRadius: 2 }}
      >
        <TriangleAlert size={16} style={{ color: "#FF3D00", flexShrink: 0 }} />
        <div>
          <p className="font-black uppercase tracking-widest" style={{ fontSize: 10, color: "#FF3D00" }}>
            ERROR_ACCESS_DENIED
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="space-y-7 max-w-[1400px] mx-auto">

      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          {/* eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-5" style={{ background: "#FF3D0060" }} />
            <span className="font-black uppercase tracking-[0.35em]" style={{ fontSize: 8, color: "#FF3D0080" }}>
              Admin Panel
            </span>
          </div>
          <h1 className="font-black italic uppercase tracking-tighter leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>USER</span>
            {" "}
            <span style={{ color: "#FF3D00", textShadow: "0 0 24px #FF3D0066" }}>BASE</span>
          </h1>
          <p className="font-bold mt-1" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
            Manage user permissions and referral data
          </p>
        </div>

        <div
          className="flex flex-col items-end px-5 py-3 relative overflow-hidden"
          style={{ background: "#0D0D0F", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2 }}
        >
          <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />
          <span className="font-black uppercase tracking-[0.25em]" style={{ fontSize: 8, color: "rgba(255,255,255,0.18)" }}>
            Total
          </span>
          <span className="font-black italic" style={{ fontSize: 28, color: "#FF3D00", lineHeight: 1 }}>
            {users.length}
          </span>
        </div>
      </div>

      {/* EMPTY */}
      {users.length === 0 ? (
        <div
          className="py-32 flex flex-col items-center gap-4"
          style={{ border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 2 }}
        >
          <User size={36} style={{ color: "rgba(255,255,255,0.06)" }} />
          <p className="font-black uppercase tracking-[0.3em]" style={{ fontSize: 9, color: "rgba(255,255,255,0.15)" }}>
            No users found
          </p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {users.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden transition-colors duration-250"
                style={{
                  background: "#0D0D0F",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 2,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#FF3D0030"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                {/* top accent */}
                <div
                  className="absolute top-0 inset-x-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }}
                />

                <div className="p-4">
                  {/* user row */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar src={u.avatar} name={u.name} size={42} />
                      <div className="min-w-0">
                        <h3 className="font-black italic uppercase tracking-tight truncate" style={{ fontSize: 14, color: "rgba(255,255,255,0.9)" }}>
                          {u.name}
                        </h3>
                        <p className="font-mono truncate" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
                          {u.email || "no-email"}
                        </p>
                      </div>
                    </div>
                    <RoleBadge role={u.role} />
                  </div>

                  {/* stats row */}
                  <div
                    className="flex gap-3 mb-4 px-3 py-2.5"
                    style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 2 }}
                  >
                    <div className="flex-1 text-center">
                      <p className="font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>Refs</p>
                      <p className="font-black italic" style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.2 }}>
                        {u.ref_count ?? 0}
                      </p>
                    </div>
                    <div className="w-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                    <div className="flex-1 text-center">
                      <p className="font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>ID</p>
                      <p className="font-black font-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                        #{String(u.id).padStart(4, "0")}
                      </p>
                    </div>
                    <div className="w-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                    <div className="flex-1 text-center">
                      <p className="font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>TG</p>
                      <p style={{ fontSize: 11, color: u.telegram_id ? "#00E5FF" : "rgba(255,255,255,0.15)", lineHeight: 1.6 }}>
                        {u.telegram_id ? "●" : "○"}
                      </p>
                    </div>
                  </div>

                  {/* action buttons */}
                  <div className="flex gap-2">
                    {[
                      { label: "Profile", icon: Eye, onClick: () => setSelected(u), accent: "#AAAAAA" },
                      { label: "Modify", icon: Pencil, onClick: () => setEdit(u), accent: "#FF3D00" },
                    ].map(({ label, icon: Icon, onClick, accent }) => (
                      <button
                        key={label}
                        onClick={onClick}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 font-black uppercase tracking-widest transition-all duration-200"
                        style={{
                          fontSize: 8,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.4)",
                          clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = accent + "18";
                          el.style.borderColor = accent + "45";
                          el.style.color = accent;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = "rgba(255,255,255,0.04)";
                          el.style.borderColor = "rgba(255,255,255,0.07)";
                          el.style.color = "rgba(255,255,255,0.4)";
                        }}
                      >
                        <Icon size={10} /> {label}
                      </button>
                    ))}
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="w-9 flex items-center justify-center transition-all duration-200"
                      style={{
                        background: "rgba(255,61,0,0.06)",
                        border: "1px solid rgba(255,61,0,0.2)",
                        color: "#FF3D0070",
                        clipPath: "polygon(0 0, 80% 0, 100% 35%, 100% 100%, 20% 100%, 0 65%)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "#FF3D0022";
                        el.style.borderColor = "#FF3D0060";
                        el.style.color = "#FF3D00";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "rgba(255,61,0,0.06)";
                        el.style.borderColor = "rgba(255,61,0,0.2)";
                        el.style.color = "#FF3D0070";
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── VIEW MODAL ── */}
      <AnimatePresence>
        {selected && (
          <Modal onClose={() => setSelected(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md overflow-hidden"
              style={{ background: "#0D0D0F", border: "1px solid #FF3D0030", borderRadius: 2 }}
            >
              <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />

              {/* header */}
              <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <Avatar src={selected.avatar} name={selected.name} size={44} />
                  <div>
                    <h2 className="font-black italic uppercase tracking-tighter" style={{ fontSize: 20, color: "#fff" }}>
                      {selected.name}
                    </h2>
                    <span className="font-mono" style={{ fontSize: 9, color: "#FF3D00" }}>
                      ID #{String(selected.id).padStart(5, "0")}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 grid grid-cols-2 gap-2.5">
                {[
                  { icon: ShieldCheck, label: "Role", value: selected.role || "user", accent: selected.role === "admin" ? "#FF3D00" : "#888" },
                  { icon: Send, label: "Telegram", value: selected.telegram_username ? `@${selected.telegram_username}` : "—", accent: "#00E5FF" },
                  { icon: Send, label: "TG ID", value: selected.telegram_id || "unlinked", accent: "#00E5FF" },
                  { icon: Link2, label: "Ref Count", value: String(selected.ref_count ?? 0), accent: "#FF3D00" },
                  { icon: Link2, label: "Ref Code", value: selected.ref_code || "—", accent: "#FF3D00" },
                  { icon: User, label: "Referred By", value: selected.referred_by ? `#${selected.referred_by}` : "—", accent: "#888" },
                ].map(({ icon: Icon, label, value, accent }, idx) => (
                  <div
                    key={idx}
                    className="p-3 relative overflow-hidden"
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Icon size={9} style={{ color: accent + "88" }} />
                      <p className="font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>
                        {label}
                      </p>
                    </div>
                    <p className="font-black italic truncate" style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-3 font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    fontSize: 9, background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)",
                    clipPath: "polygon(0 0, 97% 0, 100% 35%, 100% 100%, 3% 100%, 0 65%)",
                  }}
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* ── EDIT MODAL ── */}
      <AnimatePresence>
        {edit && (
          <Modal onClose={() => setEdit(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl flex flex-col overflow-hidden"
              style={{
                background: "#0D0D0F",
                border: "1px solid #FF3D0035",
                borderRadius: 2,
                maxHeight: "88vh",
              }}
            >
              <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />

              {/* modal header */}
              <div
                className="flex items-center justify-between px-6 py-4 shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ background: "#FF3D0018", border: "1px solid #FF3D0040", clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)" }}
                  >
                    <Pencil size={13} style={{ color: "#FF3D00" }} />
                  </div>
                  <div>
                    <h2 className="font-black italic uppercase tracking-tighter" style={{ fontSize: 16 }}>
                      Update <span style={{ color: "#FF3D00" }}>Record</span>
                    </h2>
                    <p className="font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>
                      Mod-Level Access
                    </p>
                  </div>
                </div>
                <button onClick={() => setEdit(null)} style={{ color: "rgba(255,255,255,0.25)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.25)")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* scrollable fields */}
              <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin", scrollbarColor: "#FF3D0030 transparent" }}>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Display Name"      value={edit.name}             onChange={(v) => setEdit({ ...edit, name: v })} />
                  <Field label="Email Address"     value={edit.email}            onChange={(v) => setEdit({ ...edit, email: v })} />
                  <Field label="Access Role"       value={edit.role}             onChange={(v) => setEdit({ ...edit, role: v })} />
                  <Field label="New Password"      placeholder="••••••••" type="password" onChange={(v) => setEdit({ ...edit, password: v })} />
                  <Field label="Telegram Username" value={edit.telegram_username} onChange={(v) => setEdit({ ...edit, telegram_username: v })} />
                  <Field label="Telegram ID"       value={edit.telegram_id}      onChange={(v) => setEdit({ ...edit, telegram_id: v })} />
                  <Field label="Ref Code"          value={edit.ref_code}         onChange={(v) => setEdit({ ...edit, ref_code: v })} />
                  <Field label="Ref Count" type="number" value={edit.ref_count}  onChange={(v) => setEdit({ ...edit, ref_count: Number(v) })} />
                  <div className="col-span-2">
                    <Field label="Avatar URL"      value={edit.avatar}           onChange={(v) => setEdit({ ...edit, avatar: v })} />
                  </div>
                  <div className="col-span-2">
                    <Field label="Referred By (ID)" type="number" value={edit.referred_by || ""} onChange={(v) => setEdit({ ...edit, referred_by: Number(v) })} />
                  </div>
                </div>
              </div>

              {/* footer actions */}
              <div
                className="flex gap-3 px-6 py-4 shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={saveEdit}
                  className="flex-[2] flex items-center justify-center gap-2 py-3 font-black uppercase tracking-widest"
                  style={{
                    fontSize: 10, background: "#FF3D00", color: "#000",
                    clipPath: "polygon(0 0, 97% 0, 100% 35%, 100% 100%, 3% 100%, 0 65%)",
                  }}
                >
                  <Save size={13} /> Synchronize Data
                </motion.button>
                <button
                  onClick={() => setEdit(null)}
                  className="flex-1 py-3 font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    fontSize: 9,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.35)",
                    clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
