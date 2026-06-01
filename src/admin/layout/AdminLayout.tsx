



// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AdminLayout() {
//   const nav = useNavigate();
//   const location = useLocation();

//   const menu = [
//     { path: "/admin/users", label: "Users", icon: "👤" },
//     { path: "/admin/cars", label: "Cars", icon: "🚗" },
//     { path: "/admin/promos", label: "Promos", icon: "🎟" },
//   ];

//   return (
//     <div className="min-h-screen flex bg-[#09090b] text-zinc-100 font-sans selection:bg-yellow-500/30">
      
//       {/* SIDEBAR */}
//       <aside className="w-72 bg-zinc-950/50 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col relative overflow-hidden">
//         {/* Декоративный градиент на фоне сайдбара */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
        
//         <div className="mb-10 px-2">
//           <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 text-2xl font-black tracking-tighter uppercase">
//             Admin <span className="text-white/20 font-light">Core</span>
//           </h1>
//         </div>

//         <nav className="flex flex-col gap-2 relative z-10">
//           {menu.map((item) => {
//             const active = location.pathname === item.path;

//             return (
//               <motion.button
//                 key={item.path}
//                 whileHover={{ x: 4 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => nav(item.path)}
//                 className={`
//                   relative group flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-300
//                   ${active 
//                     ? "text-black font-bold" 
//                     : "text-zinc-400 hover:text-white hover:bg-white/5"
//                   }
//                 `}
//               >
//                 {/* Активный фон с анимацией перехода */}
//                 {active && (
//                   <motion.div
//                     layoutId="activeTab"
//                     className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.3)]"
//                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                   />
//                 )}

//                 <span className={`relative z-10 text-xl filter transition-transform duration-300 group-hover:scale-110 ${active ? "drop-shadow-sm" : "grayscale opacity-70"}`}>
//                   {item.icon}
//                 </span>
//                 <span className="relative z-10 tracking-wide text-sm uppercase font-semibold">
//                   {item.label}
//                 </span>

//                 {/* Индикатор справа для активного пункта */}
//                 {active && (
//                   <motion.div 
//                     initial={{ opacity: 0, x: 10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="ml-auto relative z-10 w-1.5 h-1.5 rounded-full bg-black/40"
//                   />
//                 )}
//               </motion.button>
//             );
//           })}
//         </nav>

//         {/* Bottom Info */}
//         <div className="mt-auto pt-8 border-t border-white/5">
//           <div className="flex items-center gap-3 px-2">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center text-[10px]">
//               V1
//             </div>
//             <div className="flex flex-col">
//               <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">System Status</span>
//               <span className="text-[10px] text-green-500 flex items-center gap-1">
//                 <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /> 
//                 Online
//               </span>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
//         {/* Мягкое свечение на фоне контента */}
//         <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
        
//         <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-950/20 backdrop-blur-md z-20">
//             <div className="text-xs text-zinc-500 font-medium">
//                 Main / <span className="text-zinc-300">{location.pathname.split('/').pop()}</span>
//             </div>
//             <div className="flex gap-4">
//                 <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors">
//                     🔔
//                 </div>
//             </div>
//         </header>

//         <div className="flex-1 p-8 overflow-y-auto relative z-10 custom-scrollbar">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={location.pathname}
//               initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
//               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//               exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//             >
//               <Outlet />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </main>

//       <style dangerouslySetInnerHTML={{ __html: `
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
//       `}} />
//     </div>
//   );
// }


import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Car, Tag, Flame, Menu, X,
  ChevronRight, Zap, Shield,
} from "lucide-react";

const MENU = [
  { path: "/admin/users",  label: "Users",  icon: Users },
  { path: "/admin/cars",   label: "Cars",   icon: Car   },
  { path: "/admin/promos", label: "Promos", icon: Tag   },
];

