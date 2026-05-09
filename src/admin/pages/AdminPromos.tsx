// import { useEffect, useState } from "react";

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

//   /* ================= LOAD ================= */
//   const load = async () => {
//     setLoading(true);

//     const res = await fetch(`${API}/admin/promos`, {
//       headers: { Authorization: `Bearer ${token || ""}` },
//     });

//     const data = await res.json();

//     if (Array.isArray(data)) {
//       setPromos(data);
//     } else {
//       console.log("PROMO ERROR:", data);
//       setPromos([]);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   /* ================= OPEN CREATE ================= */
//   const openCreate = () => {
//     setEditing(null);
//     setForm({ code: "", discount: "", rules: "all" });
//     setModalOpen(true);
//   };

//   /* ================= OPEN EDIT ================= */
//   const openEdit = (p: Promo) => {
//     setEditing(p);
//     setForm({
//       code: p.code,
//       discount: String(p.discount),
//       rules: p.rules || "all",
//     });
//     setModalOpen(true);
//   };

//   /* ================= SAVE ================= */
//   const save = async () => {
//     const url = editing
//       ? `${API}/admin/promos/${editing.id}`
//       : `${API}/admin/promos`;

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

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data?.error || "Error");
//       return;
//     }

//     setModalOpen(false);
//     load();
//   };

//   /* ================= DELETE ================= */
//   const remove = async (id: number) => {
//     if (!confirm("Delete promo?")) return;

//     const res = await fetch(`${API}/admin/promos/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token || ""}`,
//       },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data?.error || "Error");
//       return;
//     }

//     load();
//   };

//   if (loading) {
//     return <div className="text-white p-6">Loading promos...</div>;
//   }

//   return (
//     <div className="p-6 text-white">

//       {/* HEADER */}
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Promos</h1>

//         <button
//           onClick={openCreate}
//           className="bg-green-500 px-4 py-2 rounded-xl font-bold"
//         >
//           + Add Promo
//         </button>
//       </div>

//       {/* LIST */}
//       <div className="space-y-2">

//         {promos.map((p) => (
//           <div
//             key={p.id}
//             className="bg-zinc-900 p-3 rounded-xl flex justify-between items-center"
//           >

//             <div>
//               <div className="font-bold">{p.code}</div>
//               <div className="text-yellow-400">{p.discount}%</div>
//               <div className="text-xs text-white/40">{p.rules}</div>
//             </div>

//             <div className="flex gap-2">

//               <button
//                 onClick={() => openEdit(p)}
//                 className="bg-blue-500 px-3 py-1 rounded-lg text-sm"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => remove(p.id)}
//                 className="bg-red-500 px-3 py-1 rounded-lg text-sm"
//               >
//                 Delete
//               </button>

//             </div>

//           </div>
//         ))}

//       </div>

//       {/* MODAL */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

//           <div className="bg-zinc-900 p-6 rounded-2xl w-[400px] space-y-3">

//             <h2 className="text-xl font-bold">
//               {editing ? "Edit Promo" : "Create Promo"}
//             </h2>

//             <input
//               placeholder="Code"
//               value={form.code}
//               onChange={(e) => setForm({ ...form, code: e.target.value })}
//               className="w-full p-2 bg-black rounded-lg"
//             />

//             <input
//               placeholder="Discount"
//               type="number"
//               value={form.discount}
//               onChange={(e) =>
//                 setForm({ ...form, discount: e.target.value })
//               }
//               className="w-full p-2 bg-black rounded-lg"
//             />

//             <input
//               placeholder="Rules"
//               value={form.rules}
//               onChange={(e) =>
//                 setForm({ ...form, rules: e.target.value })
//               }
//               className="w-full p-2 bg-black rounded-lg"
//             />

//             <div className="flex gap-2">

//               <button
//                 onClick={save}
//                 className="bg-green-500 px-4 py-2 rounded-xl flex-1 font-bold"
//               >
//                 Save
//               </button>

//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="bg-gray-600 px-4 py-2 rounded-xl"
//               >
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

type Promo = {
  id: number;
  code: string;
  discount: number;
  rules?: string;
};

export default function AdminPromos() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Promo | null>(null);

  const [form, setForm] = useState({
    code: "",
    discount: "",
    rules: "all",
  });

  const token = localStorage.getItem("token");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/promos`, {
        headers: { Authorization: `Bearer ${token || ""}` },
      });
      const data = await res.json();
      setPromos(Array.isArray(data) ? data : []);
    } catch (e) {
      setPromos([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ code: "", discount: "", rules: "all" });
    setModalOpen(true);
  };

  const openEdit = (p: Promo) => {
    setEditing(p);
    setForm({
      code: p.code,
      discount: String(p.discount),
      rules: p.rules || "all",
    });
    setModalOpen(true);
  };

  const save = async () => {
    const url = editing ? `${API}/admin/promos/${editing.id}` : `${API}/admin/promos`;
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: JSON.stringify({
        code: form.code,
        discount: Number(form.discount),
        rules: form.rules,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data?.error || "Error");
      return;
    }

    setModalOpen(false);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this promo code?")) return;
    const res = await fetch(`${API}/admin/promos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token || ""}` },
    });
    if (res.ok) load();
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-yellow-500 font-black tracking-widest"
        >
          LOADING PROMOS...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Promo <span className="text-yellow-500 underline decoration-2 underline-offset-8">Engine</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-2 font-medium uppercase tracking-[0.3em]">Campaign & Discount Management</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(234,179,8,0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={openCreate}
          className="bg-yellow-500 text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
        >
          + Create New Code
        </motion.button>
      </div>

      {/* LIST */}
      <div className="grid gap-3">
        <AnimatePresence mode="popLayout">
          {promos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="bg-yellow-500/10 text-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center text-2xl border border-yellow-500/20">
                  🎟
                </div>
                <div>
                  <div className="text-xl font-mono font-black tracking-widest text-white group-hover:text-yellow-400 transition-colors">
                    {p.code}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-zinc-300">-{p.discount}%</span>
                    <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter bg-white/5 px-2 py-0.5 rounded">
                      {p.rules}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => openEdit(p)}
                  className="flex-1 sm:flex-none px-5 py-2 bg-zinc-800 hover:bg-white hover:text-black rounded-xl text-xs font-bold transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="px-5 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-bold transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-950 border border-white/10 p-8 rounded-[2rem] w-full max-w-md shadow-2xl"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-black text-white uppercase italic">
                   {editing ? "Modify" : "Generate"} <span className="text-yellow-500">Promo</span>
                </h2>
                <div className="h-1 w-12 bg-yellow-500 mt-2 rounded-full" />
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Promo Code</label>
                  <input
                    placeholder="E.g. SUMMER2024"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    className="w-full p-4 bg-zinc-900 border border-white/5 rounded-2xl text-white font-mono focus:border-yellow-500/50 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Discount Percentage</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0"
                      value={form.discount}
                      onChange={(e) => setForm({ ...form, discount: e.target.value })}
                      className="w-full p-4 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold">%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Usage Rules</label>
                  <input
                    placeholder="E.g. Only for new users"
                    value={form.rules}
                    onChange={(e) => setForm({ ...form, rules: e.target.value })}
                    className="w-full p-4 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-10">
                <button
                  onClick={save}
                  className="flex-[2] bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-black uppercase tracking-tighter transition-all shadow-lg shadow-yellow-500/10"
                >
                  Deploy Promo
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-zinc-800 text-white py-4 rounded-2xl font-bold hover:bg-zinc-700 transition-all"
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