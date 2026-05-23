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
  const [activeTab, setActiveTab] = useState<
    "all" | "coins" | "cash" | "specials"
  >("all");

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

  /* ================= SEND ORDER ================= */
  const sendOrder = async () => {
    try {
      if (!receipt) {
        alert("UPLOAD RECEIPT");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("packName", selectedPack.badge);
      formData.append("category", selectedPack.category);
      formData.append("amount", selectedPack.amount);
      formData.append("price", selectedPack.price);

      if (selectedPack.perks) {
        formData.append(
          "perks",
          selectedPack.perks.join(", ")
        );
      }

      formData.append("receipt", receipt);

      const res = await fetch(
        `${API}/orders/donate-to-tg`,
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
        alert("ORDER SENT");

        setModalOpen(false);
        setReceipt(null);
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
      badgeColor:
        "bg-blue-500/20 text-blue-400 border-blue-500/30",
      amount: "5 000",
      perks: ["Premium Access", "Special Decals"],
      price: "$9.99",
      glowColor:
        "shadow-blue-500/10 hover:shadow-blue-500/20",
    },
    {
      id: 2,
      badge: "PRO PACK",
      badgeColor:
        "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      amount: "25 000",
      perks: ["Premium Access", "Fast Pass"],
      price: "$24.99",
      glowColor:
        "shadow-cyan-500/10 hover:shadow-cyan-500/20",
    },
    {
      id: 3,
      badge: "ELITE PACK",
      badgeColor:
        "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      amount: "100 000",
      perks: [
        "Premium Access",
        "Fast Pass",
        "Special Decals",
      ],
      price: "$79.99",
      glowColor:
        "shadow-yellow-500/10 hover:shadow-yellow-500/30",
      isLegend: true,
    },
  ];

  /* ================= CASH ================= */

  const cashPacks: CashPack[] = [
    {
      id: 1,
      badge: "QUICK CASH",
      amount: "1M",
      badgeColor:
        "bg-green-500/20 text-green-400",
      price: "$4.99",
    },
    {
      id: 2,
      badge: "MID-SIZE INJECTION",
      amount: "10M",
      badgeColor:
        "bg-green-500/20 text-green-400",
      price: "$14.99",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <h1 className="text-5xl font-black italic uppercase mb-10">
          DONATE MARKET
        </h1>

        {/* TABS */}

        <div className="flex gap-3 mb-10">
          {(["all", "coins", "cash"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? "bg-orange-500 text-black"
                  : "bg-zinc-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* COINS */}

        {(activeTab === "all" ||
          activeTab === "coins") && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

            {coinPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-[#111] border border-zinc-800 rounded-xl p-6"
              >
                <div className="text-3xl mb-5">
                  💎
                </div>

                <div className="text-2xl font-black mb-2">
                  {pack.amount}
                </div>

                <div className="text-zinc-400 mb-6">
                  {pack.badge}
                </div>

                <div className="text-orange-500 text-2xl font-black mb-6">
                  {pack.price}
                </div>

                <button
                  onClick={() =>
                    openBuyModal(
                      pack,
                      "COINS",
                      pack.perks
                    )
                  }
                  className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black py-3 rounded"
                >
                  BUY
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CASH */}

        {(activeTab === "all" ||
          activeTab === "cash") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {cashPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-[#111] border border-zinc-800 rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <div className="text-2xl font-black">
                    {pack.amount}
                  </div>

                  <div className="text-zinc-400">
                    {pack.badge}
                  </div>

                  <div className="text-green-500 text-xl font-black mt-2">
                    {pack.price}
                  </div>
                </div>

                <button
                  onClick={() =>
                    openBuyModal(pack, "CASH")
                  }
                  className="bg-orange-500 hover:bg-orange-400 text-black font-black px-6 py-3 rounded"
                >
                  BUY
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}

      {modalOpen && selectedPack && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">

          <div className="bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-md p-6">

            <h2 className="text-3xl font-black mb-6">
              PAYMENT
            </h2>

            <div className="space-y-4">

              <div>
                <div className="text-zinc-500 text-sm">
                  PACK
                </div>

                <div className="text-xl font-bold">
                  {selectedPack.badge}
                </div>
              </div>

              <div>
                <div className="text-zinc-500 text-sm">
                  PRICE
                </div>

                <div className="text-orange-500 text-2xl font-black">
                  {selectedPack.price}
                </div>
              </div>

              <div>
                <div className="text-zinc-500 text-sm mb-2">
                  CARD NUMBER
                </div>

                <div className="bg-black border border-zinc-700 rounded-xl p-4 text-xl tracking-widest font-black">
                  9860 3501 XXXX XXXX
                </div>
              </div>

              <div>
                <div className="text-zinc-500 text-sm mb-2">
                  UPLOAD RECEIPT
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setReceipt(
                      e.target.files?.[0] || null
                    )
                  }
                  className="w-full bg-black border border-zinc-700 rounded-xl p-3"
                />
              </div>

              <div className="flex gap-3 pt-4">

                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded font-bold"
                >
                  CANCEL
                </button>

                <button
                  onClick={sendOrder}
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-400 text-black py-3 rounded font-black"
                >
                  {loading
                    ? "SENDING..."
                    : "CONFIRM"}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}