
// import { useEffect, useState } from "react";

// const API = "https://cpmmarker.onrender.com";

// type User = {
//   id: number;
//   name: string;
//   email?: string;
//   avatar?: string;
//   ref_code?: string;
//   ref_count?: number;

//   telegram_username?: string;
//   telegram_id?: string;

//   active_promo?: {
//     promo_code: string;
//     rules: {
//       discount: number;
//       allowed_types?: string[];
//     };
//   } | null;
// };

// export default function ProfilePage() {
//   const [user, setUser] = useState<User | null>(null);

//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const [promo, setPromo] = useState("");
//   const [discount, setDiscount] = useState(0);

//   const [promoNotice, setPromoNotice] = useState<string | null>(null);

//   const token = localStorage.getItem("token");

//   const loadUser = async () => {
//     try {
//       const res = await fetch(`${API}/profile/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!data?.id) {
//         window.location.href = "/auth";
//         return;
//       }

//       setUser(data);
//       setDiscount(data?.active_promo?.rules?.discount ?? 0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const uploadAvatar = async () => {
//     if (!file) return;

//     try {
//       const form = new FormData();
//       form.append("avatar", file);

//       const res = await fetch(`${API}/profile/upload-avatar`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: form,
//       });

//       const data = await res.json();

//       if (data?.success) {
//         setUser(data.user);
//         setPreview(null);
//         setFile(null);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const applyPromo = async () => {
//     try {
//       const res = await fetch(`${API}/promo/redeem`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           code: promo,
//         }),
//       });

//       const data = await res.json();

//       if (data?.success) {
//         setPromoNotice(`Успех! +${data.discount}% активировано`);
//         setPromo("");

//         const r = await fetch(`${API}/profile/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const u = await r.json();

//         setUser(u);
//         setDiscount(u?.active_promo?.rules?.discount ?? 0);

//         setTimeout(() => {
//           setPromoNotice(null);
//         }, 2500);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-yellow-400 font-medium tracking-wide animate-pulse">
//         Загрузка профиля...
//       </div>
//     );
//   }

//   const avatarUrl =
//     preview ||
//     (user.avatar
//       ? user.avatar.startsWith("http")
//         ? user.avatar
//         : `${API}${user.avatar}`
//       : null);

