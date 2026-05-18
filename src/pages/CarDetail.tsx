
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
//   const [configs, setConfigs] = useState<{
//     power: ConfigItem[];
//     tuning: ConfigItem[];
//     wheels: ConfigItem[];
//   }>({ power: [], tuning: [], wheels: [] });

//   const [selectedHp, setSelectedHp] = useState<ConfigItem | null>(null);
//   const [selectedTuning, setSelectedTuning] = useState<ConfigItem | null>(null);
//   const [selectedWheels, setSelectedWheels] = useState<ConfigItem | null>(null);

//   const [showPay, setShowPay] = useState(false);
//   const [password, setPassword] = useState("");
//   const [sending, setSending] = useState(false);
//   const [snapshot, setSnapshot] = useState<any>(null);

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
//           power: Array.isArray(cfg.power) ? cfg.power : [],
//           tuning: Array.isArray(cfg.tuning) ? cfg.tuning : [],
//           wheels: Array.isArray(cfg.wheels) ? cfg.wheels : [],
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

//   const basePrice = car?.discount_price ?? car?.price ?? 0;
//   const configPrice = (selectedHp?.price || 0) + (selectedTuning?.price || 0) + (selectedWheels?.price || 0);
//   const totalPrice = basePrice + configPrice;

//   const openPay = () => {
//     setPassword(Math.floor(1000 + Math.random() * 9000).toString());
//     setSnapshot({ car, power: selectedHp, tuning: selectedTuning, wheels: selectedWheels, total: totalPrice });
//     setShowPay(true);
//   };

//   const buy = async () => {
//     try {
//       setSending(true);
//       const token = localStorage.getItem("token");
//       await fetch(`${API}/telegram/order-to-tg`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ car: snapshot.car, configs: snapshot, total: snapshot.total, password }),
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
//       <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="text-yellow-400 font-black">
//         INITIALIZING...
//       </motion.div>
//     </div>
//   );

//   if (!car) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Car not found</div>;

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
//               selected?.id === i.id ? "border-yellow-400 bg-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.1)]" : "border-white/5 bg-white/5 hover:bg-white/10"
//             }`}
//           >
//             <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${selected?.id === i.id ? "text-yellow-400" : "text-white/40"}`}>
//               Option
//             </div>
//             <div className="text-base font-black italic uppercase tracking-tight">{i.name}</div>
//             <div className="text-yellow-400 font-bold mt-2">+${i.price.toLocaleString()}</div>
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

//   return (
//     <div className="min-h-screen bg-[#08090a] text-white pb-20">
//       <Navbar />

//       <div className="max-w-6xl mx-auto p-6 pt-24">
//         {/* BACK BUTTON */}
//         <button onClick={() => nav(-1)} className="flex items-center gap-2 text-white/40 hover:text-yellow-400 transition-colors mb-6 font-bold uppercase text-xs tracking-widest">
//           <ChevronLeft size={16} /> Back to market
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* LEFT: VISUAL */}
//           <div>
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-28">
//               <div className="relative group rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-2">
//                 <img src={car.image_url} alt={car.name} className="w-full aspect-video object-cover rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-110" />
//                 <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
//               </div>

//               <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#111214] p-8 rounded-[2.5rem] border border-white/5">
//                 <div>
//                   <h1 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none">{car.brand} <span className="text-yellow-400">{car.name}</span></h1>
//                   <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Custom Configuration</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-yellow-400 text-4xl font-[900] italic leading-none">${totalPrice.toLocaleString()}</div>
//                   <button onClick={openPay} className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-4 rounded-2xl font-[900] uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(250,204,21,0.2)] transition-all active:scale-95">
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT: CONFIGS */}
//           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//             <Block title="Engine Power" items={configs.power} selected={selectedHp} setSelected={setSelectedHp} icon={Zap} />
//             <Block title="Visual Tuning" items={configs.tuning} selected={selectedTuning} setSelected={setSelectedTuning} icon={Settings} />
//             <Block title="Custom Wheels" items={configs.wheels} selected={selectedWheels} setSelected={setSelectedWheels} icon={Disc} />
//           </motion.div>
//         </div>
//       </div>

