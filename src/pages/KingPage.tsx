// import React, { useState } from "react";

// const API = "https://cpmmarker.onrender.com";

// export default function AccountBoosting() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [receiptFile, setReceiptFile] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const amount = 49.99;

//   const handleSubmit = async () => {
//     if (!email || !password || !receiptFile) {
//       alert("Заполни все поля");
//       return;
//     }

//     setLoading(true);
//     setSuccess(false);

//     try {
//       const token = localStorage.getItem("token");

//       const formData = new FormData();
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("amount", String(amount));
//       formData.append("receipt", receiptFile);

//       const res = await fetch(`${API}/telegram/boost-to-tg`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.success) {
//         setSuccess(true);
//         setEmail("");
//         setPassword("");
//         setReceiptFile(null);
//       } else {
//         alert(data.error || "Ошибка отправки");
//       }
//     } catch (e) {
//       console.log(e);
//       alert("Сервер недоступен (Render sleep или ошибка)");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#06060c] text-white flex items-center justify-center p-6">

//       <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* LEFT */}
//         <div className="relative rounded-2xl overflow-hidden bg-[#0b0b14] border border-white/10 p-8 min-h-[600px]">

//           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e')] bg-cover bg-center opacity-20" />
//           <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black/40 to-black" />

//           <div className="relative z-10 flex flex-col justify-between h-full">

//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-[#121225]/60 p-4 rounded-xl border border-purple-500/20">
//                 <p className="text-xs text-gray-400">Прокачано</p>
//                 <p className="text-3xl font-black">12,540</p>
//               </div>

//               <div className="bg-[#121225]/60 p-4 rounded-xl border border-purple-500/20">
//                 <p className="text-xs text-gray-400">Рейтинг</p>
//                 <p className="text-3xl font-black">4.9</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3 mt-6">
//               <div className="bg-[#0e0e1c]/80 p-3 rounded-xl">🛡️ Безопасность</div>
//               <div className="bg-[#0e0e1c]/80 p-3 rounded-xl">⚡ Скорость</div>
//               <div className="bg-[#0e0e1c]/80 p-3 rounded-xl">🎧 Поддержка</div>
//               <div className="bg-[#0e0e1c]/80 p-3 rounded-xl">👤 Анонимно</div>
//             </div>

//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="bg-[#0b0b14] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">

//           <div>

//             <h1 className="text-3xl font-black">
//               Прокачка <span className="text-purple-500">аккаунта</span>
//             </h1>

//             <p className="text-xs text-gray-400 mt-2 mb-6">
//               Заполните данные и прикрепите чек оплаты
//             </p>

//             {/* EMAIL */}
//             <input
//               type="email"
//               placeholder="Email аккаунта"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mb-3 bg-[#121225] border border-white/10 rounded-xl p-3 text-sm"
//             />

//             {/* PASSWORD */}
//             <input
//               type="password"
//               placeholder="Пароль"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full mb-3 bg-[#121225] border border-white/10 rounded-xl p-3 text-sm"
//             />

//             {/* AMOUNT */}
//             <div className="mb-4 bg-[#121225] border border-purple-500/20 rounded-xl p-4 flex justify-between">
//               <span className="text-sm text-gray-400">Сумма</span>
//               <span className="text-emerald-400 font-bold">
//                 {amount} $
//               </span>
//             </div>

//             {/* FILE UPLOAD */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
//               className="mb-2"
//             />

//             {receiptFile && (
//               <p className="text-xs text-purple-400 mb-3">
//                 📎 {receiptFile.name}
//               </p>
//             )}

//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={handleSubmit}
//             disabled={!email || !password || !receiptFile || loading || success}
//             className={`w-full py-4 rounded-xl font-bold transition ${
//               success
//                 ? "bg-emerald-600"
//                 : loading
//                 ? "bg-gray-600"
//                 : "bg-purple-600 hover:bg-purple-500"
//             }`}
//           >
//             {success
//               ? "Отправлено ✔"
//               : loading
//               ? "Отправка..."
//               : "Оплатить"}
//           </button>

//           {success && (
//             <p className="text-center text-emerald-400 text-sm mt-3">
//               ✔ Отправлено в Telegram
//             </p>
//           )}

//         </div>

//       </div>
//     </div>
//   );
// }



import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Shield, Zap, Headphones, Lock,
  Upload, X, CheckCircle2, ChevronRight, Star, Crown,
} from "lucide-react";
import Navbar from "../components/Navbar";

const API = "https://cpmmarker.onrender.com";

