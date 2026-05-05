
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const API = "https://cpmmarker.onrender.com";

// /* ================= TYPES ================= */
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
//   final_price?: number;
//   image_url: string;
// };

// type User = {
//   email: string;
//   name: string;
// };

// /* ================= COMPONENT ================= */
// export default function CarDetail() {
//   const { id } = useParams();
//   const nav = useNavigate();

//   const [car, setCar] = useState<Car | null>(null);
//   const [user, setUser] = useState<User | null>(null);

//   const [configs, setConfigs] = useState<{
//     power: ConfigItem[];
//     tuning: ConfigItem[];
//     wheels: ConfigItem[];
//   }>({ power: [], tuning: [], wheels: [] });

//   const [selectedHp, setSelectedHp] = useState<ConfigItem | null>(null);
//   const [selectedTuning, setSelectedTuning] = useState<ConfigItem | null>(null);
//   const [selectedWheels, setSelectedWheels] = useState<ConfigItem | null>(null);

//   const [loading, setLoading] = useState(true);

//   /* ================= MODAL ================= */
//   const [showPay, setShowPay] = useState(false);
//   const [password, setPassword] = useState("");
//   const [sending, setSending] = useState(false);

//   /* 🔥 SNAPSHOT (фикс выбора) */
//   const [orderSnapshot, setOrderSnapshot] = useState<any>(null);

//   /* ================= LOAD ================= */
//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);

//         const token = localStorage.getItem("token");
//         if (!token) return nav("/login");

//         const headers = { Authorization: `Bearer ${token}` };

//         const [carsRes, cfgRes, userRes] = await Promise.all([
//           fetch(`${API}/market/cars`, { headers }),
//           fetch(`${API}/market/configs`, { headers }),
//           fetch(`${API}/profile/me`, { headers }),
//         ]);

//         const cars = await carsRes.json();
//         const cfg = await cfgRes.json();
//         const u = await userRes.json();

//         const found = cars.find((c: Car) => String(c.id) === String(id));

//         setCar(found);
//         setUser(u);

//         setConfigs({
//           power: cfg.power || [],
//           tuning: cfg.tuning || [],
//           wheels: cfg.wheels || [],
//         });

//         setSelectedHp(cfg.power?.[0] || null);
//         setSelectedTuning(cfg.tuning?.[0] || null);
//         setSelectedWheels(cfg.wheels?.[0] || null);

//       } catch (e) {
//         console.log(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [id]);

//   /* ================= PRICE ================= */
//   const basePrice = car?.final_price ?? car?.price ?? 0;

//   const configPrice =
//     (selectedHp?.price || 0) +
//     (selectedTuning?.price || 0) +
//     (selectedWheels?.price || 0);

//   const totalPrice = basePrice + configPrice;

//   /* ================= OPEN MODAL ================= */
//   const openPay = () => {
//     setPassword(Math.floor(1000 + Math.random() * 9000).toString());

//     setOrderSnapshot({
//       car,
//       power: selectedHp,
//       tuning: selectedTuning,
//       wheels: selectedWheels,
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
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           user,
//           car: orderSnapshot?.car,
//           configs: orderSnapshot,
//           total: totalPrice,
//           password,
//         }),
//       });

//       alert("ORDER SENT");
//       setShowPay(false);

//     } catch (e) {
//       console.log(e);
//     } finally {
//       setSending(false);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading)
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center">
//         Loading...
//       </div>
//     );

//   if (!car)
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center">
//         Car not found
//       </div>
//     );

//   const Block = ({ title, items, selected, setSelected }: any) => (
//     <div className="mt-8">
//       <h2 className="text-xl font-bold mb-3">{title}</h2>

//       {items.length === 0 ? (
//         <div className="text-zinc-500">Нет опций</div>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-3">
//           {items.map((i: ConfigItem) => (
//             <button
//               key={i.id}
//               onClick={() => setSelected(i)}
//               className={`p-3 rounded-xl border ${
//                 selected?.id === i.id
//                   ? "border-green-400 bg-green-500/10"
//                   : "border-zinc-800 bg-zinc-900"
//               }`}
//             >
//               {i.name}
//               <div className="text-green-400">+${i.price}</div>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Navbar />

//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-4xl font-black">
//           {car.brand} {car.name}
//         </h1>

//         <img src={car.image_url} className="w-full mt-4 rounded-2xl" />

//         <div className="mt-6 text-4xl font-black text-green-400">
//           ${totalPrice}
//         </div>

//         <button
//           onClick={openPay}
//           className="mt-5 bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
//         >
//           BUY
//         </button>

//         <Block title="⚡ Power" items={configs.power} selected={selectedHp} setSelected={setSelectedHp} />
//         <Block title="🎨 Tuning" items={configs.tuning} selected={selectedTuning} setSelected={setSelectedTuning} />
//         <Block title="🛞 Wheels" items={configs.wheels} selected={selectedWheels} setSelected={setSelectedWheels} />
//       </div>

//       {/* ================= MODAL ================= */}
//       {showPay && (
//         <div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center"
//           onClick={() => setShowPay(false)}
//         >
//           <div
//             className="bg-zinc-900 p-6 rounded-2xl w-[420px] relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* CLOSE */}
//             <button
//               onClick={() => setShowPay(false)}
//               className="absolute top-3 right-3 text-white text-xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold mb-3">PAYMENT</h2>

//             <div className="text-sm space-y-1">
//               <div>💳 9860 3501 0000 0000</div>
//               <div>👤 TEST</div>
//               <div>🖥 Server: 100</div>
//               <div>🔐 Password: {password}</div>