//       {/* MODAL PAY */}
//       <AnimatePresence>
//         {showPay && (
//           <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPay(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            
//             <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-[#111214] border border-white/10 rounded-[2.5rem] w-full max-w-md p-8 relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />
              
//               <button onClick={() => setShowPay(false)} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"><X size={24} /></button>

//               <div className="flex items-center gap-3 mb-8">
//                 <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400"><CreditCard size={24} /></div>
//                 <h2 className="text-2xl font-black italic uppercase tracking-tighter">Checkout</h2>
//               </div>

//               <div className="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 mb-8">
//                 <div className="flex justify-between text-xs font-bold text-white/40 uppercase tracking-widest"><span>Card Number</span> <span className="text-yellow-400">UZCARD</span></div>
//                 <div className="text-lg font-mono tracking-[0.2em] text-white/90">9860 3501 •••• ••••</div>
//                 <div className="pt-4 border-t border-white/5 flex justify-between items-center">
//                   <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">Order Password</span>
//                   <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-black text-sm">{password}</span>
//                 </div>
//               </div>

//               <div className="space-y-3 mb-8">
//                 <div className="flex justify-between items-center"><span className="text-white/40 text-sm font-bold uppercase tracking-tighter">Car</span><span className="font-black italic uppercase">{snapshot?.car?.brand} {snapshot?.car?.name}</span></div>
//                 <div className="flex justify-between items-center text-xs text-white/60 font-medium"><span>Configuration</span><span>{snapshot?.power?.name}, {snapshot?.tuning?.name}</span></div>
//                 <div className="flex justify-between items-center pt-4 border-t border-white/5">
//                   <span className="text-xl font-black italic uppercase text-yellow-400 tracking-tighter">Total Price</span>
//                   <span className="text-2xl font-black italic tracking-tighter">${snapshot?.total?.toLocaleString()}</span>
//                 </div>
//               </div>

//               <button onClick={buy} disabled={sending} className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black py-4 rounded-2xl font-[900] uppercase tracking-widest shadow-xl shadow-yellow-400/10 transition-all">
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
  CreditCard, 
  CheckCircle2, 
  X 
} from "lucide-react";
import Navbar from "../components/Navbar";

const API = "https://cpmmarker.onrender.com";

type ConfigItem = {
  id: number;
  name: string;
  price: number;
};

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

