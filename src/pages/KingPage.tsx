import React, { useState } from 'react';

// Замените этот импорт на ваш собственный навбар:
// import MyNavbar from './components/Navbar';
const MyNavbar = () => (
  <div className="w-full text-center py-4 bg-zinc-900/30 border-b border-white/5 text-gray-500 text-xs tracking-widest">
    [ МЕСТО ДЛЯ ВАШЕГО НАВБАРА ]
  </div>
);

export default function AccountBoosting() {
  const [platform, setPlatform] = useState('');

  return (
    <div className="min-h-screen bg-[#06060c] text-white font-sans flex flex-col">
      {/* Подключение вашего навбара */}
      <MyNavbar />

      {/* Основной контент */}
      <div className="flex-grow flex items-center justify-center p-4 md:p-12">
        <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* ЛЕВАЯ СЕКЦИЯ: Иллюстрация и Статистика */}
          <div className="relative rounded-[24px] overflow-hidden border border-purple-900/20 bg-[#0b0b14] p-8 flex flex-col justify-between min-h-[600px] lg:min-h-[720px]">
            
            {/* Фоновое изображение персонажа в маске */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: `url('/path-to-your-character-image.png')` }} 
            />
            {/* Градиентная подложка для читаемости текста */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/90 z-10" />
            
            {/* Контент поверх фона */}
            <div className="relative z-20 flex flex-col justify-between h-full flex-grow">
              
              {/* Статистика сверху */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Прокачано */}
                <div className="bg-[#121225]/60 backdrop-blur-md border border-purple-500/20 rounded-[18px] p-4 flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                    👑
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Прокачано</p>
                    <p className="text-2xl font-black tracking-wide leading-none my-0.5">12,540</p>
                    <p className="text-[10px] text-purple-400">аккаунтов</p>
                  </div>
                </div>

                {/* Рейтинг */}
                <div className="bg-[#121225]/60 backdrop-blur-md border border-purple-500/20 rounded-[18px] p-4 flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-[#1d1635] border border-purple-500/30 flex items-center justify-center text-purple-400 text-lg">
                    ⭐
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Рейтинг сервиса</p>
                    <p className="text-2xl font-black tracking-wide leading-none my-0.5">4.9</p>
                    <div className="flex gap-0.5 text-purple-500 text-xs">
                      ★★★★★
                    </div>
                  </div>
                </div>
              </div>

              {/* Преимущества снизу */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-auto">
                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-3.5">
                  <div className="text-purple-500 text-lg mb-1">🛡️</div>
                  <p className="text-xs font-bold">Безопасность</p>
                  <p className="text-[10px] text-gray-400">100% гарантия</p>
                </div>
                
                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-3.5">
                  <div className="text-purple-500 text-lg mb-1">⚡</div>
                  <p className="text-xs font-bold">Скорость</p>
                  <p className="text-[10px] text-gray-400">от 15 минут</p>
                </div>

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-3.5">
                  <div className="text-purple-500 text-lg mb-1">🎧</div>
                  <p className="text-xs font-bold">Поддержка</p>
                  <p className="text-[10px] text-gray-400">24/7 онлайн</p>
                </div>

                <div className="bg-[#0e0e1c]/80 backdrop-blur-sm border border-white/5 rounded-xl p-3.5">
                  <div className="text-purple-500 text-lg mb-1">👤</div>
                  <p className="text-xs font-bold">Конфиденциально</p>
                  <p className="text-[10px] text-gray-400">не передаем данные</p>
                </div>
              </div>

            </div>
          </div>

          {/* ПРАВАЯ СЕКЦИЯ: Форма прокачки */}
          <div className="bg-[#0b0b14] border border-white/5 rounded-[24px] p-6 md:p-8 flex flex-col justify-between">
            
            <div>
              {/* Заголовки */}
              <h2 className="text-3xl font-black tracking-wide uppercase">
                Прокачка <span className="text-purple-500">аккаунта</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1 mb-8">Заполните данные для начала прокачки вашего аккаунта</p>

              {/* Табы / Шаги */}
              <div className="relative flex items-center justify-between mb-8 max-w-md mx-auto">
                <div className="absolute left-0 right-0 top-4 h-[1px] bg-zinc-800 z-0" />
                <div className="absolute left-0 w-1/2 top-4 h-[1px] bg-purple-600 z-0" />

                {/* Шаг 1 */}
                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                    1
                  </div>
                  <span className="text-[10px] text-purple-400 mt-2 font-medium">Данные аккаунта</span>
                </div>

                {/* Шаг 2 */}
                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-[#121225] text-gray-500 border border-zinc-800 text-xs flex items-center justify-center">
                    2
                  </div>
                  <span className="text-[10px] text-gray-500 mt-2 font-medium">Выбор услуги</span>
                </div>

                {/* Шаг 3 */}
                <div className="relative z-10 flex flex-col items-center flex-1">
                  <div className="w-8 h-8 rounded-full bg-[#121225] text-gray-500 border border-zinc-800 text-xs flex items-center justify-center">
                    3
                  </div>
                  <span className="text-[10px] text-gray-500 mt-2 font-medium">Оплата</span>
                </div>
              </div>

              {/* Поля ввода */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Платформа */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-gray-400 font-medium">Игровая платформа</label>
                    <div className="relative">
                      <select 
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full bg-[#121225]/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-gray-300 focus:outline-none focus:border-purple-600 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Выберите платформу</option>
                        <option value="pc">PC</option>
                        <option value="playstation">PlayStation</option>
                        <option value="xbox">Xbox</option>
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</span>
                    </div>
                  </div>

                  {/* ID / Логин */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-gray-400 font-medium">ID / Логин аккаунта</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Введите ID или логин" 
                        className="w-full bg-[#121225]/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-600"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">👤</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* E-mail */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-gray-400 font-medium">E-mail от аккаунта</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="example@mail.com" 
                        className="w-full bg-[#121225]/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-600"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">✉️</span>
                    </div>
                  </div>

                  {/* Пароль */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-gray-400 font-medium">Пароль от аккаунта</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="Введите пароль" 
                        className="w-full bg-[#121225]/40 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-600"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-xs cursor-pointer">👁️</span>
                    </div>
                  </div>
                </div>

                {/* Загрузка скриншотов */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-[11px] text-gray-400 font-medium">Загрузите скриншоты / чеки (необязательно)</label>
                  <div className="border border-dashed border-zinc-800 bg-[#121225]/20 rounded-xl p-6 text-center cursor-pointer hover:border-purple-500/40 transition-colors">
                    <span className="text-2xl block mb-1 text-purple-500">☁️</span>
                    <p className="text-xs font-bold text-gray-300">Перетащите файлы сюда</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">или нажмите для выбора</p>
                    <p className="text-[9px] text-zinc-600 mt-2">PNG, JPG, PDF до 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Итоговая панель и Кнопка */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex flex-row items-center justify-between mb-4">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest">Вы выбрали</p>
                  <p className="text-sm font-bold text-gray-200">Базовая прокачка</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Повышение уровня, ресурсов и рейтинга</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest">Стоимость</p>
                  <p className="text-2xl font-black text-emerald-400 mt-0.5">49.99 $</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs tracking-wide uppercase">
                <span>Продолжить</span>
                <span className="text-sm">→</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}