//               <div className="mt-3 text-green-400 font-bold">
//                 🚘 {orderSnapshot?.car?.brand} {orderSnapshot?.car?.name}
//               </div>

//               <div>⚡ Engine: {orderSnapshot?.power?.name || "Stock"}</div>
//               <div>🎨 Tuning: {orderSnapshot?.tuning?.name || "None"}</div>
//               <div>🛞 Wheels: {orderSnapshot?.wheels?.name || "None"}</div>
//             </div>

//             <div className="mt-3 text-green-400 font-bold">
//               TOTAL: ${totalPrice}
//             </div>

//             <button
//               onClick={buy}
//               disabled={sending}
//               className="mt-5 w-full bg-yellow-400 text-black py-2 rounded-xl font-bold"
//             >
//               {sending ? "SENDING..." : "BUY NOW"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const API = "https://cpmmarker.onrender.com";

/* ================= TYPES ================= */
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
  final_price?: number;
  image_url: string;
  promo_active?: boolean;
};

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

  /* ================= MODAL ================= */
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

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [carsRes, cfgRes] = await Promise.all([
          fetch(`${API}/market/cars`, { headers }),
          fetch(`${API}/market/configs`, { headers }),
        ]);

        const cars = await carsRes.json();
        const cfg = await cfgRes.json();

        const found = cars.find((c: Car) => String(c.id) === String(id));

        setCar(found);

        const safeCfg = {
          power: Array.isArray(cfg.power) ? cfg.power : [],
          tuning: Array.isArray(cfg.tuning) ? cfg.tuning : [],
          wheels: Array.isArray(cfg.wheels) ? cfg.wheels : [],
        };

        setConfigs(safeCfg);

        setSelectedHp(safeCfg.power[0] || null);
        setSelectedTuning(safeCfg.tuning[0] || null);
        setSelectedWheels(safeCfg.wheels[0] || null);

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  /* ================= PRICE (как в маркете) ================= */
  const basePrice = car?.final_price ?? car?.price ?? 0;

  const configPrice =
    (selectedHp?.price || 0) +
    (selectedTuning?.price || 0) +
    (selectedWheels?.price || 0);

  const totalPrice = basePrice + configPrice;

  /* ================= OPEN MODAL ================= */
  const openPay = () => {
    setPassword(Math.floor(1000 + Math.random() * 9000).toString());

    setSnapshot({
      car,
      power: selectedHp,
      tuning: selectedTuning,
      wheels: selectedWheels,
      total: totalPrice,
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          car: snapshot.car,
          configs: snapshot,
          total: snapshot.total,
          password,
        }),
      });

      alert("ORDER SENT");
      setShowPay(false);
    } catch (e) {
      console.log(e);
    } finally {
      setSending(false);
    }
  };

  /* ================= UI ================= */
  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );

  if (!car)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Car not found
      </div>
    );

  const Block = ({ title, items, selected, setSelected }: any) => (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3 text-zinc-200">{title}</h2>

      {items.length === 0 ? (
        <div className="text-zinc-500 text-sm">Нет опций</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((i: ConfigItem) => (
            <button
              key={i.id}
              onClick={() => setSelected(i)}
              className={`p-3 rounded-xl border transition ${
                selected?.id === i.id
                  ? "border-green-400 bg-green-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <div className="text-sm font-semibold">{i.name}</div>
              <div className="text-green-400 text-sm">+${i.price}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-black">
          {car.brand} {car.name}
        </h1>

        {/* IMAGE (НЕ ОГРОМНАЯ) */}
        <div className="mt-5 rounded-2xl overflow-hidden bg-zinc-900 h-[240px] md:h-[320px]">
          <img
            src={car.image_url}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PRICE */}
        <div className="mt-5 text-3xl font-black text-green-400">
          ${totalPrice}
        </div>

        <button
          onClick={openPay}
          className="mt-4 bg-green-500 text-black px-6 py-3 rounded-xl font-bold w-full md:w-auto"
        >
          BUY
        </button>

        {/* CONFIGS */}
        <Block title="⚡ Power" items={configs.power} selected={selectedHp} setSelected={setSelectedHp} />
        <Block title="🎨 Tuning" items={configs.tuning} selected={selectedTuning} setSelected={setSelectedTuning} />
        <Block title="🛞 Wheels" items={configs.wheels} selected={selectedWheels} setSelected={setSelectedWheels} />

      </div>

      {/* ================= MODAL ================= */}
      {showPay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">

          <div className="bg-zinc-900 rounded-2xl w-full max-w-md p-5 relative">

            {/* CLOSE */}
            <button
              onClick={() => setShowPay(false)}
              className="absolute top-3 right-3 text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">PAYMENT</h2>

            <div className="text-sm space-y-1 text-zinc-300">
              <div>💳 9860 3501 0000 0000</div>
              <div>👤 TEST</div>
              <div>🖥 Server: 100</div>
              <div>🔐 Password: {password}</div>

              <div className="mt-3 text-green-400 font-bold">
                🚘 {snapshot?.car?.brand} {snapshot?.car?.name}
              </div>

              <div>⚡ {snapshot?.power?.name}</div>
              <div>🎨 {snapshot?.tuning?.name}</div>
              <div>🛞 {snapshot?.wheels?.name}</div>
            </div>

            <div className="mt-4 text-green-400 font-bold text-lg">
              TOTAL: ${snapshot?.total}
            </div>

            <button
              onClick={buy}
              disabled={sending}
              className="mt-5 w-full bg-yellow-400 text-black py-2 rounded-xl font-bold"
            >
              {sending ? "SENDING..." : "BUY NOW"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}