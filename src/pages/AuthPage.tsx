
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, User, Mail, Lock, Car, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type Mode = "login" | "register";

// const API = "https://cpmmarker.onrender.com";

// export default function Auth() {
//   const navigate = useNavigate();
//   const [mode, setMode] = useState<Mode>("login");
//   const [showPassword, setShowPassword] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [ref, setRef] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const isRegister = mode === "register";

//   useEffect(() => {
//     const urlRef = new URLSearchParams(window.location.search).get("ref");
//     if (urlRef) {
//       localStorage.removeItem("token");
//       setRef(urlRef);
//       setMode("register");
//     }
//   }, []);

//   const handleAuth = async () => {
//     if (!email || !password) return alert("Fill all fields");
//     try {
//       setLoading(true);
//       const endpoint = isRegister ? "/auth/register" : "/auth/login";
//       const body = isRegister 
//         ? { name, email, password, referredBy: ref || null } 
//         : { email, password };

//       const res = await fetch(`${API}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         alert(data?.error || "Auth error");
//         return;
//       }
//       if (data?.token) {
//         localStorage.setItem("token", data.token);
//         if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/market", { replace: true });
//       }
//     } catch (e) {
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#08090a] text-white px-4 relative overflow-hidden font-sans">
      
//       {/* ДИНАМИЧНЫЙ ФОН: Глоу-эффекты как от фар */}
//       <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-yellow-400/5 blur-[120px] rounded-full animate-pulse" />
//       <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-yellow-500/5 blur-[100px] rounded-full" />

//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="w-full max-w-[420px] z-10"
//       >
//         {/* КАРТОЧКА: Эффект карбона и стекла */}
//         <div className="relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
//           <div className="relative bg-[#111214] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
            
//             {/* LOGO SECTION */}
//             <div className="text-center mb-8">
//               <motion.div 
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//                 className="inline-block p-3 bg-yellow-400 rounded-2xl mb-4 shadow-[0_0_25px_rgba(250,204,21,0.4)]"
//               >
//                 <Car size={32} className="text-black" />
//               </motion.div>
//               <h1 className="text-4xl font-black italic tracking-tighter">
//                 CPM <span className="text-yellow-400">MARKET</span>
//               </h1>
//               <p className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
//                 Premium Car Trading Platform
//               </p>
//             </div>

//             {/* TOGGLE SWITCH: Спортивный стиль */}
//             <div className="flex bg-black/60 rounded-2xl p-1.5 mb-8 border border-white/5">
//               <button
//                 onClick={() => setMode("login")}
//                 className={`flex-1 py-3 rounded-xl text-xs font-black transition-all duration-300 ${
//                   mode === "login" ? "bg-yellow-400 text-black shadow-lg" : "text-white/40 hover:text-white"
//                 }`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => setMode("register")}
//                 className={`flex-1 py-3 rounded-xl text-xs font-black transition-all duration-300 ${
//                   mode === "register" ? "bg-yellow-400 text-black shadow-lg" : "text-white/40 hover:text-white"
//                 }`}
//               >
//                 SIGN UP
//               </button>
//             </div>

//             {/* INPUTS AREA */}
//             <div className="space-y-4">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={mode}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="space-y-4"
//                 >
//                   {isRegister && (
//                     <div className="relative group">
//                       <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
//                       <input
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Driver Name"
//                         className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:border-yellow-400/50 outline-none transition-all placeholder:text-white/20 text-sm font-medium"
//                       />
//                     </div>
//                   )}

//                   <div className="relative group">
//                     <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
//                     <input
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Email Address"
//                       className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:border-yellow-400/50 outline-none transition-all placeholder:text-white/20 text-sm font-medium"
//                     />
//                   </div>

