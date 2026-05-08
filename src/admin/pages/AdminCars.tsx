import { useEffect, useState } from "react";

const API = "https://cpmmarker.onrender.com";

export default function AdminCars() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/admin/cars`, {
          headers: {
            Authorization: `Bearer ${token || ""}`,
          },
        });

        const data = await res.json();

        // 🔥 защита от 403 / error
        if (!Array.isArray(data)) {
          console.log("ADMIN ERROR:", data);
          setCars([]);
          return;
        }

        setCars(data);
      } catch (err) {
        console.log("FETCH ERROR:", err);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="text-white p-6">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Cars</h1>

      {cars.length === 0 ? (
        <div className="text-white/50">
          No cars or access denied
        </div>
      ) : (
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

            </div>
          ))}
        </div>
      )}
    </div>
  );
}