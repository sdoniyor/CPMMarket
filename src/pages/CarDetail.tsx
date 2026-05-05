
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const API = "https://cpmmarker.onrender.com";

// /* ================= TYPES ================= */
// type ConfigItem = {
//   id: number;
//   name: string;
//   price: number;
//   type?: string;
// };

// type Car = {
//   id: number;
//   brand: string;
//   name: string;
//   price: number;
//   final_price?: number;
//   image_url: string;
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
//   }>({
//     power: [],
//     tuning: [],
//     wheels: [],
//   });

//   const [selectedHp, setSelectedHp] = useState<ConfigItem | null>(null);
//   const [selectedTuning, setSelectedTuning] = useState<ConfigItem | null>(null);
//   const [selectedWheels, setSelectedWheels] = useState<ConfigItem | null>(null);

//   /* ================= LOAD ================= */
//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);

//         const token = localStorage.getItem("token");
//         if (!token) return nav("/login");

//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const [carsRes, configsRes] = await Promise.all([
//           fetch(`${API}/market/cars`, { headers }),
//           fetch(`${API}/market/configs`, { headers }),
//         ]);

//         const carsData = await carsRes.json();
//         const cfg = await configsRes.json();

//         /* ================= DEBUG LOGS ================= */
//         console.log("🚗 CARS RESPONSE:", carsData);
//         console.log("⚙️ CONFIG RAW RESPONSE:", cfg);
//         console.log("⚙️ CONFIG IS ARRAY:", Array.isArray(cfg));

//         const foundCar = carsData.find(
//           (c: Car) => String(c.id) === String(id)
//         );

//         console.log("🎯 SELECTED CAR:", foundCar);

//         setCar(foundCar || null);

//         /* ================= CONFIG DEBUG ================= */
//         let power: ConfigItem[] = [];
//         let tuning: ConfigItem[] = [];
//         let wheels: ConfigItem[] = [];

//         if (cfg?.power || cfg?.tuning || cfg?.wheels) {
//           console.log("📦 FORMAT: GROUPED OBJECT");

//           power = cfg.power || [];
//           tuning = cfg.tuning || [];
//           wheels = cfg.wheels || [];
//         } 
//         else if (Array.isArray(cfg)) {
//           console.log("📦 FORMAT: FLAT ARRAY");

//           for (const item of cfg) {
//             console.log("ITEM:", item);

//             const type = String(item.type || "").toLowerCase();

//             if (type === "power") power.push(item);
//             else if (type === "tuning") tuning.push(item);
//             else if (type === "wheels") wheels.push(item);
//           }
//         } 
//         else {
//           console.log("❌ UNKNOWN CONFIG FORMAT");
//         }

//         console.log("⚡ POWER:", power);
//         console.log("🎨 TUNING:", tuning);
//         console.log("🛞 WHEELS:", wheels);

//         setConfigs({ power, tuning, wheels });

//         setSelectedHp(power[0] || null);
//         setSelectedTuning(tuning[0] || null);
//         setSelectedWheels(wheels[0] || null);

//       } catch (e) {
//         console.log("❌ LOAD ERROR:", e);
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

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Navbar />

//       <div className="max-w-6xl mx-auto p-6">
//         <h1 className="text-4xl font-black">
//           {car.brand} {car.name}
//         </h1>

//         <img src={car.image_url} className="w-full mt-4 rounded-2xl" />

//         {/* PRICE */}
//         <div className="mt-6 text-4xl font-black text-green-400">
//           ${totalPrice}
//         </div>

//         {/* CONFIGS */}
//         <ConfigBlock title="Power" items={configs.power} selected={selectedHp} setSelected={setSelectedHp} />
//         <ConfigBlock title="Tuning" items={configs.tuning} selected={selectedTuning} setSelected={setSelectedTuning} />
//         <ConfigBlock title="Wheels" items={configs.wheels} selected={selectedWheels} setSelected={setSelectedWheels} />
//       </div>
//     </div>
//   );
// }

// /* ================= CONFIG UI ================= */
// function ConfigBlock({ title, items, selected, setSelected }: any) {
//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-bold mb-4">{title}</h2>

//       {items.length === 0 ? (
//         <div className="text-red-400">
//           Нет опций (смотри console.log)
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-4">
//           {items.map((i: ConfigItem) => {
//             const active = selected?.id === i.id;

