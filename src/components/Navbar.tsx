
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { User, Flame, Flag, Crown, ShoppingBag, Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const SERVER_URL = "https://cpmmarker.onrender.com";

// const NAV_LINKS = [
//   {
//     key: "market",
//     label: "Market",
//     path: "/market",
//     icon: ShoppingBag,
//     activeColor: "#FF3D00",
//     activeBg: "#FF3D0010",
//     activeBorder: "#FF3D0040",
//   },
//   {
//     key: "king",
//     label: "King",
//     path: "/king",
//     icon: Crown,
//     activeColor: "#FFB800",
//     activeBg: "rgba(255,184,0,0.12)",
//     activeBorder: "rgba(255,184,0,0.4)",
//   },
//   {
//     key: "faq",
//     label: "FAQ",
//     path: "/faq",
//     icon: Flag,
//     activeColor: "#FF3D00",
//     activeBg: "#FF3D0010",
//     activeBorder: "#FF3D0040",
//   },
// ];

// export default function Navbar() {
//   const [user, setUser] = useState<any>(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = localStorage.getItem("token");

//   const loadUser = async () => {
//     if (!token) return;
//     try {
//       const res = await fetch(`${SERVER_URL}/profile/me`, {
//         headers: { Authorization: `Bearer ${token}` },
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

//   // close menu on route change
//   useEffect(() => { setMenuOpen(false); }, [location.pathname]);

//   const goProfile = (e: any) => {
//     e?.preventDefault?.();
//     e?.stopPropagation?.();
//     navigate(!token ? "/" : "/profile");
//   };

//   const avatarUrl = user?.avatar
//     ? user.avatar.startsWith("http") ? user.avatar : `${SERVER_URL}${user.avatar}`
//     : null;

//   return (
//     <>
//       {/* ══ TOP NAVBAR ══ */}
//       <nav className="w-full h-[68px] fixed top-0 left-0 z-[100] flex items-center px-4 sm:px-8">
//         <div
//           className="absolute inset-0"
//           style={{
//             background: "rgba(8,8,9,0.92)",
//             backdropFilter: "blur(16px)",
//             borderBottom: "1px solid rgba(255,255,255,0.05)",
//           }}
//         />
//         <div
//           className="absolute top-0 inset-x-0 h-[1.5px]"
//           style={{ background: "linear-gradient(90deg, #FF3D00, #FF3D0000 60%)" }}
//         />
//         <div
//           className="absolute inset-0 pointer-events-none opacity-[0.04]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.8) 4px, rgba(0,0,0,0.8) 5px)",
//           }}
//         />

//         <div className="relative max-w-[1400px] w-full mx-auto flex items-center justify-between">

//           {/* LOGO */}
//           <motion.div
//             whileTap={{ scale: 0.96 }}
//             onClick={() => navigate("/market")}
//             className="flex items-center gap-3 cursor-pointer group"
//           >
//             <div
//               className="w-9 h-9 flex items-center justify-center relative shrink-0"
//               style={{
//                 background: "#FF3D0018",
//                 border: "1px solid #FF3D0050",
//                 clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
//               }}
//             >
//               <Flame size={17} style={{ color: "#FF3D00" }} className="group-hover:scale-110 transition-transform duration-300" />
//               <div className="absolute bottom-0 right-0 w-2 h-2"
//                 style={{ background: "#FF3D00", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
//             </div>
//             <div className="leading-none flex flex-col">
//               <span className="font-black italic uppercase tracking-tighter leading-none" style={{ fontSize: 18 }}>
//                 <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>CPM</span>
//                 <span style={{ color: "#FF3D00", textShadow: "0 0 16px #FF3D0055" }}>MARKET</span>
//               </span>
//               <span className="font-bold uppercase tracking-[0.25em]" style={{ fontSize: 7, color: "rgba(255,255,255,0.18)" }}>
//                 Trading Hub
//               </span>
//             </div>
//           </motion.div>

//           {/* CENTER — desktop only */}
//           <div className="hidden sm:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
//             {NAV_LINKS.map(({ key, label, path, icon: Icon, activeColor, activeBg, activeBorder }) => {
//               const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
//               return (
//                 <motion.button
//                   key={key}
//                   whileHover={{ scale: 1.04 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigate(path)}
//                   className="relative flex items-center gap-2 font-black uppercase tracking-[0.22em] transition-all duration-200"
//                   style={{
//                     fontSize: 9,
//                     color: isActive ? activeColor : "rgba(255,255,255,0.3)",
//                     background: isActive ? activeBg : "rgba(255,255,255,0.03)",
//                     border: `1px solid ${isActive ? activeBorder : "rgba(255,255,255,0.07)"}`,
//                     padding: "7px 16px",
//                     clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (isActive) return;
//                     const el = e.currentTarget as HTMLButtonElement;
//                     el.style.color = activeColor;
//                     el.style.borderColor = activeBorder;
//                     el.style.background = activeBg;
//                   }}
//                   onMouseLeave={(e) => {
//                     if (isActive) return;
//                     const el = e.currentTarget as HTMLButtonElement;
//                     el.style.color = "rgba(255,255,255,0.3)";
//                     el.style.borderColor = "rgba(255,255,255,0.07)";
//                     el.style.background = "rgba(255,255,255,0.03)";
//                   }}
//                 >
//                   {isActive && (
//                     <motion.div
//                       layoutId="nav-active-bar"
//                       className="absolute inset-x-0 bottom-0 h-[1.5px]"
//                       style={{ background: `linear-gradient(90deg, ${activeColor}, transparent)` }}
//                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                     />
//                   )}
//                   <Icon size={10} />
//                   {label}
//                 </motion.button>
//               );
//             })}
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-3">
//             {/* Profile — desktop */}
//             <motion.button
//               whileTap={{ scale: 0.96 }}
//               onClick={goProfile}
//               className="hidden sm:flex items-center gap-3 transition-all duration-200 group"
//               style={{
//                 background: "rgba(255,255,255,0.03)",
//                 border: "1px solid rgba(255,255,255,0.07)",
//                 padding: "5px 14px 5px 5px",
//                 clipPath: "polygon(0 0, 96% 0, 100% 30%, 100% 100%, 4% 100%, 0 70%)",
//               }}
//               onMouseEnter={(e) => {
//                 const el = e.currentTarget as HTMLButtonElement;
//                 el.style.borderColor = "#FF3D0035";
//                 el.style.background = "#FF3D0008";
//               }}
//               onMouseLeave={(e) => {
//                 const el = e.currentTarget as HTMLButtonElement;
//                 el.style.borderColor = "rgba(255,255,255,0.07)";
//                 el.style.background = "rgba(255,255,255,0.03)";
//               }}
//             >
//               <div
//                 className="w-8 h-8 overflow-hidden shrink-0 flex items-center justify-center"
//                 style={{
//                   background: avatarUrl ? "#000" : "#FF3D0018",
//                   border: "1px solid #FF3D0040",
//                   clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
//                 }}
//               >
//                 {avatarUrl
//                   ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
//                   : <User size={15} style={{ color: "#FF3D00" }} />
//                 }
//               </div>
//               <div className="flex flex-col items-start leading-none">
//                 <span className="font-black uppercase tracking-[0.22em]" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>Driver</span>
//                 <span className="font-black italic uppercase tracking-tight truncate" style={{ fontSize: 13, maxWidth: 96, color: "rgba(255,255,255,0.85)" }}>
//                   {user?.name || "GUEST"}
//                 </span>
//               </div>
//               {user && <div className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: "#FF3D00" }} />}
//             </motion.button>

//             {/* Hamburger — mobile only */}
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="sm:hidden flex items-center justify-center w-9 h-9"
//               style={{
//                 background: menuOpen ? "#FF3D0018" : "rgba(255,255,255,0.04)",
//                 border: `1px solid ${menuOpen ? "#FF3D0050" : "rgba(255,255,255,0.08)"}`,
//                 clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
//               }}
//             >
//               {menuOpen
//                 ? <X size={16} style={{ color: "#FF3D00" }} />
//                 : <Menu size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
//               }
//             </motion.button>
//           </div>
//         </div>
//       </nav>

//       {/* ══ MOBILE DROPDOWN MENU ══ */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             {/* backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMenuOpen(false)}
//               className="fixed inset-0 z-[98] sm:hidden"
//               style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
//             />

//             <motion.div
//               initial={{ opacity: 0, y: -12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -12 }}
//               transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
//               className="fixed top-[68px] inset-x-4 z-[99] sm:hidden overflow-hidden"
//               style={{
//                 background: "#0D0D0F",
//                 border: "1px solid rgba(255,255,255,0.08)",
//                 borderRadius: 2,
//               }}
//             >
//               <div className="absolute top-0 inset-x-0 h-[1.5px]"
//                 style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />

//               {/* nav links */}
//               <div className="p-3 space-y-2">
//                 {NAV_LINKS.map(({ key, label, path, icon: Icon, activeColor, activeBg, activeBorder }) => {
//                   const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
//                   return (
//                     <button
//                       key={key}
//                       onClick={() => navigate(path)}
//                       className="w-full flex items-center gap-3 px-4 py-3 font-black uppercase tracking-widest transition-all duration-200"
//                       style={{
//                         fontSize: 11,
//                         color: isActive ? activeColor : "rgba(255,255,255,0.45)",
//                         background: isActive ? activeBg : "rgba(255,255,255,0.03)",
//                         border: `1px solid ${isActive ? activeBorder : "rgba(255,255,255,0.06)"}`,
//                         borderRadius: 2,
//                         textAlign: "left",
//                       }}
//                     >
//                       <div
//                         className="w-7 h-7 flex items-center justify-center shrink-0"
//                         style={{
//                           background: isActive ? activeColor + "22" : "rgba(255,255,255,0.05)",
//                           border: `1px solid ${isActive ? activeColor + "44" : "rgba(255,255,255,0.07)"}`,
//                           clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
//                         }}
//                       >
//                         <Icon size={13} style={{ color: isActive ? activeColor : "rgba(255,255,255,0.3)" }} />
//                       </div>
//                       {label}
//                       {isActive && (
//                         <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: activeColor }} />
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* divider */}
//               <div className="mx-3 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

