import { useEffect, useState } from "react";

const API = "https://cpmmarker.onrender.com";

export default function AdminCars() {
  const [cars, setCars] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/admin/cars`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setCars);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cars</h1>

      <div className="grid md:grid-cols-3 gap-4">

        {cars.map(c => (
          <div key={c.id} className="bg-zinc-900 p-4 rounded-xl">

            <img src={c.image_url} className="h-32 w-full object-cover" />

            <div className="font-bold mt-2">
              {c.brand} {c.name}
            </div>

            <div className="text-yellow-400">
              ${c.price}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}