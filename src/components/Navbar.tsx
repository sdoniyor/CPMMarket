
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Wallet, LayoutGrid } from "lucide-react";
// import { motion } from "framer-motion";

// const SERVER_URL = "https://cpmmarker.onrender.com";

// export default function Navbar() {
//   const [user, setUser] = useState<any>(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const loadUser = async () => {
//     if (!token) return;
//     try {
//       const res = await fetch(`${SERVER_URL}/profile/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       if (data?.id) setUser(data);
//     } catch (e) {
//       console.log("NAVBAR LOAD ERROR:", e);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//     const handler = () => loadUser();
//     window.addEventListener("profile-update", handler);
//     return () => window.removeEventListener("profile-update", handler);
//   }, [token]);

//   const goProfile = (e: any) => {
//     e?.preventDefault?.();
//     e?.stopPropagation?.();
//     if (!token) {
//       navigate("/", { replace: true });
//       return;
//     }
//     navigate("/profile");
//   };

//   return (
//     <nav className="w-full h-[76px] fixed top-0 left-0 z-[100] px-4 sm:px-8 flex items-center justify-center">
//       {/* Стеклянный эффект фона (Glassmorphism) */}
//       <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50" />

//       <div className="max-w-[1400px] w-full h-full relative flex items-center justify-between">
        
//         {/* ЛОГОТИП */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/market")}
//           className="flex items-center gap-2 cursor-pointer group"
//         >
//           <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
//             <LayoutGrid size={22} className="text-black -rotate-3 group-hover:rotate-0 transition-all duration-300" />
//           </div>
//           <div className="flex flex-col leading-none">
//             <span className="text-white font-[900] text-xl italic tracking-tighter uppercase">
//               CPM<span className="text-yellow-400">MARKET</span>
//             </span>
//             <span className="text-[9px] text-white/30 font-bold tracking-[0.2em] uppercase">Trading Hub</span>
//           </div>
//         </motion.div>

//         {/* ПРАВАЯ ЧАСТЬ: БАЛАНС И ПРОФИЛЬ */}
//         <div className="flex items-center gap-4 sm:gap-6">
          
//           {/* Блок баланса (показывается только если есть данные) */}
//           {user && (
//             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-2xl">
//               <Wallet size={16} className="text-yellow-400" />
//               <span className="text-sm font-bold text-white/90 italic">
//                 {user.balance?.toLocaleString() || 0} <span className="text-yellow-400">$</span>
//               </span>
//             </div>
//           )}

//           {/* КНОПКА ПРОФИЛЯ */}
//           <motion.button
//             whileHover={{ y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={goProfile}
//             className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
//           >
//             {/* Аватарка или иконка */}
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-black overflow-hidden shadow-lg group-hover:shadow-yellow-400/20 transition-all">
//               {user?.avatar ? (
//                 <img
//                   src={
//                     user.avatar.startsWith("http")
//                       ? user.avatar
//                       : `${SERVER_URL}${user.avatar}`
//                   }
//                   alt="avatar"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//               ) : (
//                 <User size={20} fill="currentColor" />
//               )}
//             </div>

//             {/* Имя пользователя */}
//             <div className="flex flex-col items-start leading-tight">
//               <span className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Driver</span>
//               <span className="text-white font-black text-sm tracking-tight truncate max-w-[100px]">
//                 {user?.name || "GUEST"}
//               </span>
//             </div>
//           </motion.button>

//         </div>
//       </div>
//     </nav>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Wallet, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

const SERVER_URL = "https://cpmmarker.onrender.com";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const loadUser = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${SERVER_URL}/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data?.id) setUser(data);
    } catch (e) {
      console.log("NAVBAR LOAD ERROR:", e);
    }
  };

  useEffect(() => {
    loadUser();
    const handler = () => loadUser();
    window.addEventListener("profile-update", handler);
    return () => window.removeEventListener("profile-update", handler);
  }, [token]);

  const goProfile = (e: any) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!token) {
      navigate("/", { replace: true });
      return;
    }
    navigate("/profile");
  };

  return (
    <nav className="w-full h-[76px] fixed top-0 left-0 z-[100] px-4 sm:px-8 flex items-center justify-center">

      <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50" />

      <div className="max-w-[1400px] w-full h-full relative flex items-center justify-between">
        
        {/* ЛОГОТИП */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/market")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            <LayoutGrid size={22} className="text-black -rotate-3 group-hover:rotate-0 transition-all duration-300" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-[900] text-xl italic tracking-tighter uppercase">
              CPM<span className="text-yellow-400">MARKET</span>
            </span>
            <span className="text-[9px] text-white/30 font-bold tracking-[0.2em] uppercase">
              Trading Hub
            </span>
          </div>
        </motion.div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* 🔥 FAQ КНОПКА (НОВАЯ) */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/faq")}
            className="hidden sm:flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all text-white/80 text-sm font-bold"
          >
            FAQ
          </motion.button>

          {/* БАЛАНС */}
          {/* {user && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-2xl">
              <Wallet size={16} className="text-yellow-400" />
              <span className="text-sm font-bold text-white/90 italic">
                {user.balance?.toLocaleString() || 0}{" "}
                <span className="text-yellow-400">$</span>
              </span>
            </div>
          )} */}

          {/* ПРОФИЛЬ */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={goProfile}
            className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-black overflow-hidden shadow-lg group-hover:shadow-yellow-400/20 transition-all">
              {user?.avatar ? (
                <img
                  src={
                    user.avatar.startsWith("http")
                      ? user.avatar
                      : `${SERVER_URL}${user.avatar}`
                  }
                  alt="avatar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <User size={20} fill="currentColor" />
              )}
            </div>

            <div className="flex flex-col items-start leading-tight">
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-wider">
                Driver
              </span>
              <span className="text-white font-black text-sm tracking-tight truncate max-w-[100px]">
                {user?.name || "GUEST"}
              </span>
            </div>
          </motion.button>

        </div>
      </div>
    </nav>
  );
}