//               {/* profile row */}
//               <button
//                 onClick={() => { goProfile(null); setMenuOpen(false); }}
//                 className="w-full flex items-center gap-3 px-4 py-4 transition-all duration-200"
//                 style={{ background: "transparent" }}
//               >
//                 <div
//                   className="w-9 h-9 overflow-hidden shrink-0 flex items-center justify-center"
//                   style={{
//                     background: avatarUrl ? "#000" : "#FF3D0018",
//                     border: "1px solid #FF3D0040",
//                     clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
//                   }}
//                 >
//                   {avatarUrl
//                     ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
//                     : <User size={16} style={{ color: "#FF3D00" }} />
//                   }
//                 </div>
//                 <div className="flex flex-col items-start leading-none">
//                   <span className="font-black uppercase tracking-[0.22em]" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>Driver</span>
//                   <span className="font-black italic uppercase tracking-tight" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
//                     {user?.name || "GUEST"}
//                   </span>
//                 </div>
//                 {user && <div className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: "#FF3D00" }} />}
//               </button>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* ══ MOBILE BOTTOM TAB BAR ══ */}
//       <div
//         className="sm:hidden fixed bottom-0 inset-x-0 z-[100] flex items-center"
//         style={{
//           background: "rgba(8,8,9,0.95)",
//           backdropFilter: "blur(16px)",
//           borderTop: "1px solid rgba(255,255,255,0.06)",
//           height: 62,
//         }}
//       >
//         {/* bottom top accent */}
//         <div className="absolute top-0 inset-x-0 h-px"
//           style={{ background: "linear-gradient(90deg, transparent, #FF3D0030, transparent)" }} />

