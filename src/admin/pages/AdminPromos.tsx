
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const API = "https://cpmmarker.onrender.com";

// type Promo = {
//   id: number;
//   code: string;
//   discount: number;
//   rules?: string;
// };

// export default function AdminPromos() {
//   const [promos, setPromos] = useState<Promo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState<Promo | null>(null);

//   const [form, setForm] = useState({
//     code: "",
//     discount: "",
//     rules: "all",
//   });

//   const token = localStorage.getItem("token");

//   const load = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/admin/promos`, {
//         headers: { Authorization: `Bearer ${token || ""}` },
//       });
//       const data = await res.json();
//       setPromos(Array.isArray(data) ? data : []);
//     } catch (e) {
//       setPromos([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { load(); }, []);

//   const openCreate = () => {
//     setEditing(null);
//     setForm({ code: "", discount: "", rules: "all" });
//     setModalOpen(true);
//   };

//   const openEdit = (p: Promo) => {
//     setEditing(p);
//     setForm({
//       code: p.code,
//       discount: String(p.discount),
//       rules: p.rules || "all",
//     });
//     setModalOpen(true);
//   };

//   const save = async () => {
//     const url = editing ? `${API}/admin/promos/${editing.id}` : `${API}/admin/promos`;
//     const method = editing ? "PUT" : "POST";

//     const res = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token || ""}`,
//       },
//       body: JSON.stringify({
//         code: form.code,
//         discount: Number(form.discount),
//         rules: form.rules,
//       }),
//     });

//     if (!res.ok) {
//       const data = await res.json();
//       alert(data?.error || "Error");
//       return;
//     }

//     setModalOpen(false);
//     load();
//   };

//   const remove = async (id: number) => {
//     if (!confirm("Delete this promo code?")) return;
//     const res = await fetch(`${API}/admin/promos/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token || ""}` },
//     });
//     if (res.ok) load();
//   };

//   if (loading) {
//     return (
//       <div className="h-full flex items-center justify-center">
//         <motion.div 
//           animate={{ scale: [1, 1.2, 1] }} 
//           transition={{ repeat: Infinity, duration: 1 }}
//           className="text-yellow-500 font-black tracking-widest"
//         >
//           LOADING PROMOS...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
      
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
//         <div>
//           <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
//             Promo <span className="text-yellow-500 underline decoration-2 underline-offset-8">Engine</span>
//           </h1>
//           <p className="text-zinc-500 text-xs mt-2 font-medium uppercase tracking-[0.3em]">Campaign & Discount Management</p>
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(234,179,8,0.4)" }}
//           whileTap={{ scale: 0.98 }}
//           onClick={openCreate}
//           className="bg-yellow-500 text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
//         >
//           + Create New Code
//         </motion.button>
//       </div>

//       {/* LIST */}
//       <div className="grid gap-3">
//         <AnimatePresence mode="popLayout">
//           {promos.map((p, i) => (
//             <motion.div
//               key={p.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ delay: i * 0.05 }}
//               className="group bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300"
//             >
//               <div className="flex items-center gap-6">
//                 <div className="bg-yellow-500/10 text-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center text-2xl border border-yellow-500/20">
//                   🎟
//                 </div>
//                 <div>
//                   <div className="text-xl font-mono font-black tracking-widest text-white group-hover:text-yellow-400 transition-colors">
//                     {p.code}
//                   </div>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span className="text-sm font-bold text-zinc-300">-{p.discount}%</span>
//                     <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter bg-white/5 px-2 py-0.5 rounded">
//                       {p.rules}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-2 w-full sm:w-auto">
//                 <button
//                   onClick={() => openEdit(p)}
//                   className="flex-1 sm:flex-none px-5 py-2 bg-zinc-800 hover:bg-white hover:text-black rounded-xl text-xs font-bold transition-all"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => remove(p.id)}
//                   className="px-5 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-bold transition-all"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {modalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               onClick={() => setModalOpen(false)}
//               className="absolute inset-0 bg-black/90 backdrop-blur-md" 
//             />
            
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="relative bg-zinc-950 border border-white/10 p-8 rounded-[2rem] w-full max-w-md shadow-2xl"
//             >
//               <div className="mb-8">
//                 <h2 className="text-2xl font-black text-white uppercase italic">
//                    {editing ? "Modify" : "Generate"} <span className="text-yellow-500">Promo</span>
//                 </h2>
//                 <div className="h-1 w-12 bg-yellow-500 mt-2 rounded-full" />
//               </div>

