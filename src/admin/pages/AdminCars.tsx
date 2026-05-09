
// import { useEffect, useState } from "react";

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

//   /* ================= LOAD ================= */
//   const loadCars = async () => {
//     setLoading(true);

//     const res = await fetch(`${API}/admin/cars`, {
//       headers: {
//         Authorization: `Bearer ${token || ""}`,
//       },
//     });

//     const data = await res.json();

//     if (Array.isArray(data)) {
//       setCars(data);
//     } else {
//       console.log("ADMIN ERROR:", data);
//       setCars([]);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   /* ================= OPEN CREATE ================= */
//   const openCreate = () => {
//     setEditingCar(null);
//     setForm({
//       brand: "",
//       name: "",
//       price: "",
//       image_url: "",
//       dvigatel: "",
//       power: "",
//       speed: "",
//       type: "default",
//     });
//     setModalOpen(true);
//   };

//   /* ================= OPEN EDIT ================= */
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

//   /* ================= SAVE ================= */
//   const saveCar = async () => {
//     const url = editingCar
//       ? `${API}/admin/cars/${editingCar.id}`
//       : `${API}/admin/cars`;

//     const method = editingCar ? "PUT" : "POST";

//     const res = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token || ""}`,
//       },
//       body: JSON.stringify({
//         ...form,
//         price: Number(form.price),
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data?.error || "Error");
//       return;
//     }

//     setModalOpen(false);
//     loadCars();
//   };

//   /* ================= DELETE ================= */
//   const deleteCar = async (id: number) => {
//     if (!confirm("Delete car?")) return;

//     const res = await fetch(`${API}/admin/cars/${id}`, {
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

//     loadCars();
//   };

//   if (loading) {
//     return <div className="text-white p-6">Loading cars...</div>;
//   }

//   return (
//     <div className="p-6 text-white">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Cars</h1>

//         <button
//           onClick={openCreate}
//           className="bg-green-500 px-4 py-2 rounded-xl font-bold"
//         >
//           + Add Car
//         </button>
//       </div>

//       {/* GRID */}
//       <div className="grid md:grid-cols-3 gap-4">
//         {cars.map((c) => (
//           <div key={c.id} className="bg-zinc-900 p-4 rounded-xl">

//             <img
//               src={c.image_url}
//               className="h-32 w-full object-cover rounded-lg"
//             />

//             <div className="font-bold mt-2">
//               {c.brand} {c.name}
//             </div>

//             <div className="text-yellow-400">
//               ${c.price}
//             </div>

//             <div className="text-xs text-white/50">
//               Type: {c.type}
//             </div>

//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => openEdit(c)}
//                 className="bg-blue-500 px-3 py-1 rounded-lg text-sm"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteCar(c.id)}
//                 className="bg-red-500 px-3 py-1 rounded-lg text-sm"
//               >
//                 Delete
//               </button>
//             </div>

//           </div>
//         ))}
//       </div>

//       {/* ================= MODAL ================= */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

//           <div className="bg-zinc-900 p-6 rounded-2xl w-[420px] space-y-2">

//             <h2 className="text-xl font-bold">
//               {editingCar ? "Edit Car" : "Add Car"}
//             </h2>

//             <input placeholder="Brand" value={form.brand}
//               onChange={e => setForm({ ...form, brand: e.target.value })}
//               className="w-full p-2 bg-black rounded" />

//             <input placeholder="Name" value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//               className="w-full p-2 bg-black rounded" />

//             <input placeholder="Price" type="number" value={form.price}
//               onChange={e => setForm({ ...form, price: e.target.value })}
//               className="w-full p-2 bg-black rounded" />

//             <input placeholder="Image URL" value={form.image_url}
//               onChange={e => setForm({ ...form, image_url: e.target.value })}
//               className="w-full p-2 bg-black rounded" />

//             <input placeholder="Engine" value={form.dvigatel}
//               onChange={e => setForm({ ...form, dvigatel: e.target.value })}
//               className="w-full p-2 bg-black rounded" />

//             <input placeholder="Power" value={form.power}
//               onChange={e => setForm({ ...form, power: e.target.value })}
//               className="w-full p-2 bg-black rounded" />

//             <input placeholder="Speed" value={form.speed}
//               onChange={e => setForm({ ...form, speed: e.target.value })}
//               className="w-full p-2 bg-black rounded" />

