
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Zap, 
//   Settings, 
//   Disc, 
//   ChevronLeft, 
//   CreditCard, 
//   CheckCircle2, 
//   X 
// } from "lucide-react";
// import Navbar from "../components/Navbar";

// const API = "https://cpmmarker.onrender.com";

// type ConfigItem = {
//   id: number;
//   name: string;
//   price: number;
// };

// type Car = {
//   id: number;
//   brand: string;
//   name: string;
//   price: number;
//   image_url: string;
//   type: "premium" | "coin" | "default";
//   discount_price?: number | null;
//   promo_active?: boolean;
// };

// export default function CarDetail() {
//   const { id } = useParams();
//   const nav = useNavigate();

//   const [car, setCar] = useState<Car | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [configs, setConfigs] = useState({
//     power: [],
//     tuning: [],
//     wheels: []
//   } as {
//     power: ConfigItem[];
//     tuning: ConfigItem[];
//     wheels: ConfigItem[];
//   });

//   const [selectedHp, setSelectedHp] = useState<ConfigItem | null>(null);
//   const [selectedTuning, setSelectedTuning] = useState<ConfigItem | null>(null);
//   const [selectedWheels, setSelectedWheels] = useState<ConfigItem | null>(null);

//   const [showPay, setShowPay] = useState(false);
//   const [password, setPassword] = useState("");
//   const [sending, setSending] = useState(false);
//   const [snapshot, setSnapshot] = useState<any>(null);

//   /* ================= LOAD ================= */
//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) return nav("/login");

//         const headers = { Authorization: `Bearer ${token}` };

//         const [carsRes, cfgRes] = await Promise.all([
//           fetch(`${API}/market/cars`, { headers }),
//           fetch(`${API}/market/configs`, { headers }),
//         ]);

//         const cars = await carsRes.json();
//         const cfg = await cfgRes.json();

//         const found = cars.find((c: Car) => String(c.id) === String(id));

//         setCar(found);

//         setConfigs({
//           power: cfg.power || [],
//           tuning: cfg.tuning || [],
//           wheels: cfg.wheels || [],
//         });

//         setSelectedHp(cfg.power?.[0] || null);
//         setSelectedTuning(cfg.tuning?.[0] || null);
//         setSelectedWheels(cfg.wheels?.[0] || null);

//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [id, nav]);

//   /* ================= PRICE ================= */
//   const basePrice = car?.discount_price ?? car?.price ?? 0;

//   const configPrice =
//     (selectedHp?.price || 0) +
//     (selectedTuning?.price || 0) +
//     (selectedWheels?.price || 0);

//   const totalPrice = basePrice + configPrice;

//   /* ================= TEST IP ================= */
//   // const hpNumber = selectedHp?.name?.match(/\d+/)?.[0] || "0";
//   // const testIp = `test${hpNumber}`;
//   const hpNumber = selectedHp?.name?.match(/\d+/)?.[0] || "0";
//   const testIp = "MA586090";

//   /* ================= OPEN PAY ================= */
//   const openPay = () => {
//     setPassword(Math.floor(1000 + Math.random() * 9000).toString());

//     setSnapshot({
//       car,
//       power: selectedHp,
//       tuning: selectedTuning,
//       wheels: selectedWheels,
//       total: totalPrice,
//       testIp
//     });

//     setShowPay(true);
//   };

//   /* ================= BUY ================= */
//   const buy = async () => {
//     try {
//       setSending(true);
//       const token = localStorage.getItem("token");

//       await fetch(`${API}/telegram/order-to-tg`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           car: snapshot.car,
//           configs: snapshot,
//           total: snapshot.total,
//           password
//         }),
//       });

//       alert("ORDER SENT SUCCESSFULLY!");
//       setShowPay(false);

//     } catch (e) {
//       alert("Error sending order");
//     } finally {
//       setSending(false);
//     }
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
//       <motion.div
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ repeat: Infinity }}
//         className="text-yellow-400 font-black"
//       >
//         INITIALIZING...
//       </motion.div>
//     </div>
//   );

//   if (!car) return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center">
//       Car not found
//     </div>
//   );

