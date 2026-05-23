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
  const [activeTab, setActiveTab] =
    useState<"all" | "coins" | "cash">("all");

  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [category, setCategory] = useState<"COINS" | "CASH" | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= OPEN MODAL ================= */
  const openBuyModal = (
    pack: any,
    type: "COINS" | "CASH",
    perks?: string[]
  ) => {
    setSelectedPack({
      ...pack,
      perks,
    });

    setCategory(type);
    setModalOpen(true);
  };

  /* ================= SEND ORDER ================= */
  const sendOrder = async () => {
    try {
      if (!receipt || !selectedPack || !category) {
        alert("UPLOAD RECEIPT");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      /* 🔥 backend expects */
      formData.append("item", selectedPack.badge);
      formData.append("price", selectedPack.price);
      formData.append("category", category);
      formData.append("amount", selectedPack.amount);
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
        setCategory(null);
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
      badgeColor: "text-blue-400",
      amount: "5 000",
      perks: ["Premium Access"],
      price: "$9.99",
      glowColor: "",
    },
    {
      id: 2,
      badge: "PRO PACK",
      badgeColor: "text-cyan-400",
      amount: "25 000",
      perks: ["Fast Pass"],
      price: "$24.99",
      glowColor: "",
    },
    {
      id: 3,
      badge: "ELITE PACK",
      badgeColor: "text-yellow-400",
      amount: "100 000",
      perks: ["Premium Access"],
      price: "$79.99",
      glowColor: "",
    },
    {
      id: 4,
      badge: "LEGEND PACK",
      badgeColor: "text-orange-400",
      amount: "500 000",
      perks: ["All Access"],
      price: "$199.99",
      glowColor: "",
    },
  ];

  /* ================= CASH ================= */
  const cashPacks: CashPack[] = [
    {
      id: 1,
      badge: "QUICK CASH",
      amount: "1M",
      badgeColor: "",
      price: "$4.99",
    },
    {
      id: 2,
      badge: "MID CASH",
      amount: "10M",
      badgeColor: "",
      price: "$14.99",
    },
    {
      id: 3,
      badge: "HEAVY CASH",
      amount: "100M",
      badgeColor: "",
      price: "$49.99",
    },
    {
      id: 4,
      badge: "ULTIMATE CASH",
      amount: "500M",
      badgeColor: "",
      price: "$99.99",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <h1 className="text-5xl font-black mb-8">
        DONATE MARKET
      </h1>

      {/* TABS */}
      <div className="flex gap-2 mb-10">
        {(["all", "coins", "cash"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-bold ${
              activeTab === tab
                ? "bg-orange-500 text-black"
                : "bg-zinc-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* COINS */}
      {(activeTab === "all" || activeTab === "coins") && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            COINS
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {coinPacks.map((p) => (
              <div
                key={p.id}
                className="bg-zinc-900 p-4"
              >
                <div>{p.badge}</div>
                <div className="text-2xl font-black">
                  {p.amount}
                </div>
                <div className="text-orange-400">
                  {p.price}
                </div>

                <button
                  onClick={() =>
                    openBuyModal(p, "COINS", p.perks)
                  }
                  className="w-full mt-2 bg-orange-500 text-black font-bold"
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
          <h2 className="text-2xl font-bold mb-4">
            CASH
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {cashPacks.map((p) => (
              <div
                key={p.id}
                className="bg-zinc-900 p-4"
              >
                <div>{p.badge}</div>
                <div className="text-2xl font-black text-green-400">
                  {p.amount}
                </div>
                <div className="text-orange-400">
                  {p.price}
                </div>

                <button
                  onClick={() =>
                    openBuyModal(p, "CASH")
                  }
                  className="w-full mt-2 bg-orange-500 text-black font-bold"
                >
                  BUY
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">

          <div className="bg-zinc-900 p-6 w-[400px]">

            <h2 className="text-2xl font-black mb-4">
              PAYMENT
            </h2>

            <div>
              ITEM: {selectedPack?.badge}
            </div>

            <div className="text-orange-500 mb-4">
              AMOUNT: {selectedPack?.amount}
            </div>

            <div className="text-orange-500 mb-4">
              PRICE: {selectedPack?.price}
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
                className="flex-1 bg-orange-500 text-black font-black"
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