//   const refLink = `${window.location.origin}/auth?ref=${user.ref_code}`;

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-950/20 via-[#0a0a0a] to-black text-zinc-100 p-4 md:p-10 pt-24 md:pt-32 font-sans selection:bg-yellow-400/30">
//       <div className="max-w-5xl mx-auto space-y-8">

//         {/* Toast */}
//         {promoNotice && (
//           <div className="fixed top-24 right-6 z-50 animate-fade-in-down">
//             <div className="bg-zinc-900 border border-yellow-500/50 text-yellow-400 font-semibold px-6 py-3 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.15)] flex items-center gap-2">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
//               </span>

//               {promoNotice}
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <section className="relative overflow-hidden backdrop-blur-sm bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl transition-all duration-300 hover:border-yellow-500/20">

//           {/* Avatar */}
//           <div className="relative group">
//             <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-yellow-500/20 ring-offset-4 ring-offset-[#0a0a0a] group-hover:ring-yellow-500/50 transition-all duration-500 shadow-xl">

//               {avatarUrl ? (
//                 <img
//                   src={avatarUrl}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl font-bold text-yellow-400">
//                   {user.name?.[0]}
//                 </div>
//               )}

//             </div>
//           </div>

//           {/* Info */}
//           <div className="text-center md:text-left flex-1">
//             <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
//               {user.name}
//             </h1>

//             <p className="text-zinc-500 text-sm mb-4 font-medium">
//               {user.email}
//             </p>

//             <div className="inline-flex items-center gap-2.5 bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full shadow-inner">
//               <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider text-[10px] md:text-xs">
//                 СКИДКА ПАРТНЕРА:
//               </span>

//               <span className="text-white text-base font-extrabold">
//                 {discount}%
//               </span>
//             </div>
//           </div>
//         </section>

//         {/* Grid */}
//         <div className="grid md:grid-cols-2 gap-6">

//           {/* Referral */}
//           <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-7 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 group shadow-lg hover:shadow-yellow-500/5">
//             <h2 className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-5">
//               Network Link
//             </h2>

//             <div className="flex items-center gap-2 bg-black/40 border border-zinc-700/50 rounded-2xl p-1.5 focus-within:border-yellow-500/50 transition">

//               <input
//                 value={refLink}
//                 readOnly
//                 className="flex-1 bg-transparent border-none py-2 px-3 text-[10px] md:text-xs font-mono text-zinc-300 focus:ring-0 focus:outline-none"
//               />

//               <button
//                 onClick={() => navigator.clipboard.writeText(refLink)}
//                 className="bg-zinc-800 hover:bg-yellow-500 text-yellow-400 hover:text-black font-bold py-2.5 px-5 rounded-xl transition-colors text-xs active:scale-95"
//               >
//                 Копировать
//               </button>

//             </div>
//           </div>

//           {/* Promo */}
//           <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-7 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 group shadow-lg hover:shadow-yellow-500/5">

//             <h2 className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-5">
//               Промокод
//             </h2>

//             <div className="flex items-center gap-2 bg-black/40 border border-zinc-700/50 rounded-2xl p-1.5 focus-within:border-yellow-500/50 transition">

//               <input
//                 value={promo}
//                 onChange={(e) => setPromo(e.target.value)}
//                 placeholder="Ввести код..."
//                 className="flex-1 bg-transparent border-none py-2 px-3 text-sm text-yellow-100 placeholder:text-zinc-600 focus:ring-0 focus:outline-none transition"
//               />

//               <button
//                 onClick={applyPromo}
//                 className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-2.5 px-6 rounded-xl transition-all text-xs active:scale-95 shadow-lg shadow-yellow-950/30"
//               >
//                 Активировать
//               </button>

//             </div>
//           </div>

//           {/* Telegram */}
//           <div className="md:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-7 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 group shadow-lg hover:shadow-sky-500/5">

//             <h2 className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-5">
//               Telegram
//             </h2>

//             {user.telegram_id || user.telegram_username ? (
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-black/40 border border-zinc-700/50 rounded-2xl px-5 py-5">

//                 <div className="flex flex-col">
//                   <span className="text-zinc-500 text-xs uppercase tracking-wide">
//                     Подключенный аккаунт
//                   </span>

//                   <span className="text-white font-bold text-base mt-1">
//                     {user.telegram_username
//                       ? `@${user.telegram_username}`
//                       : `ID: ${user.telegram_id}`}
//                   </span>
//                 </div>

//                 <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider">
//                   CONNECTED
//                 </div>

//               </div>
//             ) : (
//               <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 border border-zinc-700/50 rounded-2xl p-5">

//                 <div>
//                   <p className="text-white font-semibold text-sm">
//                     Telegram не подключен
//                   </p>

//                   <p className="text-zinc-500 text-xs mt-1">
//                     Подключите аккаунт через Telegram бота
//                   </p>
//                 </div>

//                 <a
//                   href={`https://t.me/CPMMarket_bot?start=${user.id}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm active:scale-95 shadow-lg shadow-sky-950/30"
//                 >
//                   Подключить Telegram
//                 </a>

//               </div>
//             )}

//           </div>

//         </div>

//         {/* Upload avatar */}
//         <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center gap-7 transition-all duration-300 hover:border-zinc-700 shadow-lg">

//           <div className="w-full text-center md:text-left">
//             <h2 className="text-white text-xl font-bold">
//               Сменить изображение профиля
//             </h2>

//             <p className="text-zinc-500 text-sm">
//               Рекомендуемый размер 512x512px, до 2MB
//             </p>
//           </div>

//           <div className="w-full flex flex-col md:flex-row items-center gap-6">

//             <label className="flex-1 w-full cursor-pointer">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => {
//                   const f = e.target.files?.[0];

//                   if (!f) return;

//                   setFile(f);

//                   const r = new FileReader();

//                   r.onload = () => {
//                     setPreview(r.result as string);
//                   };

//                   r.readAsDataURL(f);
//                 }}
//               />

//               <div className="w-full bg-black/30 border-2 border-dashed border-zinc-700/70 hover:border-yellow-500/50 py-10 px-6 rounded-2xl text-center transition duration-300 group">
//                 <span className="text-zinc-500 text-sm font-medium group-hover:text-zinc-300 transition">
//                   {file
//                     ? file.name
//                     : "Выбрать файл на устройстве"}
//                 </span>
//               </div>
//             </label>

//             <div className="flex flex-col items-center gap-4 w-full md:w-auto">

//               {preview ? (
//                 <div className="p-1 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl">
//                   <img
//                     src={preview}
//                     className="w-24 h-24 object-cover rounded-full"
//                   />
//                 </div>
//               ) : (
//                 <div className="w-24 h-24 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-600 text-xs">
//                   Нет превью
//                 </div>
//               )}

//               <button
//                 onClick={uploadAvatar}
//                 disabled={!file}
//                 className="w-full md:w-auto whitespace-nowrap bg-white hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm active:scale-95 shadow-lg"
//               >
//                 Применить
//               </button>

//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }










import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Copy,
  Check,
  Tag,
  Send,
  Link2,
  Upload,
  User,
  ChevronRight,
  Zap,
  ShieldCheck,
} from "lucide-react";

