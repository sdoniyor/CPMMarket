import React, { useState } from "react";

interface CoinPack {
  id: number;
  badge: string;
  badgeColor: string;
  amount: string;
  perks: string[];
  price: string;
  glowColor: string;
  isLegend?: boolean;
}

interface CashPack {
  id: number;
  badge: string;
  amount: string;
  badgeColor: string;
  price: string;
}

const API = "https://cpmmarker.onrender.com";

export default function DonateMarket() {
  const [activeTab, setActiveTab] = useState<"all" | "coins" | "cash">("all");

  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= OPEN MODAL ================= */
  const openBuyModal = (pack: any, category: string, perks?: string[]) => {
    setSelectedPack({
      ...pack,
      category,
      perks,
    });

    setModalOpen(true);
  };

  /* ================= SEND ORDER (FIXED) ================= */
  const sendOrder = async () => {
    try {
      if (!receipt) {
        alert("UPLOAD RECEIPT");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      /* ✔ backend match */
      formData.append("item", selectedPack.badge);
      formData.append("price", selectedPack.price);

      formData.append("receipt", receipt);

      const res = await fetch(
        `${API}/telegram/donate-to-tg`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token || ""}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("ORDER SENT ✔");

        setModalOpen(false);
        setReceipt(null);
        setSelectedPack(null);
      } else {
        alert("ERROR");
      }
    } catch (e) {
      console.log(e);
      alert("SERVER ERROR");
    } finally {
      setLoading(false);
    }
  };

  /* ================= COINS ================= */
  const coinPacks: CoinPack[] = [
    {
      id: 1,
      badge: "STARTER PACK",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      amount: "5 000",
      perks: ["Premium Access", "Special Decals"],
      price: "$9.99",
      glowColor: "shadow-blue-500/10 hover:shadow-blue-500/20",
    },
    {
      id: 2,
      badge: "PRO PACK",
      badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      amount: "25 000",
      perks: ["Premium Access", "Fast Pass"],
      price: "$24.99",
      glowColor: "shadow-cyan-500/10 hover:shadow-cyan-500/20",
    },
    {
      id: 3,
      badge: "ELITE PACK",
      badgeColor: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      amount: "100 000",
      perks: ["Premium Access", "Fast Pass", "Special Decals"],
      price: "$79.99",
      glowColor: "shadow-yellow-500/10 hover:shadow-yellow-500/30",
      isLegend: true,
    },
    {
      id: 4,
      badge: "LEGEND PACK",
      badgeColor: "bg-orange-500/20 text-orange-500 border-orange-500/30",
      amount: "500 000",
      perks: ["Premium Access", "Fast Pass", "Special Decals"],
      price: "$199.99",
      glowColor: "shadow-orange-500/20 hover:shadow-orange-500/40",
      isLegend: true,
    },
  ];

  /* ================= CASH ================= */
  const cashPacks: CashPack[] = [
    {
      id: 1,
      badge: "QUICK CASH",
      amount: "1M",
      badgeColor: "bg-green-500/20 text-green-400",
      price: "$4.99",
    },
    {
      id: 2,
      badge: "MID-SIZE INJECTION",
      amount: "10M",
      badgeColor: "bg-green-500/20 text-green-400",
      price: "$14.99",
    },
    {
      id: 3,
      badge: "HEAVY LOAD",
      amount: "100M",
      badgeColor: "bg-green-500/20 text-green-400",
      price: "$49.99",
    },
    {
      id: 4,
      badge: "ULTIMATE CASH",
      amount: "500M",
      badgeColor: "bg-green-500/20 text-green-400",
      price: "$99.99",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans antialiased p-4 md:p-8 relative overflow-hidden">

      {/* BG */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-orange-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-10">
          GET PREMIUM{" "}
          <span className="text-orange-500">CURRENCY ///</span>
        </h1>

        {/* TABS */}
        <div className="flex gap-2 mb-10 bg-[#121212] p-1 border border-zinc-800 rounded-md w-fit">
          {(["all", "coins", "cash"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-bold uppercase ${
                activeTab === tab
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* COINS */}
        {(activeTab === "all" || activeTab === "coins") && (
          <div className="mb-14">
            <h2 className="text-2xl font-black mb-6">COIN PACKS</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {coinPacks.map((pack) => (
                <div
                  key={pack.id}
                  className={`bg-[#111] border border-zinc-800 rounded-xl p-6 ${pack.glowColor}`}
                >

                  <div className="text-xs font-bold text-zinc-400 mb-2">
                    {pack.badge}
                  </div>

                  <div className="text-3xl font-black mb-3">
                    {pack.amount}
                  </div>

                  <div className="text-orange-400 font-bold mb-4">
                    {pack.price}
                  </div>

                  <button
                    onClick={() =>
                      openBuyModal(pack, "COINS", pack.perks)
                    }
                    className="w-full bg-orange-500 text-black py-2 font-black"
                  >
                    BUY
                  </button>

                </div>
              ))}

            </div>
          </div>
        )}

        {/* CASH */}
        {(activeTab === "all" || activeTab === "cash") && (
          <div>
            <h2 className="text-2xl font-black mb-6">CASH BOOSTS</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {cashPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-[#111] border border-zinc-800 rounded-xl p-6"
                >

                  <div className="text-xs text-zinc-400 mb-2">
                    {pack.badge}
                  </div>

                  <div className="text-3xl font-black text-green-400 mb-3">
                    {pack.amount}
                  </div>

                  <div className="text-orange-400 font-bold mb-4">
                    {pack.price}
                  </div>

                  <button
                    onClick={() =>
                      openBuyModal(pack, "CASH")
                    }
                    className="w-full bg-orange-500 text-black py-2 font-black"
                  >
                    BUY
                  </button>

                </div>
              ))}

            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && selectedPack && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">

          <div className="bg-[#111] border border-zinc-800 p-6 rounded-xl w-[400px]">

            <h2 className="text-2xl font-black mb-4">PAYMENT</h2>

            <div className="mb-2">
              ITEM: {selectedPack.badge}
            </div>

            <div className="text-orange-500 mb-4">
              PRICE: {selectedPack.price}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setReceipt(e.target.files?.[0] || null)
              }
              className="mb-4"
            />

            <div className="flex gap-2">

              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-zinc-700 py-2"
              >
                CANCEL
              </button>

              <button
                onClick={sendOrder}
                disabled={loading}
                className="flex-1 bg-orange-500 text-black py-2 font-black"
              >
                {loading ? "SENDING..." : "CONFIRM"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}