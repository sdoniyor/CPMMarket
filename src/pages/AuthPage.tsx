
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, User, Mail, Lock, Flame, ChevronRight, Flag, Link2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// type Mode = "login" | "register";

// const API = "https://cpmmarker.onrender.com";

// /* ─── styled input field ─── */
// function Field({
//   icon: Icon,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
//   suffix,
// }: {
//   icon: any;
//   value: string;
//   onChange: (v: string) => void;
//   placeholder: string;
//   type?: string;
//   suffix?: React.ReactNode;
// }) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <div
//       className="flex items-center gap-3 px-4 transition-all duration-250"
//       style={{
//         background: "rgba(0,0,0,0.35)",
//         border: `1px solid ${focused ? "#FF3D0055" : "rgba(255,255,255,0.07)"}`,
//         borderRadius: 2,
//         height: 52,
//       }}
//     >
//       <Icon size={15} style={{ color: focused ? "#FF3D00" : "rgba(255,255,255,0.2)", flexShrink: 0, transition: "color .2s" }} />
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         type={type}
//         placeholder={placeholder}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(false)}
//         className="flex-1 bg-transparent border-none focus:outline-none font-bold"
//         style={{
//           fontSize: 12,
//           color: "rgba(255,255,255,0.85)",
//           caretColor: "#FF3D00",
//         }}
//       />
//       {suffix}
//     </div>
//   );
// }

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
//       if (!res.ok) { alert(data?.error || "Auth error"); return; }
//       if (data?.token) {
//         localStorage.setItem("token", data.token);
//         if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/market", { replace: true });
//       }
//     } catch {
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden text-white"
//       style={{ background: "#080809" }}
//     >
//       {/* ── background ── */}
//       <div
//         className="fixed inset-0 pointer-events-none"
//         style={{
//           backgroundImage:
//             "radial-gradient(ellipse 70% 40% at 50% -5%, #FF3D0012 0%, transparent 60%)," +
//             "radial-gradient(ellipse 40% 30% at 100% 100%, #FF3D0008 0%, transparent 60%)," +
//             "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)," +
//             "linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
//           backgroundSize: "auto, auto, 44px 44px, 44px 44px",
//         }}
//       />

//       {/* ── speed lines (decorative) ── */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         {[15, 30, 55, 70, 85].map((top, i) => (
//           <div
//             key={i}
//             className="absolute h-px"
//             style={{
//               top: `${top}%`,
//               left: 0,
//               right: 0,
//               background: `linear-gradient(90deg, transparent, #FF3D00${["08","05","0a","06","04"][i]}, transparent)`,
//             }}
//           />
//         ))}
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//         className="relative z-10 w-full"
//         style={{ maxWidth: 420 }}
//       >
//         {/* ── card ── */}
//         <div
//           className="relative overflow-hidden"
//           style={{
//             background: "#0D0D0F",
//             border: "1px solid rgba(255,255,255,0.07)",
//             borderRadius: 2,
//           }}
//         >
//           {/* top accent stripe */}
//           <div
//             className="absolute top-0 inset-x-0 h-[2px]"
//             style={{ background: "linear-gradient(90deg, #FF3D00, #FF3D0000)" }}
//           />
//           {/* scanline */}
//           <div
//             className="absolute inset-0 pointer-events-none opacity-[0.07]"
//             style={{
//               backgroundImage:
//                 "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)",
//             }}
//           />

//           <div className="relative p-8">

//             {/* ── LOGO ── */}
//             <div className="text-center mb-8">
//               {/* icon */}
//               <div className="flex justify-center mb-5">
//                 <div
//                   className="w-14 h-14 flex items-center justify-center relative"
//                   style={{
//                     background: "#FF3D0018",
//                     border: "1px solid #FF3D0050",
//                     clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
//                   }}
//                 >
//                   <Flame size={24} style={{ color: "#FF3D00" }} />
//                   <div
//                     className="absolute bottom-0 right-0 w-3 h-3"
//                     style={{ background: "#FF3D00", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
//                   />
//                 </div>
//               </div>

//               {/* eyebrow */}
//               <div className="flex items-center justify-center gap-3 mb-3">
//                 <div className="h-px w-6" style={{ background: "#FF3D0050" }} />
//                 <span className="font-black uppercase tracking-[0.4em]" style={{ fontSize: 8, color: "#FF3D0088" }}>
//                   CPM Racing
//                 </span>
//                 <div className="h-px w-6" style={{ background: "#FF3D0050" }} />
//               </div>

//               <h1
//                 className="font-black italic uppercase tracking-tighter leading-none"
//                 style={{ fontSize: "clamp(2.2rem, 8vw, 2.8rem)" }}
//               >
//                 <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>
//                   CPM
//                 </span>
//                 {" "}
//                 <span style={{ color: "#FF3D00", textShadow: "0 0 28px #FF3D0066" }}>
//                   MARKET
//                 </span>
//               </h1>