const API = "https://cpmmarker.onrender.com";

type User = {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  ref_code?: string;
  ref_count?: number;
  telegram_username?: string;
  telegram_id?: string;
  telegram_code?: string;
  active_promo?: {
    promo_code: string;
    rules: { discount: number; allowed_types?: string[] };
  } | null;
};

/* ─── reusable section card ─── */
function Card({
  children,
  accent = "#FF3D00",
  className = "",
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: "#0D0D0F",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 2,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accent + "30";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
      {children}
    </div>
  );
}

/* ─── section label ─── */
function Label({ icon: Icon, text, color }: { icon: any; text: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div
        className="w-6 h-6 flex items-center justify-center shrink-0"
        style={{
          background: color + "18",
          border: `1px solid ${color}40`,
          clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
        }}
      >
        <Icon size={12} style={{ color }} />
      </div>
      <span
        className="font-black uppercase tracking-[0.28em]"
        style={{ fontSize: 9, color: color + "bb" }}
      >
        {text}
      </span>
      <div className="flex-1 flex items-center gap-1">
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
        <div className="w-4 h-px" style={{ background: color + "44" }} />
        <div className="w-1 h-1 rotate-45" style={{ background: color + "44" }} />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoNotice, setPromoNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  const loadUser = async () => {
    try {
      const res = await fetch(`${API}/profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data?.id) { window.location.href = "/auth"; return; }
      setUser(data);
      setDiscount(data?.active_promo?.rules?.discount ?? 0);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadUser(); }, []);

  const uploadAvatar = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const form = new FormData();
      form.append("avatar", file);
      const res = await fetch(`${API}/profile/upload-avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (data?.success) { setUser(data.user); setPreview(null); setFile(null); }
    } catch (err) { console.error(err); }
    finally { setUploading(false); }
  };

  const applyPromo = async () => {
    try {
      const res = await fetch(`${API}/promo/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ code: promo }),
      });
      const data = await res.json();
      if (data?.success) {
        setPromoNotice(`+${data.discount}% активировано`);
        setPromo("");
        const r = await fetch(`${API}/profile/me`, { headers: { Authorization: `Bearer ${token}` } });
        const u = await r.json();
        setUser(u);
        setDiscount(u?.active_promo?.rules?.discount ?? 0);
        setTimeout(() => setPromoNotice(null), 3000);
      }
    } catch (err) { console.error(err); }
  };

  const copyRef = () => {
    if (!user?.ref_code) return;
    navigator.clipboard.writeText(`${window.location.origin}/auth?ref=${user.ref_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* LOADING */
  if (!user)
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

  const avatarUrl =
    preview ||
    (user.avatar
      ? user.avatar.startsWith("http") ? user.avatar : `${API}${user.avatar}`
      : null);

  const refLink = `${window.location.origin}/auth?ref=${user.ref_code}`;

  return (
    <div className="min-h-screen text-white pb-24 pt-20" style={{ background: "#080809" }}>
      {/* bg atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 30% at 50% -5%, #FF3D000C 0%, transparent 60%)," +
            "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "auto, 44px 44px, 44px 44px",
        }}
      />

      {/* TOAST */}
      <AnimatePresence>
        {promoNotice && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3"
            style={{
              background: "#0D0D0F",
              border: "1px solid #FF3D0050",
              borderRadius: 2,
              boxShadow: "0 0 24px #FF3D0020",
              clipPath: "polygon(0 0, 96% 0, 100% 30%, 100% 100%, 4% 100%, 0 70%)",
            }}
          >
            <Zap size={13} style={{ color: "#FF3D00" }} />
            <span className="font-black uppercase tracking-widest" style={{ fontSize: 10, color: "#FF3D00" }}>
              {promoNotice}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-5 space-y-5">

        {/* ══ HERO CARD ══ */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <Card accent="#FF3D00">
            {/* scanline */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)",
              }}
            />

            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative">
              {/* AVATAR */}
              <div className="relative shrink-0">
                <div
                  className="w-28 h-28 overflow-hidden"
                  style={{
                    border: "1.5px solid #FF3D0050",
                    clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
                  }}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center font-black italic"
                      style={{ background: "#1a1a1c", fontSize: 36, color: "#FF3D00" }}
                    >
                      {user.name?.[0]}
                    </div>
                  )}
                </div>
                {/* corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-4 h-4"
                  style={{ background: "#FF3D00", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                />
              </div>

              {/* INFO */}
              <div className="flex-1 text-center md:text-left">
                {/* eyebrow */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <div className="h-px w-5" style={{ background: "#FF3D0060" }} />
                  <span className="font-black uppercase tracking-[0.35em]" style={{ fontSize: 8, color: "#FF3D0088" }}>
                    CPM Pilot
                  </span>
                </div>

                <h1
                  className="font-black italic uppercase tracking-tighter leading-none mb-1"
                  style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
                >
                  {user.name}
                </h1>
                <p className="font-bold mb-5" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                  {user.email}
                </p>

                {/* badges row */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  {/* discount badge */}
                  <div
                    className="flex items-center gap-2 px-4 py-2"
                    style={{
                      background: "#FF3D0015",
                      border: "1px solid #FF3D0040",
                      clipPath: "polygon(0 0, 94% 0, 100% 35%, 100% 100%, 6% 100%, 0 65%)",
                    }}
                  >
                    <ShieldCheck size={11} style={{ color: "#FF3D00" }} />
                    <span className="font-black uppercase tracking-widest" style={{ fontSize: 9, color: "#FF3D00" }}>
                      Скидка:
                    </span>
                    <span className="font-black italic" style={{ fontSize: 16, color: "#FF3D00", lineHeight: 1 }}>
                      {discount}%
                    </span>
                  </div>

                  {/* ref count */}
                  {(user.ref_count ?? 0) > 0 && (
                    <div
                      className="flex items-center gap-2 px-4 py-2"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        clipPath: "polygon(0 0, 94% 0, 100% 35%, 100% 100%, 6% 100%, 0 65%)",
                      }}
                    >
                      <Link2 size={10} style={{ color: "rgba(255,255,255,0.3)" }} />
                      <span className="font-black uppercase tracking-widest" style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
                        Рефералов:
                      </span>
                      <span className="font-black italic" style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>
                        {user.ref_count}
                      </span>
                    </div>
                  )}

                  {/* active promo tag */}
                  {user.active_promo && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-2"
                      style={{
                        background: "#00E5FF15",
                        border: "1px solid #00E5FF40",
                        clipPath: "polygon(0 0, 94% 0, 100% 35%, 100% 100%, 6% 100%, 0 65%)",
                      }}
                    >
                      <Tag size={10} style={{ color: "#00E5FF" }} />
                      <span className="font-black uppercase tracking-widest" style={{ fontSize: 9, color: "#00E5FF" }}>
                        {user.active_promo.promo_code}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ══ GRID: Referral + Promo ══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-2 gap-5"
        >
          {/* REFERRAL */}
          <Card accent="#FF3D00">
            <div className="p-6">
              <Label icon={Link2} text="Network Link" color="#FF3D00" />

              <div
                className="flex items-center gap-2 p-1.5"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2,
                }}
              >
                <input
                  value={refLink}
                  readOnly
                  className="flex-1 bg-transparent border-none focus:outline-none font-mono"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", padding: "8px 10px" }}
                />
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={copyRef}
                  className="flex items-center gap-1.5 px-4 py-2.5 font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    background: copied ? "#FF3D0022" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${copied ? "#FF3D0055" : "rgba(255,255,255,0.1)"}`,
                    color: copied ? "#FF3D00" : "rgba(255,255,255,0.5)",
                    fontSize: 9,
                    clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                  }}
                >
                  {copied ? <Check size={11} /> : <Copy size={11} />}
                  {copied ? "Copied" : "Copy"}
                </motion.button>
              </div>
            </div>
          </Card>

          {/* PROMO */}
          <Card accent="#00E5FF">
            <div className="p-6">
              <Label icon={Tag} text="Промокод" color="#00E5FF" />

              <div
                className="flex items-center gap-2 p-1.5"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 2,
                }}
              >
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                  placeholder="Ввести код..."
                  className="flex-1 bg-transparent border-none focus:outline-none font-mono"
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.8)",
                    padding: "8px 10px",
                  }}
                />
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={applyPromo}
                  className="flex items-center gap-1.5 px-4 py-2.5 font-black uppercase tracking-widest transition-all duration-200"
                  style={{
                    background: "#00E5FF18",
                    border: "1px solid #00E5FF44",
                    color: "#00E5FF",
                    fontSize: 9,
                    clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                  }}
                >
                  <Zap size={11} />
                  GO
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ══ TELEGRAM ══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card accent="#00E5FF">
            <div className="p-6">
              <Label icon={Send} text="Telegram" color="#00E5FF" />

              {user.telegram_id || user.telegram_username ? (
                <div
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  }}
                >
                  <div>
                    <p className="font-black uppercase tracking-[0.22em] mb-1" style={{ fontSize: 8, color: "rgba(255,255,255,0.2)" }}>
                      Подключенный аккаунт
                    </p>
                    <p className="font-black italic" style={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }}>
                      {user.telegram_username ? `@${user.telegram_username}` : `ID: ${user.telegram_id}`}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-2 self-start md:self-auto"
                    style={{
                      background: "#00E5FF12",
                      border: "1px solid #00E5FF40",
                      clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00E5FF" }} />
                    <span className="font-black uppercase tracking-widest" style={{ fontSize: 8, color: "#00E5FF" }}>
                      Connected
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  }}
                >
                  <div>
                    <p className="font-black uppercase tracking-widest mb-1" style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                      Telegram не подключен
                    </p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
                      Подключите аккаунт через Telegram бота
                    </p>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://t.me/CPMMarket_bot?start=${user.telegram_code}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest shrink-0"
                    style={{
                      background: "#00E5FF",
                      color: "#000",
                      fontSize: 10,
                      clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                    }}
                  >
                    Подключить
                    <ChevronRight size={12} />
                  </motion.a>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* ══ AVATAR UPLOAD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card accent="#AAAAAA">
            <div className="p-6">
              <Label icon={User} text="Аватар профиля" color="#AAAAAA" />

              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* drop zone */}
                <label className="flex-1 w-full cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      setFile(f);
                      const r = new FileReader();
                      r.onload = () => setPreview(r.result as string);
                      r.readAsDataURL(f);
                    }}
                  />
                  <div
                    className="w-full py-9 px-6 text-center transition-all duration-300"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: `1px dashed ${file ? "#AAAAAA55" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: 2,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#AAAAAA44";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = file ? "#AAAAAA55" : "rgba(255,255,255,0.08)";
                    }}
                  >
                    <Upload size={20} className="mx-auto mb-2" style={{ color: "rgba(255,255,255,0.2)" }} />
                    <p className="font-black uppercase tracking-widest" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
                      {file ? file.name : "Выбрать файл"}
                    </p>
                    <p style={{ fontSize: 8, color: "rgba(255,255,255,0.12)", marginTop: 4 }}>
                      512×512px · до 2MB
                    </p>
                  </div>
                </label>

                {/* preview + apply */}
                <div className="flex flex-col items-center gap-4 shrink-0">
                  {preview ? (
                    <div
                      className="w-24 h-24 overflow-hidden"
                      style={{
                        border: "1.5px solid #AAAAAA44",
                        clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
                      }}
                    >
                      <img src={preview} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className="w-24 h-24 flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
                      }}
                    >
                      <User size={24} style={{ color: "rgba(255,255,255,0.1)" }} />
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: file ? 1.05 : 1 }}
                    whileTap={{ scale: file ? 0.94 : 1 }}
                    onClick={uploadAvatar}
                    disabled={!file || uploading}
                    className="flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest transition-opacity duration-200"
                    style={{
                      background: file ? "#AAAAAA" : "rgba(255,255,255,0.05)",
                      color: file ? "#000" : "rgba(255,255,255,0.2)",
                      fontSize: 9,
                      clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                      cursor: file ? "pointer" : "not-allowed",
                      opacity: uploading ? 0.5 : 1,
                    }}
                  >
                    {uploading ? "..." : <><Upload size={11} /> Применить</>}
                  </motion.button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
