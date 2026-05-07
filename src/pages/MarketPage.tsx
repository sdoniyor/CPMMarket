

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
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const nav = useNavigate();

//   useEffect(() => {
//     const loadCars = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const token = localStorage.getItem("token");

//         if (!token) {
//           nav("/login");
//           return;
//         }

//         const res = await fetch(`${API}/market/cars`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("STATUS:", res.status);

//         if (res.status === 401) {
//           localStorage.removeItem("token");
//           nav("/login");
//           return;
//         }

//         const data = await res.json();

//         if (!Array.isArray(data)) {
//           throw new Error("API вернул не массив");
//         }

//         setCars(data);

//       } catch (err: any) {
//         console.log(err);
//         setError(err.message || "Ошибка загрузки");
//         setCars([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCars();
//   }, [nav]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
//         🚘 Loading market...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center px-6">
//         <div className="max-w-md w-full rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center">
//           <div className="text-red-400 text-2xl font-bold mb-2">Error</div>
//           <div className="text-zinc-300">{error}</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6 py-10">
//       <div className="max-w-7xl mx-auto">

//         <h1 className="text-4xl font-bold mb-2">🚘 Car Market</h1>
//         <p className="text-zinc-400 mb-10">Choose your car</p>

//         {cars.length === 0 ? (
//           <div className="text-center text-zinc-500 text-lg py-20">
//             No cars available
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

//             {cars.map((car) => {

//               /* ================= SAFE PRICE ================= */
//               const hasDiscount =
//                 car.final_price !== undefined &&
//                 car.final_price < car.price;

//               const price = hasDiscount
//                 ? car.final_price!
//                 : car.price;

//               return (
//                 <div
//                   key={car.id}
//                   onClick={() => nav(`/car/${car.id}`)}
//                   className="group cursor-pointer rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-green-400 transition hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10"
//                 >

//                   {/* IMAGE */}
//                   <div className="relative h-52 bg-zinc-950 overflow-hidden">
//                     {car.image_url ? (
//                       <img
//                         src={car.image_url}
//                         alt={car.name}
//                         className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-full text-zinc-600">
//                         🚘 No Image
//                       </div>
//                     )}

//                     {/* BADGE */}
//                     {hasDiscount && (
//                       <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
//                         🔥 SALE
//                       </div>
//                     )}
//                   </div>

//                   {/* INFO */}
//                   <div className="p-5">

//                     <div className="text-lg font-bold">
//                       {car.brand} {car.name}
//                     </div>

//                     <div className="text-sm text-zinc-500 capitalize">
//                       {car.type}
//                     </div>

//                     {/* PRICE */}
//                     <div className="mt-4 flex items-center gap-2">

//                       {hasDiscount && (
//                         <span className="line-through text-zinc-500">
//                           ${car.price}
//                         </span>
//                       )}

//                       <span className="text-2xl font-bold text-green-400">
//                         ${price}
//                       </span>

//                     </div>

//                   </div>
//                 </div>
//               );
//             })}

//           </div>
//         )}

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
  discount_price?: number | null;
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

        if (res.status === 401) {
          localStorage.removeItem("token");
          nav("/login");
          return;
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API вернул не массив");
        }

        setCars(data);
      } catch (err: any) {
        console.log(err);
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
        🚘 Loading market...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <div className="text-red-400 text-2xl font-bold mb-2">Error</div>
          <div className="text-zinc-300">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">🚘 Car Market</h1>
        <p className="text-zinc-400 mb-10">Choose your car</p>

        {cars.length === 0 ? (
          <div className="text-center text-zinc-500 text-lg py-20">
            No cars available
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {cars.map((car) => {
              const price = car.discount_price ?? car.price;

              const hasDiscount =
                car.discount_price !== null &&
                car.discount_price !== undefined &&
                car.discount_price < car.price;

              return (
                <div
                  key={car.id}
                  onClick={() => nav(`/car/${car.id}`)}
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-green-400 transition hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10"
                >

                  {/* IMAGE */}
                  <div className="relative h-52 bg-zinc-950 overflow-hidden">

                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-600">
                        🚘 No Image
                      </div>
                    )}

                    {/* PROMO BADGE */}
                    {car.promo_active && (
                      <div className="absolute top-3 left-3 bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                        PROMO
                      </div>
                    )}

                    {/* SALE BADGE */}
                    {hasDiscount && (
                      <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                        🔥 SALE
                      </div>
                    )}

                  </div>

                  {/* INFO */}
                  <div className="p-5">

                    <div className="text-lg font-bold">
                      {car.brand} {car.name}
                    </div>

                    <div className="text-sm text-zinc-500 capitalize">
                      {car.type}
                    </div>

                    {/* PRICE */}
                    <div className="mt-4 flex items-center gap-2">

                      {hasDiscount && (
                        <span className="line-through text-zinc-500">
                          ${car.price}
                        </span>
                      )}

                      <span className="text-2xl font-bold text-green-400">
                        ${price}
                      </span>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}