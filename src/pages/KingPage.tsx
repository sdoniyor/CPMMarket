import { useState } from "react";
import { motion } from "framer-motion";

export default function KingPreviewPage() {
  const [view, setView] = useState<"css" | "motion" | "holo" | "gif">("css");

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 flex flex-col gap-6">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-black">3D ALTERNATIVES PREVIEW</h1>
        <p className="text-zinc-500">Choose what looks best for your project</p>
      </div>

      {/* SWITCHER */}
      <div className="flex gap-2 justify-center flex-wrap">
        {[
          ["css", "CSS Fake 3D"],
          ["motion", "Framer Motion"],
          ["holo", "Hologram UI"],
          ["gif", "GIF / Video"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key as any)}
            className={`px-4 py-2 rounded-xl border text-sm font-bold transition ${
              view === key
                ? "bg-purple-600 border-purple-400"
                : "bg-zinc-900 border-zinc-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* PREVIEW AREA */}
      <div className="max-w-3xl mx-auto w-full">

        {/* 1 CSS FAKE 3D */}
        {view === "css" && (
          <div className="w-full h-[320px] rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-black to-cyan-500/20 blur-3xl" />
            <div className="relative text-center">
              <div className="text-7xl">🧙‍♂️</div>
              <p className="text-zinc-400 mt-2">CSS Character</p>
            </div>
          </div>
        )}

        {/* 2 FRAMER MOTION */}
        {view === "motion" && (
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-full h-[320px] rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center"
          >
            <span className="text-black font-black text-xl">
              FLOATING CORE
            </span>
          </motion.div>
        )}

        {/* 3 HOLOGRAM */}
        {view === "holo" && (
          <div className="w-full h-[320px] rounded-2xl bg-black border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl" />
            <div className="relative text-center">
              <div className="text-cyan-400 text-6xl">⌬</div>
              <p className="text-cyan-300 mt-2">Hologram Unit</p>
            </div>
          </div>
        )}

        {/* 4 GIF */}
        {view === "gif" && (
          <div className="w-full h-[320px] rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
            <img
              src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
              className="w-48 h-48"
            />
          </div>
        )}

      </div>

      {/* FOOTER INFO */}
      <div className="text-center text-zinc-500 text-sm">
        Switch between styles to choose your replacement for 3D model
      </div>
    </div>
  );
}