//               <p
//                 className="font-bold uppercase tracking-[0.28em] mt-2"
//                 style={{ fontSize: 8, color: "rgba(255,255,255,0.18)" }}
//               >
//                 Premium Car Trading Platform
//               </p>
//             </div>

//             {/* ── MODE TOGGLE ── */}
//             <div
//               className="flex p-1 mb-7"
//               style={{
//                 background: "rgba(0,0,0,0.4)",
//                 border: "1px solid rgba(255,255,255,0.06)",
//                 borderRadius: 2,
//               }}
//             >
//               {(["login", "register"] as Mode[]).map((m) => {
//                 const active = mode === m;
//                 return (
//                   <button
//                     key={m}
//                     onClick={() => setMode(m)}
//                     className="flex-1 py-2.5 font-black uppercase tracking-[0.25em] transition-all duration-250 relative"
//                     style={{
//                       fontSize: 9,
//                       color: active ? "#000" : "rgba(255,255,255,0.3)",
//                       background: active ? "#FF3D00" : "transparent",
//                       clipPath: active
//                         ? "polygon(0 0, 94% 0, 100% 35%, 100% 100%, 6% 100%, 0 65%)"
//                         : "none",
//                     }}
//                   >
//                     {m === "login" ? "Login" : "Sign Up"}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* ── FIELDS ── */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={mode}
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.22 }}
//                 className="space-y-3"
//               >
//                 {isRegister && (
//                   <Field
//                     icon={User}
//                     value={name}
//                     onChange={setName}
//                     placeholder="Driver Name"
//                   />
//                 )}
//                 <Field
//                   icon={Mail}
//                   value={email}
//                   onChange={setEmail}
//                   placeholder="Email Address"
//                   type="email"
//                 />
//                 <Field
//                   icon={Lock}
//                   value={password}
//                   onChange={(v) => setPassword(v)}
//                   placeholder="Password"
//                   type={showPassword ? "text" : "password"}
//                   suffix={
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="shrink-0 transition-colors duration-200"
//                       style={{ color: "rgba(255,255,255,0.2)" }}
//                       onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
//                       onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.2)")}
//                     >
//                       {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
//                     </button>
//                   }
//                 />
//               </motion.div>
//             </AnimatePresence>

//             {/* ── REFERRAL BADGE ── */}
//             <AnimatePresence>
//               {ref && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="mt-4 overflow-hidden"
//                 >
//                   <div
//                     className="flex items-center gap-3 px-4 py-3"
//                     style={{
//                       background: "#00E5FF10",
//                       border: "1px solid #00E5FF35",
//                       borderRadius: 2,
//                     }}
//                   >
//                     <Link2 size={12} style={{ color: "#00E5FF" }} />
//                     <div>
//                       <p className="font-black uppercase tracking-widest" style={{ fontSize: 8, color: "#00E5FF88" }}>
//                         Referral Code
//                       </p>
//                       <p className="font-black italic" style={{ fontSize: 13, color: "#00E5FF" }}>
//                         {ref}
//                       </p>
//                     </div>
//                     <div className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00E5FF" }} />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* ── SUBMIT ── */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={handleAuth}
//               disabled={loading}
//               className="w-full mt-6 flex items-center justify-center gap-3 py-4 font-black uppercase tracking-[0.25em] transition-all duration-200"
//               style={{
//                 background: loading ? "rgba(255,61,0,0.3)" : "#FF3D00",
//                 color: loading ? "rgba(255,255,255,0.4)" : "#000",
//                 fontSize: 11,
//                 clipPath: "polygon(0 0, 97% 0, 100% 35%, 100% 100%, 3% 100%, 0 65%)",
//                 cursor: loading ? "not-allowed" : "pointer",
//               }}
//             >
//               {loading ? (
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//                   className="w-4 h-4 rounded-full"
//                   style={{ border: "2px solid transparent", borderTopColor: "rgba(255,255,255,0.4)" }}
//                 />
//               ) : (
//                 <>
//                   <Flag size={13} />
//                   {isRegister ? "Create Account" : "Sign In"}
//                   <ChevronRight size={13} />
//                 </>
//               )}
//             </motion.button>

//             {/* ── switch mode link ── */}
//             <div className="mt-5 text-center">
//               <button
//                 onClick={() => setMode(isRegister ? "login" : "register")}
//                 className="font-bold uppercase tracking-widest transition-colors duration-200"
//                 style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}
//                 onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
//                 onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.2)")}
//               >
//                 {isRegister ? "Already have an account? Sign In →" : "New here? Create Account →"}
//               </button>
//             </div>

//             {/* ── footer ── */}
//             <p
//               className="text-center font-black uppercase tracking-[0.25em] mt-7"
//               style={{ fontSize: 7, color: "rgba(255,255,255,0.08)" }}
//             >
//               CPM Marker Security System v2.0
//             </p>
//           </div>
//         </div>

