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

//   const [form, setForm] = useState({
//     brand: "",
//     name: "",
//     price: "",
//     image_url: "",
//   });

//   const token = localStorage.getItem("token");

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
//     setForm({ brand: "", name: "", price: "", image_url: "" });
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
//     });
//     setModalOpen(true);
//   };

//   /* ================= SAVE (CREATE / UPDATE) ================= */
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

//             <div className="text-yellow-400 mb-3">
//               ${c.price}
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-2">

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

//           <div className="bg-zinc-900 p-6 rounded-2xl w-[400px] space-y-3">

//             <h2 className="text-xl font-bold">
//               {editingCar ? "Edit Car" : "Add Car"}
//             </h2>

//             <input
//               placeholder="Brand"
//               value={form.brand}
//               onChange={(e) => setForm({ ...form, brand: e.target.value })}
//               className="w-full p-2 bg-black rounded-lg"
//             />

//             <input
//               placeholder="Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full p-2 bg-black rounded-lg"
//             />

//             <input
//               placeholder="Price"
//               type="number"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//               className="w-full p-2 bg-black rounded-lg"
//             />

//             <input
//               placeholder="Image URL"
//               value={form.image_url}
//               onChange={(e) => setForm({ ...form, image_url: e.target.value })}
//               className="w-full p-2 bg-black rounded-lg"
//             />

//             <div className="flex gap-2 mt-4">

//               <button
//                 onClick={saveCar}
//                 className="bg-green-500 px-4 py-2 rounded-xl font-bold flex-1"
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

  /* ================= LOAD ================= */
  const loadCars = async () => {
    setLoading(true);

    const res = await fetch(`${API}/admin/cars`, {
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setCars(data);
    } else {
      console.log("ADMIN ERROR:", data);
      setCars([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCars();
  }, []);

  /* ================= OPEN CREATE ================= */
  const openCreate = () => {
    setEditingCar(null);
    setForm({
      brand: "",
      name: "",
      price: "",
      image_url: "",
      dvigatel: "",
      power: "",
      speed: "",
      type: "default",
    });
    setModalOpen(true);
  };

  /* ================= OPEN EDIT ================= */
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

  /* ================= SAVE ================= */
  const saveCar = async () => {
    const url = editingCar
      ? `${API}/admin/cars/${editingCar.id}`
      : `${API}/admin/cars`;

    const method = editingCar ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Error");
      return;
    }

    setModalOpen(false);
    loadCars();
  };

  /* ================= DELETE ================= */
  const deleteCar = async (id: number) => {
    if (!confirm("Delete car?")) return;

    const res = await fetch(`${API}/admin/cars/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Error");
      return;
    }

    loadCars();
  };

  if (loading) {
    return <div className="text-white p-6">Loading cars...</div>;
  }

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Cars</h1>

        <button
          onClick={openCreate}
          className="bg-green-500 px-4 py-2 rounded-xl font-bold"
        >
          + Add Car
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {cars.map((c) => (
          <div key={c.id} className="bg-zinc-900 p-4 rounded-xl">

            <img
              src={c.image_url}
              className="h-32 w-full object-cover rounded-lg"
            />

            <div className="font-bold mt-2">
              {c.brand} {c.name}
            </div>

            <div className="text-yellow-400">
              ${c.price}
            </div>

            <div className="text-xs text-white/50">
              Type: {c.type}
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openEdit(c)}
                className="bg-blue-500 px-3 py-1 rounded-lg text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCar(c.id)}
                className="bg-red-500 px-3 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-zinc-900 p-6 rounded-2xl w-[420px] space-y-2">

            <h2 className="text-xl font-bold">
              {editingCar ? "Edit Car" : "Add Car"}
            </h2>

            <input placeholder="Brand" value={form.brand}
              onChange={e => setForm({ ...form, brand: e.target.value })}
              className="w-full p-2 bg-black rounded" />

            <input placeholder="Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 bg-black rounded" />

            <input placeholder="Price" type="number" value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 bg-black rounded" />

            <input placeholder="Image URL" value={form.image_url}
              onChange={e => setForm({ ...form, image_url: e.target.value })}
              className="w-full p-2 bg-black rounded" />

            <input placeholder="Engine" value={form.dvigatel}
              onChange={e => setForm({ ...form, dvigatel: e.target.value })}
              className="w-full p-2 bg-black rounded" />

            <input placeholder="Power" value={form.power}
              onChange={e => setForm({ ...form, power: e.target.value })}
              className="w-full p-2 bg-black rounded" />

            <input placeholder="Speed" value={form.speed}
              onChange={e => setForm({ ...form, speed: e.target.value })}
              className="w-full p-2 bg-black rounded" />

            {/* TYPE */}
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full p-2 bg-black rounded"
            >
              <option value="default">Default</option>
              <option value="coin">Coin</option>
              <option value="premium">Premium</option>
            </select>

            <div className="flex gap-2 mt-3">

              <button
                onClick={saveCar}
                className="bg-green-500 px-4 py-2 rounded-xl flex-1 font-bold"
              >
                Save
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-600 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}