import React, { useState } from "react";

export default function AccountBoosting() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const amount = 49.99;

  const handleSubmit = async () => {
    if (!receiptFile || !email || !password) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("amount", amount);
      formData.append("receipt", receiptFile);

      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        alert("Ошибка отправки");
      }
    } catch (err) {
      console.error(err);
      alert("Сервер недоступен");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#0b0b14] border border-white/10 rounded-2xl p-6 space-y-5">

        <h1 className="text-2xl font-bold">
          Оплата аккаунта
        </h1>

        <p className="text-sm text-gray-400">
          Сумма: <span className="text-emerald-400 font-bold">{amount} $</span>
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#121225] border border-white/10 rounded-xl p-3 text-sm"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#121225] border border-white/10 rounded-xl p-3 text-sm"
        />

        {/* FILE UPLOAD */}
        <div>
          <label className="text-xs text-gray-400">
            Загрузите чек оплаты
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full mt-2 text-sm"
            onChange={(e) => setReceiptFile(e.target.files?.[0])}
          />

          {receiptFile && (
            <p className="text-xs text-purple-400 mt-2">
              📎 {receiptFile.name}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading || success}
          className={`w-full py-3 rounded-xl font-bold transition ${
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

        {/* STATUS */}
        {success && (
          <div className="text-center text-emerald-400 text-sm">
            ✔ Ваши данные отправлены администратору
          </div>
        )}
      </div>
    </div>
  );
}