//         {/* bottom corner marks */}
//         <div className="flex justify-between mt-2 px-1">
//           {[0, 1, 2, 3, 4].map((i) => (
//             <div key={i} className="w-1 h-1 rotate-45" style={{ background: `rgba(255,61,0,${0.06 + i * 0.04})` }} />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Flame, ChevronRight, Flag, Link2, TriangleAlert } from "lucide-react";
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
  error,
}: {
  icon: any;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  suffix?: React.ReactNode;
  error?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error
    ? "#FF3D00cc"
    : focused
    ? "#FF3D0055"
    : "rgba(255,255,255,0.07)";

  return (
    <div
      className="flex items-center gap-3 px-4 transition-all duration-200"
      style={{
        background: error ? "rgba(255,61,0,0.06)" : "rgba(0,0,0,0.35)",
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        height: 52,
        boxShadow: error ? "0 0 0 3px rgba(255,61,0,0.08)" : "none",
      }}
    >
      <Icon
        size={15}
        style={{
          color: error ? "#FF3D00" : focused ? "#FF3D00" : "rgba(255,255,255,0.2)",
          flexShrink: 0,
          transition: "color .2s",
        }}
      />
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

/* ─── error banner ─── */
function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -4, height: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 mt-3"
        style={{
          background: "rgba(255,61,0,0.08)",
          border: "1px solid rgba(255,61,0,0.35)",
          borderRadius: 2,
          clipPath: "polygon(0 0, 98% 0, 100% 30%, 100% 100%, 2% 100%, 0 70%)",
        }}
      >
        <TriangleAlert size={13} style={{ color: "#FF3D00", flexShrink: 0 }} />
        <p className="font-black uppercase tracking-widest" style={{ fontSize: 9, color: "#FF3D00" }}>
          {message}
        </p>
      </div>
    </motion.div>
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
  const [error, setError] = useState<string | null>(null);

  // which field has error
  const [errorField, setErrorField] = useState<"name" | "email" | "password" | null>(null);

  const isRegister = mode === "register";

  useEffect(() => {
    const urlRef = new URLSearchParams(window.location.search).get("ref");
    if (urlRef) {
      localStorage.removeItem("token");
      setRef(urlRef);
      setMode("register");
    }
  }, []);

  // clear error when user types
  useEffect(() => { setError(null); setErrorField(null); }, [name, email, password, mode]);

  const detectErrorField = (msg: string): "name" | "email" | "password" | null => {
    const m = msg.toLowerCase();
    if (m.includes("имя") || m.includes("name")) return "name";
    if (m.includes("email") || m.includes("почт") || m.includes("домен") || m.includes("gmail")) return "email";
    if (m.includes("пароль") || m.includes("password")) return "password";
    return null;
  };

  const handleAuth = async () => {
    setError(null);
    setErrorField(null);

    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    if (isRegister && !name) {
      setError("Введите имя");
      setErrorField("name");
      return;
    }

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
        const msg = data?.error || "Ошибка авторизации";
        setError(msg);
        setErrorField(detectErrorField(msg));
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/market", { replace: true });
      }
    } catch {
      setError("Сервер недоступен, попробуйте позже");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden text-white"
      style={{ background: "#080809" }}
    >
      {/* bg */}
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

      {/* speed lines */}
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
        {/* card */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "#0D0D0F",
            border: `1px solid ${error ? "rgba(255,61,0,0.25)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 2,
            transition: "border-color 0.3s",
          }}
        >
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #FF3D00, #FF3D0000)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)",
            }}
          />

          <div className="relative p-8">

            {/* LOGO */}
            <div className="text-center mb-8">
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
                <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>CPM</span>
                {" "}
                <span style={{ color: "#FF3D00", textShadow: "0 0 28px #FF3D0066" }}>MARKET</span>
              </h1>

              <p className="font-bold uppercase tracking-[0.28em] mt-2" style={{ fontSize: 8, color: "rgba(255,255,255,0.18)" }}>
                Premium Car Trading Platform
              </p>
            </div>

            {/* MODE TOGGLE */}
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
                    className="flex-1 py-2.5 font-black uppercase tracking-[0.25em] transition-all duration-250"
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

            {/* FIELDS */}
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
                    error={errorField === "name"}
                  />
                )}
                <Field
                  icon={Mail}
                  value={email}
                  onChange={setEmail}
                  placeholder="Email Address"
                  type="email"
                  error={errorField === "email"}
                />
                <Field
                  icon={Lock}
                  value={password}
                  onChange={setPassword}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  error={errorField === "password"}
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

            {/* ERROR BANNER */}
            <AnimatePresence>
              {error && <ErrorBanner message={error} />}
            </AnimatePresence>

            {/* REFERRAL BADGE */}
            <AnimatePresence>
              {ref && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 overflow-hidden"
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

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              onClick={handleAuth}
              disabled={loading}
              className="w-full mt-5 flex items-center justify-center gap-3 py-4 font-black uppercase tracking-[0.25em] transition-all duration-200"
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

            {/* switch mode */}
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

            <p className="text-center font-black uppercase tracking-[0.25em] mt-7" style={{ fontSize: 7, color: "rgba(255,255,255,0.08)" }}>
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
