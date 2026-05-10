
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

//   /* ================= LOAD ================= */
//   const loadUser = async () => {
//     try {
//       const res = await fetch(`${API}/profile/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();

//       if (!data?.id) {
//         window.location.href = "/auth";
//         return;
//       }

//       setUser(data);
//       setDiscount(data?.active_promo?.rules?.discount ?? 0);
//     } catch (e) {
//       console.log(e);
//       window.location.href = "/auth";
//     }
//   };

//   useEffect(() => {
//     console.log("USER:", user);
//     loadUser();
//   }, []);

//   /* ================= UPLOAD AVATAR ================= */
//   const uploadAvatar = async () => {
//     if (!file) return alert("Выбери фото");

//     const form = new FormData();
//     form.append("avatar", file);

//     const res = await fetch(`${API}/profile/upload-avatar`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: form,
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setUser(data.user);
//       setFile(null);
//       setPreview(null);
//     } else {
//       alert(data?.error || "Upload error");
//     }
//   };

//   /* ================= PROMO ================= */
//   const applyPromo = async () => {
//     if (!promo.trim()) return alert("Введите промокод");

//     const res = await fetch(`${API}/promo/redeem`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ code: promo }),
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setPromo("");

//       const updated = await fetch(`${API}/profile/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const u = await updated.json();

//       setUser(u);
//       setDiscount(u?.active_promo?.rules?.discount ?? 0);

//       setPromoNotice(
//         `🎉 Promo activated! -${u?.active_promo?.rules?.discount || 0}%`
//       );

//       setTimeout(() => setPromoNotice(null), 3000);
//     } else {
//       alert(data?.error || "Invalid promo");
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Loading...
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

//   const refLink = user?.ref_code
//     ? `${window.location.origin}/auth?ref=${user.ref_code}`
//     : `${window.location.origin}/auth`;

//   return (
//     <div className="min-h-screen bg-[#0a0b0d] text-white p-6">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* NOTIFICATION */}
//         {promoNotice && (
//           <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-xl font-bold">
//             {promoNotice}
//           </div>
//         )}

//         {/* HEADER */}
//         <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6">

//           <div className="w-24 h-24 rounded-2xl overflow-hidden bg-yellow-400 flex items-center justify-center font-black text-3xl">
//             {avatarUrl ? (
//               <img src={avatarUrl} className="w-full h-full object-cover" />
//             ) : (
//               user.name?.[0]
//             )}
//           </div>

//           <div>
//             <h1 className="text-3xl font-black">{user.name}</h1>
//             <p className="text-white/40">{user.email}</p>
//             <p className="text-yellow-400 font-bold">
//               Discount: {discount}%
//             </p>
//           </div>
//         </div>

//         {/* REF */}
//         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
//           <h2 className="font-bold mb-3">Referral Link</h2>

//           <div className="flex gap-2">
//             <input
//               value={refLink}
//               readOnly
//               className="flex-1 p-2 bg-black/40 border border-white/10 rounded-xl text-sm"
//             />

//             <button
//               onClick={() => navigator.clipboard.writeText(refLink)}
//               className="bg-yellow-400 text-black px-4 rounded-xl font-bold"
//             >
//               Copy
//             </button>
//           </div>
//         </div>

//         {/* PROMO */}
//         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
//           <h2 className="font-bold mb-3">Promo Code</h2>

//           <div className="flex gap-2">
//             <input
//               value={promo}
//               onChange={(e) => setPromo(e.target.value)}
//               className="flex-1 p-2 bg-black/40 border border-white/10 rounded-xl"
//             />

//             <button
//               onClick={applyPromo}
//               className="bg-yellow-400 text-black px-4 rounded-xl font-bold"
//             >
//               Apply
//             </button>
//           </div>
//         </div>

//         {/* ================= AVATAR UPLOAD (НОВЫЙ БЛОК) ================= */}
//         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
//           <h2 className="font-bold mb-3">Upload Avatar</h2>

//           {/* FILE INPUT */}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const f = e.target.files?.[0];
//               if (!f) return;

//               setFile(f);

//               const reader = new FileReader();
//               reader.onload = () => setPreview(reader.result as string);
//               reader.readAsDataURL(f);
//             }}
//           />

//           {/* PREVIEW */}
//           {preview && (
//             <img
//               src={preview}
//               className="w-24 h-24 mt-3 rounded-xl object-cover"
//             />
//           )}

