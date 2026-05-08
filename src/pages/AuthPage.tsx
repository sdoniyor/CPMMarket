
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";

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

//   /* ================= REF + FORCE AUTH ================= */
//   useEffect(() => {
//     const urlRef = new URLSearchParams(window.location.search).get("ref");

//     if (urlRef) {
//       // 🔥 ВАЖНО: сбрасываем токен если пришли по рефералке
//       localStorage.removeItem("token");

//       setRef(urlRef);
//       setMode("register");
//     }
//   }, []);

//   /* ================= AUTH ================= */
//   const handleAuth = async () => {
//   if (!email || !password) return alert("Fill all fields");

//   try {
//     setLoading(true);

//     const endpoint = isRegister ? "/auth/register" : "/auth/login";

//     const body = isRegister
//       ? {
//           name,
//           email,
//           password,
//           referredBy: ref || null,
//         }
//       : { email, password };

//     const res = await fetch(`${API}${endpoint}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data?.error || "Auth error");
//       return;
//     }

//     if (data?.token) {
//       localStorage.setItem("token", data.token);

//       // 🔥 ВАЖНО ДОБАВИТЬ ЭТО:
//       if (data.user) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//       }

//       navigate("/market", { replace: true });
//     }
//   } catch (e) {
//     console.log(e);
//     alert("Server error");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0a0b0d] text-white px-4">

//       <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8">

//         <h1 className="text-3xl font-black text-center mb-2">
//           CPM <span className="text-yellow-400">MARKET</span>
//         </h1>

//         <p className="text-center text-white/40 mb-6 text-sm">
//           Welcome back
//         </p>

//         {ref && (
//           <div className="mb-4 text-center text-xs text-yellow-400">
//             🔥 Referral active: {ref}
//           </div>
//         )}

//         <div className="flex bg-black/40 rounded-xl p-1 mb-6">
//           <button
//             onClick={() => setMode("login")}
//             className={`flex-1 py-2 rounded-lg font-bold ${
//               mode === "login" ? "bg-yellow-400 text-black" : "text-white/50"
//             }`}
//           >
//             LOGIN
//           </button>

//           <button
//             onClick={() => setMode("register")}
//             className={`flex-1 py-2 rounded-lg font-bold ${
//               mode === "register" ? "bg-yellow-400 text-black" : "text-white/50"
//             }`}
//           >
//             SIGN UP
//           </button>
//         </div>

//         <div className="space-y-3">

//           {isRegister && (
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Username"
//               className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
//             />
//           )}

//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
//           />

//           <div className="relative">
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-white/50"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>

//         <button
//           onClick={handleAuth}
//           disabled={loading}
//           className="w-full mt-6 py-3 rounded-xl bg-yellow-400 text-black font-black"
//         >
//           {loading ? "Loading..." : isRegister ? "CREATE ACCOUNT" : "SIGN IN"}
//         </button>

//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Car, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "login" | "register";

const API = "https://cpmmarker.onrender.com";

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
      if (!res.ok) {
        alert(data?.error || "Auth error");
        return;
      }
      if (data?.token) {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/market", { replace: true });
      }
    } catch (e) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08090a] text-white px-4 relative overflow-hidden font-sans">
      
      {/* ДИНАМИЧНЫЙ ФОН: Глоу-эффекты как от фар */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-yellow-400/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-yellow-500/5 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px] z-10"
      >
        {/* КАРТОЧКА: Эффект карбона и стекла */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-[#111214] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
            
            {/* LOGO SECTION */}
            <div className="text-center mb-8">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-3 bg-yellow-400 rounded-2xl mb-4 shadow-[0_0_25px_rgba(250,204,21,0.4)]"
              >
                <Car size={32} className="text-black" />
              </motion.div>
              <h1 className="text-4xl font-black italic tracking-tighter">
                CPM <span className="text-yellow-400">MARKET</span>
              </h1>
              <p className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
                Premium Car Trading Platform
              </p>
            </div>

            {/* TOGGLE SWITCH: Спортивный стиль */}
            <div className="flex bg-black/60 rounded-2xl p-1.5 mb-8 border border-white/5">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all duration-300 ${
                  mode === "login" ? "bg-yellow-400 text-black shadow-lg" : "text-white/40 hover:text-white"
                }`}
              >
                LOGIN
              </button>
              <button
                onClick={() => setMode("register")}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all duration-300 ${
                  mode === "register" ? "bg-yellow-400 text-black shadow-lg" : "text-white/40 hover:text-white"
                }`}
              >
                SIGN UP
              </button>
            </div>

            {/* INPUTS AREA */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {isRegister && (
                    <div className="relative group">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Driver Name"
                        className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:border-yellow-400/50 outline-none transition-all placeholder:text-white/20 text-sm font-medium"
                      />
                    </div>
                  )}

                  <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:border-yellow-400/50 outline-none transition-all placeholder:text-white/20 text-sm font-medium"
                    />
                  </div>

                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full bg-black/40 border border-white/10 p-4 pl-12 pr-12 rounded-2xl focus:border-yellow-400/50 outline-none transition-all placeholder:text-white/20 text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* REFERRAL BADGE */}
            {ref && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-yellow-400/5 border border-yellow-400/20 rounded-xl flex items-center justify-center gap-2"
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Referral: {ref}</span>
              </motion.div>
            )}

            {/* SUBMIT BUTTON: С пульсацией */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAuth}
              disabled={loading}
              className="w-full mt-8 bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(250,204,21,0.2)] flex items-center justify-center gap-3 group transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  {isRegister ? "Create Account" : "Sign In"}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            {/* FOOTER INFO */}
            <p className="text-center text-white/10 text-[9px] font-bold uppercase tracking-[0.2em] mt-8">
              CPM Marker Security System v2.0
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}