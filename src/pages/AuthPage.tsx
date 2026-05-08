
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
import { Eye, EyeOff, User, Mail, Lock, Car } from "lucide-react";
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
    if (!email || !password || (isRegister && !name)) return alert("Fill all fields");

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
    <div className="min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden relative font-sans">
      {/* Декоративные элементы фона (эффект фар/неона) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-400/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10 px-4"
      >
        <div className="bg-[#111214] border border-white/5 shadow-2xl rounded-[2rem] overflow-hidden relative">
          
          {/* Верхняя часть с логотипом */}
          <div className="p-8 pb-4 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-4 rotate-3 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
            >
              <Car size={32} className="text-black -rotate-3" />
            </motion.div>
            
            <h1 className="text-4xl font-[900] tracking-tighter italic">
              CPM <span className="text-yellow-400 text-stroke-sm">MARKET</span>
            </h1>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-2 font-bold">
              The Ultimate Car Exchange
            </p>
          </div>

          {/* Переключатель */}
          <div className="px-8 mb-6">
            <div className="flex bg-black/50 p-1 rounded-2xl border border-white/5 relative">
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-1 bg-yellow-400 rounded-xl"
                initial={false}
                animate={{ x: mode === "login" ? "0%" : "100%" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                style={{ width: "calc(50% - 4px)" }}
              />
              <button
                onClick={() => setMode("login")}
                className={`relative z-10 flex-1 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                  mode === "login" ? "text-black" : "text-white/50 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("register")}
                className={`relative z-10 flex-1 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                  mode === "register" ? "text-black" : "text-white/50 hover:text-white"
                }`}
              >
                Join Race
              </button>
            </div>
          </div>

          {/* Форма */}
          <div className="px-8 pb-10 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {isRegister && (
                  <div className="group">
                    <div className="relative flex items-center">
                      <User size={18} className="absolute left-4 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Driver Nickname"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/5 transition-all outline-none text-sm font-medium"
                      />
                    </div>
                  </div>
                )}

                <div className="group">
                  <div className="relative flex items-center">
                    <Mail size={18} className="absolute left-4 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email Address"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/5 transition-all outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="group relative">
                  <div className="relative flex items-center">
                    <Lock size={18} className="absolute left-4 text-white/20 group-focus-within:text-yellow-400 transition-colors" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Security Key"
                      className="w-full pl-12 pr-12 py-4 rounded-2xl bg-black/40 border border-white/5 focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/5 transition-all outline-none text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {ref && isRegister && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-2 px-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl text-center"
              >
                <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">
                  🏁 Referral Bonus Active: {ref}
                </span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAuth}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-yellow-400 text-black font-[900] uppercase tracking-tighter text-lg shadow-[0_10px_20px_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>{isRegister ? "Start Your Engine" : "Ignition"}</>
              )}
            </motion.button>

            <p className="text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.1em]">
              Authorized Access Only • Server: Render-OS v2.4
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}