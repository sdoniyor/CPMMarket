
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




import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User as UserIcon, 
  Mail, 
  Copy, 
  Zap, 
  Camera, 
  Check, 
  Share2, 
  LogOut 
} from "lucide-react";
import Navbar from "../components/Navbar";

const API = "https://cpmmarker.onrender.com";

type User = {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  ref_code?: string;
  ref_count?: number;
  active_promo?: {
    promo_code: string;
    rules: { discount: number; };
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("token");

  const loadUser = async () => {
    try {
      const res = await fetch(`${API}/profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data?.id) return window.location.href = "/auth";
      setUser(data);
      setDiscount(data?.active_promo?.rules?.discount ?? 0);
    } catch (e) {
      window.location.href = "/auth";
    }
  };

  useEffect(() => { loadUser(); }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const uploadAvatar = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("avatar", file);

    const res = await fetch(`${API}/profile/upload-avatar`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const data = await res.json();
    if (data?.success) {
      setUser(data.user);
      setFile(null);
      setPreview(null);
      setPromoNotice("Avatar updated!");
      setTimeout(() => setPromoNotice(null), 3000);
    }
  };

  const applyPromo = async () => {
    if (!promo.trim()) return;
    const res = await fetch(`${API}/promo/redeem`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ code: promo }),
    });

    const data = await res.json();
    if (data?.success) {
      setPromo("");
      loadUser();
      setPromoNotice(`🎉 Activated: -${data.discount || 0}%`);
      setTimeout(() => setPromoNotice(null), 3000);
    }
  };

  if (!user) return <div className="min-h-screen bg-[#08090a] flex items-center justify-center text-yellow-400 font-black italic">LOADING PROFILE...</div>;

  const avatarUrl = preview || (user.avatar ? (user.avatar.startsWith("http") ? user.avatar : `${API}${user.avatar}`) : null);
  const refLink = `${window.location.origin}/auth?ref=${user.ref_code || ""}`;

  return (
    <div className="min-h-screen bg-[#08090a] text-white pb-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 space-y-8">
        
        {/* TOP NOTIFICATION */}
        <AnimatePresence>
          {promoNotice && (
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="bg-yellow-400 text-black px-6 py-4 rounded-2xl font-[900] italic uppercase tracking-tighter shadow-lg shadow-yellow-400/20 flex justify-between">
              {promoNotice} <Check size={20} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PROFILE HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-[#111214] border border-white/5 rounded-[3rem] p-8 md:p-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                {/* Avatar Section */}
                <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden bg-white/5 border-2 border-white/10 p-1 group-hover:border-yellow-400 transition-colors">
                        {avatarUrl ? (
                            <img src={avatarUrl} className="w-full h-full object-cover rounded-[2.2rem]" alt="Profile" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white/20 bg-white/5">{user.name[0]}</div>
                        )}
                    </div>
                    <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-yellow-400 text-black p-3 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                        <Camera size={20} />
                    </button>
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                            setFile(f);
                            const r = new FileReader();
                            r.onload = () => setPreview(r.result as string);
                            r.readAsDataURL(f);
                        }
                    }} />
                </div>

                <div className="text-center md:text-left flex-1">
                    <h1 className="text-4xl md:text-5xl font-[900] italic uppercase tracking-tighter mb-2">{user.name}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
                        <div className="flex items-center gap-2 text-white/40 font-bold uppercase text-[10px] tracking-widest"><Mail size={12} /> {user.email}</div>
                        <div className="bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-yellow-400/20 italic">
                            Rank: Professional
                        </div>
                    </div>
                </div>

                {/* Stat Box */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center min-w-[140px]">
                    <div className="text-yellow-400 text-3xl font-[900] italic leading-none">{discount}%</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mt-2">Active Discount</div>
                </div>
            </div>

            {/* Upload Confirm Button */}
            <AnimatePresence>
                {preview && (
                    <motion.button initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} onClick={uploadAvatar} className="mt-8 w-full bg-green-500 text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
                        Confirm New Avatar
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* REFERRAL SYSTEM */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-[#111214] border border-white/5 p-8 rounded-[2.5rem]">
                <div className="flex items-center gap-3 mb-6">
                    <Share2 size={20} className="text-yellow-400" />
                    <h2 className="text-xl font-black italic uppercase tracking-tighter">Referral Link</h2>
                </div>
                <div className="relative group">
                    <input value={refLink} readOnly className="w-full bg-black border border-white/10 rounded-2xl p-4 pr-14 text-sm font-medium text-white/60 focus:outline-none focus:border-yellow-400/50 transition-colors" />
                    <button onClick={() => handleCopy(refLink)} className="absolute right-2 top-2 p-3 bg-white/5 hover:bg-yellow-400 hover:text-black rounded-xl transition-all">
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>
                <p className="mt-4 text-[10px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">
                    Invite friends and get <span className="text-yellow-400">extra bonuses</span> for every registration using your link.
                </p>
            </motion.div>

            {/* PROMO SYSTEM */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#111214] border border-white/5 p-8 rounded-[2.5rem]">
                <div className="flex items-center gap-3 mb-6">
                    <Zap size={20} className="text-yellow-400" />
                    <h2 className="text-xl font-black italic uppercase tracking-tighter">Redeem Promo</h2>
                </div>
                <div className="flex gap-2">
                    <input placeholder="ENTER_CODE" value={promo} onChange={(e) => setPromo(e.target.value.toUpperCase())} className="flex-1 bg-black border border-white/10 rounded-2xl p-4 text-sm font-black tracking-widest placeholder:text-white/10 uppercase focus:border-yellow-400 transition-colors focus:outline-none" />
                    <button onClick={applyPromo} className="bg-yellow-400 text-black px-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/10">
                        Apply
                    </button>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Active promo:</span>
                    <span className="text-xs font-black italic text-yellow-400">{user.active_promo?.promo_code || "NONE"}</span>
                </div>
            </motion.div>
        </div>

        {/* LOGOUT */}
        <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/auth"; }} className="w-full py-6 rounded-[2rem] border border-red-500/10 hover:bg-red-500/5 text-red-500 font-black italic uppercase tracking-widest transition-all flex items-center justify-center gap-3">
            <LogOut size={20} /> Terminate Session
        </button>

      </div>
    </div>
  );
}