//                   <div className="relative group">
//                     <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
//                     <input
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       className="w-full bg-black/40 border border-white/10 p-4 pl-12 pr-12 rounded-2xl focus:border-yellow-400/50 outline-none transition-all placeholder:text-white/20 text-sm font-medium"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* REFERRAL BADGE */}
//             {ref && (
//               <motion.div 
//                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                 className="mt-4 p-3 bg-yellow-400/5 border border-yellow-400/20 rounded-xl flex items-center justify-center gap-2"
//               >
//                 <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
//                 <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Referral: {ref}</span>
//               </motion.div>
//             )}

//             {/* SUBMIT BUTTON: С пульсацией */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleAuth}
//               disabled={loading}
//               className="w-full mt-8 bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(250,204,21,0.2)] flex items-center justify-center gap-3 group transition-all"
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
//               ) : (
//                 <>
//                   {isRegister ? "Create Account" : "Sign In"}
//                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </motion.button>

//             {/* FOOTER INFO */}
//             <p className="text-center text-white/10 text-[9px] font-bold uppercase tracking-[0.2em] mt-8">
//               CPM Marker Security System v2.0
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Flame, ChevronRight, Flag, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "login" | "register";

const API = "https://cpmmarker.onrender.com";

/* ─── styled input field ─── */
function Field({
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  suffix,
}: {
  icon: any;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  suffix?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center gap-3 px-4 transition-all duration-250"
      style={{
        background: "rgba(0,0,0,0.35)",
        border: `1px solid ${focused ? "#FF3D0055" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 2,
        height: 52,
      }}
    >
      <Icon size={15} style={{ color: focused ? "#FF3D00" : "rgba(255,255,255,0.2)", flexShrink: 0, transition: "color .2s" }} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent border-none focus:outline-none font-bold"
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.85)",
          caretColor: "#FF3D00",
        }}
      />
      {suffix}
    </div>
  );
}

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ref, setRef] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  useEffect(() => {
    const urlRef = new URLSearchParams(window.location.search).get("ref");
    if (urlRef) {
      localStorage.removeItem("token");
      setRef(urlRef);
      setMode("register");
    }
  }, []);

  const handleAuth = async () => {
    if (!email || !password) return alert("Fill all fields");
    try {
      setLoading(true);
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const body = isRegister
        ? { name, email, password, referredBy: ref || null }
        : { email, password };

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { alert(data?.error || "Auth error"); return; }
      if (data?.token) {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/market", { replace: true });
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden text-white"
      style={{ background: "#080809" }}
    >
      {/* ── background ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 40% at 50% -5%, #FF3D0012 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 30% at 100% 100%, #FF3D0008 0%, transparent 60%)," +
            "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 44px 44px, 44px 44px",
        }}
      />

      {/* ── speed lines (decorative) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 30, 55, 70, 85].map((top, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              top: `${top}%`,
              left: 0,
              right: 0,
              background: `linear-gradient(90deg, transparent, #FF3D00${["08","05","0a","06","04"][i]}, transparent)`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full"
        style={{ maxWidth: 420 }}
      >
        {/* ── card ── */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "#0D0D0F",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2,
          }}
        >
          {/* top accent stripe */}
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #FF3D00, #FF3D0000)" }}
          />
          {/* scanline */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)",
            }}
          />

          <div className="relative p-8">

            {/* ── LOGO ── */}
            <div className="text-center mb-8">
              {/* icon */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-14 h-14 flex items-center justify-center relative"
                  style={{
                    background: "#FF3D0018",
                    border: "1px solid #FF3D0050",
                    clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
                  }}
                >
                  <Flame size={24} style={{ color: "#FF3D00" }} />
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3"
                    style={{ background: "#FF3D00", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                  />
                </div>
              </div>

              {/* eyebrow */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-6" style={{ background: "#FF3D0050" }} />
                <span className="font-black uppercase tracking-[0.4em]" style={{ fontSize: 8, color: "#FF3D0088" }}>
                  CPM Racing
                </span>
                <div className="h-px w-6" style={{ background: "#FF3D0050" }} />
              </div>

              <h1
                className="font-black italic uppercase tracking-tighter leading-none"
                style={{ fontSize: "clamp(2.2rem, 8vw, 2.8rem)" }}
              >
                <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>
                  CPM
                </span>
                {" "}
                <span style={{ color: "#FF3D00", textShadow: "0 0 28px #FF3D0066" }}>
                  MARKET
                </span>
              </h1>

              <p
                className="font-bold uppercase tracking-[0.28em] mt-2"
                style={{ fontSize: 8, color: "rgba(255,255,255,0.18)" }}
              >
                Premium Car Trading Platform
              </p>
            </div>

            {/* ── MODE TOGGLE ── */}
            <div
              className="flex p-1 mb-7"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 2,
              }}
            >
              {(["login", "register"] as Mode[]).map((m) => {
                const active = mode === m;
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className="flex-1 py-2.5 font-black uppercase tracking-[0.25em] transition-all duration-250 relative"
                    style={{
                      fontSize: 9,
                      color: active ? "#000" : "rgba(255,255,255,0.3)",
                      background: active ? "#FF3D00" : "transparent",
                      clipPath: active
                        ? "polygon(0 0, 94% 0, 100% 35%, 100% 100%, 6% 100%, 0 65%)"
                        : "none",
                    }}
                  >
                    {m === "login" ? "Login" : "Sign Up"}
                  </button>
                );
              })}
            </div>

            {/* ── FIELDS ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-3"
              >
                {isRegister && (
                  <Field
                    icon={User}
                    value={name}
                    onChange={setName}
                    placeholder="Driver Name"
                  />
                )}
                <Field
                  icon={Mail}
                  value={email}
                  onChange={setEmail}
                  placeholder="Email Address"
                  type="email"
                />
                <Field
                  icon={Lock}
                  value={password}
                  onChange={(v) => setPassword(v)}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="shrink-0 transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.2)")}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  }
                />
              </motion.div>
            </AnimatePresence>

            {/* ── REFERRAL BADGE ── */}
            <AnimatePresence>
              {ref && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      background: "#00E5FF10",
                      border: "1px solid #00E5FF35",
                      borderRadius: 2,
                    }}
                  >
                    <Link2 size={12} style={{ color: "#00E5FF" }} />
                    <div>
                      <p className="font-black uppercase tracking-widest" style={{ fontSize: 8, color: "#00E5FF88" }}>
                        Referral Code
                      </p>
                      <p className="font-black italic" style={{ fontSize: 13, color: "#00E5FF" }}>
                        {ref}
                      </p>
                    </div>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00E5FF" }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── SUBMIT ── */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAuth}
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-3 py-4 font-black uppercase tracking-[0.25em] transition-all duration-200"
              style={{
                background: loading ? "rgba(255,61,0,0.3)" : "#FF3D00",
                color: loading ? "rgba(255,255,255,0.4)" : "#000",
                fontSize: 11,
                clipPath: "polygon(0 0, 97% 0, 100% 35%, 100% 100%, 3% 100%, 0 65%)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 rounded-full"
                  style={{ border: "2px solid transparent", borderTopColor: "rgba(255,255,255,0.4)" }}
                />
              ) : (
                <>
                  <Flag size={13} />
                  {isRegister ? "Create Account" : "Sign In"}
                  <ChevronRight size={13} />
                </>
              )}
            </motion.button>

            {/* ── switch mode link ── */}
            <div className="mt-5 text-center">
              <button
                onClick={() => setMode(isRegister ? "login" : "register")}
                className="font-bold uppercase tracking-widest transition-colors duration-200"
                style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.2)")}
              >
                {isRegister ? "Already have an account? Sign In →" : "New here? Create Account →"}
              </button>
            </div>

            {/* ── footer ── */}
            <p
              className="text-center font-black uppercase tracking-[0.25em] mt-7"
              style={{ fontSize: 7, color: "rgba(255,255,255,0.08)" }}
            >
              CPM Marker Security System v2.0
            </p>
          </div>
        </div>

        {/* bottom corner marks */}
        <div className="flex justify-between mt-2 px-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="w-1 h-1 rotate-45" style={{ background: `rgba(255,61,0,${0.06 + i * 0.04})` }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