//             return (
//               <button
//                 key={i.id}
//                 onClick={() => setSelected(i)}
//                 className={`p-4 rounded-xl border ${
//                   active
//                     ? "border-green-400 bg-green-500/10"
//                     : "border-zinc-800 bg-zinc-900"
//                 }`}
//               >
//                 <div>{i.name}</div>
//                 <div className="text-green-400">+${i.price}</div>
//               </button>
//             );
//           })}
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
  type?: string;
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

type User = {
  email: string;
  name: string;
};

/* ================= COMPONENT ================= */
export default function CarDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [configs, setConfigs] = useState<{
    power: ConfigItem[];
    tuning: ConfigItem[];
    wheels: ConfigItem[];
  }>({ power: [], tuning: [], wheels: [] });

  const [selectedHp, setSelectedHp] = useState<ConfigItem | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<ConfigItem | null>(null);
  const [selectedWheels, setSelectedWheels] = useState<ConfigItem | null>(null);

  const [loading, setLoading] = useState(true);

  /* ================= MODAL ================= */
  const [showPay, setShowPay] = useState(false);
  const [randomPass, setRandomPass] = useState("");
  const [sending, setSending] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) return nav("/login");

        const headers = { Authorization: `Bearer ${token}` };

        const [carsRes, cfgRes, userRes] = await Promise.all([
          fetch(`${API}/market/cars`, { headers }),
          fetch(`${API}/market/configs`, { headers }),
          fetch(`${API}/profile/me`, { headers }),
        ]);

        const cars = await carsRes.json();
        const cfg = await cfgRes.json();
        const u = await userRes.json();

        const found = cars.find((c: Car) => String(c.id) === String(id));

        setCar(found);
        setUser(u);

        /* ================= CONFIG FIX ================= */
        const safeCfg = {
          power: cfg.power || [],
          tuning: cfg.tuning || [],
          wheels: cfg.wheels || [],
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
    setRandomPass(Math.floor(1000 + Math.random() * 9000).toString());
    setShowPay(true);
  };

  /* ================= BUY ================= */
  const buy = async () => {
    try {
      setSending(true);

      const token = localStorage.getItem("token");

      await fetch(`${API}/telegram/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user,
          car,
          configs: {
            power: selectedHp,
            tuning: selectedTuning,
            wheels: selectedWheels,
          },
          total: totalPrice,
          password: randomPass,
          card: "9860 3501 0000 0000",
          holder: "TEST",
          server: 100,
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

  const ConfigBlock = ({ title, items, selected, setSelected }: any) => (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      {items.length === 0 ? (
        <div className="text-zinc-500">Нет опций</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-3">
          {items.map((i: ConfigItem) => (
            <button
              key={i.id}
              onClick={() => setSelected(i)}
              className={`p-3 rounded-xl border ${
                selected?.id === i.id
                  ? "border-green-400 bg-green-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              {i.name}
              <div className="text-green-400">+${i.price}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-black">
          {car.brand} {car.name}
        </h1>

        <img src={car.image_url} className="w-full mt-4 rounded-2xl" />

        <div className="mt-6 text-4xl font-black text-green-400">
          ${totalPrice}
        </div>

        <button
          onClick={openPay}
          className="mt-5 bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
        >
          BUY
        </button>

        <ConfigBlock title="⚡ Power" items={configs.power} selected={selectedHp} setSelected={setSelectedHp} />
        <ConfigBlock title="🎨 Tuning" items={configs.tuning} selected={selectedTuning} setSelected={setSelectedTuning} />
        <ConfigBlock title="🛞 Wheels" items={configs.wheels} selected={selectedWheels} setSelected={setSelectedWheels} />
      </div>

      {/* ================= MODAL ================= */}
      {showPay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-2xl w-[420px]">

            <h2 className="text-xl font-bold mb-3">PAYMENT</h2>

            <div className="text-sm space-y-1">
              <div>💳 9860 3501 0000 0000</div>
              <div>👤 TEST</div>
              <div>🖥 Server: 100</div>
              <div>🔐 Password: {randomPass}</div>
            </div>

            <div className="mt-3 text-green-400 font-bold">
              TOTAL: ${totalPrice}
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