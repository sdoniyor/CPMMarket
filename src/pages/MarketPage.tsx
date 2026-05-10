
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Car as CarIcon, Gauge, Zap, Star, Filter } from "lucide-react";

// const API = "https://cpmmarker.onrender.com";

// type Car = {
//   id: number;
//   name: string;
//   brand: string;
//   price: number;
//   image_url: string;
//   type: "premium" | "coin" | "default";
//   discount_price?: number | null;
//   promo_active?: boolean;
// };

// export default function Market() {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeFilter, setActiveFilter] = useState<string>("all");
//   const nav = useNavigate();

//   useEffect(() => {
//     const loadCars = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) { nav("/login"); return; }

//         const res = await fetch(`${API}/market/cars`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.status === 401) {
//           localStorage.removeItem("token");
//           nav("/login");
//           return;
//         }

//         const data = await res.json();
//         if (!Array.isArray(data)) throw new Error("Invalid data format");
//         setCars(data);
//       } catch (err: any) {
//         setError(err.message || "Loading error");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCars();
//   }, [nav]);

//   const filteredCars = activeFilter === "all" 
//     ? cars 
//     : cars.filter(car => car.type === activeFilter);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//           className="mb-4"
//         >
//           <Gauge size={48} className="text-yellow-400" />
//         </motion.div>
//         <span className="text-sm font-black uppercase tracking-[0.3em] animate-pulse">Warming up engines...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#08090a] text-white pb-20 pt-24 font-sans">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//           <div>
//             <motion.h1 
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-5xl font-[900] italic tracking-tighter uppercase mb-2"
//             >
//               Showroom <span className="text-yellow-400">Available</span>
//             </motion.h1>
//             <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
//               Exclusive fleet for CPM players
//             </p>
//           </div>

//           {/* FILTERS */}
//           <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
//             {["all", "premium", "coin", "default"].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setActiveFilter(f)}
//                 className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
//                   activeFilter === f ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20" : "text-white/40 hover:text-white"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ERROR STATE */}
//         {error && (
//           <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl text-center mb-10">
//             <p className="text-red-400 font-bold uppercase tracking-tighter">{error}</p>
//           </div>
//         )}

//         {/* CARS GRID */}
//         <AnimatePresence mode="popLayout">
//           <motion.div 
//             layout
//             className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//           >
//             {filteredCars.map((car) => {
//               const currentPrice = car.discount_price ?? car.price;
//               const hasDiscount = car.discount_price && car.discount_price < car.price;

//               return (
//                 <motion.div
//                   layout
//                   key={car.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   whileHover={{ y: -10 }}
//                   onClick={() => nav(`/car/${car.id}`)}
//                   className="group relative bg-[#111214] border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all"
//                 >
//                   {/* IMAGE CONTAINER */}
//                   <div className="relative h-56 bg-black flex items-center justify-center overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#111214] to-transparent z-10 opacity-60" />
                    
//                     {car.image_url ? (
//                       <img
//                         src={car.image_url}
//                         alt={car.name}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
//                       />
//                     ) : (
//                       <CarIcon size={64} className="text-white/5" />
//                     )}

//                     {/* BADGES */}
//                     <div className="absolute top-4 inset-x-4 flex justify-between items-start z-20">
//                       {car.promo_active && (
//                         <div className="bg-green-500 text-black text-[9px] font-[900] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg shadow-green-500/20 uppercase tracking-tighter">
//                           <Zap size={10} fill="currentColor" /> Promo
//                         </div>
//                       )}
//                       {hasDiscount && (
//                         <div className="bg-yellow-400 text-black text-[9px] font-[900] px-3 py-1.5 rounded-lg ml-auto shadow-lg shadow-yellow-400/20 uppercase tracking-tighter">
//                           Sale
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* INFO SECTION */}
//                   <div className="p-6 relative">
//                     <div className="flex justify-between items-start mb-1">
//                       <div>
//                         <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none group-hover:text-yellow-400 transition-colors">
//                           {car.brand}
//                         </h3>
//                         <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{car.name}</p>
//                       </div>
//                       <div className="text-yellow-400/20 group-hover:text-yellow-400 transition-colors">
//                         <Star size={20} fill={car.type === 'premium' ? "currentColor" : "none"} />
//                       </div>
//                     </div>

//                     <div className="flex items-end justify-between mt-6">
//                       <div className="flex flex-col">
//                         {hasDiscount && (
//                           <span className="text-white/20 line-through text-[10px] font-bold tracking-widest leading-none mb-1">
//                             ${car.price.toLocaleString()}
//                           </span>
//                         )}
//                         <span className="text-3xl font-[900] text-yellow-400 tracking-tighter leading-none italic">
//                           ${currentPrice.toLocaleString()}
//                         </span>
//                       </div>
                      
