import React, { useState } from "react";

const API = "https://cpmmarker.onrender.com";

export default function DonateMarket() {
  const [activeTab, setActiveTab] = useState<"all" | "coins" | "cash">("all");
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= OPEN MODAL ================= */
  const openBuyModal = (pack: any, category: string) => {
    setSelectedPack({
      ...pack,
      category,
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

      /* ✔️ MUST MATCH BACKEND */
      formData.append("item", selectedPack.badge);
      formData.append("price", selectedPack.price);

      formData.append("receipt", receipt);

      const res = await fetch(`${API}/telegram/donate-to-tg`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: formData,
      });

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

  /* ================= PACKS ================= */

  const coinPacks = [
    {
      id: 1,
      badge: "STARTER PACK",
      amount: "5 000",
      price: "$9.99",
    },
    {
      id: 2,
      badge: "PRO PACK",
      amount: "25 000",
      price: "$24.99",
    },
    {
      id: 3,
      badge: "ELITE PACK",
      amount: "100 000",
      price: "$79.99",
    },
  ];

  const cashPacks = [
    {
      id: 1,
      badge: "QUICK CASH",
      amount: "1M",
      price: "$4.99",
    },
    {
      id: 2,
      badge: "MID CASH",
      amount: "10M",
      price: "$14.99",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-black mb-6">
        DONATE MARKET
      </h1>

      {/* TABS */}
      <div className="flex gap-2 mb-8">
        {["all", "coins", "cash"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-orange-500 text-black" : "bg-zinc-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* COINS */}
      {(activeTab === "all" || activeTab === "coins") && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">COINS</h2>

          <div className="grid grid-cols-3 gap-4">
            {coinPacks.map((pack) => (
              <div key={pack.id} className="bg-zinc-900 p-4 rounded">

                <div className="font-bold">{pack.badge}</div>
                <div className="text-green-400">{pack.amount}</div>
                <div className="text-orange-500">{pack.price}</div>

                <button
                  onClick={() => openBuyModal(pack, "COINS")}
                  className="mt-3 bg-orange-500 text-black px-3 py-1 rounded"
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
          <h2 className="text-xl font-bold mb-4">CASH</h2>

          <div className="grid grid-cols-3 gap-4">
            {cashPacks.map((pack) => (
              <div key={pack.id} className="bg-zinc-900 p-4 rounded">

                <div className="font-bold">{pack.badge}</div>
                <div className="text-green-400">{pack.amount}</div>
                <div className="text-orange-500">{pack.price}</div>

                <button
                  onClick={() => openBuyModal(pack, "CASH")}
                  className="mt-3 bg-orange-500 text-black px-3 py-1 rounded"
                >
                  BUY
                </button>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL */}
      {modalOpen && selectedPack && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">

          <div className="bg-zinc-900 p-6 rounded w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              PAYMENT
            </h2>

            <div className="mb-2">
              ITEM: {selectedPack.badge}
            </div>

            <div className="mb-4 text-orange-500">
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
                className="flex-1 bg-zinc-700 py-2 rounded"
              >
                CANCEL
              </button>

              <button
                onClick={sendOrder}
                disabled={loading}
                className="flex-1 bg-orange-500 text-black py-2 rounded"
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