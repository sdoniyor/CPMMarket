
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const API = "https://cpmmarker.onrender.com";

// type Car = {
//   id: number;
//   brand: string;
//   name: string;
//   price: number;
//   image_url: string;
//   dvigatel?: string;
//   power?: string;
//   speed?: string;
//   type?: string;
// };

// export default function AdminCars() {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingCar, setEditingCar] = useState<Car | null>(null);

//   const token = localStorage.getItem("token");

//   const [form, setForm] = useState({
//     brand: "",
//     name: "",
//     price: "",
//     image_url: "",
//     dvigatel: "",
//     power: "",
//     speed: "",
//     type: "default",
//   });

//   const loadCars = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API}/admin/cars`, {
//         headers: { Authorization: `Bearer ${token || ""}` },
//       });
//       const data = await res.json();
//       setCars(Array.isArray(data) ? data : []);
//     } catch (e) {
//       setCars([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { loadCars(); }, []);

//   const openCreate = () => {
//     setEditingCar(null);
//     setForm({ brand: "", name: "", price: "", image_url: "", dvigatel: "", power: "", speed: "", type: "default" });
//     setModalOpen(true);
//   };

//   const openEdit = (car: Car) => {
//     setEditingCar(car);
//     setForm({
//       brand: car.brand,
//       name: car.name,
//       price: String(car.price),
//       image_url: car.image_url,
//       dvigatel: car.dvigatel || "",
//       power: car.power || "",
//       speed: car.speed || "",
//       type: car.type || "default",
//     });
//     setModalOpen(true);
//   };

//   const saveCar = async () => {
//     const url = editingCar ? `${API}/admin/cars/${editingCar.id}` : `${API}/admin/cars`;
//     const method = editingCar ? "PUT" : "POST";

//     const res = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token || ""}`,
//       },
//       body: JSON.stringify({ ...form, price: Number(form.price) }),
//     });

//     if (!res.ok) {
//       const data = await res.json();
//       alert(data?.error || "Error");
//       return;
//     }
//     setModalOpen(false);
//     loadCars();
//   };

//   const deleteCar = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this beast?")) return;
//     const res = await fetch(`${API}/admin/cars/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token || ""}` },
//     });
//     if (res.ok) loadCars();
//   };

//   if (loading) {
//     return (
//       <div className="h-full flex items-center justify-center">
//         <motion.div 
//           animate={{ rotate: 360 }} 
//           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//           className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full" 
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* HEADER */}
//       <div className="flex justify-between items-end">
//         <div>
//           <h1 className="text-4xl font-black tracking-tight text-white">FLEET <span className="text-yellow-500">CONTROL</span></h1>
//           <p className="text-zinc-500 text-sm mt-1">Manage your vehicle inventory and specifications</p>
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={openCreate}
//           className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-colors"
//         >
//           + Add New Car
//         </motion.button>
//       </div>

//       {/* GRID */}
//       <motion.div 
//         layout
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//       >
//         <AnimatePresence>
//           {cars.map((c, index) => (
//             <motion.div
//               layout
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ delay: index * 0.05 }}
//               key={c.id}
//               className="group bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
//             >
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={c.image_url}
//                   alt={c.name}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
//                 <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
//                   {c.type}
//                 </div>
//               </div>

//               <div className="p-5">
//                 <div className="mb-4">
//                   <h3 className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{c.brand}</h3>
//                   <p className="text-xl font-bold text-white tracking-tight">{c.name}</p>
//                   <p className="text-yellow-500 font-mono font-bold mt-1">${c.price.toLocaleString()}</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 mb-5 text-[10px] text-zinc-400 uppercase font-semibold">
//                     <div className="bg-white/5 p-2 rounded-lg">⚙️ {c.dvigatel || 'N/A'}</div>
//                     <div className="bg-white/5 p-2 rounded-lg">⚡ {c.power || 'N/A'}</div>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => openEdit(c)}
//                     className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteCar(c.id)}
//                     className="w-12 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2.5 rounded-xl text-xs flex items-center justify-center transition-all"
//                   >
//                     🗑
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {modalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setModalOpen(false)}
//               className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
//             />
            
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="relative bg-zinc-950 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden"
//             >
//               {/* Декор модалки */}
//               <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
              