//         <div className="flex w-full">
//           {[
//             ...NAV_LINKS,
//             {
//               key: "profile",
//               label: user?.name || "Profile",
//               path: "/profile",
//               icon: User,
//               activeColor: "#FF3D00",
//               activeBg: "#FF3D0010",
//               activeBorder: "#FF3D0040",
//             },
//           ].map(({ key, label, path, icon: Icon, activeColor }) => {
//             const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
//             const isKing = key === "king";
//             return (
//               <button
//                 key={key}
//                 onClick={() => navigate(key === "profile" ? (!token ? "/" : "/profile") : path)}
//                 className="flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 relative"
//                 style={{ color: isActive ? activeColor : "rgba(255,255,255,0.25)" }}
//               >
//                 {/* active indicator dot */}
//                 {isActive && (
//                   <motion.div
//                     layoutId="tab-active"
//                     className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px]"
//                     style={{ background: activeColor, borderRadius: 999 }}
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}

//                 {key === "profile" && avatarUrl ? (
//                   <div
//                     className="w-6 h-6 overflow-hidden"
//                     style={{
//                       border: `1px solid ${isActive ? activeColor : "rgba(255,255,255,0.15)"}`,
//                       clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
//                     }}
//                   >
//                     <img src={avatarUrl} className="w-full h-full object-cover" />
//                   </div>
//                 ) : (
//                   <Icon
//                     size={isKing ? 20 : 18}
//                     style={{
//                       color: isActive ? activeColor : "rgba(255,255,255,0.25)",
//                       filter: isActive && isKing ? `drop-shadow(0 0 6px ${activeColor}88)` : "none",
//                     }}
//                   />
//                 )}