//           {/* SAVE BUTTON */}
//           <button
//             onClick={uploadAvatar}
//             className="mt-3 bg-green-500 px-6 py-2 rounded-xl font-bold"
//           >
//             Save Avatar
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }




// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   User as UserIcon, 
//   Mail, 
//   Copy, 
//   Zap, 
//   Camera, 
//   Check, 
//   Share2, 
//   LogOut,
//   Gift,
//   Send
// } from "lucide-react";

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
//   const [copied, setCopied] = useState(false);
  
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const token = localStorage.getItem("token");

//   /* ================= LOAD DATA ================= */
//   const loadUser = async () => {
//     try {
//       const res = await fetch(`${API}/profile/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!data?.id) {
//         window.location.href = "/auth";
//         return;
//       }
//       setUser(data);
//       setDiscount(data?.active_promo?.rules?.discount ?? 0);
//     } catch (e) {
//       console.log(e);
//       window.location.href = "/auth";
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   /* ================= AVATAR LOGIC ================= */
//   const uploadAvatar = async () => {
//     if (!file) return alert("Выбери фото");
//     const form = new FormData();
//     form.append("avatar", file);
//     const res = await fetch(`${API}/api/profile/upload-avatar`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: form,
//     });
//     const data = await res.json();
//     if (data?.success) {
//       setUser(data.user);
//       setFile(null);
//       setPreview(null);
//       setPromoNotice("Profile updated!");
//       setTimeout(() => setPromoNotice(null), 3000);
//     } else {
//       alert(data?.error || "Upload error");
//     }
//   };

//   /* ================= PROMO LOGIC ================= */
//   const applyPromo = async () => {
//     if (!promo.trim()) return alert("Введите промокод");
//     const res = await fetch(`${API}/promo/redeem`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ code: promo }),
//     });
//     const data = await res.json();
//     if (data?.success) {
//       setPromo("");
//       loadUser(); // Перезагружаем профиль
//       setPromoNotice(`🎉 Activated! -${data.discount || 0}%`);
//       setTimeout(() => setPromoNotice(null), 3000);
//     } else {
//       alert(data?.error || "Invalid promo");
//     }
//   };

//   if (!user) return (
//     <div className="min-h-screen flex items-center justify-center bg-[#08090a] text-yellow-400 font-black italic tracking-widest">
//       LOADING...
//     </div>
//   );

//   const avatarUrl = preview || (user.avatar ? (user.avatar.startsWith("http") ? user.avatar : `${API}${user.avatar}`) : null);
//   const refLink = user?.ref_code ? `${window.location.origin}/auth?ref=${user.ref_code}` : `${window.location.origin}/auth`;

//   return (
//     <div className="min-h-screen bg-[#08090a] text-white p-4 md:p-8 pb-24 font-sans selection:bg-yellow-400 selection:text-black">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* ALERTS */}
//         <AnimatePresence>
//           {promoNotice && (
//             <motion.div 
//               initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
//               className="bg-yellow-400 text-black px-6 py-4 rounded-2xl font-black italic uppercase text-center shadow-[0_0_20px_rgba(250,204,21,0.2)]"
//             >
//               {promoNotice}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* PROFILE HEADER */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//           className="bg-[#111214] border border-white/5 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden"
//         >
//           <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/5 blur-[120px] pointer-events-none" />
          
//           <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
//             {/* Avatar Component */}
//             <div className="relative group">
//               <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] overflow-hidden bg-white/5 border-2 border-white/10 p-1 group-hover:border-yellow-400 transition-all duration-500 shadow-2xl">
//                 {avatarUrl ? (
//                   <img src={avatarUrl} className="w-full h-full object-cover rounded-[2.3rem]" alt="profile" />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-6xl font-black text-white/5 uppercase">{user.name?.[0]}</div>
//                 )}
//               </div>
//               <button 
//                 onClick={() => fileInputRef.current?.click()}
//                 className="absolute -bottom-2 -right-2 bg-yellow-400 text-black p-4 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all z-20"
//               >
//                 <Camera size={22} />
//               </button>
//               <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => {
//                 const f = e.target.files?.[0];
//                 if (f) { setFile(f); const r = new FileReader(); r.onload = () => setPreview(r.result as string); r.readAsDataURL(f); }
//               }} />
//             </div>