//               <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
//                 {editingCar ? "Edit Vehicle" : "New Vehicle"}
//               </h2>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1 col-span-2 sm:col-span-1">
//                     <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Brand</label>
//                     <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
//                         className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors" />
//                 </div>
//                 <div className="space-y-1 col-span-2 sm:col-span-1">
//                     <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Model Name</label>
//                     <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
//                         className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors" />
//                 </div>
//                 <div className="space-y-1 col-span-2">
//                     <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Image Direct URL</label>
//                     <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })}
//                         className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors" />
//                 </div>
//                 <div className="space-y-1 col-span-1">
//                     <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Price ($)</label>
//                     <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
//                         className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors" />
//                 </div>
//                 <div className="space-y-1 col-span-1">
//                     <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Type</label>
//                     <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
//                         className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors appearance-none">
//                         <option value="default">Default</option>
//                         <option value="coin">Coin</option>
//                         <option value="premium">Premium</option>
//                     </select>
//                 </div>
                
//                 <div className="col-span-2 grid grid-cols-3 gap-3 pt-2">
//                     <input placeholder="Engine" value={form.dvigatel} onChange={e => setForm({ ...form, dvigatel: e.target.value })}
//                         className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-yellow-500/50" />
//                     <input placeholder="HP" value={form.power} onChange={e => setForm({ ...form, power: e.target.value })}
//                         className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-yellow-500/50" />
//                     <input placeholder="Top Speed" value={form.speed} onChange={e => setForm({ ...form, speed: e.target.value })}
//                         className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-yellow-500/50" />
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-8">
//                 <button
//                   onClick={saveCar}
//                   className="flex-[2] bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-2xl font-black uppercase tracking-widest transition-colors"
//                 >
//                   Confirm & Save
//                 </button>
//                 <button
//                   onClick={() => setModalOpen(false)}
//                   className="flex-1 bg-zinc-800 text-white p-4 rounded-2xl font-bold hover:bg-zinc-700 transition-colors"
//                 >
//                   Exit
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
import {
  Flame, Trash2, Pencil, Plus, X, Save,
  Zap, Gauge, Car as CarIcon, Crown, Coins, Flag,
} from "lucide-react";

const API = "https://cpmmarker.onrender.com";

type Car = {
  id: number;
  brand: string;
  name: string;
  price: number;
  image_url: string;
  dvigatel?: string;
  power?: string;
  speed?: string;
  type?: string;
};

const TYPE_CFG = {
  premium: { color: "#FF3D00", label: "S-CLASS", Icon: Crown },
  coin:    { color: "#00E5FF", label: "COIN",    Icon: Coins },
  default: { color: "#888888", label: "STOCK",   Icon: Flag },
} as const;

const blank = { brand: "", name: "", price: "", image_url: "", dvigatel: "", power: "", speed: "", type: "default" };

