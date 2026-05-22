import React, { useState } from "react";

const API = "https://cpmmarker.onrender.com";

export default function AccountBoosting() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const amount = 49.99;

  const handleSubmit = async () => {
    if (!email || !password || !receiptFile) {
      alert("Заполни все поля");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("amount", String(amount));
      formData.append("receipt", receiptFile);

      const res = await fetch(`${API}/telegram/boost-to-tg`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setEmail("");
        setPassword("");
        setReceiptFile(null);
      } else {
        alert(data.error || "Ошибка отправки");
      }
    } catch (e) {
      console.log(e);
      alert("Сервер недоступен (Render sleep или ошибка)");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0b0b14] border border-white/10 p-8 min-h-[600px]">

          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black/40 to-black" />

          <div className="relative z-10 flex flex-col justify-between h-full">

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#121225]/60 p-4 rounded-xl border border-purple-500/20">
                <p className="text-xs text-gray-400">Прокачано</p>
                <p className="text-3xl font-black">12,540</p>
              </div>

              <div className="bg-[#121225]/60 p-4 rounded-xl border border-purple-500/20">
                <p className="text-xs text-gray-400">Рейтинг</p>
                <p className="text-3xl font-black">4.9</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-[#0e0e1c]/80 p-3 rounded-xl">🛡️ Безопасность</div>
              <div className="bg-[#0e0e1c]/80 p-3 rounded-xl">⚡ Скорость</div>
              <div className="bg-[#0e0e1c]/80 p-3 rounded-xl">🎧 Поддержка</div>
              <div className="bg-[#0e0e1c]/80 p-3 rounded-xl">👤 Анонимно</div>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#0b0b14] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">

          <div>

            <h1 className="text-3xl font-black">
              Прокачка <span className="text-purple-500">аккаунта</span>
            </h1>

            <p className="text-xs text-gray-400 mt-2 mb-6">
              Заполните данные и прикрепите чек оплаты
            </p>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email аккаунта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 bg-[#121225] border border-white/10 rounded-xl p-3 text-sm"
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 bg-[#121225] border border-white/10 rounded-xl p-3 text-sm"
            />

            {/* AMOUNT */}
            <div className="mb-4 bg-[#121225] border border-purple-500/20 rounded-xl p-4 flex justify-between">
              <span className="text-sm text-gray-400">Сумма</span>
              <span className="text-emerald-400 font-bold">
                {amount} $
              </span>
            </div>

            {/* FILE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
              className="mb-2"
            />

            {receiptFile && (
              <p className="text-xs text-purple-400 mb-3">
                📎 {receiptFile.name}
              </p>
            )}

          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={!email || !password || !receiptFile || loading || success}
            className={`w-full py-4 rounded-xl font-bold transition ${
              success
                ? "bg-emerald-600"
                : loading
                ? "bg-gray-600"
                : "bg-purple-600 hover:bg-purple-500"
            }`}
          >
            {success
              ? "Отправлено ✔"
              : loading
              ? "Отправка..."
              : "Оплатить"}
          </button>

          {success && (
            <p className="text-center text-emerald-400 text-sm mt-3">
              ✔ Отправлено в Telegram
            </p>
          )}

        </div>

      </div>
    </div>
  );
}