//   /* ================= CONFIG BLOCK ================= */
//   const Block = ({ title, items, selected, setSelected, icon: Icon }: any) => (
//     <div className="mt-10">
//       <div className="flex items-center gap-2 mb-4">
//         <Icon size={20} className="text-yellow-400" />
//         <h2 className="text-xl font-black italic uppercase tracking-tighter">{title}</h2>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//         {items.map((i: ConfigItem) => (
//           <button
//             key={i.id}
//             onClick={() => setSelected(i)}
//             className={`relative p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden group ${
//               selected?.id === i.id
//                 ? "border-yellow-400 bg-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.1)]"
//                 : "border-white/5 bg-white/5 hover:bg-white/10"
//             }`}
//           >
//             <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
//               selected?.id === i.id ? "text-yellow-400" : "text-white/40"
//             }`}>
//               Option
//             </div>

//             <div className="text-base font-black italic uppercase tracking-tight">
//               {i.name}
//             </div>

//             <div className="text-yellow-400 font-bold mt-2">
//               +{i.price.toLocaleString()}
//             </div>

//             {selected?.id === i.id && (
//               <motion.div layoutId={title} className="absolute top-2 right-2 text-yellow-400">
//                 <CheckCircle2 size={18} />
//               </motion.div>
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-[#08090a] text-white pb-20">
//       <Navbar />

//       <div className="max-w-6xl mx-auto p-6 pt-24">

//         <button
//           onClick={() => nav(-1)}
//           className="flex items-center gap-2 text-white/40 hover:text-yellow-400 transition-colors mb-6 font-bold uppercase text-xs tracking-widest"
//         >
//           <ChevronLeft size={16} /> Back to market
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//           {/* LEFT */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="sticky top-28"
//             >
//               <div className="relative group rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-2">
//                 <img
//                   src={car.image_url}
//                   alt={car.name}
//                   className="w-full aspect-video object-cover rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-110"
//                 />
//               </div>

//               <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#111214] p-8 rounded-[2.5rem] border border-white/5">
//                 <div>
//                   <h1 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none">
//                     {car.brand} <span className="text-yellow-400">{car.name}</span>
//                   </h1>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-yellow-400 text-4xl font-[900] italic leading-none">
//                     {totalPrice.toLocaleString()}
//                   </div>

//                   <button
//                     onClick={openPay}
//                     className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-4 rounded-2xl font-[900] uppercase tracking-widest text-sm transition-all"
//                   >
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT */}
//           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//             <Block title="Engine Power" items={configs.power} selected={selectedHp} setSelected={setSelectedHp} icon={Zap} />
//             <Block title="Visual Tuning" items={configs.tuning} selected={selectedTuning} setSelected={setSelectedTuning} icon={Settings} />
//             <Block title="Custom Wheels" items={configs.wheels} selected={selectedWheels} setSelected={setSelectedWheels} icon={Disc} />
//           </motion.div>