/* ─── field ─── */
function Field({
  label, value, onChange, placeholder = "", type = "text", span2 = false,
}: {
  label: string; value?: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; span2?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={span2 ? "col-span-2" : ""}>
      <p className="font-black uppercase tracking-[0.22em] mb-1.5" style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
        {label}
      </p>
      <div
        className="flex items-center px-3 transition-all duration-200"
        style={{
          height: 42,
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
          className="flex-1 bg-transparent border-none focus:outline-none font-bold"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.82)", caretColor: "#FF3D00" }}
        />
      </div>
    </div>
  );
}

/* ─── select ─── */
function TypeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <p className="font-black uppercase tracking-[0.22em] mb-1.5" style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
        Type
      </p>
      <div
        className="relative transition-all duration-200"
        style={{
          height: 42,
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${focused ? "#FF3D0055" : "rgba(255,255,255,0.07)"}`,
          borderRadius: 2,
        }}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="absolute inset-0 w-full bg-transparent border-none focus:outline-none font-black uppercase tracking-widest appearance-none px-3"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", cursor: "pointer" }}
        >
          <option value="default" style={{ background: "#0D0D0F" }}>Default</option>
          <option value="coin"    style={{ background: "#0D0D0F" }}>Coin</option>
          <option value="premium" style={{ background: "#0D0D0F" }}>Premium</option>
        </select>
      </div>
    </div>
  );
}

/* ════════════════════════════════════ */
export default function AdminCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [form, setForm] = useState(blank);

  const token = localStorage.getItem("token");

  const loadCars = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/cars`, { headers: { Authorization: `Bearer ${token || ""}` } });
      const data = await res.json();
      setCars(Array.isArray(data) ? data : []);
    } catch { setCars([]); }
    setLoading(false);
  };

  useEffect(() => { loadCars(); }, []);

  const openCreate = () => { setEditingCar(null); setForm(blank); setModalOpen(true); };
  const openEdit = (car: Car) => {
    setEditingCar(car);
    setForm({ brand: car.brand, name: car.name, price: String(car.price), image_url: car.image_url, dvigatel: car.dvigatel || "", power: car.power || "", speed: car.speed || "", type: car.type || "default" });
    setModalOpen(true);
  };

  const saveCar = async () => {
    const url = editingCar ? `${API}/admin/cars/${editingCar.id}` : `${API}/admin/cars`;
    const res = await fetch(url, {
      method: editingCar ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    if (!res.ok) { const d = await res.json(); alert(d?.error || "Error"); return; }
    setModalOpen(false); loadCars();
  };

  const deleteCar = async (id: number) => {
    if (!confirm("Delete this vehicle?")) return;
    const res = await fetch(`${API}/admin/cars/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token || ""}` } });
    if (res.ok) loadCars();
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
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-5" style={{ background: "#FF3D0060" }} />
            <span className="font-black uppercase tracking-[0.35em]" style={{ fontSize: 8, color: "#FF3D0080" }}>
              Admin Panel
            </span>
          </div>
          <h1 className="font-black italic uppercase tracking-tighter leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>FLEET</span>
            {" "}
            <span style={{ color: "#FF3D00", textShadow: "0 0 24px #FF3D0066" }}>CONTROL</span>
          </h1>
          <p className="font-bold mt-1" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
            Manage vehicle inventory and specifications
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest"
          style={{
            fontSize: 10,
            background: "#FF3D00",
            color: "#000",
            clipPath: "polygon(0 0, 94% 0, 100% 35%, 100% 100%, 6% 100%, 0 65%)",
          }}
        >
          <Plus size={13} />
          Add Vehicle
        </motion.button>
      </div>

      {/* GRID */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {cars.map((c, i) => {
            const tok = TYPE_CFG[(c.type as keyof typeof TYPE_CFG) || "default"] ?? TYPE_CFG.default;
            const TypeIcon = tok.Icon;

            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden transition-colors duration-250"
                style={{
                  background: "#0D0D0F",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 2,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = tok.color + "30"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                {/* top accent */}
                <div
                  className="absolute top-0 inset-x-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${tok.color}, transparent)` }}
                />

                {/* IMAGE */}
                <div className="relative overflow-hidden" style={{ height: 172 }}>
                  {/* scanline */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-[0.15]"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 z-10" style={{ background: "linear-gradient(to top, #0D0D0F, transparent)" }} />

                  {c.image_url
                    ? <img src={c.image_url} alt={c.name} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" style={{ filter: "contrast(1.08) saturate(0.8)" }} />
                    : <div className="w-full h-full flex items-center justify-center" style={{ background: "#0a0a0b" }}><CarIcon size={40} style={{ color: "rgba(255,255,255,0.05)" }} /></div>
                  }

                  {/* type badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <div
                      className="flex items-center gap-1 px-2 py-[5px] font-black uppercase tracking-[0.18em]"
                      style={{ fontSize: 8, background: tok.color + "20", border: `1px solid ${tok.color}50`, color: tok.color, clipPath: "polygon(0 0, 100% 0, 94% 100%, 0 100%)" }}
                    >
                      <TypeIcon size={9} />
                      {tok.label}
                    </div>
                  </div>
                </div>

                {/* INFO */}
                <div className="p-4">
                  <p className="font-bold uppercase tracking-[0.18em] truncate" style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}>{c.brand}</p>
                  <h3 className="font-black italic uppercase tracking-tight truncate mb-1" style={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }}>{c.name}</h3>

                  <span className="font-black italic" style={{ fontSize: 20, color: tok.color, textShadow: `0 0 14px ${tok.color}44` }}>
                    {c.price.toLocaleString()}
                  </span>

                  {/* specs */}
                  <div className="grid grid-cols-2 gap-1.5 mt-3 mb-4">
                    {[
                      { icon: Zap,   val: c.dvigatel || "N/A", label: "Engine" },
                      { icon: Gauge, val: c.power || "N/A",    label: "Power" },
                    ].map(({ icon: Icon, val, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-1.5 px-2.5 py-1.5"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}
                      >
                        <Icon size={10} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        <span className="font-bold truncate" style={{ fontSize: 9, color: "rgba(255,255,255,0.45)" }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 font-black uppercase tracking-widest transition-all duration-200"
                      style={{
                        fontSize: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.4)",
                        clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                      }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#FF3D0015"; el.style.borderColor = "#FF3D0040"; el.style.color = "#FF3D00"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.color = "rgba(255,255,255,0.4)"; }}
                    >
                      <Pencil size={10} /> Edit
                    </button>
                    <button
                      onClick={() => deleteCar(c.id)}
                      className="w-9 flex items-center justify-center transition-all duration-200"
                      style={{
                        background: "rgba(255,61,0,0.06)", border: "1px solid rgba(255,61,0,0.2)", color: "#FF3D0070",
                        clipPath: "polygon(0 0, 80% 0, 100% 35%, 100% 100%, 20% 100%, 0 65%)",
                      }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "#FF3D0022"; el.style.borderColor = "#FF3D0055"; el.style.color = "#FF3D00"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = "rgba(255,61,0,0.06)"; el.style.borderColor = "rgba(255,61,0,0.2)"; el.style.color = "#FF3D0070"; }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg flex flex-col overflow-hidden"
              style={{
                background: "#0D0D0F",
                border: "1px solid #FF3D0035",
                borderRadius: 2,
                maxHeight: "90vh",
              }}
            >
              <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />

              {/* modal header */}
              <div className="flex items-center justify-between px-6 py-5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ background: "#FF3D0018", border: "1px solid #FF3D0040", clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)" }}
                  >
                    {editingCar ? <Pencil size={13} style={{ color: "#FF3D00" }} /> : <Plus size={13} style={{ color: "#FF3D00" }} />}
                  </div>
                  <div>
                    <h2 className="font-black italic uppercase tracking-tighter" style={{ fontSize: 18 }}>
                      {editingCar ? "Edit" : "New"}{" "}
                      <span style={{ color: "#FF3D00" }}>Vehicle</span>
                    </h2>
                    <p className="font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>
                      Fleet Management
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
              <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#FF3D0030 transparent" }}>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Brand"      value={form.brand}     onChange={(v) => setForm({ ...form, brand: v })} />
                  <Field label="Model Name" value={form.name}      onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Price"      value={form.price}     onChange={(v) => setForm({ ...form, price: v })} type="number" />
                  <TypeSelect value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
                  <Field label="Image URL"  value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} span2 />
                </div>

                {/* specs row */}
                <div>
                  <p className="font-black uppercase tracking-[0.22em] mb-2" style={{ fontSize: 8, color: "rgba(255,255,255,0.18)" }}>
                    Specifications
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { label: "Engine", key: "dvigatel" as const },
                      { label: "Power",  key: "power"    as const },
                      { label: "Speed",  key: "speed"    as const },
                    ].map(({ label, key }) => (
                      <Field key={key} label={label} value={form[key]} onChange={(v) => setForm({ ...form, [key]: v })} />
                    ))}
                  </div>
                </div>

                {/* image preview */}
                {form.image_url && (
                  <div className="relative overflow-hidden" style={{ height: 120, background: "#0a0a0b", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
                    <img src={form.image_url} className="w-full h-full object-cover opacity-60" style={{ filter: "contrast(1.08)" }} />
                    <div className="absolute inset-x-0 bottom-0 h-10" style={{ background: "linear-gradient(to top, #0D0D0F, transparent)" }} />
                    <p className="absolute bottom-2 left-3 font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.3)" }}>
                      Preview
                    </p>
                  </div>
                )}
              </div>

              {/* footer */}
              <div className="flex gap-3 px-6 py-4 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={saveCar}
                  className="flex-[2] flex items-center justify-center gap-2 py-3 font-black uppercase tracking-widest"
                  style={{ fontSize: 10, background: "#FF3D00", color: "#000", clipPath: "polygon(0 0, 97% 0, 100% 35%, 100% 100%, 3% 100%, 0 65%)" }}
                >
                  <Save size={13} />
                  {editingCar ? "Save Changes" : "Confirm & Add"}
                </motion.button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    fontSize: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.35)", clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