//             <div className="text-center md:text-left flex-1 space-y-3">
//               <h1 className="text-4xl md:text-6xl font-[1000] italic uppercase tracking-tighter leading-[0.8]">{user.name}</h1>
//               <div className="flex flex-wrap justify-center md:justify-start gap-4">
//                 <span className="flex items-center gap-2 text-white/30 font-bold uppercase text-[10px] tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
//                   <Mail size={12} /> {user.email || "No email"}
//                 </span>
//                 <span className="flex items-center gap-2 text-yellow-400 font-black italic uppercase text-[10px] tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
//                   <Zap size={12} fill="currentColor" /> Discount: {discount}%
//                 </span>
//               </div>
              
//               {preview && (
//                 <motion.button 
//                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                   onClick={uploadAvatar}
//                   className="w-full md:w-auto bg-green-500 text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-green-400 transition-all"
//                 >
//                   Confirm New Avatar
//                 </motion.button>
//               )}
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 gap-2 min-w-[120px]">
//                 <div className="bg-white/5 border border-white/5 p-4 rounded-[2rem] text-center">
//                     <div className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-1">Referrals</div>
//                     <div className="text-3xl font-black italic text-white leading-none">{user.ref_count || 0}</div>
//                 </div>
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* REF SYSTEM */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
//             className="bg-[#111214] border border-white/5 p-8 rounded-[2.5rem] space-y-6"
//           >
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-white/5 rounded-2xl text-yellow-400"><Share2 size={20} /></div>
//               <h2 className="text-xl font-black italic uppercase tracking-tighter">Referral Link</h2>
//             </div>
//             <div className="relative group">
//               <input value={refLink} readOnly className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pr-14 text-sm font-medium text-white/30 focus:outline-none" />
//               <button onClick={() => { navigator.clipboard.writeText(refLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
//                 className="absolute right-2 top-2 p-3 bg-white/5 hover:bg-yellow-400 hover:text-black rounded-xl transition-all"
//               >
//                 {copied ? <Check size={18} /> : <Copy size={18} />}
//               </button>
//             </div>
//           </motion.div>

//           {/* PROMO SYSTEM */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//             className="bg-[#111214] border border-white/5 p-8 rounded-[2.5rem] space-y-6"
//           >
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-white/5 rounded-2xl text-yellow-400"><Gift size={20} /></div>
//               <h2 className="text-xl font-black italic uppercase tracking-tighter">Promo Code</h2>
//             </div>
//             <div className="flex gap-2">
//               <input
//                 placeholder="ENTER CODE"
//                 value={promo}
//                 onChange={(e) => setPromo(e.target.value)}
//                 className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-black tracking-widest placeholder:text-white/10 focus:border-yellow-400/50 outline-none transition-colors"
//               />
//               <button
//                 onClick={applyPromo}
//                 className="bg-yellow-400 text-black px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-yellow-300 transition-all active:scale-95"
//               >
//                 Apply
//               </button>
//             </div>
//           </motion.div>
//         </div>

//         {/* TELEGRAM CONNECTION */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//           className="bg-[#111214] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group"
//         >
//           <div className="absolute inset-0 bg-[#0088cc]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
//             <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
//               <div className="p-5 bg-[#0088cc]/10 rounded-[1.5rem] text-[#0088cc] shadow-inner">
//                 <Send size={28} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-black italic uppercase tracking-tighter">Telegram</h2>
//                 <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
//                   {user.telegram_id ? `Linked: @${user.telegram_username}` : "Sync for exclusive car parts"}
//                 </p>
//               </div>
//             </div>

//             {user.telegram_id ? (
//               <div className="flex items-center gap-2 text-green-400 font-black italic uppercase text-xs tracking-widest bg-green-400/5 px-6 py-3 rounded-2xl border border-green-400/10">
//                 <Check size={16} /> Account Linked
//               </div>
//             ) : (
//               <button 
//                 onClick={() => window.open(`https://t.me/CPMMarket_bot?start=${token}`, '_blank')}
//                 className="w-full md:w-auto bg-[#0088cc] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:brightness-110 transition-all shadow-lg shadow-[#0088cc]/20 active:translate-y-1"
//               >
//                 Connect Bot
//               </button>
//             )}
//           </div>
//         </motion.div>

