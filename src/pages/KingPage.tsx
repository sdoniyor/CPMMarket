import React, { useState } from 'react';

// import MyNavbar from './components/Navbar';

const MyNavbar = () => (
  <div className="w-full text-center py-4 bg-zinc-900/30 border-b border-white/5 text-gray-500 text-xs tracking-widest">
    [ МЕСТО ДЛЯ ВАШЕГО НАВБАРА ]
  </div>
);

export default function AccountBoosting() {
  const [step, setStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
  };

  const handlePayment = () => {
    if (!uploaded) return;

    setStep(2);

    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-white font-sans flex flex-col">
      <MyNavbar />

      <div className="flex-grow flex items-center justify-center p-4 md:p-12">
        <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT */}
          <div className="relative rounded-[28px] overflow-hidden border border-purple-900/20 bg-[#0b0b14] p-8 flex flex-col justify-between min-h-[650px]">

            {/* BG */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/40 to-black z-10" />

            <div className="relative z-20 flex flex-col justify-between h-full">

              {/* STATS */}
              <div className="flex flex-col sm:flex-row gap-4">

                <div className="flex-1 bg-[#121225]/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                    👑
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">
                      Прокачано
                    </p>

                    <p className="text-3xl font-black mt-1">
                      12,540
                    </p>

                    <p className="text-[10px] text-purple-400">
                      аккаунтов
                    </p>
                  </div>

                </div>

                <div className="flex-1 bg-[#121225]/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-[#1b1630] border border-purple-500/20 flex items-center justify-center text-2xl text-purple-400">
                    ⭐
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">
                      Рейтинг
                    </p>

                    <p className="text-3xl font-black mt-1">
                      4.9
                    </p>

                    <div className="text-purple-500 text-xs">
                      ★★★★★
                    </div>
                  </div>

                </div>

              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-auto">

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                  <div className="text-purple-500 text-xl mb-2">
                    🛡️
                  </div>

                  <p className="text-xs font-bold">
                    Безопасность
                  </p>

                  <p className="text-[10px] text-gray-400 mt-1">
                    100% защита
                  </p>
                </div>

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                  <div className="text-purple-500 text-xl mb-2">
                    ⚡
                  </div>

                  <p className="text-xs font-bold">
                    Скорость
                  </p>

                  <p className="text-[10px] text-gray-400 mt-1">
                    от 15 минут
                  </p>
                </div>

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                  <div className="text-purple-500 text-xl mb-2">
                    🎧
                  </div>

                  <p className="text-xs font-bold">
                    Поддержка
                  </p>

                  <p className="text-[10px] text-gray-400 mt-1">
                    24/7 онлайн
                  </p>
                </div>

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                  <div className="text-purple-500 text-xl mb-2">
                    👤
                  </div>

                  <p className="text-xs font-bold">
                    Анонимность
                  </p>

                  <p className="text-[10px] text-gray-400 mt-1">
                    ваши данные защищены
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-[#0b0b14] border border-white/5 rounded-[28px] p-6 md:p-8 flex flex-col justify-between">

            <div>

              <h1 className="text-4xl font-black uppercase leading-none">
                Прокачка{" "}
                <span className="text-purple-500">
                  аккаунта
                </span>
              </h1>

              <p className="text-xs text-gray-400 mt-3 mb-10">
                Заполните данные и прикрепите чек оплаты
              </p>

              {/* STEPS */}
              <div className="relative flex items-center justify-between mb-10 max-w-md mx-auto">

                {/* LINE */}
                <div className="absolute left-0 right-0 top-5 h-[2px] bg-zinc-800 rounded-full" />

                {/* ACTIVE LINE */}
                <div
                  className={`absolute left-0 top-5 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-700 ${
                    step === 1 ? 'w-0' : 'w-full'
                  }`}
                />

                {/* STEP 1 */}
                <div className="relative z-10 flex flex-col items-center flex-1">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-500 ${
                      step >= 1
                        ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.6)]'
                        : 'bg-[#121225] border-zinc-800 text-gray-500'
                    }`}
                  >
                    {step > 1 ? '✓' : '1'}
                  </div>

                  <span className="text-[11px] mt-2 text-purple-400">
                    Данные
                  </span>

                </div>

                {/* STEP 2 */}
                <div className="relative z-10 flex flex-col items-center flex-1">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-500 ${
                      step >= 2
                        ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.6)]'
                        : 'bg-[#121225] border-zinc-800 text-gray-500'
                    }`}
                  >
                    {paymentSuccess ? '✓' : '2'}
                  </div>

                  <span
                    className={`text-[11px] mt-2 transition-all duration-500 ${
                      step >= 2
                        ? 'text-purple-400'
                        : 'text-gray-500'
                    }`}
                  >
                    Оплата
                  </span>

                </div>

              </div>

              {/* SUCCESS */}
              {paymentSuccess ? (
                <div className="animate-[fade_0.5s_ease]">

                  <div className="bg-[#121225]/40 border border-emerald-500/30 rounded-3xl p-8 text-center">

                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-5xl mx-auto shadow-[0_0_50px_rgba(16,185,129,0.25)]">
                      ✓
                    </div>

                    <h2 className="text-3xl font-black text-emerald-400 mt-6">
                      Оплата прошла
                    </h2>

                    <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                      Ваш чек успешно загружен.
                      <br />
                      Заказ передан менеджеру.
                    </p>

                  </div>

                </div>
              ) : (
                <div className="space-y-5 animate-[fade_0.5s_ease]">

                  {/* EMAIL */}
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-2">
                      E-mail
                    </label>

                    <div className="relative">
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        className="w-full bg-[#121225]/40 border border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-600 transition-all"
                      />

                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600">
                        ✉️
                      </span>
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-2">
                      Пароль
                    </label>

                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Введите пароль"
                        className="w-full bg-[#121225]/40 border border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-600 transition-all"
                      />

                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600">
                        👁️
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="bg-[#121225]/40 border border-purple-500/20 rounded-2xl p-5 flex items-center justify-between">

                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500">
                        Стоимость
                      </p>

                      <p className="text-3xl font-black text-emerald-400 mt-2">
                        49.99 $
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(168,85,247,0.45)]">
                      ⚡
                    </div>

                  </div>

                  {/* CHECK */}
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-2">
                      Чек оплаты
                    </label>

                    <div
                      onClick={handleUpload}
                      className={`border rounded-2xl p-7 text-center cursor-pointer transition-all duration-300 ${
                        uploaded
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-dashed border-zinc-800 bg-[#121225]/20 hover:border-purple-500/40'
                      }`}
                    >

                      <span className="text-3xl block mb-2 text-purple-500">
                        {uploaded ? '✓' : '☁️'}
                      </span>

                      <p className="text-sm font-bold text-gray-300">
                        {uploaded
                          ? 'Чек успешно загружен'
                          : 'Загрузить чек оплаты'}
                      </p>

                      <p className="text-[10px] text-gray-500 mt-1">
                        PNG, JPG, PDF до 10MB
                      </p>

                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={handlePayment}
                    disabled={!uploaded}
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                      uploaded
                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] active:scale-[0.98]'
                        : 'bg-zinc-900 text-zinc-500 cursor-not-allowed'
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