/* ─── field ─── */
function Field({
  label, value, onChange, placeholder = "", type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <p className="font-black uppercase tracking-[0.22em] mb-1.5"
        style={{ fontSize: 8, color: "rgba(255,255,255,0.28)" }}>
        {label}
      </p>
      <div className="flex items-center px-4 transition-all duration-200"
        style={{
          height: 50,
          background: "rgba(0,0,0,0.4)",
          border: `1px solid ${focused ? "#FF3D0060" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 2,
          boxShadow: focused ? "0 0 0 3px rgba(255,61,0,0.05)" : "none",
        }}>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent border-none focus:outline-none font-bold"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", caretColor: "#FF3D00" }}
        />
      </div>
    </div>
  );
}

const AMOUNT = 7.000;

const STATS = [
  { label: "Прокачано", val: "12,540", sub: "аккаунтов" },
  { label: "Рейтинг",   val: "4.9",   sub: "★★★★★" },
];

const PERKS = [
  { icon: Shield,     label: "Безопасность",    sub: "100% гарантия" },
  { icon: Zap,        label: "Скорость",         sub: "от 15 минут" },
  { icon: Headphones, label: "Поддержка",        sub: "24/7 онлайн" },
  { icon: Lock,       label: "Анонимно",         sub: "данные под защитой" },
];

export default function AccountBoosting() {
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [receipt, setReceipt]     = useState<File | null>(null);
  const [preview, setPreview]     = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setReceipt(f);
    const r = new FileReader();
    r.onload = () => setPreview(r.result as string);
    r.readAsDataURL(f);
  };

  const handleSubmit = async () => {
    if (!email || !password || !receipt) { alert("Заполните все поля"); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("email", email);
      fd.append("password", password);
      fd.append("amount", String(AMOUNT));
      fd.append("receipt", receipt);
      const res = await fetch(`${API}/telegram/boost-to-tg`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setEmail(""); setPassword(""); setReceipt(null); setPreview(null);
      } else { alert(data.error || "Ошибка отправки"); }
    } catch { alert("Сервер недоступен"); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white pb-24 pt-20" style={{ background: "#080809" }}>
      {/* bg atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 35% at 50% -5%, #FF3D000E 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 40% at 0% 80%, #FF3D0006, transparent)," +
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "auto,auto,44px 44px,44px 44px",
        }}
      />

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* ══ LEFT: stats + perks ══ */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden flex flex-col justify-between"
            style={{
              background: "#0D0D0F",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2,
              minHeight: 560,
            }}
          >
            {/* top accent */}
            <div className="absolute top-0 inset-x-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />

            {/* bg image overlay */}
            <div className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800')",
                backgroundSize: "cover", backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 30%, #0D0D0F 100%)" }} />
            {/* scanlines */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)" }} />

            <div className="relative z-10 p-7 flex flex-col justify-between h-full gap-8">

              {/* eyebrow + title */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-5" style={{ background: "#FF3D0060" }} />
                  <span className="font-black uppercase tracking-[0.38em]"
                    style={{ fontSize: 8, color: "#FF3D0088" }}>
                    CPM Boost Service
                  </span>
                </div>
                <h1 className="font-black italic uppercase tracking-tighter leading-[0.85]"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
                  <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.13)", color: "transparent" }}>
                    ACCOUNT
                  </span>
                  <br />
                  <span style={{ color: "#FF3D00", textShadow: "0 0 32px #FF3D0077" }}>
                    BOOST
                  </span>
                  {"  "}
                  <span style={{ color: "#FF3D00", textShadow: "0 0 32px #FF3D0077" }}>///</span>
                </h1>
                <p className="font-bold mt-3" style={{ fontSize: 10, color: "rgba(255,255,255,0.22)" }}>
                  Профессиональная прокачка аккаунта · быстро и безопасно
                </p>
              </div>

              {/* stats */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="relative overflow-hidden p-4"
                    style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2 }}>
                    <div className="absolute top-0 inset-x-0 h-[1.5px]"
                      style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />
                    <p className="font-black uppercase tracking-widest mb-1"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
                      {s.label}
                    </p>
                    <p className="font-black italic tracking-tighter leading-none"
                      style={{ fontSize: 30, color: "#FF3D00", textShadow: "0 0 20px #FF3D0055" }}>
                      {s.val}
                    </p>
                    <p className="font-bold mt-1"
                      style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* perks */}
              <div className="grid grid-cols-2 gap-2.5">
                {PERKS.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-2.5 p-3"
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
                    <div className="w-7 h-7 flex items-center justify-center shrink-0"
                      style={{
                        background: "#FF3D0015", border: "1px solid #FF3D0035",
                        clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                      }}>
                      <Icon size={12} style={{ color: "#FF3D00" }} />
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest"
                        style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}>
                        {label}
                      </p>
                      <p style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* ══ RIGHT: form ══ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden flex flex-col justify-between"
            style={{
              background: "#0D0D0F",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2,
            }}
          >
            <div className="absolute top-0 inset-x-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, #FF3D00 40%, transparent)" }} />
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.7) 4px, rgba(0,0,0,0.7) 5px)" }} />

            <div className="relative p-7 space-y-5 flex-1">
              {/* header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 flex items-center justify-center shrink-0"
                  style={{
                    background: "#FF3D0018", border: "1px solid #FF3D0040",
                    clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                  }}>
                  <Crown size={14} style={{ color: "#FF3D00" }} />
                </div>
                <div>
                  <h2 className="font-black italic uppercase tracking-tighter" style={{ fontSize: 18 }}>
                    Прокачка <span style={{ color: "#FF3D00" }}>аккаунта</span>
                  </h2>
                  <p className="font-black uppercase tracking-widest"
                    style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>
                    Заполните данные и прикрепите чек
                  </p>
                </div>
              </div>

              <Field label="Email аккаунта"  value={email}    onChange={setEmail}    placeholder="example@mail.com" type="email" />
              <Field label="Пароль аккаунта" value={password} onChange={setPassword} placeholder="••••••••" type="password" />

              {/* amount display */}
              <div className="flex items-center justify-between px-4 py-3"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <div>
                  <p className="font-black uppercase tracking-widest"
                    style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
                    Стоимость услуги
                  </p>
                  <p className="font-bold" style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                    Базовая прокачка · уровень, ресурсы, рейтинг
                  </p>
                </div>
                <span className="font-black italic tracking-tighter"
                  style={{ fontSize: 26, color: "#FF3D00", textShadow: "0 0 16px #FF3D0044" }}>
                  ${AMOUNT}
                </span>
              </div>

              {/* file upload */}
              <div>
                <p className="font-black uppercase tracking-[0.22em] mb-1.5"
                  style={{ fontSize: 8, color: "rgba(255,255,255,0.28)" }}>
                  Чек / скрин оплаты
                </p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

                {preview ? (
                  <div className="relative overflow-hidden"
                    style={{ borderRadius: 2, border: "1px solid #FF3D0035" }}>
                    <img src={preview} className="w-full object-cover" style={{ maxHeight: 140 }} />
                    <div className="absolute inset-x-0 bottom-0 h-10"
                      style={{ background: "linear-gradient(to top, #0D0D0F, transparent)" }} />
                    <button onClick={() => { setPreview(null); setReceipt(null); }}
                      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center"
                      style={{ background: "#FF3D0088", borderRadius: 2 }}>
                      <X size={13} style={{ color: "#fff" }} />
                    </button>
                    <p className="absolute bottom-2 left-3 font-black uppercase tracking-widest"
                      style={{ fontSize: 7, color: "rgba(255,255,255,0.4)" }}>
                      {receipt?.name}
                    </p>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 py-7 transition-all duration-200"
                    style={{ background: "rgba(0,0,0,0.28)", border: "1px dashed rgba(255,255,255,0.09)", borderRadius: 2 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#FF3D0040"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.09)"; }}
                  >
                    <Upload size={20} style={{ color: "rgba(255,255,255,0.18)" }} />
                    <p className="font-black uppercase tracking-widest"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
                      Перетащи или нажми для выбора
                    </p>
                    <p style={{ fontSize: 8, color: "rgba(255,255,255,0.12)" }}>PNG, JPG до 10MB</p>
                  </button>
                )}
              </div>
            </div>

            {/* footer */}
            <div className="relative px-7 pb-7 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <motion.button
                whileHover={{ scale: success || loading ? 1 : 1.02 }}
                whileTap={{ scale: success || loading ? 1 : 0.97 }}
                onClick={handleSubmit}
                disabled={loading || success}
                className="w-full flex items-center justify-center gap-2.5 py-4 font-black uppercase tracking-[0.25em]"
                style={{
                  fontSize: 11,
                  background: success
                    ? "#22c55e"
                    : loading
                    ? "rgba(255,61,0,0.3)"
                    : "#FF3D00",
                  color: loading ? "rgba(255,255,255,0.3)" : "#000",
                  clipPath: "polygon(0 0, 97% 0, 100% 35%, 100% 100%, 3% 100%, 0 65%)",
                  cursor: loading || success ? "not-allowed" : "pointer",
                  transition: "background 0.3s",
                }}
              >
                {success ? (
                  <><CheckCircle2 size={14} /> Отправлено ✔</>
                ) : loading ? (
                  <motion.div animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-4 h-4 rounded-full"
                    style={{ border: "2px solid transparent", borderTopColor: "rgba(255,255,255,0.5)" }} />
                ) : (
                  <><Zap size={13} fill="currentColor" /> Оплатить <ChevronRight size={13} /></>
                )}
              </motion.button>

              <p className="text-center font-bold mt-3"
                style={{ fontSize: 9, color: "rgba(255,255,255,0.15)" }}>
                Обработка заказа · 1–15 минут · данные защищены
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3"
            style={{
              background: "#0D0D0F",
              border: "1px solid #22c55e55",
              borderRadius: 2,
              boxShadow: "0 0 24px #22c55e18",
              clipPath: "polygon(0 0, 96% 0, 100% 30%, 100% 100%, 4% 100%, 0 70%)",
            }}
          >
            <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
            <span className="font-black uppercase tracking-widest"
              style={{ fontSize: 10, color: "#22c55e" }}>
              Отправлено в Telegram
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
