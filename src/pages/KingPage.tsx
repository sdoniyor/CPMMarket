import React, { useState } from 'react';

// import MyNavbar from './components/Navbar';

const MyNavbar = () => (
  <div className="w-full text-center py-4 bg-zinc-900/30 border-b border-white/5 text-gray-500 text-xs tracking-widest">
    [ МЕСТО ДЛЯ ВАШЕГО НАВБАРА ]
  </div>
);

export default function AccountBoosting() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#06060c] text-white font-sans flex flex-col">
      <MyNavbar />

      <div className="flex-grow flex items-center justify-center p-4 md:p-12">
        <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* ЛЕВАЯ СЕКЦИЯ */}
          <div className="relative rounded-[24px] overflow-hidden border border-purple-900/20 bg-[#0b0b14] p-8 flex flex-col justify-between min-h-[600px] lg:min-h-[720px]">

            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/30 to-black z-10" />

            <div className="relative z-20 flex flex-col justify-between h-full">

              {/* СТАТИСТИКА */}
              <div className="flex flex-col sm:flex-row gap-4">

                <div className="bg-[#121225]/60 backdrop-blur-md border border-purple-500/20 rounded-[18px] p-4 flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                    👑
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400">Прокачано</p>
                    <p className="text-2xl font-black leading-none my-0.5">
                      12,540
                    </p>
                    <p className="text-[10px] text-purple-400">
                      аккаунтов
                    </p>
                  </div>
                </div>

                <div className="bg-[#121225]/60 backdrop-blur-md border border-purple-500/20 rounded-[18px] p-4 flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-[#1d1635] border border-purple-500/30 flex items-center justify-center text-purple-400 text-lg">
                    ⭐
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400">
                      Рейтинг сервиса
                    </p>

                    <p className="text-2xl font-black leading-none my-0.5">
                      4.9
                    </p>

                    <div className="flex gap-0.5 text-purple-500 text-xs">
                      ★★★★★
                    </div>
                  </div>
                </div>

              </div>

              {/* ПРЕИМУЩЕСТВА */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-auto">

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-3.5">
                  <div className="text-purple-500 text-lg mb-1">🛡️</div>
                  <p className="text-xs font-bold">Безопасность</p>
                  <p className="text-[10px] text-gray-400">
                    100% гарантия
                  </p>
                </div>

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-3.5">
                  <div className="text-purple-500 text-lg mb-1">⚡</div>
                  <p className="text-xs font-bold">Скорость</p>
                  <p className="text-[10px] text-gray-400">
                    от 15 минут
                  </p>
                </div>

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-3.5">
                  <div className="text-purple-500 text-lg mb-1">🎧</div>
                  <p className="text-xs font-bold">Поддержка</p>
                  <p className="text-[10px] text-gray-400">
                    24/7 онлайн
                  </p>
                </div>

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-3.5">
                  <div className="text-purple-500 text-lg mb-1">👤</div>
                  <p className="text-xs font-bold">Конфиденциально</p>
                  <p className="text-[10px] text-gray-400">
                    не передаем данные
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ПРАВАЯ СЕКЦИЯ */}
          <div className="bg-[#0b0b14] border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col justify-between">

            <div>

              <h2 className="text-3xl font-black uppercase">
                Прокачка{" "}
                <span className="text-purple-500">
                  аккаунта
                </span>
              </h2>

              <p className="text-xs text-gray-400 mt-1 mb-8">
                Заполните данные для начала прокачки
              </p>

              {/* ШАГИ */}
              <div className="relative flex items-center justify-between mb-10 max-w-md mx-auto">

                {/* Линия */}
                <div className="absolute left-0 right-0 top-5 h-[2px] bg-zinc-800 rounded-full" />

                {/* Анимация заполнения */}
                <div
                  className={`absolute left-0 top-5 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500 ${
                    step === 1 ? 'w-0' : 'w-full'
                  }`}
                />

                {/* ШАГ 1 */}
                <div className="relative z-10 flex flex-col items-center flex-1">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-300 ${
                      step >= 1
                        ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]'
                        : 'bg-[#121225] border-zinc-800 text-gray-500'
                    }`}
                  >
                    {step > 1 ? '✓' : '1'}
                  </div>

                  <span
                    className={`text-[11px] mt-2 transition-all duration-300 ${
                      step >= 1
                        ? 'text-purple-400'
                        : 'text-gray-500'
                    }`}
                  >
                    Данные
                  </span>

                </div>

                {/* ШАГ 2 */}
                <div className="relative z-10 flex flex-col items-center flex-1">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-300 ${
                      step >= 2
                        ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]'
                        : 'bg-[#121225] border-zinc-800 text-gray-500'
                    }`}
                  >
                    2
                  </div>

                  <span
                    className={`text-[11px] mt-2 transition-all duration-300 ${
                      step >= 2
                        ? 'text-purple-400'
                        : 'text-gray-500'
                    }`}
                  >
                    Оплата
                  </span>

                </div>

              </div>

              {/* ШАГ 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-[fade_0.4s_ease]">

                  {/* EMAIL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-gray-400">
                      E-mail
                    </label>

                    <div className="relative">
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        className="w-full bg-[#121225]/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-600 transition-all"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">
                        ✉️
                      </span>
                    </div>
                  </div>

                  {/* ПАРОЛЬ */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-gray-400">
                      Пароль
                    </label>

                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Введите пароль"
                        className="w-full bg-[#121225]/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-600 transition-all"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">
                        👁️
                      </span>
                    </div>
                  </div>

                  {/* ЗАГРУЗКА */}
                  <div className="flex flex-col gap-1.5 pt-2">
                    <label className="text-[11px] text-gray-400">
                      Скриншоты / чеки
                    </label>

                    <div className="border border-dashed border-zinc-800 bg-[#121225]/20 rounded-xl p-6 text-center cursor-pointer hover:border-purple-500/40 transition-all duration-300">

                      <span className="text-2xl block mb-1 text-purple-500">
                        ☁️
                      </span>

                      <p className="text-xs font-bold text-gray-300">
                        Перетащите файлы сюда
                      </p>

                      <p className="text-[10px] text-gray-500 mt-0.5">
                        или нажмите для выбора
                      </p>

                      <p className="text-[9px] text-zinc-600 mt-2">
                        PNG, JPG, PDF до 10MB
                      </p>

                    </div>
                  </div>

                  {/* КНОПКА */}
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 text-xs tracking-wide uppercase mt-6 shadow-[0_0_25px_rgba(168,85,247,0.35)]"
                  >
                    Продолжить →
                  </button>

                </div>
              )}

              {/* ШАГ 2 */}
              {step === 2 && (
                <div className="animate-[fade_0.4s_ease]">

                  <div className="bg-[#121225]/40 border border-purple-500/20 rounded-2xl p-6">

                    <p className="text-[10px] uppercase tracking-[0.2em] text-purple-400">
                      Ваш заказ
                    </p>

                    <h3 className="text-2xl font-black mt-3">
                      Прокачка аккаунта
                    </h3>

                    <p className="text-sm text-gray-400 mt-2">
                      Повышение уровня, рейтинга и игровых ресурсов
                    </p>

                    <div className="mt-8 flex items-center justify-between">

                      <div>
                        <p className="text-[10px] text-gray-500 uppercase">
                          Стоимость
                        </p>

                        <p className="text-3xl font-black text-emerald-400 mt-1">
                          49.99 $
                        </p>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-2xl shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                        ⚡
                      </div>

                    </div>

                    <button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 text-xs tracking-wide uppercase shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                      Оплатить →
                    </button>

                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}