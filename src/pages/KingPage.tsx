import React, { useState } from 'react';

// import MyNavbar from './components/Navbar';

const MyNavbar = () => (
  <div className="w-full text-center py-4 bg-zinc-900/30 border-b border-white/5 text-gray-500 text-xs tracking-widest">
    [ МЕСТО ДЛЯ ВАШЕГО НАВБАРА ]
  </div>
);

export default function AccountBoosting() {
  const [step, setStep] = useState(1);
  const [uploaded, setUploaded] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    if (!uploaded) return;

    setStep(2);

    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-white font-sans flex flex-col">
      <MyNavbar />

      <div className="flex-grow flex items-center justify-center p-4 md:p-12">
        <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT */}
          <div className="relative rounded-[28px] overflow-hidden border border-purple-900/20 bg-[#0b0b14] p-8 flex flex-col justify-between min-h-[650px]">

            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage:
                  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/40 to-black z-10" />

            <div className="relative z-20 flex flex-col justify-between h-full">

              {/* STATS */}
              <div className="flex flex-col sm:flex-row gap-4">

                <div className="flex-1 bg-[#121225]/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-2xl">
                    👑
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Прокачано</p>
                    <p className="text-3xl font-black">12,540</p>
                    <p className="text-[10px] text-purple-400">аккаунтов</p>
                  </div>
                </div>

                <div className="flex-1 bg-[#121225]/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1b1630] flex items-center justify-center text-2xl text-purple-400">
                    ⭐
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Рейтинг</p>
                    <p className="text-3xl font-black">4.9</p>
                    <div className="text-purple-500 text-xs">★★★★★</div>
                  </div>
                </div>

              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-auto">

                {[
                  ['🛡️', 'Безопасность', '100% гарантия'],
                  ['⚡', 'Скорость', 'от 15 минут'],
                  ['🎧', 'Поддержка', '24/7 онлайн'],
                  ['👤', 'Анонимность', 'без данных']
                ].map((f, i) => (
                  <div key={i} className="bg-[#0e0e1c]/80 border border-white/5 rounded-xl p-3">
                    <div className="text-purple-500 text-xl">{f[0]}</div>
                    <p className="text-xs font-bold">{f[1]}</p>
                    <p className="text-[10px] text-gray-400">{f[2]}</p>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-[#0b0b14] border border-white/5 rounded-[28px] p-6 md:p-8 flex flex-col justify-between">

            <div>

              <h1 className="text-3xl font-black uppercase">
                Прокачка <span className="text-purple-500">аккаунта</span>
              </h1>

              <p className="text-xs text-gray-400 mt-2 mb-8">
                Загрузите чек оплаты и получите подтверждение
              </p>

              {/* STEP */}
              <div className="flex justify-between max-w-md mx-auto mb-10 relative">

                <div className="absolute top-5 left-0 right-0 h-[2px] bg-zinc-800" />

                <div
                  className={`absolute top-5 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500 ${
                    step === 1 ? 'w-0' : 'w-full'
                  }`}
                />

                <div className="flex flex-col items-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 1 ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-gray-500'
                  }`}>
                    {step > 1 ? '✓' : '1'}
                  </div>
                  <p className="text-[11px] text-purple-400 mt-2">Данные</p>
                </div>

                <div className="flex flex-col items-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    paymentSuccess ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-gray-500'
                  }`}>
                    {paymentSuccess ? '✓' : '2'}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">Оплата</p>
                </div>

              </div>

              {/* SUCCESS */}
              {paymentSuccess ? (
                <div className="text-center animate-[fade_0.5s_ease]">

                  <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-5xl">
                    ✓
                  </div>

                  <h2 className="text-2xl font-black text-emerald-400 mt-6">
                    Оплата подтверждена
                  </h2>

                  <p className="text-sm text-gray-400 mt-3">
                    Чек принят. Заказ в обработке.
                  </p>

                </div>
              ) : (
                <div className="space-y-5">

                  {/* EMAIL */}
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full bg-[#121225]/40 border border-white/5 rounded-xl px-4 py-3 text-sm"
                  />

                  {/* PASSWORD */}
                  <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full bg-[#121225]/40 border border-white/5 rounded-xl px-4 py-3 text-sm"
                  />

                  {/* FILE UPLOAD FIXED */}
                  <div>
                    <input
                      id="receipt"
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setUploaded(true);
                          setReceiptFile(e.target.files[0]);
                        }
                      }}
                    />

                    <label
                      htmlFor="receipt"
                      className={`block border rounded-xl p-6 text-center cursor-pointer transition-all ${
                        uploaded
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-dashed border-zinc-700 bg-[#121225]/20 hover:border-purple-500/40'
                      }`}
                    >
                      <div className="text-3xl mb-2">
                        {uploaded ? '✓' : '☁️'}
                      </div>

                      <p className="text-sm font-bold">
                        {uploaded
                          ? receiptFile?.name
                          : 'Нажмите чтобы выбрать фото чека'}
                      </p>

                      <p className="text-[10px] text-gray-500 mt-1">
                        PNG, JPG, PDF
                      </p>
                    </label>
                  </div>

                  {/* BUTTON */}
                  <button
                    disabled={!uploaded}
                    onClick={handlePayment}
                    className={`w-full py-4 rounded-xl font-bold uppercase text-xs transition-all ${
                      uploaded
                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white active:scale-[0.98]'
                        : 'bg-zinc-900 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Оплатить →
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}