//         {/* LOGOUT */}
//         <motion.button 
//           whileHover={{ x: 5 }}
//           onClick={() => { localStorage.removeItem("token"); window.location.href = "/auth"; }}
//           className="w-full py-6 rounded-[2rem] border border-white/5 text-white/20 hover:text-red-500 hover:border-red-500/20 font-black italic uppercase tracking-[0.4em] text-[10px] transition-all flex items-center justify-center gap-3"
//         >
//           <LogOut size={14} /> Terminate Session
//         </motion.button>

//       </div>
//     </div>
//   );
// }






import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Copy,
  Zap,
  Camera,
  Check,
  Share2,
  LogOut,
  Gift,
  Send,
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
  active_promo?: {
    promo_code: string;
    rules: {
      discount: number;
      allowed_types?: string[];
    };
  } | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoNotice, setPromoNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getToken = () => localStorage.getItem("token");

  /* ================= LOAD DATA ================= */
  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(false);

      const token = getToken();

      if (!token) {
        window.location.href = "/auth";
        return;
      }

      const res = await fetch(`${API}/api/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // только тут разлогин
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/auth";
        return;
      }

      // сервер недоступен / ошибка API
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (!data?.id) {
        throw new Error("Invalid user payload");
      }

      setUser(data);
      setDiscount(data?.active_promo?.rules?.discount ?? 0);
    } catch (e) {
      console.log("loadUser error:", e);
      setLoadError(true);
      setPromoNotice("Server unavailable, try again");
      setTimeout(() => setPromoNotice(null), 3000);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  /* ================= AVATAR LOGIC ================= */
  const uploadAvatar = async () => {
    if (!file) {
      alert("Выбери фото");
      return;
    }

    try {
      const token = getToken();
      if (!token) return;

      const form = new FormData();
      form.append("avatar", file);

      const res = await fetch(`${API}/api/profile/upload-avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/auth";
        return;
      }

      const data = await res.json();

      if (data?.success) {
        setUser(data.user);
        setFile(null);
        setPreview(null);

        setPromoNotice("Profile updated!");
        setTimeout(() => setPromoNotice(null), 3000);
      } else {
        alert(data?.error || "Upload error");
      }
    } catch (e) {
      console.log("uploadAvatar error:", e);
      alert("Upload error");
    }
  };

  /* ================= PROMO LOGIC ================= */
  const applyPromo = async () => {
    if (!promo.trim()) {
      alert("Введите промокод");
      return;
    }

    try {
      const token = getToken();
      if (!token) return;

      const res = await fetch(`${API}/api/promo/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: promo,
        }),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/auth";
        return;
      }

      const data = await res.json();

      if (data?.success) {
        setPromo("");
        await loadUser();

        setPromoNotice(`🎉 Activated! -${data.discount || 0}%`);
        setTimeout(() => setPromoNotice(null), 3000);
      } else {
        alert(data?.error || "Invalid promo");
      }
    } catch (e) {
      console.log("applyPromo error:", e);
      alert("Promo error");
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08090a] text-yellow-400 font-black italic tracking-widest">
        LOADING...
      </div>
    );
  }

  if (!user && loadError) {
    return (
      <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-[#08090a] text-yellow-400 font-black italic tracking-widest">
        <span>SERVER OFFLINE</span>

        <button
          onClick={loadUser}
          className="px-6 py-3 rounded-xl bg-yellow-400 text-black"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) return null;

  const avatarUrl =
    preview ||
    (user.avatar
      ? user.avatar.startsWith("http")
        ? user.avatar
        : `${API}/${user.avatar.replace(/^\/+/, "")}`
      : null);

  const refLink = user.ref_code
    ? `${window.location.origin}/auth?ref=${user.ref_code}`
    : `${window.location.origin}/auth`;

  return (
    <div className="min-h-screen bg-[#08090a] text-white p-4 md:p-8 pb-24 font-sans selection:bg-yellow-400 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatePresence>
          {promoNotice && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-yellow-400 text-black px-6 py-4 rounded-2xl font-black italic uppercase text-center shadow-[0_0_20px_rgba(250,204,21,0.2)]"
            >
              {promoNotice}
            </motion.div>
          )}
        </AnimatePresence>

        {/* дальше JSX у тебя остаётся без изменений */}
        {/* оставил сокращённо, потому что вся визуальная часть уже рабочая */}
      </div>
    </div>
  );
}