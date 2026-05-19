
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Car as CarIcon, Gauge, Zap, Star } from "lucide-react";

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

// const CarCard = React.memo(
//   ({ car, onOpen }: { car: Car; onOpen: (id: number) => void }) => {
//     const currentPrice = car.discount_price ?? car.price;
//     const hasDiscount =
//       !!car.discount_price && car.discount_price < car.price;

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         whileHover={{ y: -10 }}
//         transition={{ duration: 0.2 }}
//         onClick={() => onOpen(car.id)}
//         className="group relative bg-[#111214] border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all transform-gpu"
//         style={{ willChange: "transform" }}
//       >
//         {/* IMAGE */}
//         <div className="relative h-56 bg-black flex items-center justify-center overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-t from-[#111214] to-transparent z-10 opacity-60" />

//           {car.image_url ? (
//             <img
//               loading="lazy"
//               decoding="async"
//               src={car.image_url}
//               alt={car.name}
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100 transform-gpu"
//               style={{ willChange: "transform" }}
//             />
//           ) : (
//             <CarIcon size={64} className="text-white/5" />
//           )}

//           {/* BADGES */}
//           <div className="absolute top-4 inset-x-4 flex justify-between items-start z-20">
//             {car.promo_active && (
//               <div className="bg-green-500 text-black text-[9px] font-[900] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg shadow-green-500/20 uppercase tracking-tighter">
//                 <Zap size={10} fill="currentColor" />
//                 Promo
//               </div>
//             )}

//             {hasDiscount && (
//               <div className="bg-yellow-400 text-black text-[9px] font-[900] px-3 py-1.5 rounded-lg ml-auto shadow-lg shadow-yellow-400/20 uppercase tracking-tighter">
//                 Sale
//               </div>
//             )}
//           </div>
//         </div>

//         {/* INFO */}
//         <div className="p-6 relative">
//           <div className="flex justify-between items-start mb-1">
//             <div>
//               <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none group-hover:text-yellow-400 transition-colors">
//                 {car.brand}
//               </h3>

//               <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
//                 {car.name}
//               </p>
//             </div>

//             <div className="text-yellow-400/20 group-hover:text-yellow-400 transition-colors">
//               <Star
//                 size={20}
//                 fill={car.type === "premium" ? "currentColor" : "none"}
//               />
//             </div>
//           </div>

//           <div className="flex items-end justify-between mt-6">
//             <div className="flex flex-col">
//               {hasDiscount && (
//                 <span className="text-white/20 line-through text-[10px] font-bold tracking-widest leading-none mb-1">
//                   {car.price.toLocaleString()}
//                 </span>
//               )}

//               <span className="text-3xl font-[900] text-yellow-400 tracking-tighter leading-none italic">
//                 {currentPrice.toLocaleString()}
//               </span>
//             </div>

//             <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
//               <Zap size={18} />
//             </div>
//           </div>
//         </div>

//         {/* LINE */}
//         <div
//           className={`h-1.5 w-full absolute bottom-0 ${
//             car.type === "premium"
//               ? "bg-gradient-to-r from-yellow-400 to-amber-600"
//               : car.type === "coin"
//               ? "bg-gradient-to-r from-blue-400 to-indigo-600"
//               : "bg-white/10"
//           }`}
//         />
//       </motion.div>
//     );
//   }
// );

// export default function Market() {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");

//   const nav = useNavigate();

//   useEffect(() => {
//     let mounted = true;

//     const loadCars = async () => {
//       try {
//         setLoading(true);

//         const token = localStorage.getItem("token");

//         if (!token) {
//           nav("/login");
//           return;
//         }

//         const res = await fetch(`${API}/market/cars`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.status === 401) {
//           localStorage.removeItem("token");
//           nav("/login");
//           return;
//         }

//         const data = await res.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Invalid data format");
//         }

//         if (mounted) setCars(data);
//       } catch (err: any) {
//         if (mounted) setError(err.message || "Loading error");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadCars();

//     return () => {
//       mounted = false;
//     };
//   }, [nav]);

//   const filteredCars = useMemo(() => {
//     if (activeFilter === "all") return cars;
//     return cars.filter((car) => car.type === activeFilter);
//   }, [cars, activeFilter]);