//         </div>
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {showPay && (
//           <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">

//             <motion.div
//               onClick={() => setShowPay(false)}
//               className="absolute inset-0 bg-black/90 backdrop-blur-sm"
//             />

//             <motion.div className="bg-[#111214] border border-white/10 rounded-[2.5rem] w-full max-w-md p-8 relative">

//               <button onClick={() => setShowPay(false)} className="absolute top-6 right-6">
//                 <X size={24} />
//               </button>

//               <div className="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 mb-8">

//                 <div className="flex justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
//                   <span>Card Number</span>
//                   <span className="text-yellow-400">UZCARD</span>
//                 </div>

//                 <div className="text-lg font-mono text-white/90">
//                   9860 3501 4889 2556
//                 </div>

//                 {/* TEST IP */}
//                 <div className="pt-4 border-t border-white/5 flex justify-between items-center">
//                   <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">
//                     Test IP
//                   </span>
//                   <span className="bg-white/10 px-3 py-1 rounded-lg font-black text-sm text-yellow-400">
//                     {snapshot?.testIp}
//                   </span>
//                 </div>

//                 {/* PASSWORD */}
//                 <div className="pt-4 border-t border-white/5 flex justify-between items-center">
//                   <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">
//                     Order Password
//                   </span>
//                   <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-black text-sm">
//                     {password}
//                   </span>
//                 </div>
//               </div>

//               {/* CONFIG */}
//               <div className="flex justify-between items-center text-xs text-white/60 font-medium">
//                 <span>Configuration</span>
//                 <span>
//                   {snapshot?.power?.name}, {snapshot?.tuning?.name}, {snapshot?.wheels?.name}
//                 </span>
//               </div>

//               <button
//                 onClick={buy}
//                 disabled={sending}
//                 className="w-full mt-6 bg-yellow-400 text-black py-4 rounded-2xl font-[900] uppercase tracking-widest"
//               >
//                 {sending ? "Processing..." : "Confirm Purchase"}
//               </button>

//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Settings,
  Disc,
  ChevronLeft,
  CheckCircle2,
  X,
  Flame,
  Flag,
  CircleDot,
  TriangleAlert,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/Navbar";

const API = "https://cpmmarker.onrender.com";

type ConfigItem = { id: number; name: string; price: number };

type Car = {
  id: number;
  brand: string;
  name: string;
  price: number;
  image_url: string;
  type: "premium" | "coin" | "default";
  discount_price?: number | null;
  promo_active?: boolean;
};

/* ─── per-type tokens (same as Market) ─── */
const T = {
  premium: { color: "#FF3D00", dim: "#FF3D0022", label: "S-CLASS", Icon: Flame },
  coin:    { color: "#00E5FF", dim: "#00E5FF18", label: "COIN",    Icon: CircleDot },
  default: { color: "#AAAAAA", dim: "#AAAAAA14", label: "STOCK",   Icon: Flag },
} as const;

/* ═══════════════════════════════════
   CONFIG OPTION BUTTON
═══════════════════════════════════ */
function OptionBtn({
  item,
  selected,
  accentColor,
  onSelect,
}: {
  item: ConfigItem;
  selected: boolean;
  accentColor: string;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="relative text-left transition-all duration-250 overflow-hidden"
      style={{
        padding: "14px 16px",
        background: selected ? `${accentColor}12` : "rgba(255,255,255,0.03)",
        border: `1px solid ${selected ? accentColor + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 2,
      }}
      onMouseEnter={(e) => {
        if (!selected)
          (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor + "30";
      }}
      onMouseLeave={(e) => {
        if (!selected)
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* top accent line */}
      {selected && (
        <div
          className="absolute top-0 inset-x-0 h-[1.5px]"
          style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        />
      )}

      <div
        className="text-[8px] font-black uppercase tracking-[0.25em] mb-1.5"
        style={{ color: selected ? accentColor : "rgba(255,255,255,0.22)" }}
      >
        Option
      </div>
      <div
        className="font-black italic uppercase tracking-tight leading-none"
        style={{ fontSize: 14, color: selected ? "#fff" : "rgba(255,255,255,0.7)" }}
      >
        {item.name}
      </div>
      <div
        className="font-black italic mt-2"
        style={{ fontSize: 16, color: accentColor }}
      >
        +{item.price.toLocaleString()}
      </div>

      {selected && (
        <CheckCircle2
          size={14}
          className="absolute top-3 right-3"
          style={{ color: accentColor }}
        />
      )}
    </button>
  );
}

/* ═══════════════════════════════════
   CONFIG BLOCK
═══════════════════════════════════ */
function Block({
  title,
  items,
  selected,
  setSelected,
  icon: Icon,
  accentColor,
}: {
  title: string;
  items: ConfigItem[];
  selected: ConfigItem | null;
  setSelected: (i: ConfigItem) => void;
  icon: any;
  accentColor: string;
}) {
  return (
    <div className="mt-10">
      {/* section header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-7 h-7 flex items-center justify-center"
          style={{
            background: accentColor + "18",
            border: `1px solid ${accentColor}40`,
            clipPath: "polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)",
          }}
        >
          <Icon size={13} style={{ color: accentColor }} />
        </div>
        <h2
          className="font-black italic uppercase tracking-tighter"
          style={{ fontSize: 16, color: "rgba(255,255,255,0.85)" }}
        >
          {title}
        </h2>
        {/* ruler line */}
        <div className="flex-1 flex items-center gap-1">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="w-6 h-px" style={{ background: accentColor + "55" }} />
          <div className="w-1 h-1 rotate-45" style={{ background: accentColor + "55" }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {items.map((item) => (
          <OptionBtn
            key={item.id}
            item={item}
            selected={selected?.id === item.id}
            accentColor={accentColor}
            onSelect={() => setSelected(item)}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN
═══════════════════════════════════ */
export default function CarDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [configs, setConfigs] = useState<{
    power: ConfigItem[];
    tuning: ConfigItem[];
    wheels: ConfigItem[];
  }>({ power: [], tuning: [], wheels: [] });

  const [selectedHp, setSelectedHp] = useState<ConfigItem | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<ConfigItem | null>(null);
  const [selectedWheels, setSelectedWheels] = useState<ConfigItem | null>(null);

  const [showPay, setShowPay] = useState(false);
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [snapshot, setSnapshot] = useState<any>(null);
  const [receipt, setReceipt] = useState<File | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return nav("/login");
        const headers = { Authorization: `Bearer ${token}` };

        const [carsRes, cfgRes] = await Promise.all([
          fetch(`${API}/market/cars`, { headers }),
          fetch(`${API}/market/configs`, { headers }),
        ]);
        const cars = await carsRes.json();
        const cfg = await cfgRes.json();
        const found = cars.find((c: Car) => String(c.id) === String(id));
        setCar(found);
        setConfigs({ power: cfg.power || [], tuning: cfg.tuning || [], wheels: cfg.wheels || [] });
        setSelectedHp(cfg.power?.[0] || null);
        setSelectedTuning(cfg.tuning?.[0] || null);
        setSelectedWheels(cfg.wheels?.[0] || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, nav]);

  const basePrice = car?.discount_price ?? car?.price ?? 0;
  const configPrice =
    (selectedHp?.price || 0) + (selectedTuning?.price || 0) + (selectedWheels?.price || 0);
  const totalPrice = basePrice + configPrice;

  const testIp = "MA586090";

  const openPay = () => {
    setPassword(Math.floor(1000 + Math.random() * 9000).toString());
    setSnapshot({ car, power: selectedHp, tuning: selectedTuning, wheels: selectedWheels, total: totalPrice, testIp });
    setShowPay(true);
  };

    const buy = async () => {
    try {
      if (!receipt) {
        return alert("Upload receipt/check image");
      }

      setSending(true);

      const token = localStorage.getItem("token");

      const form = new FormData();

      form.append("receipt", receipt);

      form.append("car", JSON.stringify(snapshot.car));
      form.append("configs", JSON.stringify(snapshot));
      form.append("total", String(snapshot.total));
      form.append("password", password);

      await fetch(`${API}/telegram/order-to-tg`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      alert("ORDER SENT SUCCESSFULLY!");

      setShowPay(false);

      setReceipt(null);

    } catch (e) {
      console.log(e);

      alert("Error sending order");

    } finally {
      setSending(false);
    }
  };

  /* ── LOADING ── */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080809" }}>
        <div className="relative w-20 h-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid transparent", borderTopColor: "#FF3D00", borderRightColor: "#FF3D0033" }}
          />
          <Flame size={20} className="absolute inset-0 m-auto" style={{ color: "#FF3D00" }} />
        </div>
      </div>
    );

  if (!car)
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ background: "#080809" }}>
        <div className="flex items-center gap-3" style={{ color: "rgba(255,255,255,0.3)" }}>
          <TriangleAlert size={20} style={{ color: "#FF3D00" }} />
          <span className="font-black uppercase tracking-widest text-sm">Vehicle not found</span>
        </div>
      </div>
    );

  const tok = T[car.type];
  const TypeIcon = tok.Icon;

  return (
    <div className="min-h-screen text-white pb-24" style={{ background: "#080809" }}>
      {/* background atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            `radial-gradient(ellipse 80% 30% at 50% -5%, ${tok.color}0C 0%, transparent 60%),` +
            "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "auto, 44px 44px, 44px 44px",
        }}
      />

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-24">

        {/* BACK */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => nav(-1)}
          className="flex items-center gap-2 mb-8 font-black uppercase tracking-[0.22em] transition-colors duration-200"
          style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = tok.color)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.25)")}
        >
          <ChevronLeft size={14} />
          Back to market
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ══ LEFT — image + order card ══ */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-28"
            >
              {/* image frame */}
              <div
                className="relative overflow-hidden group"
                style={{
                  border: `1px solid ${tok.color}30`,
                  borderRadius: 2,
                  background: "#0D0D0F",
                }}
              >
                {/* scanline */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none opacity-[0.15]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)",
                  }}
                />
                {/* top color accent */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] z-20"
                  style={{ background: `linear-gradient(90deg, ${tok.color}, transparent)` }}
                />
                {/* type badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div
                    className="flex items-center gap-1.5 px-3 py-[6px] text-[9px] font-black uppercase tracking-[0.2em]"
                    style={{
                      background: tok.dim,
                      border: `1px solid ${tok.color}50`,
                      color: tok.color,
                      clipPath: "polygon(0 0, 100% 0, 94% 100%, 0 100%)",
                    }}
                  >
                    <TypeIcon size={10} />
                    {tok.label}
                  </div>
                </div>
                {/* promo / sale badges */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 items-end">
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
                  {car.discount_price && car.discount_price < car.price && (
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

                <img
                  src={car.image_url}
                  alt={car.name}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: "contrast(1.08) saturate(0.82)" }}
                />
              </div>

              {/* order card */}
              <div
                className="mt-4 p-6 relative overflow-hidden"
                style={{
                  background: "#0D0D0F",
                  border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: 2,
                }}
              >
                {/* left accent bar */}
                <div
                  className="absolute left-0 inset-y-0 w-[2px]"
                  style={{ background: `linear-gradient(to bottom, ${tok.color}, transparent)` }}
                />

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <p
                      className="font-black uppercase tracking-[0.28em] mb-1"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}
                    >
                      Selected vehicle
                    </p>
                    <h1
                      className="font-black italic uppercase tracking-tighter leading-none"
                      style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
                    >
                      {car.brand}{" "}
                      <span style={{ color: tok.color }}>{car.name}</span>
                    </h1>
                  </div>

                  <div className="text-right shrink-0">
                    {car.discount_price && car.discount_price < car.price && (
                      <p
                        className="line-through font-mono mb-0.5"
                        style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}
                      >
                        {car.price.toLocaleString()}
                      </p>
                    )}
                    <div
                      className="font-black italic tracking-tighter leading-none"
                      style={{ fontSize: 36, color: tok.color, textShadow: `0 0 24px ${tok.color}55` }}
                    >
                      {totalPrice.toLocaleString()}
                    </div>
                    {configPrice > 0 && (
                      <p
                        className="font-bold mt-0.5"
                        style={{ fontSize: 9, color: "rgba(255,255,255,0.22)" }}
                      >
                        incl. +{configPrice.toLocaleString()} config
                      </p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openPay}
                      className="mt-4 flex items-center gap-2 px-8 py-3 font-black uppercase tracking-widest transition-all duration-200"
                      style={{
                        background: tok.color,
                        color: "#000",
                        fontSize: 11,
                        clipPath: "polygon(0 0, 92% 0, 100% 30%, 100% 100%, 8% 100%, 0 70%)",
                      }}
                    >
                      Order Now
                      <ChevronRight size={13} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ══ RIGHT — config ══ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Block
              title="Engine Power"
              items={configs.power}
              selected={selectedHp}
              setSelected={setSelectedHp}
              icon={Zap}
              accentColor={tok.color}
            />
            <Block
              title="Visual Tuning"
              items={configs.tuning}
              selected={selectedTuning}
              setSelected={setSelectedTuning}
              icon={Settings}
              accentColor={tok.color}
            />
            <Block
              title="Custom Wheels"
              items={configs.wheels}
              selected={selectedWheels}
              setSelected={setSelectedWheels}
              icon={Disc}
              accentColor={tok.color}
            />
          </motion.div>
        </div>
      </div>

      {/* ══ PAYMENT MODAL ══ */}
      <AnimatePresence>
        {showPay && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPay(false)}
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md overflow-hidden"
              style={{
                background: "#0D0D0F",
                border: `1px solid ${tok.color}35`,
                borderRadius: 2,
              }}
            >
              {/* top accent */}
              <div
                className="absolute top-0 inset-x-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${tok.color}, transparent)` }}
              />

              {/* header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{
                      background: tok.dim,
                      border: `1px solid ${tok.color}44`,
                      clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                    }}
                  >
                    <Zap size={14} style={{ color: tok.color }} />
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest" style={{ fontSize: 11 }}>
                      Confirm Order
                    </p>
                    <p
                      className="font-bold uppercase tracking-widest"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}
                    >
                      {snapshot?.car?.brand} {snapshot?.car?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPay(false)}
                  className="transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-6 py-5 space-y-3">
                {/* card block */}
                <div
                  className="p-4 space-y-4 relative overflow-hidden"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 2,
                  }}
                >
                  {/* RECEIPT UPLOAD */}
                  <div
                    className="p-4 relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 2,
                    }}
                  >
                    {/* scanline */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)",
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="font-black uppercase tracking-[0.22em]"
                          style={{
                            fontSize: 8,
                            color: "rgba(255,255,255,0.25)",
                          }}
                        >
                          Payment Receipt
                        </span>

                        {receipt && (
                          <span
                            className="font-black uppercase tracking-wider"
                            style={{
                              fontSize: 8,
                              color: tok.color,
                            }}
                          >
                            ATTACHED
                          </span>
                        )}
                      </div>

                      <label
                        className="w-full flex items-center justify-center cursor-pointer transition-all duration-200"
                        style={{
                          border: `1px dashed ${tok.color}55`,
                          padding: "18px",
                          background: tok.dim,
                          minHeight: 120,
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                              setReceipt(file);
                            }
                          }}
                        />

                        {!receipt ? (
                          <div className="text-center">
                            <p
                              className="font-black uppercase tracking-widest"
                              style={{
                                fontSize: 10,
                                color: tok.color,
                              }}
                            >
                              Upload Check
                            </p>

                            <p
                              style={{
                                fontSize: 10,
                                color: "rgba(255,255,255,0.35)",
                                marginTop: 5,
                              }}
                            >
                              JPG / PNG / WEBP
                            </p>
                          </div>
                        ) : (
                          <img
                            src={URL.createObjectURL(receipt)}
                            alt="receipt"
                            className="w-full h-44 object-cover"
                            style={{
                              borderRadius: 2,
                            }}
                          />
                        )}
                      </label>
                    </div>
                  </div>
                  {/* scanline */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)",
                    }}
                  />

                  <div className="flex justify-between items-center">
                    <span
                      className="font-black uppercase tracking-[0.22em]"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}
                    >
                      Card Number
                    </span>
                    <span
                      className="font-black uppercase tracking-widest"
                      style={{ fontSize: 9, color: tok.color }}
                    >
                      TBC
                    </span>
                  </div>

                  <p
                    className="font-mono tracking-[0.15em]"
                    style={{ fontSize: 18, color: "rgba(255,255,255,0.88)" }}
                  >
                    9860 3501 4889 2556
                  </p>

                  {/* Test IP row */}
                  <div
                    className="flex justify-between items-center pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span
                      className="font-black uppercase tracking-[0.22em]"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}
                    >
                      IP server:
                    </span>
                    <span
                      className="font-black font-mono px-3 py-1"
                      style={{
                        fontSize: 12,
                        color: tok.color,
                        background: tok.dim,
                        border: `1px solid ${tok.color}40`,
                        clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)",
                      }}
                    >
                      {snapshot?.testIp}
                    </span>
                  </div>

                  {/* Password row */}
                  <div
                    className="flex justify-between items-center pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span
                      className="font-black uppercase tracking-[0.22em]"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}
                    >
                      Order Password
                    </span>
                    <span
                      className="font-black font-mono px-3 py-1"
                      style={{
                        fontSize: 13,
                        color: "#000",
                        background: tok.color,
                        clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)",
                      }}
                    >
                      {password}
                    </span>
                  </div>
                </div>

                {/* config summary */}
                <div
                  className="flex justify-between items-center px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  }}
                >
                  <span
                    className="font-black uppercase tracking-widest"
                    style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}
                  >
                    Configuration
                  </span>
                  <span
                    className="font-bold text-right"
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", maxWidth: "55%" }}
                  >
                    {snapshot?.power?.name}, {snapshot?.tuning?.name}, {snapshot?.wheels?.name}
                  </span>
                </div>

                {/* total */}
                <div
                  className="flex justify-between items-center px-4 py-3"
                  style={{
                    background: tok.dim,
                    border: `1px solid ${tok.color}35`,
                    borderRadius: 2,
                  }}
                >
                  <span
                    className="font-black uppercase tracking-widest"
                    style={{ fontSize: 8, color: tok.color + "aa" }}
                  >
                    Total
                  </span>
                  <span
                    className="font-black italic tracking-tighter"
                    style={{ fontSize: 22, color: tok.color, textShadow: `0 0 16px ${tok.color}55` }}
                  >
                    {snapshot?.total?.toLocaleString()}
                  </span>
                </div>

                {/* confirm button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={buy}
                  disabled={sending}
                  className="w-full py-4 font-black uppercase tracking-[0.25em] transition-opacity duration-200 mt-1"
                  style={{
                    background: sending ? "rgba(255,255,255,0.08)" : tok.color,
                    color: sending ? "rgba(255,255,255,0.3)" : "#000",
                    fontSize: 11,
                    clipPath: "polygon(0 0, 97% 0, 100% 30%, 100% 100%, 3% 100%, 0 70%)",
                    cursor: sending ? "not-allowed" : "pointer",
                  }}
                >
                  {sending ? "Processing..." : "Confirm Purchase"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