//               <div className="space-y-5">
//                 <div className="space-y-1">
//                   <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Promo Code</label>
//                   <input
//                     placeholder="E.g. SUMMER2024"
//                     value={form.code}
//                     onChange={(e) => setForm({ ...form, code: e.target.value })}
//                     className="w-full p-4 bg-zinc-900 border border-white/5 rounded-2xl text-white font-mono focus:border-yellow-500/50 outline-none transition-all"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Discount Percentage</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       placeholder="0"
//                       value={form.discount}
//                       onChange={(e) => setForm({ ...form, discount: e.target.value })}
//                       className="w-full p-4 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-all"
//                     />
//                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold">%</span>
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Usage Rules</label>
//                   <input
//                     placeholder="E.g. Only for new users"
//                     value={form.rules}
//                     onChange={(e) => setForm({ ...form, rules: e.target.value })}
//                     className="w-full p-4 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-all"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-10">
//                 <button
//                   onClick={save}
//                   className="flex-[2] bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-black uppercase tracking-tighter transition-all shadow-lg shadow-yellow-500/10"
//                 >
//                   Deploy Promo
//                 </button>
//                 <button
//                   onClick={() => setModalOpen(false)}
//                   className="flex-1 bg-zinc-800 text-white py-4 rounded-2xl font-bold hover:bg-zinc-700 transition-all"
//                 >
//                   Back
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Plus, Pencil, Trash2, X, Save, Tag, Zap, ChevronRight } from "lucide-react";

const API = "https://cpmmarker.onrender.com";

type Promo = { id: number; code: string; discount: number; rules?: string };

