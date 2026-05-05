
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API = "https://cpmmarker.onrender.com";

// type Car = {
//   id: number;
//   name: string;
//   brand: string;
//   price: number;
//   image_url: string;
//   type: "premium" | "coin" | "default";
//   final_price?: number;
//   promo_active?: boolean;
// };

// export default function Market() {
//   const [cars, setCars] = useState<Car[]>([]);
//   const nav = useNavigate();

//   useEffect(() => {
//     const load = async () => {
//       const res = await fetch(`${API}/market/cars`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setCars(await res.json());
//     };

//     load();
//   }, []);

//   return (
//     <div className="p-6 text-white bg-black min-h-screen">
//       <div className="grid grid-cols-3 gap-4">

//         {cars.map((car) => (
//           <div
//             key={car.id}
//             onClick={() => nav(`/car/${car.id}`)}
//             className="bg-[#111] p-4 rounded cursor-pointer"
//           >
//             <img src={car.image_url} />

//             <div>{car.brand} {car.name}</div>

//             <div>
//               {car.promo_active && (
//                 <span className="line-through text-gray-400 mr-2">
//                   ${car.price}
//                 </span>
//               )}

//               <span className="text-green-400">
//                 ${car.final_price ?? car.price}
//               </span>
//             </div>

//             <div className="text-xs text-gray-400">
//               Type: {car.type}
//             </div>

//             {car.promo_active && (
//               <div className="text-yellow-400 text-sm">
//                 🔥 PROMO ACTIVE
//               </div>
//             )}
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://cpmmarker.onrender.com";

type Car = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image_url: string;
  type: "premium" | "coin" | "default";
  final_price?: number;
  promo_active?: boolean;
};

export default function Market() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        // если токена нет → логин
        if (!token) {
          nav("/login");
          return;
        }

        const res = await fetch(`${API}/market/cars`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // debug
        console.log("TOKEN:", token);
        console.log("STATUS:", res.status);

        if (res.status === 401) {
          localStorage.removeItem("token");
          nav("/login");
          return;
        }

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || `HTTP ${res.status}`);
        }

        const data = await res.json();

        console.log("CARS DATA:", data);

        if (!Array.isArray(data)) {
          console.error("Wrong API format:", data);
          throw new Error("API вернул не массив");
        }

        setCars(data);
      } catch (err: any) {
        console.error("LOAD ERROR:", err);
        setError(err.message || "Ошибка загрузки");
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [nav]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        🚘 Загрузка рынка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <div className="text-red-400 text-2xl font-bold mb-2">Ошибка</div>
          <div className="text-zinc-300">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">🚘 Car Market</h1>
        <p className="text-zinc-400 mb-10">
          Выберите автомобиль
        </p>

        {cars.length === 0 ? (
          <div className="text-center text-zinc-500 text-lg py-20">
            Машин пока нет
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((car) => (
              <div
                key={car.id}
                onClick={() => nav(`/car/${car.id}`)}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-green-400 transition hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10"
              >
                <div className="relative h-56 bg-zinc-950 flex items-center justify-center overflow-hidden">
                  {car.image_url ? (
                    <img
                      src={car.image_url}
                      alt={car.name}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="text-zinc-600 text-lg font-semibold">
                      🚘 No Image
                    </div>
                  )}

                  {car.promo_active && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                      🔥 SALE
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="text-lg font-bold">
                    {car.brand} {car.name}
                  </div>

                  <div className="text-sm text-zinc-500 mt-1 capitalize">
                    {car.type}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {car.promo_active && (
                      <span className="line-through text-zinc-500">
                        ${car.price}
                      </span>
                    )}

                    <span className="text-2xl font-bold text-green-400">
                      ${car.final_price ?? car.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}