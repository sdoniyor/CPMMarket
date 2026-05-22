
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Flame, Flag } from "lucide-react";
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

//   const goProfile = (e: any) => {
//     e?.preventDefault?.();
//     e?.stopPropagation?.();
//     navigate(!token ? "/" : "/profile");
//   };

//   const avatarUrl = user?.avatar
//     ? user.avatar.startsWith("http") ? user.avatar : `${SERVER_URL}${user.avatar}`
//     : null;

//   return (
//     <nav className="w-full h-[68px] fixed top-0 left-0 z-[100] flex items-center px-4 sm:px-8">
//       {/* backdrop */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background: "rgba(8,8,9,0.88)",
//           backdropFilter: "blur(16px)",
//           borderBottom: "1px solid rgba(255,255,255,0.05)",
//         }}
//       />

//       {/* top red accent line */}
//       <div
//         className="absolute top-0 inset-x-0 h-[1.5px]"
//         style={{ background: "linear-gradient(90deg, #FF3D00, #FF3D0000 60%)" }}
//       />

//       {/* subtle scanline on navbar */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-[0.04]"
//         style={{
//           backgroundImage:
//             "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.8) 4px, rgba(0,0,0,0.8) 5px)",
//         }}
//       />

//       <div className="relative max-w-[1400px] w-full mx-auto flex items-center justify-between">

//         {/* ── LOGO ── */}
//         <motion.div
//           whileTap={{ scale: 0.96 }}
//           onClick={() => navigate("/market")}
//           className="flex items-center gap-3 cursor-pointer group"
//         >
//           {/* icon */}
//           <div
//             className="w-9 h-9 flex items-center justify-center relative shrink-0 transition-all duration-300"
//             style={{
//               background: "#FF3D0018",
//               border: "1px solid #FF3D0050",
//               clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
//             }}
//           >
//             <Flame
//               size={17}
//               style={{ color: "#FF3D00" }}
//               className="group-hover:scale-110 transition-transform duration-300"
//             />
//             {/* corner pip */}
//             <div
//               className="absolute bottom-0 right-0 w-2 h-2"
//               style={{ background: "#FF3D00", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
//             />
//           </div>

//           {/* wordmark */}
//           <div className="leading-none flex flex-col">
//             <span
//               className="font-black italic uppercase tracking-tighter leading-none"
//               style={{ fontSize: 18 }}
//             >
//               <span
//                 style={{
//                   WebkitTextStroke: "1px rgba(255,255,255,0.25)",
//                   color: "transparent",
//                 }}
//               >
//                 CPM
//               </span>
//               <span
//                 style={{
//                   color: "#FF3D00",
//                   textShadow: "0 0 16px #FF3D0055",
//                 }}
//               >
//                 MARKET
//               </span>
//             </span>
//             <span
//               className="font-bold uppercase tracking-[0.25em]"
//               style={{ fontSize: 7, color: "rgba(255,255,255,0.18)" }}
//             >
//               Trading Hub
//             </span>
//           </div>
//         </motion.div>

//         {/* ── RIGHT ── */}
//         <div className="flex items-center gap-3">

//           {/* King */}
//             <motion.button
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/king")}
//             className="hidden sm:flex items-center gap-2 font-black uppercase tracking-[0.22em] transition-all duration-200"
//             style={{
//               fontSize: 9,
//               color: "#FFB800",
//               background: "rgba(255,184,0,0.08)",
//               border: "1px solid rgba(255,184,0,0.2)",
//               padding: "7px 16px",
//               clipPath:
//                 "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
//             }}
//             onMouseEnter={(e) => {
//               const el = e.currentTarget;
//               el.style.background = "rgba(255,184,0,0.15)";
//               el.style.borderColor = "rgba(255,184,0,0.35)";
//             }}
//             onMouseLeave={(e) => {
//               const el = e.currentTarget;
//               el.style.background = "rgba(255,184,0,0.08)";
//               el.style.borderColor = "rgba(255,184,0,0.2)";
//             }}
//           >
//             👑 KING
//           </motion.button>

//           {/* FAQ */}
//           <motion.button
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/faq")}
//             className="hidden sm:flex items-center gap-2 font-black uppercase tracking-[0.22em] transition-all duration-200"
//             style={{
//               fontSize: 9,
//               color: "rgba(255,255,255,0.3)",
//               background: "rgba(255,255,255,0.03)",
//               border: "1px solid rgba(255,255,255,0.07)",
//               padding: "7px 16px",
//               clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
//             }}
//             onMouseEnter={(e) => {
//               const el = e.currentTarget as HTMLButtonElement;
//               el.style.color = "#FF3D00";
//               el.style.borderColor = "#FF3D0040";
//               el.style.background = "#FF3D0010";
//             }}
//             onMouseLeave={(e) => {
//               const el = e.currentTarget as HTMLButtonElement;
//               el.style.color = "rgba(255,255,255,0.3)";
//               el.style.borderColor = "rgba(255,255,255,0.07)";
//               el.style.background = "rgba(255,255,255,0.03)";
//             }}
//           >
//             <Flag size={10} />
//             FAQ
//           </motion.button>

