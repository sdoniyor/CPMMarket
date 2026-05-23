import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, DollarSign, Star, Crown, Flame,
  Upload, X, CheckCircle2, ChevronRight,
  Sparkles, TrendingUp, Package, Rocket,
} from "lucide-react";
import Navbar from "../components/Navbar";

const API = "https://cpmmarker.onrender.com";

/* ─── COIN SVG icon ─── */
const CoinIcon = ({ size = 20, color = "#FFB800" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="7" fill={color} opacity="0.1" />
    <text x="12" y="16" textAnchor="middle" fill={color}
      style={{ fontSize: 10, fontWeight: 900, fontFamily: "Arial" }}>¢</text>
  </svg>
);

/* ─── CASH SVG icon ─── */
const CashIcon = ({ size = 20, color = "#22c55e" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="13" rx="3" fill={color} opacity="0.12" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
    <circle cx="5" cy="9" r="1" fill={color} opacity="0.4" />
    <circle cx="19" cy="15" r="1" fill={color} opacity="0.4" />
  </svg>
);

/* ─── coin packs ─── */
const COIN_PACKS = [
  {
    id: 1, badge: "STARTER", amount: "5 000", amountRaw: "5000",
    price: "$9.99", icon: Package,
    color: "#00E5FF", glow: "#00E5FF44",
    tag: null,
    perks: ["Premium Access"],
  },
  {
    id: 2, badge: "PRO", amount: "25 000", amountRaw: "25000",
    price: "$24.99", icon: TrendingUp,
    color: "#FF3D00", glow: "#FF3D0044",
    tag: "POPULAR",
    perks: ["Fast Pass"],
  },
  {
    id: 3, badge: "ELITE", amount: "100 000", amountRaw: "100000",
    price: "$79.99", icon: Star,
    color: "#FFB800", glow: "#FFB80044",
    tag: null,
    perks: ["Premium Access"],
  },
  {
    id: 4, badge: "LEGEND", amount: "500 000", amountRaw: "500000",
    price: "$199.99", icon: Crown,
    color: "#c9a84c", glow: "#c9a84c55",
    tag: "BEST VALUE",
    perks: ["All Access"],
  },
];

/* ─── cash packs ─── */
const CASH_PACKS = [
  { id: 1, badge: "QUICK",    amount: "1M",   amountRaw: "1000000",  price: "$4.99",  color: "#22c55e", glow: "#22c55e33", icon: Zap },
  { id: 2, badge: "MID",      amount: "10M",  amountRaw: "10000000", price: "$14.99", color: "#22c55e", glow: "#22c55e33", icon: TrendingUp, tag: "POPULAR" },
  { id: 3, badge: "HEAVY",    amount: "100M", amountRaw: "100000000",price: "$49.99", color: "#22c55e", glow: "#22c55e33", icon: Package },
  { id: 4, badge: "ULTIMATE", amount: "500M", amountRaw: "500000000",price: "$99.99", color: "#22c55e", glow: "#22c55e33", icon: Rocket, tag: "BEST VALUE" },
];

type TabType = "all" | "coins" | "cash";

/* ─── Pack Card ─── */
function PackCard({
  pack, type, index, onBuy,
}: {
  pack: any; type: "COINS" | "CASH"; index: number; onBuy: () => void;
}) {
  const { badge, amount, price, color, glow, icon: Icon, tag } = pack;
  const isCash = type === "CASH";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden cursor-pointer"
      style={{ background: "#0D0D0F", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 2 }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = color + "45";
        el.style.boxShadow = `0 0 28px ${glow}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
      }}
    >
      {/* top stripe */}
      <div className="absolute top-0 inset-x-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

      {/* tag badge */}
      {tag && (
        <div className="absolute top-3 right-3 z-10 font-black uppercase tracking-widest px-2 py-[3px]"
          style={{
            fontSize: 7, background: color + "20",
            border: `1px solid ${color}50`, color,
            clipPath: "polygon(0 0, 88% 0, 100% 35%, 100% 100%, 12% 100%, 0 65%)",
          }}>
          {tag}
        </div>
      )}

      {/* glow bg */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${color}08, transparent)` }} />

      <div className="p-5">
        {/* icon + badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center shrink-0"
            style={{
              background: color + "15", border: `1px solid ${color}40`,
              clipPath: "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
            }}>
            <Icon size={18} style={{ color }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              {isCash
                ? <CashIcon size={14} color={color} />
                : <CoinIcon size={14} color={color} />
              }
              <p className="font-black uppercase tracking-[0.2em]" style={{ fontSize: 8, color: color + "cc" }}>
                {isCash ? "CASH" : "COINS"} · {badge}
              </p>
            </div>
          </div>
        </div>

        {/* amount */}
        <div className="mb-1">
          <p className="font-black italic tracking-tighter leading-none"
            style={{ fontSize: 32, color, textShadow: `0 0 20px ${glow}` }}>
            {amount}
          </p>
          <p className="font-bold uppercase tracking-widest mt-0.5"
            style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
            {isCash ? "in-game cash" : "coins"}
          </p>
        </div>

        {/* divider */}
        <div className="flex items-center gap-1.5 my-4">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="w-4 h-px" style={{ background: color + "55" }} />
          <div className="w-1 h-1 rotate-45" style={{ background: color + "55" }} />
        </div>

        {/* price + buy */}
        <div className="flex items-end justify-between">
          <span className="font-black italic" style={{ fontSize: 22, color: "rgba(255,255,255,0.85)" }}>
            {price}
          </span>
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            onClick={onBuy}
            className="flex items-center gap-1.5 px-4 py-2 font-black uppercase tracking-widest"
            style={{
              fontSize: 9, background: color, color: "#000",
              clipPath: "polygon(0 0, 88% 0, 100% 35%, 100% 100%, 12% 100%, 0 65%)",
            }}>
            Buy <ChevronRight size={11} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN
═══════════════════════════════════════ */
export default function DonateMarket() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [category, setCategory] = useState<"COINS" | "CASH" | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openBuy = (pack: any, type: "COINS" | "CASH") => {
    setSelectedPack(pack);
    setCategory(type);
    setReceipt(null);
    setPreview(null);
    setSuccess(false);
    setModalOpen(true);
  };

  const handleFile = (f: File) => {
    setReceipt(f);
    const r = new FileReader();
    r.onload = () => setPreview(r.result as string);
    r.readAsDataURL(f);
  };

  const sendOrder = async () => {
    if (!receipt || !selectedPack || !category) { alert("Upload receipt first"); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("item", selectedPack.badge);
      fd.append("price", selectedPack.price);
      fd.append("category", category);
      fd.append("amount", selectedPack.amountRaw);
      fd.append("receipt", receipt);
      const res = await fetch(`${API}/telegram/donate-to-tg`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token || ""}` },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => { setModalOpen(false); setSuccess(false); }, 2000);
      } else { alert("Error"); }
    } catch { alert("Server error"); }
    finally { setLoading(false); }
  };

  const TABS: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: "all",   label: "All",   icon: <Sparkles size={11} /> },
    { key: "coins", label: "Coins", icon: <CoinIcon size={13} /> },
    { key: "cash",  label: "Cash",  icon: <CashIcon size={13} /> },
  ];

  const accentColor = selectedPack?.color || "#FF3D00";

  return (
    <div className="min-h-screen text-white pb-24 pt-20" style={{ background: "#080809" }}>
      {/* bg */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 30% at 50% -5%, #FF3D000D 0%, transparent 60%)," +
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "auto, 44px 44px, 44px 44px",
        }}
      />

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-20">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Flame size={11} style={{ color: "#FF3D00" }} />
            <span className="font-black uppercase tracking-[0.4em]" style={{ fontSize: 8, color: "#FF3D0088" }}>
              CPM Racing Market
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #FF3D0030, transparent)" }} />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-black italic uppercase tracking-tighter leading-[0.85]"
                style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}>
                <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.13)", color: "transparent" }}>DONATE</span>
                <br />
                <span style={{ color: "#FF3D00", textShadow: "0 0 40px #FF3D0077" }}>MARKET</span>
                {"  "}
                <span style={{ color: "#FF3D00" }}>///</span>
              </h1>
              <p className="font-bold uppercase tracking-[0.25em] mt-3"
                style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                Coins · Cash · Instant delivery
              </p>
            </div>

            {/* TABS */}
            <div className="flex gap-2">
              {TABS.map(({ key, label, icon }) => {
                const active = activeTab === key;
                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setActiveTab(key)}
                    className="flex items-center gap-2 px-5 py-2.5 font-black uppercase tracking-widest transition-all duration-200"
                    style={{
                      fontSize: 9,
                      color: active ? "#FF3D00" : "rgba(255,255,255,0.3)",
                      background: active ? "#FF3D0012" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "#FF3D0045" : "rgba(255,255,255,0.07)"}`,
                      clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
                    }}
                  >
                    {icon}
                    {label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── COINS SECTION ── */}
        <AnimatePresence>
          {(activeTab === "all" || activeTab === "coins") && (
            <motion.div
              key="coins"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-10"
            >
              {/* section label */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center"
                  style={{
                    background: "#FFB80018", border: "1px solid #FFB80040",
                    clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                  }}>
                  <CoinIcon size={16} color="#FFB800" />
                </div>
                <h2 className="font-black italic uppercase tracking-tighter" style={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }}>
                  Coins
                </h2>
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                  <div className="w-6 h-px" style={{ background: "#FFB80055" }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#FFB80055" }} />
                </div>
                <span className="font-black uppercase tracking-widest"
                  style={{ fontSize: 8, color: "rgba(255,255,255,0.18)" }}>
                  {COIN_PACKS.length} packs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COIN_PACKS.map((p, i) => (
                  <PackCard key={p.id} pack={p} type="COINS" index={i}
                    onBuy={() => openBuy(p, "COINS")} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CASH SECTION ── */}
        <AnimatePresence>
          {(activeTab === "all" || activeTab === "cash") && (
            <motion.div
              key="cash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 flex items-center justify-center"
                  style={{
                    background: "#22c55e18", border: "1px solid #22c55e40",
                    clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                  }}>
                  <CashIcon size={16} color="#22c55e" />
                </div>
                <h2 className="font-black italic uppercase tracking-tighter" style={{ fontSize: 18, color: "rgba(255,255,255,0.85)" }}>
                  Cash
                </h2>
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                  <div className="w-6 h-px" style={{ background: "#22c55e55" }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#22c55e55" }} />
                </div>
                <span className="font-black uppercase tracking-widest"
                  style={{ fontSize: 8, color: "rgba(255,255,255,0.18)" }}>
                  {CASH_PACKS.length} packs
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CASH_PACKS.map((p, i) => (
                  <PackCard key={p.id} pack={p} type="CASH" index={i}
                    onBuy={() => openBuy(p, "CASH")} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TRUST BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-14 pt-6 flex flex-wrap gap-6 justify-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { icon: Zap,          label: "Мгновенная доставка" },
            { icon: CheckCircle2, label: "100% гарантия" },
            { icon: Flame,        label: "24/7 поддержка" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={13} style={{ color: "#FF3D0077" }} />
              <span className="font-black uppercase tracking-widest" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ══ MODAL ══ */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md overflow-hidden"
              style={{ background: "#0D0D0F", border: `1px solid ${accentColor}35`, borderRadius: 2 }}
            >
              <div className="absolute top-0 inset-x-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

              {/* header */}
              <div className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center"
                    style={{
                      background: accentColor + "18", border: `1px solid ${accentColor}44`,
                      clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                    }}>
                    {category === "CASH"
                      ? <CashIcon size={16} color={accentColor} />
                      : <CoinIcon size={16} color={accentColor} />
                    }
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest" style={{ fontSize: 11 }}>
                      Оплата заказа
                    </p>
                    <p className="font-bold uppercase tracking-widest"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}>
                      {selectedPack?.badge} · {category}
                    </p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)}
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.25)")}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 py-5 space-y-3">
                {/* card */}
                <div className="p-4 space-y-3 relative overflow-hidden"
                  style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.6) 4px, rgba(0,0,0,0.6) 5px)" }} />
                  <div className="flex justify-between items-center">
                    <span className="font-black uppercase tracking-[0.22em]"
                      style={{ fontSize: 8, color: "rgba(255,255,255,0.25)" }}>Card Number</span>
                    <span className="font-black uppercase tracking-widest" style={{ fontSize: 9, color: accentColor }}>UZCARD</span>
                  </div>
                  <p className="font-mono tracking-[0.15em]" style={{ fontSize: 18, color: "rgba(255,255,255,0.88)" }}>
                    9860 3501 4889 2556
                  </p>
                </div>

                {/* order summary */}
                <div className="flex items-center justify-between px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  <div className="flex items-center gap-2">
                    {category === "CASH"
                      ? <CashIcon size={14} color={accentColor} />
                      : <CoinIcon size={14} color={accentColor} />
                    }
                    <span className="font-black italic" style={{ fontSize: 20, color: accentColor }}>
                      {selectedPack?.amount}
                    </span>
                    <span className="font-bold uppercase" style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
                      {category?.toLowerCase()}
                    </span>
                  </div>
                  <span className="font-black italic" style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
                    {selectedPack?.price}
                  </span>
                </div>

                {/* file upload */}
                <div>
                  <p className="font-black uppercase tracking-[0.22em] mb-1.5"
                    style={{ fontSize: 8, color: "rgba(255,255,255,0.28)" }}>
                    Чек оплаты
                  </p>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

                  {preview ? (
                    <div className="relative overflow-hidden"
                      style={{ borderRadius: 2, border: `1px solid ${accentColor}35` }}>
                      <img src={preview} className="w-full object-cover" style={{ maxHeight: 120 }} />
                      <div className="absolute inset-x-0 bottom-0 h-8"
                        style={{ background: "linear-gradient(to top, #0D0D0F, transparent)" }} />
                      <button onClick={() => { setPreview(null); setReceipt(null); }}
                        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center"
                        style={{ background: "#FF3D0088", borderRadius: 2 }}>
                        <X size={11} style={{ color: "#fff" }} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => fileRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 py-5 transition-all duration-200"
                      style={{ background: "rgba(0,0,0,0.3)", border: "1px dashed rgba(255,255,255,0.09)", borderRadius: 2 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor + "40"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.09)"; }}
                    >
                      <Upload size={16} style={{ color: "rgba(255,255,255,0.2)" }} />
                      <span className="font-black uppercase tracking-widest" style={{ fontSize: 8, color: "rgba(255,255,255,0.22)" }}>
                        Загрузить чек
                      </span>
                    </button>
                  )}
                </div>

                {/* confirm */}
                <motion.button
                  whileHover={{ scale: success ? 1 : 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={success ? undefined : sendOrder}
                  disabled={loading || success}
                  className="w-full flex items-center justify-center gap-2 py-4 font-black uppercase tracking-[0.25em]"
                  style={{
                    fontSize: 11,
                    background: success ? "#22c55e" : loading ? accentColor + "44" : accentColor,
                    color: "#000",
                    clipPath: "polygon(0 0, 97% 0, 100% 35%, 100% 100%, 3% 100%, 0 65%)",
                    cursor: loading || success ? "not-allowed" : "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  {success ? (
                    <><CheckCircle2 size={14} /> Отправлено!</>
                  ) : loading ? (
                    <motion.div animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 rounded-full"
                      style={{ border: "2px solid transparent", borderTopColor: "#00000088" }} />
                  ) : (
                    <><Zap size={13} fill="currentColor" /> Подтвердить</>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