//                 <span
//                   className="font-black uppercase tracking-widest truncate"
//                   style={{ fontSize: 7 }}
//                 >
//                   {key === "profile" ? (user?.name?.split(" ")[0] || "Profile") : label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* spacer so content doesn't hide behind bottom tab on mobile */}
//       <div className="sm:hidden h-[62px]" />
//     </>
//   );
// }





import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Flame, Flag, Crown, ShoppingBag, Gift, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SERVER_URL = "https://cpmmarker.onrender.com";

const NAV_LINKS = [
  {
    key: "market",
    label: "Market",
    path: "/market",
    icon: ShoppingBag,
    activeColor: "#FF3D00",
    activeBg: "#FF3D0010",
    activeBorder: "#FF3D0040",
  },
  {
    key: "king",
    label: "King",
    path: "/king",
    icon: Crown,
    activeColor: "#FFB800",
    activeBg: "rgba(255,184,0,0.12)",
    activeBorder: "rgba(255,184,0,0.4)",
  },
  {
    key: "donate",
    label: "Donate",
    path: "/donate",
    icon: Gift,
    activeColor: "#00E5FF",
    activeBg: "rgba(0,229,255,0.10)",
    activeBorder: "rgba(0,229,255,0.35)",
  },
  {
    key: "faq",
    label: "FAQ",
    path: "/faq",
    icon: Flag,
    activeColor: "#FF3D00",
    activeBg: "#FF3D0010",
    activeBorder: "#FF3D0040",
  },
];

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const loadUser = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${SERVER_URL}/profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
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

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const goProfile = (e: any) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    navigate(!token ? "/" : "/profile");
  };

  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http") ? user.avatar : `${SERVER_URL}${user.avatar}`
    : null;

  return (
    <>
      {/* ══ TOP NAVBAR ══ */}
      <nav className="w-full h-[68px] fixed top-0 left-0 z-[100] flex items-center px-4 sm:px-8">
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(8,8,9,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        />
        <div
          className="absolute top-0 inset-x-0 h-[1.5px]"
          style={{ background: "linear-gradient(90deg, #FF3D00, #FF3D0000 60%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.8) 4px, rgba(0,0,0,0.8) 5px)",
          }}
        />

        <div className="relative max-w-[1400px] w-full mx-auto flex items-center justify-between">

          {/* LOGO */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/market")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className="w-9 h-9 flex items-center justify-center relative shrink-0"
              style={{
                background: "#FF3D0018",
                border: "1px solid #FF3D0050",
                clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
              }}
            >
              <Flame size={17} style={{ color: "#FF3D00" }} className="group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2"
                style={{ background: "#FF3D00", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
            </div>
            <div className="leading-none flex flex-col">
              <span className="font-black italic uppercase tracking-tighter leading-none" style={{ fontSize: 18 }}>
                <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>CPM</span>
                <span style={{ color: "#FF3D00", textShadow: "0 0 16px #FF3D0055" }}>MARKET</span>
              </span>
              <span className="font-bold uppercase tracking-[0.25em]" style={{ fontSize: 7, color: "rgba(255,255,255,0.18)" }}>
                Trading Hub
              </span>
            </div>
          </motion.div>

          {/* CENTER — desktop */}
          <div className="hidden sm:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ key, label, path, icon: Icon, activeColor, activeBg, activeBorder }) => {
              const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(path)}
                  className="relative flex items-center gap-2 font-black uppercase tracking-[0.22em] transition-all duration-200"
                  style={{
                    fontSize: 9,
                    color: isActive ? activeColor : "rgba(255,255,255,0.3)",
                    background: isActive ? activeBg : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? activeBorder : "rgba(255,255,255,0.07)"}`,
                    padding: "7px 14px",
                    clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                  }}
                  onMouseEnter={(e) => {
                    if (isActive) return;
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = activeColor;
                    el.style.borderColor = activeBorder;
                    el.style.background = activeBg;
                  }}
                  onMouseLeave={(e) => {
                    if (isActive) return;
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.color = "rgba(255,255,255,0.3)";
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-bar"
                      className="absolute inset-x-0 bottom-0 h-[1.5px]"
                      style={{ background: `linear-gradient(90deg, ${activeColor}, transparent)` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon size={10} />
                  {label}
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* Profile — desktop */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={goProfile}
              className="hidden sm:flex items-center gap-3 transition-all duration-200 group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "5px 14px 5px 5px",
                clipPath: "polygon(0 0, 96% 0, 100% 30%, 100% 100%, 4% 100%, 0 70%)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#FF3D0035";
                el.style.background = "#FF3D0008";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <div
                className="w-8 h-8 overflow-hidden shrink-0 flex items-center justify-center"
                style={{
                  background: avatarUrl ? "#000" : "#FF3D0018",
                  border: "1px solid #FF3D0040",
                  clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
                }}
              >
                {avatarUrl
                  ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  : <User size={15} style={{ color: "#FF3D00" }} />
                }
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-black uppercase tracking-[0.22em]" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>Driver</span>
                <span className="font-black italic uppercase tracking-tight truncate" style={{ fontSize: 13, maxWidth: 96, color: "rgba(255,255,255,0.85)" }}>
                  {user?.name || "GUEST"}
                </span>
              </div>
              {user && <div className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: "#FF3D00" }} />}
            </motion.button>

            {/* Hamburger — mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden flex items-center justify-center w-9 h-9"
              style={{
                background: menuOpen ? "#FF3D0018" : "rgba(255,255,255,0.04)",
                border: `1px solid ${menuOpen ? "#FF3D0050" : "rgba(255,255,255,0.08)"}`,
                clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
              }}
            >
              {menuOpen
                ? <X size={16} style={{ color: "#FF3D00" }} />
                : <Menu size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
              }
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ══ MOBILE DROPDOWN ══ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[98] sm:hidden"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[68px] inset-x-4 z-[99] sm:hidden overflow-hidden"
              style={{ background: "#0D0D0F", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2 }}
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px]"
                style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />

              <div className="p-3 space-y-2">
                {NAV_LINKS.map(({ key, label, path, icon: Icon, activeColor, activeBg, activeBorder }) => {
                  const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
                  return (
                    <button
                      key={key}
                      onClick={() => navigate(path)}
                      className="w-full flex items-center gap-3 px-4 py-3 font-black uppercase tracking-widest transition-all duration-200"
                      style={{
                        fontSize: 11,
                        color: isActive ? activeColor : "rgba(255,255,255,0.45)",
                        background: isActive ? activeBg : "rgba(255,255,255,0.03)",
                        border: `1px solid ${isActive ? activeBorder : "rgba(255,255,255,0.06)"}`,
                        borderRadius: 2,
                        textAlign: "left",
                      }}
                    >
                      <div
                        className="w-7 h-7 flex items-center justify-center shrink-0"
                        style={{
                          background: isActive ? activeColor + "22" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${isActive ? activeColor + "44" : "rgba(255,255,255,0.07)"}`,
                          clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                        }}
                      >
                        <Icon size={13} style={{ color: isActive ? activeColor : "rgba(255,255,255,0.3)" }} />
                      </div>
                      {label}
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: activeColor }} />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mx-3 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

              <button
                onClick={() => { goProfile(null); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-4"
              >
                <div
                  className="w-9 h-9 overflow-hidden shrink-0 flex items-center justify-center"
                  style={{
                    background: avatarUrl ? "#000" : "#FF3D0018",
                    border: "1px solid #FF3D0040",
                    clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
                  }}
                >
                  {avatarUrl
                    ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                    : <User size={16} style={{ color: "#FF3D00" }} />
                  }
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="font-black uppercase tracking-[0.22em]" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>Driver</span>
                  <span className="font-black italic uppercase tracking-tight" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                    {user?.name || "GUEST"}
                  </span>
                </div>
                {user && <div className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: "#FF3D00" }} />}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══ MOBILE BOTTOM TAB BAR ══ */}
      <div
        className="sm:hidden fixed bottom-0 inset-x-0 z-[100] flex items-center"
        style={{
          background: "rgba(8,8,9,0.95)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          height: 62,
        }}
      >
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #FF3D0030, transparent)" }} />

        <div className="flex w-full">
          {[
            ...NAV_LINKS,
            {
              key: "profile",
              label: "Profile",
              path: "/profile",
              icon: User,
              activeColor: "#FF3D00",
              activeBg: "#FF3D0010",
              activeBorder: "#FF3D0040",
            },
          ].map(({ key, label, path, icon: Icon, activeColor }) => {
            const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
            return (
              <button
                key={key}
                onClick={() => navigate(key === "profile" ? (!token ? "/" : "/profile") : path)}
                className="flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 relative"
                style={{ color: isActive ? activeColor : "rgba(255,255,255,0.25)" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-active"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px]"
                    style={{ background: activeColor, borderRadius: 999 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {key === "profile" && avatarUrl ? (
                  <div
                    className="w-6 h-6 overflow-hidden"
                    style={{
                      border: `1px solid ${isActive ? activeColor : "rgba(255,255,255,0.15)"}`,
                      clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
                    }}
                  >
                    <img src={avatarUrl} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Icon
                    size={key === "king" ? 19 : 17}
                    style={{
                      color: isActive ? activeColor : "rgba(255,255,255,0.25)",
                      filter: isActive ? `drop-shadow(0 0 5px ${activeColor}77)` : "none",
                    }}
                  />
                )}

                <span className="font-black uppercase tracking-widest truncate" style={{ fontSize: 7 }}>
                  {key === "profile" ? (user?.name?.split(" ")[0] || "Profile") : label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sm:hidden h-[62px]" />
    </>
  );
}