//             {/* TYPE */}
//             <select
//               value={form.type}
//               onChange={e => setForm({ ...form, type: e.target.value })}
//               className="w-full p-2 bg-black rounded"
//             >
//               <option value="default">Default</option>
//               <option value="coin">Coin</option>
//               <option value="premium">Premium</option>
//             </select>

//             <div className="flex gap-2 mt-3">

//               <button
//                 onClick={saveCar}
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

export default function AdminCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    brand: "",
    name: "",
    price: "",
    image_url: "",
    dvigatel: "",
    power: "",
    speed: "",
    type: "default",
  });

  const loadCars = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/cars`, {
        headers: { Authorization: `Bearer ${token || ""}` },
      });
      const data = await res.json();
      setCars(Array.isArray(data) ? data : []);
    } catch (e) {
      setCars([]);
    }
    setLoading(false);
  };

  useEffect(() => { loadCars(); }, []);

  const openCreate = () => {
    setEditingCar(null);
    setForm({ brand: "", name: "", price: "", image_url: "", dvigatel: "", power: "", speed: "", type: "default" });
    setModalOpen(true);
  };

  const openEdit = (car: Car) => {
    setEditingCar(car);
    setForm({
      brand: car.brand,
      name: car.name,
      price: String(car.price),
      image_url: car.image_url,
      dvigatel: car.dvigatel || "",
      power: car.power || "",
      speed: car.speed || "",
      type: car.type || "default",
    });
    setModalOpen(true);
  };

  const saveCar = async () => {
    const url = editingCar ? `${API}/admin/cars/${editingCar.id}` : `${API}/admin/cars`;
    const method = editingCar ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data?.error || "Error");
      return;
    }
    setModalOpen(false);
    loadCars();
  };

  const deleteCar = async (id: number) => {
    if (!confirm("Are you sure you want to delete this beast?")) return;
    const res = await fetch(`${API}/admin/cars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token || ""}` },
    });
    if (res.ok) loadCars();
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full" 
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">FLEET <span className="text-yellow-500">CONTROL</span></h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your vehicle inventory and specifications</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openCreate}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-colors"
        >
          + Add New Car
        </motion.button>
      </div>

      {/* GRID */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {cars.map((c, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              key={c.id}
              className="group bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={c.image_url}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  {c.type}
                </div>
              </div>

              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{c.brand}</h3>
                  <p className="text-xl font-bold text-white tracking-tight">{c.name}</p>
                  <p className="text-yellow-500 font-mono font-bold mt-1">${c.price.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-5 text-[10px] text-zinc-400 uppercase font-semibold">
                    <div className="bg-white/5 p-2 rounded-lg">⚙️ {c.dvigatel || 'N/A'}</div>
                    <div className="bg-white/5 p-2 rounded-lg">⚡ {c.power || 'N/A'}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(c)}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCar(c.id)}
                    className="w-12 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2.5 rounded-xl text-xs flex items-center justify-center transition-all"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-zinc-950 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden"
            >
              {/* Декор модалки */}
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
              
              <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
                {editingCar ? "Edit Vehicle" : "New Vehicle"}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Brand</label>
                    <input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}
                        className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors" />
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Model Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors" />
                </div>
                <div className="space-y-1 col-span-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Image Direct URL</label>
                    <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })}
                        className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors" />
                </div>
                <div className="space-y-1 col-span-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Price ($)</label>
                    <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                        className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors" />
                </div>
                <div className="space-y-1 col-span-1">
                    <label className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Type</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                        className="w-full p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:border-yellow-500/50 outline-none transition-colors appearance-none">
                        <option value="default">Default</option>
                        <option value="coin">Coin</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>
                
                <div className="col-span-2 grid grid-cols-3 gap-3 pt-2">
                    <input placeholder="Engine" value={form.dvigatel} onChange={e => setForm({ ...form, dvigatel: e.target.value })}
                        className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-yellow-500/50" />
                    <input placeholder="HP" value={form.power} onChange={e => setForm({ ...form, power: e.target.value })}
                        className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-yellow-500/50" />
                    <input placeholder="Top Speed" value={form.speed} onChange={e => setForm({ ...form, speed: e.target.value })}
                        className="p-3 bg-zinc-900 border border-white/5 rounded-xl text-xs text-white outline-none focus:border-yellow-500/50" />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={saveCar}
                  className="flex-[2] bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-2xl font-black uppercase tracking-widest transition-colors"
                >
                  Confirm & Save
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-zinc-800 text-white p-4 rounded-2xl font-bold hover:bg-zinc-700 transition-colors"
                >
                  Exit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}