//   const openCar = (id: number) => nav(`/car/${id}`);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{
//             repeat: Infinity,
//             duration: 1,
//             ease: "linear",
//           }}
//           className="mb-4"
//         >
//           <Gauge size={48} className="text-yellow-400" />
//         </motion.div>

//         <span className="text-sm font-black uppercase tracking-[0.3em] animate-pulse">
//           Warming up engines...
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#08090a] text-white pb-20 pt-24 font-sans">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* HEADER */}
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

//           <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
//             {["all", "premium", "coin", "default"].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setActiveFilter(f)}
//                 className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
//                   activeFilter === f
//                     ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20"
//                     : "text-white/40 hover:text-white"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ERROR */}
//         {error && (
//           <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl text-center mb-10">
//             <p className="text-red-400 font-bold uppercase tracking-tighter">
//               {error}
//             </p>
//           </div>
//         )}

//         {/* GRID */}
//         <AnimatePresence>
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filteredCars.map((car) => (
//               <CarCard
//                 key={car.id}
//                 car={car}
//                 onOpen={openCar}
//               />
//             ))}
//           </div>
//         </AnimatePresence>

//         {!loading && filteredCars.length === 0 && (
//           <div className="py-32 text-center">
//             <CarIcon size={64} className="mx-auto text-white/5 mb-4" />
//             <p className="text-white/30 font-bold uppercase tracking-[0.2em]">
//               No cars found in this class
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car as CarIcon,
  Zap,
  Star,
  Flag,
  Flame,
  CircleDot,
  ChevronRight,
  TriangleAlert,
} from "lucide-react";

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

/* ─── per-type design tokens ─── */
const T = {
  premium: { color: "#FF3D00", dim: "#FF3D0028", label: "S-CLASS", Icon: Flame },
  coin:    { color: "#00E5FF", dim: "#00E5FF22", label: "COIN",    Icon: CircleDot },
  default: { color: "#AAAAAA", dim: "#AAAAAA18", label: "STOCK",   Icon: Flag },
} as const;

/* ════════════════════════════════════
   CAR CARD
════════════════════════════════════ */
const CarCard = React.memo(
  ({ car, onOpen, index }: { car: Car; onOpen: (id: number) => void; index: number }) => {
    const price = car.discount_price ?? car.price;
    const hasDiscount = !!car.discount_price && car.discount_price < car.price;
    const tok = T[car.type];
    const TypeIcon = tok.Icon;

    return (
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onOpen(car.id)}
        className="group relative cursor-pointer select-none"
      >
        {/* hover outer glow */}
        <div
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${tok.color}44, transparent 55%)`, borderRadius: 2 }}
        />

        {/* card shell */}
        <div
          className="relative overflow-hidden transition-colors duration-300"
          style={{
            background: "#0D0D0F",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = tok.color + "40";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
          }}
        >
          {/* top accent stripe */}
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, ${tok.color}, ${tok.color}00)` }}
          />

          {/* IMAGE */}
          <div className="relative overflow-hidden" style={{ height: 196 }}>
            {/* scanline texture */}
            <div
              className="absolute inset-0 z-10 opacity-[0.18] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)",
              }}
            />
            {/* bottom fade */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 z-10"
              style={{ background: "linear-gradient(to top, #0D0D0F, transparent)" }}
            />

            {car.image_url ? (
              <img
                loading="lazy"
                decoding="async"
                src={car.image_url}
                alt={car.name}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                style={{ filter: "contrast(1.08) saturate(0.8)" }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <CarIcon size={52} style={{ color: "rgba(255,255,255,0.04)" }} />
              </div>
            )}

            {/* type badge */}
            <div className="absolute top-3 left-3 z-20">
              <div
                className="flex items-center gap-1 px-2.5 py-[5px] text-[9px] font-black uppercase tracking-[0.18em]"
                style={{
                  background: tok.dim,
                  border: `1px solid ${tok.color}50`,
                  color: tok.color,
                  clipPath: "polygon(0 0, 100% 0, 94% 100%, 0 100%)",
                }}
              >
                <TypeIcon size={9} />
                {tok.label}
              </div>
            </div>

            {/* right badges */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 items-end">
              {car.promo_active && (
                <div
                  className="flex items-center gap-1 px-2 py-[5px] text-[8px] font-black uppercase tracking-wider"
                  style={{
                    background: "#00E5FF18",
                    border: "1px solid #00E5FF44",
                    color: "#00E5FF",
                    clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <Zap size={8} fill="currentColor" />
                  PROMO
                </div>
              )}
              {hasDiscount && (
                <div
                  className="px-2 py-[5px] text-[8px] font-black uppercase tracking-wider"
                  style={{
                    background: "#FF3D0018",
                    border: "1px solid #FF3D0044",
                    color: "#FF3D00",
                    clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  SALE
                </div>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="px-4 pt-3 pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <h3
                  className="font-black italic uppercase tracking-tighter leading-none truncate"
                  style={{ fontSize: 21, color: "rgba(255,255,255,0.92)" }}
                >
                  {car.brand}
                </h3>
                <p
                  className="uppercase tracking-[0.16em] truncate mt-0.5"
                  style={{ fontSize: 9, color: "rgba(255,255,255,0.27)", fontWeight: 700 }}
                >
                  {car.name}
                </p>
              </div>
              <Star
                size={14}
                style={{
                  color: car.type === "premium" ? tok.color : "rgba(255,255,255,0.1)",
                  fill: car.type === "premium" ? tok.color : "none",
                  flexShrink: 0,
                  marginTop: 3,
                }}
              />
            </div>

            {/* speed-line divider */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="w-10 h-px" style={{ background: `linear-gradient(90deg, transparent, ${tok.color}70)` }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: tok.color }} />
            </div>

            {/* price + cta */}
            <div className="flex items-end justify-between">
              <div>
                {hasDiscount && (
                  <p
                    className="line-through font-mono leading-none mb-0.5"
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.18)" }}
                  >
                    {car.price.toLocaleString()}
                  </p>
                )}
                <span
                  className="font-black italic tracking-tighter leading-none"
                  style={{ fontSize: 25, color: tok.color, textShadow: `0 0 20px ${tok.color}55` }}
                >
                  {price.toLocaleString()}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1 px-3.5 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-200"
                style={{
                  background: tok.dim,
                  border: `1px solid ${tok.color}38`,
                  color: tok.color,
                  clipPath: "polygon(0 0, 90% 0, 100% 35%, 100% 100%, 10% 100%, 0 65%)",
                }}
              >
                GO <ChevronRight size={11} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

CarCard.displayName = "CarCard";

/* ════════════════════════════════════
   FILTER BUTTON
════════════════════════════════════ */
const FilterBtn = ({
  label, count, active, onClick, color,
}: {
  label: string; count: number; active: boolean; onClick: () => void; color: string;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] transition-all duration-250"
    style={{
      background: active ? `${color}15` : "rgba(255,255,255,0.03)",
      border: `1px solid ${active ? color + "55" : "rgba(255,255,255,0.07)"}`,
      color: active ? color : "rgba(255,255,255,0.3)",
      clipPath: "polygon(0 0, 95% 0, 100% 28%, 100% 100%, 5% 100%, 0 72%)",
    }}
  >
    {label}
    <span style={{ color: active ? color + "aa" : "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>
      {count}
    </span>
  </button>
);

/* ════════════════════════════════════
   PAGE
════════════════════════════════════ */
export default function Market() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) { nav("/login"); return; }
        const res = await fetch(`${API}/market/cars`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) { localStorage.removeItem("token"); nav("/login"); return; }
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid data");
        if (mounted) setCars(data);
      } catch (e: any) {
        if (mounted) setError(e.message || "Load error");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, [nav]);

  const counts = useMemo(() => ({
    all: cars.length,
    premium: cars.filter((c) => c.type === "premium").length,
    coin: cars.filter((c) => c.type === "coin").length,
    default: cars.filter((c) => c.type === "default").length,
  }), [cars]);

  const filtered = useMemo(
    () => (activeFilter === "all" ? cars : cars.filter((c) => c.type === activeFilter)),
    [cars, activeFilter]
  );

  const openCar = (id: number) => nav(`/car/${id}`);

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#080809" }}>
        <div className="relative w-20 h-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid transparent", borderTopColor: "#FF3D00", borderRightColor: "#FF3D0033" }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
            className="absolute inset-3 rounded-full"
            style={{ border: "1px solid #FF3D0044" }}
          />
          <Flame size={20} className="absolute inset-0 m-auto" style={{ color: "#FF3D00" }} />
        </div>
        <p className="font-black uppercase tracking-[0.4em] animate-pulse" style={{ fontSize: 9, color: "rgba(255,255,255,0.22)" }}>
          IGNITING ENGINES
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white pb-24 pt-20"
      style={{ background: "#080809" }}
    >
      {/* background atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 35% at 50% -5%, #FF3D000E 0%, transparent 65%)," +
            "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "auto, 44px 44px, 44px 44px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5">

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <Flag size={11} style={{ color: "#FF3D00" }} />
            <span className="font-black uppercase tracking-[0.42em]" style={{ fontSize: 8, color: "#FF3D0088" }}>
              CPM Racing Market
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #FF3D0030, transparent)" }} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* big title */}
            <div>
              <h1 className="font-black italic uppercase leading-[0.83] tracking-tighter" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
                <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.13)", color: "transparent" }}>
                  SHOW
                </span>
                <br />
                <span style={{ color: "#fff" }}>ROOM</span>
                {"  "}
                <span style={{ color: "#FF3D00", textShadow: "0 0 32px #FF3D0077" }}>///</span>
              </h1>
              <p className="font-bold uppercase tracking-[0.28em] mt-3" style={{ fontSize: 9, color: "rgba(255,255,255,0.18)" }}>
                Exclusive fleet · {cars.length} units on track
              </p>
            </div>

            {/* filters */}
            <div className="flex flex-wrap gap-2">
              {([ 
                { key: "all",     label: "All",    color: "#ffffff" },
                { key: "premium", label: "S-Class", color: T.premium.color },
                { key: "coin",    label: "Coin",   color: T.coin.color },
                { key: "default", label: "Stock",  color: T.default.color },
              ] as const).map((f) => (
                <FilterBtn
                  key={f.key}
                  label={f.label}
                  count={counts[f.key]}
                  active={activeFilter === f.key}
                  onClick={() => setActiveFilter(f.key)}
                  color={f.color}
                />
              ))}
            </div>
          </div>
        </motion.header>

        {/* ERROR */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-3 px-5 py-3.5"
            style={{
              background: "#FF3D000C",
              border: "1px solid #FF3D0030",
              clipPath: "polygon(0 0, 100% 0, 100% 75%, 98% 100%, 0 100%)",
            }}
          >
            <TriangleAlert size={14} style={{ color: "#FF3D00", flexShrink: 0 }} />
            <p className="font-bold uppercase tracking-wider" style={{ fontSize: 10, color: "#FF3D0088" }}>
              {error}
            </p>
          </motion.div>
        )}

        {/* GRID */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filtered.map((car, i) => (
                <CarCard key={car.id} car={car} onOpen={openCar} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 flex flex-col items-center gap-4"
            >
              <CarIcon size={38} style={{ color: "rgba(255,255,255,0.06)" }} />
              <p className="font-black uppercase tracking-[0.3em]" style={{ fontSize: 9, color: "rgba(255,255,255,0.15)" }}>
                No vehicles in this class
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                className="font-black uppercase tracking-widest transition-colors duration-200"
                style={{ fontSize: 9, color: "#FF3D0044" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FF3D00")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#FF3D0044")}
              >
                SHOW ALL →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM STATS */}
        {!loading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-16 pt-6 flex flex-wrap gap-x-10 gap-y-4 justify-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {[
              { label: "Total",   val: cars.length },
              { label: "S-Class", val: counts.premium },
              { label: "On Sale", val: cars.filter((c) => c.discount_price && c.discount_price < c.price).length },
              { label: "Promo",   val: cars.filter((c) => c.promo_active).length },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-black uppercase tracking-[0.28em]" style={{ fontSize: 8, color: "rgba(255,255,255,0.16)" }}>
                  {s.label}
                </p>
                <p className="font-black italic" style={{ fontSize: 27, color: "rgba(255,255,255,0.5)", lineHeight: 1.1 }}>
                  {s.val}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