export default function AdminLayout() {
  const nav = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentLabel = MENU.find((m) => location.pathname.startsWith(m.path))?.label ?? "Admin";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* top accent */}
      <div className="absolute top-0 inset-x-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />

      {/* scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.8) 4px, rgba(0,0,0,0.8) 5px)" }} />

      {/* logo */}
      <div className="relative px-6 pt-7 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center relative shrink-0"
            style={{
              background: "#FF3D0018", border: "1px solid #FF3D0050",
              clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
            }}>
            <Flame size={17} style={{ color: "#FF3D00" }} />
            <div className="absolute bottom-0 right-0 w-2 h-2"
              style={{ background: "#FF3D00", clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
          </div>
          <div className="leading-none">
            <span className="font-black italic uppercase tracking-tighter leading-none" style={{ fontSize: 17 }}>
              <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>CPM</span>
              <span style={{ color: "#FF3D00", textShadow: "0 0 14px #FF3D0055" }}>ADMIN</span>
            </span>
            <p className="font-bold uppercase tracking-[0.25em]" style={{ fontSize: 7, color: "rgba(255,255,255,0.18)" }}>
              Control Panel
            </p>
          </div>
        </div>

        {/* eyebrow divider */}
        <div className="flex items-center gap-2 mt-5">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="w-4 h-px" style={{ background: "#FF3D0040" }} />
          <div className="w-1 h-1 rotate-45" style={{ background: "#FF3D0040" }} />
        </div>
      </div>

      {/* nav */}
      <nav className="relative flex flex-col gap-1.5 px-4 flex-1">
        {MENU.map(({ path, label, icon: Icon }) => {
          const active = location.pathname.startsWith(path);
          return (
            <motion.button
              key={path}
              whileTap={{ scale: 0.97 }}
              onClick={() => { nav(path); setSidebarOpen(false); }}
              className="relative w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 overflow-hidden"
              style={{
                background: active ? "#FF3D0012" : "rgba(255,255,255,0.02)",
                border: `1px solid ${active ? "#FF3D0040" : "rgba(255,255,255,0.05)"}`,
                borderRadius: 2,
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (active) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (active) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              {/* active left bar */}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 inset-y-0 w-[2px]"
                  style={{ background: "linear-gradient(to bottom, #FF3D00, transparent)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {/* active top line */}
              {active && (
                <div className="absolute top-0 inset-x-0 h-[1px]"
                  style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }} />
              )}

              <div
                className="w-7 h-7 flex items-center justify-center shrink-0"
                style={{
                  background: active ? "#FF3D0020" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? "#FF3D0045" : "rgba(255,255,255,0.07)"}`,
                  clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                }}
              >
                <Icon size={13} style={{ color: active ? "#FF3D00" : "rgba(255,255,255,0.3)" }} />
              </div>

              <span
                className="font-black uppercase tracking-widest flex-1"
                style={{ fontSize: 10, color: active ? "#FF3D00" : "rgba(255,255,255,0.45)" }}
              >
                {label}
              </span>

              {active && (
                <ChevronRight size={12} style={{ color: "#FF3D0077", flexShrink: 0 }} />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* bottom status */}
      <div className="relative px-4 pb-6 pt-4">
        <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="flex items-center gap-3 px-3 py-3"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
          <div className="w-7 h-7 flex items-center justify-center shrink-0"
            style={{
              background: "#22c55e15", border: "1px solid #22c55e35",
              clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
            }}>
            <Shield size={12} style={{ color: "#22c55e" }} />
          </div>
          <div>
            <p className="font-black uppercase tracking-widest" style={{ fontSize: 7, color: "rgba(255,255,255,0.2)" }}>
              System Status
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              <span className="font-black uppercase tracking-widest" style={{ fontSize: 8, color: "#22c55e" }}>
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex text-white" style={{ background: "#080809" }}>

      {/* ── bg ── */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 30% at 0% 50%, #FF3D0008, transparent)," +
            "linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)",
          backgroundSize: "auto, 44px 44px, 44px 44px",
        }}
      />

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden md:flex flex-col relative shrink-0"
        style={{
          width: 240,
          background: "#0D0D0F",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[110] md:hidden"
              style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[120] md:hidden flex flex-col relative"
              style={{
                width: 260,
                background: "#0D0D0F",
                borderRight: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN ── */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen min-w-0">

        {/* header */}
        <header
          className="h-[60px] flex items-center justify-between px-5 shrink-0 sticky top-0 z-50"
          style={{
            background: "rgba(8,8,9,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* top red line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px]"
            style={{ background: "linear-gradient(90deg, #FF3D00, transparent 50%)" }} />

          <div className="flex items-center gap-3">
            {/* hamburger — mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center w-8 h-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
              }}
            >
              <Menu size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
            </motion.button>

            {/* breadcrumb */}
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-widest" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                Admin
              </span>
              <ChevronRight size={10} style={{ color: "rgba(255,255,255,0.15)" }} />
              <span className="font-black uppercase tracking-widest" style={{ fontSize: 9, color: "#FF3D00" }}>
                {currentLabel}
              </span>
            </div>
          </div>

          {/* right: status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5"
            style={{
              background: "rgba(0,229,255,0.06)",
              border: "1px solid rgba(0,229,255,0.2)",
              clipPath: "polygon(0 0, 90% 0, 100% 35%, 100% 100%, 10% 100%, 0 65%)",
            }}>
            <Zap size={11} style={{ color: "#00E5FF" }} />
            <span className="font-black uppercase tracking-widest" style={{ fontSize: 8, color: "#00E5FF" }}>
              Live
            </span>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00E5FF" }} />
          </div>
        </header>

        {/* content */}
        <main
          className="flex-1 p-5 md:p-8 overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#FF3D0030 transparent" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