/* ─── field ─── */
function Field({
  label, value, onChange, placeholder = "", type = "text", suffix,
}: {
  label: string; value?: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; suffix?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <p className="font-black uppercase tracking-[0.22em] mb-1.5" style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
        {label}
      </p>
      <div
        className="flex items-center px-3 gap-2 transition-all duration-200"
        style={{
          height: 46,
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${focused ? "#FF3D0055" : "rgba(255,255,255,0.07)"}`,
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
          className="flex-1 bg-transparent border-none focus:outline-none font-bold font-mono"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", caretColor: "#FF3D00" }}
        />
        {suffix}
      </div>
    </div>
  );
}

export default function AdminPromos() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Promo | null>(null);
  const [form, setForm] = useState({ code: "", discount: "", rules: "all" });

  const token = localStorage.getItem("token");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/promos`, { headers: { Authorization: `Bearer ${token || ""}` } });
      const data = await res.json();
      setPromos(Array.isArray(data) ? data : []);
    } catch { setPromos([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm({ code: "", discount: "", rules: "all" }); setModalOpen(true); };
  const openEdit = (p: Promo) => { setEditing(p); setForm({ code: p.code, discount: String(p.discount), rules: p.rules || "all" }); setModalOpen(true); };

  const save = async () => {
    const url = editing ? `${API}/admin/promos/${editing.id}` : `${API}/admin/promos`;
    const res = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
      body: JSON.stringify({ code: form.code, discount: Number(form.discount), rules: form.rules }),
    });
    if (!res.ok) { const d = await res.json(); alert(d?.error || "Error"); return; }
    setModalOpen(false); load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this promo code?")) return;
    const res = await fetch(`${API}/admin/promos/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token || ""}` } });
    if (res.ok) load();
  };

  /* LOADING */
  if (loading)
    return (
      <div className="h-full flex items-center justify-center py-32">
        <div className="relative w-14 h-14">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid transparent", borderTopColor: "#FF3D00", borderRightColor: "#FF3D0033" }}
          />
          <Flame size={18} className="absolute inset-0 m-auto" style={{ color: "#FF3D00" }} />
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-7">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-7" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-5" style={{ background: "#FF3D0060" }} />
            <span className="font-black uppercase tracking-[0.35em]" style={{ fontSize: 8, color: "#FF3D0080" }}>
              Admin Panel
            </span>
          </div>
          <h1 className="font-black italic uppercase tracking-tighter leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>PROMO</span>
            {" "}
            <span style={{ color: "#FF3D00", textShadow: "0 0 24px #FF3D0066" }}>ENGINE</span>
          </h1>
          <p className="font-bold mt-1" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
            Campaign & discount management
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest shrink-0"
          style={{ fontSize: 10, background: "#FF3D00", color: "#000", clipPath: "polygon(0 0, 94% 0, 100% 35%, 100% 100%, 6% 100%, 0 65%)" }}
        >
          <Plus size={13} />
          New Code
        </motion.button>
      </div>

      {/* EMPTY */}
      {promos.length === 0 && (
        <div className="py-28 flex flex-col items-center gap-4" style={{ border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 2 }}>
          <Tag size={34} style={{ color: "rgba(255,255,255,0.06)" }} />
          <p className="font-black uppercase tracking-[0.3em]" style={{ fontSize: 9, color: "rgba(255,255,255,0.15)" }}>
            No promo codes yet
          </p>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {promos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition-colors duration-250"
              style={{
                background: "#0D0D0F",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 2,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#FF3D0030"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              {/* left accent bar */}
              <div
                className="absolute left-0 inset-y-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to bottom, #FF3D00, transparent)" }}
              />
              {/* top accent */}
              <div
                className="absolute top-0 inset-x-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }}
              />

              {/* left: icon + info */}
              <div className="flex items-center gap-4">
                {/* ticket icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center shrink-0"
                  style={{
                    background: "#FF3D0015",
                    border: "1px solid #FF3D0040",
                    clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
                  }}
                >
                  <Tag size={18} style={{ color: "#FF3D00" }} />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    {/* code */}
                    <span
                      className="font-black font-mono uppercase tracking-widest"
                      style={{ fontSize: 16, color: "rgba(255,255,255,0.92)" }}
                    >
                      {p.code}
                    </span>

                    {/* discount badge */}
                    <div
                      className="flex items-center gap-1 px-2 py-[4px] font-black uppercase"
                      style={{
                        fontSize: 9,
                        background: "#FF3D0018",
                        border: "1px solid #FF3D0045",
                        color: "#FF3D00",
                        clipPath: "polygon(0 0, 88% 0, 100% 35%, 100% 100%, 12% 100%, 0 65%)",
                      }}
                    >
                      <Zap size={9} fill="currentColor" />
                      -{p.discount}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* speed-line */}
                    <div className="w-3 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                    <span
                      className="font-bold uppercase tracking-widest"
                      style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}
                    >
                      {p.rules}
                    </span>
                  </div>
                </div>
              </div>

              {/* right: actions */}
              <div className="flex gap-2 sm:shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="flex items-center gap-1.5 px-4 py-2 font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    fontSize: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.4)",
                    clipPath: "polygon(0 0, 90% 0, 100% 35%, 100% 100%, 10% 100%, 0 65%)",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#FF3D0015"; el.style.borderColor = "#FF3D0040"; el.style.color = "#FF3D00"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.color = "rgba(255,255,255,0.4)"; }}
                >
                  <Pencil size={10} /> Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="flex items-center gap-1.5 px-3 py-2 font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    fontSize: 9, background: "rgba(255,61,0,0.06)", border: "1px solid rgba(255,61,0,0.2)",
                    color: "#FF3D0070",
                    clipPath: "polygon(0 0, 88% 0, 100% 35%, 100% 100%, 12% 100%, 0 65%)",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#FF3D0022"; el.style.borderColor = "#FF3D0055"; el.style.color = "#FF3D00"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,61,0,0.06)"; el.style.borderColor = "rgba(255,61,0,0.2)"; el.style.color = "#FF3D0070"; }}
                >
                  <Trash2 size={10} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.27, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md overflow-hidden"
              style={{ background: "#0D0D0F", border: "1px solid #FF3D0035", borderRadius: 2 }}
            >
              <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />

              {/* modal header */}
              <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ background: "#FF3D0018", border: "1px solid #FF3D0040", clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)" }}
                  >
                    {editing ? <Pencil size={13} style={{ color: "#FF3D00" }} /> : <Plus size={13} style={{ color: "#FF3D00" }} />}
                  </div>
                  <div>
                    <h2 className="font-black italic uppercase tracking-tighter" style={{ fontSize: 17 }}>
                      {editing ? "Modify" : "Generate"}{" "}
                      <span style={{ color: "#FF3D00" }}>Promo</span>
                    </h2>
                    <p className="font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>
                      Discount Management
                    </p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} style={{ color: "rgba(255,255,255,0.25)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.25)")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* fields */}
              <div className="p-6 space-y-4">
                <Field
                  label="Promo Code"
                  value={form.code}
                  onChange={(v) => setForm({ ...form, code: v.toUpperCase() })}
                  placeholder="SUMMER2024"
                />
                <Field
                  label="Discount %"
                  value={form.discount}
                  onChange={(v) => setForm({ ...form, discount: v })}
                  type="number"
                  placeholder="0"
                  suffix={
                    <span className="font-black shrink-0" style={{ fontSize: 16, color: "#FF3D0060" }}>%</span>
                  }
                />
                <Field
                  label="Usage Rules"
                  value={form.rules}
                  onChange={(v) => setForm({ ...form, rules: v })}
                  placeholder="E.g. Only for new users"
                />

                {/* preview */}
                {form.code && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ background: "#FF3D000C", border: "1px solid #FF3D0030", borderRadius: 2 }}
                  >
                    <Tag size={13} style={{ color: "#FF3D00" }} />
                    <span className="font-black font-mono tracking-widest" style={{ fontSize: 13, color: "#FF3D00" }}>
                      {form.code}
                    </span>
                    {form.discount && (
                      <div
                        className="flex items-center gap-1 px-2 py-[3px] font-black ml-auto"
                        style={{ fontSize: 9, background: "#FF3D0020", border: "1px solid #FF3D0045", color: "#FF3D00", clipPath: "polygon(0 0, 88% 0, 100% 35%, 100% 100%, 12% 100%, 0 65%)" }}
                      >
                        <Zap size={9} fill="currentColor" />
                        -{form.discount}%
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* footer */}
              <div className="flex gap-3 px-6 pb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={save}
                  className="flex-[2] flex items-center justify-center gap-2 py-3 font-black uppercase tracking-widest"
                  style={{ fontSize: 10, background: "#FF3D00", color: "#000", clipPath: "polygon(0 0, 97% 0, 100% 35%, 100% 100%, 3% 100%, 0 65%)" }}
                >
                  <Save size={13} />
                  Deploy Promo
                </motion.button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    fontSize: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.35)", clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                  }}
                >
                  Back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