//           {/* PROFILE BUTTON */}
//           <motion.button
//             whileTap={{ scale: 0.96 }}
//             onClick={goProfile}
//             className="flex items-center gap-3 transition-all duration-200 group"
//             style={{
//               background: "rgba(255,255,255,0.03)",
//               border: "1px solid rgba(255,255,255,0.07)",
//               padding: "5px 14px 5px 5px",
//               clipPath: "polygon(0 0, 96% 0, 100% 30%, 100% 100%, 4% 100%, 0 70%)",
//             }}
//             onMouseEnter={(e) => {
//               const el = e.currentTarget as HTMLButtonElement;
//               el.style.borderColor = "#FF3D0035";
//               el.style.background = "#FF3D0008";
//             }}
//             onMouseLeave={(e) => {
//               const el = e.currentTarget as HTMLButtonElement;
//               el.style.borderColor = "rgba(255,255,255,0.07)";
//               el.style.background = "rgba(255,255,255,0.03)";
//             }}
//           >
//             {/* avatar */}
//             <div
//               className="w-8 h-8 overflow-hidden shrink-0 flex items-center justify-center font-black italic"
//               style={{
//                 background: avatarUrl ? "#000" : "#FF3D0018",
//                 border: "1px solid #FF3D0040",
//                 clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
//                 fontSize: 14,
//                 color: "#FF3D00",
//               }}
//             >
//               {avatarUrl ? (
//                 <img
//                   src={avatarUrl}
//                   alt="avatar"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//               ) : (
//                 <User size={15} style={{ color: "#FF3D00" }} />
//               )}
//             </div>

//             {/* name */}
//             <div className="flex flex-col items-start leading-none">
//               <span
//                 className="font-black uppercase tracking-[0.22em]"
//                 style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}
//               >
//                 Driver
//               </span>
//               <span
//                 className="font-black italic uppercase tracking-tight truncate"
//                 style={{ fontSize: 13, maxWidth: 96, color: "rgba(255,255,255,0.85)" }}
//               >
//                 {user?.name || "GUEST"}
//               </span>
//             </div>

//             {/* live indicator */}
//             {user && (
//               <div
//                 className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
//                 style={{ background: "#FF3D00" }}
//               />
//             )}
//           </motion.button>
//         </div>
//       </div>
//     </nav>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Flame, Flag, Crown, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

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

  const goProfile = (e: any) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    navigate(!token ? "/" : "/profile");
  };

  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http") ? user.avatar : `${SERVER_URL}${user.avatar}`
    : null;

  return (
    <nav className="w-full h-[68px] fixed top-0 left-0 z-[100] flex items-center px-4 sm:px-8">
      {/* backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(8,8,9,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      />
      {/* top accent */}
      <div
        className="absolute top-0 inset-x-0 h-[1.5px]"
        style={{ background: "linear-gradient(90deg, #FF3D00, #FF3D0000 60%)" }}
      />
      {/* scanline */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.8) 4px, rgba(0,0,0,0.8) 5px)",
        }}
      />

      <div className="relative max-w-[1400px] w-full mx-auto flex items-center justify-between">

        {/* ── LOGO ── */}
        <motion.div
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/market")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className="w-9 h-9 flex items-center justify-center relative shrink-0 transition-all duration-300"
            style={{
              background: "#FF3D0018",
              border: "1px solid #FF3D0050",
              clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
            }}
          >
            <Flame
              size={17}
              style={{ color: "#FF3D00" }}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <div
              className="absolute bottom-0 right-0 w-2 h-2"
              style={{ background: "#FF3D00", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
          </div>
          <div className="leading-none flex flex-col">
            <span
              className="font-black italic uppercase tracking-tighter leading-none"
              style={{ fontSize: 18 }}
            >
              <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>
                CPM
              </span>
              <span style={{ color: "#FF3D00", textShadow: "0 0 16px #FF3D0055" }}>
                MARKET
              </span>
            </span>
            <span
              className="font-bold uppercase tracking-[0.25em]"
              style={{ fontSize: 7, color: "rgba(255,255,255,0.18)" }}
            >
              Trading Hub
            </span>
          </div>
        </motion.div>

        {/* ── CENTER: nav links ── */}
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
                  padding: "7px 16px",
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
                {/* active bottom indicator */}
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

        {/* ── RIGHT: Profile ── */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={goProfile}
          className="flex items-center gap-3 transition-all duration-200 group"
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
            className="w-8 h-8 overflow-hidden shrink-0 flex items-center justify-center font-black italic"
            style={{
              background: avatarUrl ? "#000" : "#FF3D0018",
              border: "1px solid #FF3D0040",
              clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
              fontSize: 14,
              color: "#FF3D00",
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <User size={15} style={{ color: "#FF3D00" }} />
            )}
          </div>

          <div className="flex flex-col items-start leading-none">
            <span
              className="font-black uppercase tracking-[0.22em]"
              style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}
            >
              Driver
            </span>
            <span
              className="font-black italic uppercase tracking-tight truncate"
              style={{ fontSize: 13, maxWidth: 96, color: "rgba(255,255,255,0.85)" }}
            >
              {user?.name || "GUEST"}
            </span>
          </div>

          {user && (
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ background: "#FF3D00" }}
            />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