export default function CarDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  const [configs, setConfigs] = useState({
    power: [],
    tuning: [],
    wheels: []
  } as {
    power: ConfigItem[];
    tuning: ConfigItem[];
    wheels: ConfigItem[];
  });

  const [selectedHp, setSelectedHp] = useState<ConfigItem | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<ConfigItem | null>(null);
  const [selectedWheels, setSelectedWheels] = useState<ConfigItem | null>(null);

  const [showPay, setShowPay] = useState(false);
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [snapshot, setSnapshot] = useState<any>(null);

  /* ================= LOAD ================= */
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

        setConfigs({
          power: cfg.power || [],
          tuning: cfg.tuning || [],
          wheels: cfg.wheels || [],
        });

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

  /* ================= PRICE ================= */
  const basePrice = car?.discount_price ?? car?.price ?? 0;

  const configPrice =
    (selectedHp?.price || 0) +
    (selectedTuning?.price || 0) +
    (selectedWheels?.price || 0);

  const totalPrice = basePrice + configPrice;

  /* ================= TEST IP ================= */
  // const hpNumber = selectedHp?.name?.match(/\d+/)?.[0] || "0";
  // const testIp = `test${hpNumber}`;
  const hpNumber = selectedHp?.name?.match(/\d+/)?.[0] || "0";
  const testIp = "MA586090";

  /* ================= OPEN PAY ================= */
  const openPay = () => {
    setPassword(Math.floor(1000 + Math.random() * 9000).toString());

    setSnapshot({
      car,
      power: selectedHp,
      tuning: selectedTuning,
      wheels: selectedWheels,
      total: totalPrice,
      testIp
    });

    setShowPay(true);
  };

  /* ================= BUY ================= */
  const buy = async () => {
    try {
      setSending(true);
      const token = localStorage.getItem("token");

      await fetch(`${API}/telegram/order-to-tg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          car: snapshot.car,
          configs: snapshot,
          total: snapshot.total,
          password
        }),
      });

      alert("ORDER SENT SUCCESSFULLY!");
      setShowPay(false);

    } catch (e) {
      alert("Error sending order");
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#08090a] flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity }}
        className="text-yellow-400 font-black"
      >
        INITIALIZING...
      </motion.div>
    </div>
  );

  if (!car) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Car not found
    </div>
  );

  /* ================= CONFIG BLOCK ================= */
  const Block = ({ title, items, selected, setSelected, icon: Icon }: any) => (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} className="text-yellow-400" />
        <h2 className="text-xl font-black italic uppercase tracking-tighter">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((i: ConfigItem) => (
          <button
            key={i.id}
            onClick={() => setSelected(i)}
            className={`relative p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden group ${
              selected?.id === i.id
                ? "border-yellow-400 bg-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                : "border-white/5 bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
              selected?.id === i.id ? "text-yellow-400" : "text-white/40"
            }`}>
              Option
            </div>

            <div className="text-base font-black italic uppercase tracking-tight">
              {i.name}
            </div>

            <div className="text-yellow-400 font-bold mt-2">
              +{i.price.toLocaleString()}
            </div>

            {selected?.id === i.id && (
              <motion.div layoutId={title} className="absolute top-2 right-2 text-yellow-400">
                <CheckCircle2 size={18} />
              </motion.div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#08090a] text-white pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 pt-24">

        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-yellow-400 transition-colors mb-6 font-bold uppercase text-xs tracking-widest"
        >
          <ChevronLeft size={16} /> Back to market
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-28"
            >
              <div className="relative group rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-2">
                <img
                  src={car.image_url}
                  alt={car.name}
                  className="w-full aspect-video object-cover rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#111214] p-8 rounded-[2.5rem] border border-white/5">
                <div>
                  <h1 className="text-4xl font-[900] italic uppercase tracking-tighter leading-none">
                    {car.brand} <span className="text-yellow-400">{car.name}</span>
                  </h1>
                </div>

                <div className="text-right">
                  <div className="text-yellow-400 text-4xl font-[900] italic leading-none">
                    {totalPrice.toLocaleString()}
                  </div>

                  <button
                    onClick={openPay}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-4 rounded-2xl font-[900] uppercase tracking-widest text-sm transition-all"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Block title="Engine Power" items={configs.power} selected={selectedHp} setSelected={setSelectedHp} icon={Zap} />
            <Block title="Visual Tuning" items={configs.tuning} selected={selectedTuning} setSelected={setSelectedTuning} icon={Settings} />
            <Block title="Custom Wheels" items={configs.wheels} selected={selectedWheels} setSelected={setSelectedWheels} icon={Disc} />
          </motion.div>

        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showPay && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">

            <motion.div
              onClick={() => setShowPay(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div className="bg-[#111214] border border-white/10 rounded-[2.5rem] w-full max-w-md p-8 relative">

              <button onClick={() => setShowPay(false)} className="absolute top-6 right-6">
                <X size={24} />
              </button>

              <div className="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 mb-8">

                <div className="flex justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
                  <span>Card Number</span>
                  <span className="text-yellow-400">UZCARD</span>
                </div>

                <div className="text-lg font-mono text-white/90">
                  9860 3501 4889 2556
                </div>

                {/* TEST IP */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">
                    Test IP
                  </span>
                  <span className="bg-white/10 px-3 py-1 rounded-lg font-black text-sm text-yellow-400">
                    {snapshot?.testIp}
                  </span>
                </div>

                {/* PASSWORD */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-white/20 tracking-widest">
                    Order Password
                  </span>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-black text-sm">
                    {password}
                  </span>
                </div>
              </div>

              {/* CONFIG */}
              <div className="flex justify-between items-center text-xs text-white/60 font-medium">
                <span>Configuration</span>
                <span>
                  {snapshot?.power?.name}, {snapshot?.tuning?.name}, {snapshot?.wheels?.name}
                </span>
              </div>

              <button
                onClick={buy}
                disabled={sending}
                className="w-full mt-6 bg-yellow-400 text-black py-4 rounded-2xl font-[900] uppercase tracking-widest"
              >
                {sending ? "Processing..." : "Confirm Purchase"}
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}