//                       <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
//                         <Zap size={18} />
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Тонкая линия типа внизу */}
//                   <div className={`h-1.5 w-full absolute bottom-0 ${
//                     car.type === 'premium' ? 'bg-gradient-to-r from-yellow-400 to-amber-600' :
//                     car.type === 'coin' ? 'bg-gradient-to-r from-blue-400 to-indigo-600' : 'bg-white/10'
//                   }`} />
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </AnimatePresence>

//         {/* EMPTY STATE */}
//         {!loading && filteredCars.length === 0 && (
//           <div className="py-32 text-center">
//             <CarIcon size={64} className="mx-auto text-white/5 mb-4" />
//             <p className="text-white/30 font-bold uppercase tracking-[0.2em]">No cars found in this class</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Car as CarIcon, Gauge, Zap, Star } from "lucide-react";

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

const CarCard = React.memo(
  ({ car, onOpen }: { car: Car; onOpen: (id: number) => void }) => {
    const currentPrice = car.discount_price ?? car.price;
    const hasDiscount =
      !!car.discount_price && car.discount_price < car.price;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.2 }}
        onClick={() => onOpen(car.id)}
        className="group relative bg-[#111214] border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all transform-gpu"
        style={{ willChange: "transform" }}
      >
        {/* IMAGE */}
        <div className="relative h-56 bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#111214] to-transparent z-10 opacity-60" />

          {car.image_url ? (
            <img
              loading="lazy"
              decoding="async"
              src={car.image_url}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100 transform-gpu"
              style={{ willChange: "transform" }}
            />
          ) : (
            <CarIcon size={64} className="text-white/5" />
          )}

          {/* BADGES */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-start z-20">
            {car.promo_active && (
              <div className="bg-green-500 text-black text-[9px] font-[900] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg shadow-green-500/20 uppercase tracking-tighter">
                <Zap size={10} fill="currentColor" />
                Promo
              </div>
            )}

            {hasDiscount && (
              <div className="bg-yellow-400 text-black text-[9px] font-[900] px-3 py-1.5 rounded-lg ml-auto shadow-lg shadow-yellow-400/20 uppercase tracking-tighter">
                Sale
              </div>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none group-hover:text-yellow-400 transition-colors">
                {car.brand}
              </h3>

              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {car.name}
              </p>
            </div>

            <div className="text-yellow-400/20 group-hover:text-yellow-400 transition-colors">
              <Star
                size={20}
                fill={car.type === "premium" ? "currentColor" : "none"}
              />
            </div>
          </div>

          <div className="flex items-end justify-between mt-6">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-white/20 line-through text-[10px] font-bold tracking-widest leading-none mb-1">
                  ${car.price.toLocaleString()}
                </span>
              )}

              <span className="text-3xl font-[900] text-yellow-400 tracking-tighter leading-none italic">
                ${currentPrice.toLocaleString()}
              </span>
            </div>

            <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
              <Zap size={18} />
            </div>
          </div>
        </div>

        {/* LINE */}
        <div
          className={`h-1.5 w-full absolute bottom-0 ${
            car.type === "premium"
              ? "bg-gradient-to-r from-yellow-400 to-amber-600"
              : car.type === "coin"
              ? "bg-gradient-to-r from-blue-400 to-indigo-600"
              : "bg-white/10"
          }`}
        />
      </motion.div>
    );
  }
);

export default function Market() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;

    const loadCars = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          nav("/login");
          return;
        }

        const res = await fetch(`${API}/market/cars`, {
          headers: {
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
          throw new Error("Invalid data format");
        }

        if (mounted) setCars(data);
      } catch (err: any) {
        if (mounted) setError(err.message || "Loading error");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadCars();

    return () => {
      mounted = false;
    };
  }, [nav]);

  const filteredCars = useMemo(() => {
    if (activeFilter === "all") return cars;
    return cars.filter((car) => car.type === activeFilter);
  }, [cars, activeFilter]);

  const openCar = (id: number) => nav(`/car/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="mb-4"
        >
          <Gauge size={48} className="text-yellow-400" />
        </motion.div>

        <span className="text-sm font-black uppercase tracking-[0.3em] animate-pulse">
          Warming up engines...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090a] text-white pb-20 pt-24 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-5xl font-[900] italic tracking-tighter uppercase mb-2"
            >
              Showroom <span className="text-yellow-400">Available</span>
            </motion.h1>

            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
              Exclusive fleet for CPM players
            </p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
            {["all", "premium", "coin", "default"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === f
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl text-center mb-10">
            <p className="text-red-400 font-bold uppercase tracking-tighter">
              {error}
            </p>
          </div>
        )}

        {/* GRID */}
        <AnimatePresence>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onOpen={openCar}
              />
            ))}
          </div>
        </AnimatePresence>

        {!loading && filteredCars.length === 0 && (
          <div className="py-32 text-center">
            <CarIcon size={64} className="mx-auto text-white/5 mb-4" />
            <p className="text-white/30 font-bold uppercase tracking-[0.2em]">
              No cars found in this class
            </p>
          </div>
        )}
      </div>
    </div>
  );
}