import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  useGLTF,
} from "@react-three/drei";

import {
  Upload,
  HelpCircle,
  Crown,
} from "lucide-react";

import { motion } from "framer-motion";

const SERVER_URL = "https://cpmmarker.onrender.com";

// ======================================
// 3D MODEL
// ======================================

function CharacterModel() {
  const { scene } = useGLTF("/models/poor_guy.glb");

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, -1.5, 0]}
    />
  );
}

useGLTF.preload("/models/poor_guy.glb");

// ======================================
// PAGE
// ======================================

export default function KingPage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [screenshot, setScreenshot] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  // ======================================
  // FILE
  // ======================================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  // ======================================
  // SUBMIT
  // ======================================

  const handleUpgrade = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!screenshot) {
      alert("Загрузи чек");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("userId", userId);
      formData.append("email", email);
      formData.append("username", username);

      formData.append("receipt", screenshot);

      const res = await fetch(
        `${SERVER_URL}/king-request`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data?.success) {
        alert(
          "Заявка отправлена 👑"
        );

        setUserId("");
        setEmail("");
        setUsername("");
        setScreenshot(null);
      } else {
        alert(data?.message || "Ошибка");
      }
    } catch (e) {
      console.log(e);
      alert("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // UI
  // ======================================

  return (
    <div className="min-h-screen bg-[#070809] text-white overflow-hidden relative">
      {/* BACKGROUND */}

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.9) 4px, rgba(0,0,0,0.9) 5px)",
          }}
        />
      </div>

      {/* GLOW */}

      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-orange-500/10 blur-[180px]" />

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 flex items-center justify-center"
              style={{
                background:
                  "rgba(255,61,0,0.08)",
                border:
                  "1px solid rgba(255,61,0,0.2)",
                clipPath:
                  "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
              }}
            >
              <Crown
                size={18}
                color="#FFB800"
              />
            </div>

            <div className="leading-none">
              <h1 className="font-black italic uppercase tracking-tight text-2xl">
                <span className="text-white">
                  CPM
                </span>

                <span className="text-orange-500">
                  MARKET
                </span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold mt-1">
                King Upgrade
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <button
            className="flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em]"
            style={{
              background:
                "rgba(255,255,255,0.03)",
              border:
                "1px solid rgba(255,255,255,0.06)",
              clipPath:
                "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
            }}
          >
            <HelpCircle size={12} />
            FAQ
          </button>
        </div>
      </header>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ======================================
              LEFT
          ====================================== */}

          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* TITLE */}

            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-black mb-3">
                PREMIUM ACCOUNT SYSTEM
              </p>

              <h1 className="text-5xl md:text-6xl font-black italic uppercase leading-none text-white/80">
                KING
              </h1>

              <h2 className="text-5xl md:text-6xl font-black italic uppercase leading-none text-orange-500 mt-1">
                UPGRADE
              </h2>
            </div>

            {/* VIEWPORT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="relative h-[650px] rounded-[28px] overflow-hidden"
              style={{
                background: "#0D1117",
                border:
                  "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  "0 0 80px rgba(255,61,0,0.06)",
              }}
            >
              {/* GRID */}

              <div className="absolute inset-0 opacity-[0.12]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]" />
              </div>

              {/* ORANGE GLOW */}

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-orange-500/20 blur-[120px]" />

              {/* CANVAS */}

              <Canvas
                camera={{
                  position: [0, 0, 4],
                  fov: 40,
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <ambientLight intensity={1.5} />

                <directionalLight
                  position={[5, 5, 5]}
                  intensity={2}
                />

                <pointLight
                  position={[-5, 5, 5]}
                  intensity={1.5}
                  color="#ff7b00"
                />

                <Suspense fallback={null}>
                  <Stage
                    environment="city"
                    intensity={0.7}
                    adjustCamera={false}
                  >
                    <CharacterModel />
                  </Stage>
                </Suspense>

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={1.2}
                  minPolarAngle={
                    Math.PI / 3
                  }
                  maxPolarAngle={
                    Math.PI / 1.8
                  }
                />
              </Canvas>

              {/* INFO */}

              <div className="absolute bottom-5 left-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-black">
                  <span className="text-blue-400">
                    X
                  </span>{" "}
                  <span className="text-green-400">
                    Y
                  </span>{" "}
                  <span className="text-orange-400">
                    Z
                  </span>
                </p>

                <p className="text-[10px] text-white/40 mt-1 uppercase">
                  Interactive viewport
                </p>
              </div>
            </motion.div>
          </div>

          {/* ======================================
              RIGHT
          ====================================== */}

          <div className="lg:col-span-7">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="relative rounded-[28px] overflow-hidden p-8"
              style={{
                background: "#0D1117",
                border:
                  "1px solid rgba(255,61,0,0.15)",
                boxShadow:
                  "0 0 80px rgba(255,61,0,0.04)",
              }}
            >
              {/* GLOW */}

              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[120px]" />

              {/* FORM */}

              <form
                onSubmit={handleUpgrade}
                className="relative space-y-6"
              >
                {/* USER ID */}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/35 mb-3">
                    User ID
                  </label>

                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) =>
                      setUserId(
                        e.target.value
                      )
                    }
                    placeholder="12345"
                    className="w-full h-[58px] px-5 rounded-2xl bg-[#161B22] border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/40 transition"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/35 mb-3">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="user@example.com"
                    className="w-full h-[58px] px-5 rounded-2xl bg-[#161B22] border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/40 transition"
                  />
                </div>

                {/* USERNAME */}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/35 mb-3">
                    Username
                  </label>

                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                      )
                    }
                    placeholder="CoolRacer"
                    className="w-full h-[58px] px-5 rounded-2xl bg-[#161B22] border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/40 transition"
                  />
                </div>

                {/* FILE */}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/35 mb-3">
                    Payment Verification
                  </label>

                  <div
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="border-2 border-dashed rounded-[24px] p-10 cursor-pointer transition group"
                    style={{
                      borderColor:
                        "rgba(255,255,255,0.06)",
                      background:
                        "rgba(255,255,255,0.02)",
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={
                        handleFileChange
                      }
                      className="hidden"
                    />

                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-black/20 group-hover:border-orange-500/30 transition">
                        <Upload size={24} />
                      </div>

                      <p className="mt-5 text-sm font-bold text-white/80">
                        {screenshot
                          ? screenshot.name
                          : "UPLOAD PAYMENT SCREENSHOT"}
                      </p>

                      <p className="mt-2 text-xs text-white/25 uppercase tracking-[0.2em]">
                        PNG / JPG / JPEG
                      </p>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}

                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-black">
                      Upgrade Cost
                    </p>

                    <h3 className="mt-3 text-4xl font-black text-amber-400">
                      1,000,000

                      <span className="text-sm text-white/30 ml-2 uppercase">
                        Gold
                      </span>
                    </h3>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    disabled={loading}
                    type="submit"
                    className="h-[58px] px-10 rounded-2xl text-black font-black uppercase tracking-[0.25em] text-sm"
                    style={{
                      background:
                        "linear-gradient(90deg,#FF7B00,#FFB800)",
                      boxShadow:
                        "0 0 30px rgba(255,123,0,0.25)",
                    }}
                  >
                    {loading
                      ? "LOADING..."
                      : "UPGRADE NOW"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}