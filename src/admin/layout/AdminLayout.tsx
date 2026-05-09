// import { Outlet, useNavigate, useLocation } from "react-router-dom";

// export default function AdminLayout() {
//   const nav = useNavigate();
//   const location = useLocation();

//   const menu = [
//     { path: "/admin/users", label: "Users", icon: "👤" },
//     { path: "/admin/cars", label: "Cars", icon: "🚗" },
//     { path: "/admin/promos", label: "Promos", icon: "🎟" },
//   ];

//   return (
//     <div className="min-h-screen flex bg-black text-white">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-zinc-950 border-r border-yellow-500/20 p-5 flex flex-col">

//         <h1 className="text-yellow-400 text-2xl font-black mb-8 tracking-wider">
//           ADMIN PANEL
//         </h1>

//         <div className="flex flex-col gap-2">

//           {menu.map((item) => {
//             const active = location.pathname === item.path;

//             return (
//               <button
//                 key={item.path}
//                 onClick={() => nav(item.path)}
//                 className={`
//                   flex items-center gap-3 px-4 py-3 rounded-lg text-left transition
//                   ${active
//                     ? "bg-yellow-400 text-black font-bold"
//                     : "text-white hover:bg-zinc-900"
//                   }
//                 `}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span>{item.label}</span>
//               </button>
//             );
//           })}

//         </div>

//         {/* bottom info */}
//         <div className="mt-auto text-xs text-white/30 pt-6">
//           v1.0 admin panel
//         </div>

//       </div>

//       {/* CONTENT */}
//       <div className="flex-1 p-6 overflow-auto">
//         <Outlet />
//       </div>

//     </div>
//   );
// }



import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout() {
  const nav = useNavigate();
  const location = useLocation();

  const menu = [
    { path: "/admin/users", label: "Users", icon: "👤" },
    { path: "/admin/cars", label: "Cars", icon: "🚗" },
    { path: "/admin/promos", label: "Promos", icon: "🎟" },
  ];

  return (
    <div className="min-h-screen flex bg-[#09090b] text-zinc-100 font-sans selection:bg-yellow-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-zinc-950/50 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col relative overflow-hidden">
        {/* Декоративный градиент на фоне сайдбара */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
        
        <div className="mb-10 px-2">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 text-2xl font-black tracking-tighter uppercase">
            Admin <span className="text-white/20 font-light">Core</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-2 relative z-10">
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <motion.button
                key={item.path}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => nav(item.path)}
                className={`
                  relative group flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-300
                  ${active 
                    ? "text-black font-bold" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {/* Активный фон с анимацией перехода */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <span className={`relative z-10 text-xl filter transition-transform duration-300 group-hover:scale-110 ${active ? "drop-shadow-sm" : "grayscale opacity-70"}`}>
                  {item.icon}
                </span>
                <span className="relative z-10 tracking-wide text-sm uppercase font-semibold">
                  {item.label}
                </span>

                {/* Индикатор справа для активного пункта */}
                {active && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-auto relative z-10 w-1.5 h-1.5 rounded-full bg-black/40"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom Info */}
        <div className="mt-auto pt-8 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center text-[10px]">
              V1
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">System Status</span>
              <span className="text-[10px] text-green-500 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /> 
                Online
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        {/* Мягкое свечение на фоне контента */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-950/20 backdrop-blur-md z-20">
            <div className="text-xs text-zinc-500 font-medium">
                Main / <span className="text-zinc-300">{location.pathname.split('/').pop()}</span>
            </div>
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors">
                    🔔
                </div>
            </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto relative z-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}} />
    </div>
  );
}