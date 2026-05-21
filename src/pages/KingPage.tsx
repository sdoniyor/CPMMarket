import { useState } from "react";

export default function BoostPage() {
  const [form, setForm] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen bg-[#05060A] text-white flex items-center justify-center p-6 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[140px] top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] bottom-[-200px] right-[-200px]" />

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ================= LEFT PANEL ================= */}
        <div className="relative rounded-[28px] p-8 border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden">

          {/* glow line */}
          <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />

          <div className="relative z-10">

            <h1 className="text-4xl font-black tracking-tight">
              ACCOUNT <span className="text-cyan-400">BOOST</span>
            </h1>

            <p className="text-white/40 mt-2">
              Cyber enhancement system v2.0
            </p>

            {/* STATUS CARD */}
            <div className="mt-8 p-5 rounded-2xl bg-black/40 border border-white/10">
              <p className="text-white/40 text-sm">Status</p>
              <p className="text-green-400 font-bold mt-1">READY TO BOOST</p>

              <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-gradient-to-r from-purple-500 to-cyan-400" />
              </div>
            </div>

            {/* INFO BLOCKS */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40">Security</p>
                <p className="text-cyan-300 font-bold">ENCRYPTED</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/40">Speed</p>
                <p className="text-purple-300 font-bold">ULTRA FAST</p>
              </div>
            </div>

            {/* glow badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              LIVE SYSTEM ACTIVE
            </div>

          </div>
        </div>

        {/* ================= RIGHT PANEL (FORM) ================= */}
        <div className="rounded-[28px] p-8 border border-white/10 bg-white/5 backdrop-blur-2xl">

          <h2 className="text-3xl font-black mb-2">
            BOOST FORM
          </h2>

          <p className="text-white/40 mb-8">
            Fill data to initialize process
          </p>

          {/* STEP CARDS */}
          <div className="space-y-4">

            {/* NAME */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/40 transition">
              <p className="text-xs text-white/40 mb-1">NAME</p>
              <input
                className="w-full bg-transparent outline-none text-white font-bold"
                placeholder="Enter name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* ID */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/40 transition">
              <p className="text-xs text-white/40 mb-1">USER ID</p>
              <input
                className="w-full bg-transparent outline-none text-white font-bold"
                placeholder="Enter ID"
                onChange={(e) => setForm({ ...form, id: e.target.value })}
              />
            </div>

            {/* EMAIL */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/40 transition">
              <p className="text-xs text-white/40 mb-1">EMAIL</p>
              <input
                className="w-full bg-transparent outline-none text-white font-bold"
                placeholder="Enter email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* PASSWORD */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/40 transition">
              <p className="text-xs text-white/40 mb-1">PASSWORD</p>
              <input
                type="password"
                className="w-full bg-transparent outline-none text-white font-bold"
                placeholder="Enter password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* UPLOAD */}
            <div className="p-6 rounded-2xl border border-dashed border-white/20 text-center bg-black/30 hover:border-cyan-400 transition cursor-pointer">
              <p className="text-white/40">UPLOAD PAYMENT CHECK</p>
              <p className="text-xs text-white/20 mt-1">PNG / JPG / PDF</p>
              <input type="file" className="hidden" />
            </div>

            {/* PRICE */}
            <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-white/10">
              <span className="text-white/60">PRICE</span>
              <span className="text-2xl font-black text-cyan-300">$49</span>
            </div>

            {/* BUTTON */}
            <button className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-purple-500 to-cyan-400 text-black hover:scale-[1.02] transition">
              START BOOST
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}