import React, { useState } from 'react';
import { 
  Shield, 
  Zap, 
  Headphones, 
  Lock, 
  ChevronDown, 
  User, 
  Mail, 
  Eye, 
  Upload, 
  ArrowRight, 
  Star 
} from 'lucide-react';

export default function AccountBoosting() {
  const [platform, setPlatform] = useState('');

  return (
    <div className="min-h-screen bg-[#06060c] text-white font-sans flex items-center justify-center p-4 md:p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ЛЕВАЯ ЧАСТЬ: Иллюстрация и статистика */}
        <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-purple-900/30 bg-[#0b0b14] flex flex-col justify-between p-6 min-h-[600px] lg:min-h-0">
          
          {/* Фоновое неоновое свечение (заглушка под арт персонажа) */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/80 z-0" />
          
          {/* Контент поверх фона */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between flex-grow">
            
            {/* Верхние плашки статистики */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Прокачано аккаунтов */}
              <div className="bg-[#121225]/80 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                  <span className="text-xl font-bold">👑</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Прокачано</p>
                  <p className="text-xl font-black tracking-wide">12,540</p>
                  <p className="text-[10px] text-purple-400">аккаунтов</p>
                </div>
              </div>

              {/* Рейтинг сервиса */}
              <div className="bg-[#121225]/80 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-500 fill-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Рейтинг сервиса</p>
                  <p className="text-xl font-black tracking-wide">4.9</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-purple-500 fill-purple-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Арт-персонаж (Центральная заглушка) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 mix-blend-screen">
              {/* Если у вас есть картинка, замените этот div на <img src="..." className="object-cover h-full" /> */}
              <div className="w-[80%] h-[80%] rounded-full border-[3px] border-purple-500/30 shadow-[0_0_100px_rgba(168,85,247,0.2)] flex items-center justify-center animate-pulse">
                <span className="text-purple-500 text-sm tracking-widest uppercase">[ ART PLACEHOLDER ]</span>
              </div>
            </div>

            {/* Нижние преимущества */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-auto pt-20">
              <div className="bg-[#0e0e1c]/90 border border-white/5 rounded-xl p-3 text-center sm:text-left">
                <Shield className="w-5 h-5 text-purple-500 mb-1 mx-auto sm:mx-0" />
                <p className="text-xs font-semibold">Безопасность</p>
                <p className="text-[10px] text-gray-400">100% гарантия</p>
              </div>
              
              <div className="bg-[#0e0e1c]/90 border border-white/5 rounded-xl p-3 text-center sm:text-left">
                <Zap className="w-5 h-5 text-purple-500 mb-1 mx-auto sm:mx-0" />
                <p className="text-xs font-semibold">Скорость</p>
                <p className="text-[10px] text-gray-400">от 15 минут</p>
              </div>

              <div className="bg-[#0e0e1c]/90 border border-white/5 rounded-xl p-3 text-center sm:text-left">
                <Headphones className="w-5 h-5 text-purple-500 mb-1 mx-auto sm:mx-0" />
                <p className="text-xs font-semibold">Поддержка</p>
                <p className="text-[10px] text-gray-400">24/7 онлайн</p>
              </div>

              <div className="bg-[#0e0e1c]/90 border border-white/5 rounded-xl p-3 text-center sm:text-left">
                <Lock className="w-5 h-5 text-purple-500 mb-1 mx-auto sm:mx-0" />
                <p className="text-xs font-semibold">Конфиденциально</p>
                <p className="text-[10px] text-gray-400">не передаем данные</p>
              </div>
            </div>

          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Форма заказа */}
        <div className="lg:col-span-6 bg-[#0b0b14] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
          
          <div>
            {/* Заголовок */}
            <h2 className="text-2xl md:text-3xl font-black tracking-wide uppercase mb-1">
              Прокачка <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">аккаунта</span>
            </h2>
            <p className="text-sm text-gray-400 mb-8">Заполните данные для начала прокачки вашего аккаунта</p>

            {/* Степпер (Шаги) */}
            <div className="relative flex items-center justify-between mb-8 px-4">
              <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-zinc-800 -translate-y-1/2 z-0" />
              <div className="absolute left-0 w-1/3 top-1/2 h-[2px] bg-purple-600 -translate-y-1/2 z-0" /> {/* Активный прогресс */}

              {/* Шаг 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.6)]">
                  1
                </div>
                <span className="text-[11px] font-medium text-purple-400 mt-2">Данные аккаунта</span>
              </div>

              {/* Шаг 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-zinc-800 text-gray-400 border border-zinc-700 text-sm flex items-center justify-center">
                  2
                </div>
                <span className="text-[11px] font-medium text-gray-500 mt-2">Выбор услуги</span>
              </div>

              {/* Шаг 3 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-zinc-800 text-gray-400 border border-zinc-700 text-sm flex items-center justify-center">
                  3
                </div>
                <span className="text-[11px] font-medium text-gray-500 mt-2">Оплата</span>
              </div>
            </div>

            {/* Поля формы */}
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Игровая платформа */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-400 uppercase tracking-wider font-medium pl-1">Игровая платформа</label>
                  <div className="relative">
                    <select 
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-[#121225]/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-300 focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Выберите платформу</option>
                      <option value="pc">PC</option>
                      <option value="ps">PlayStation</option>
                      <option value="xbox">Xbox</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* ID / Логин */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-400 uppercase tracking-wider font-medium pl-1">ID / Логин аккаунта</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Введите ID или логин" 
                      className="w-full bg-[#121225]/60 border border-white/5 rounded-xl px-4 py-3.5 pr-10 text-sm text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                    />
                    <User className="w-4 h-4 text-zinc-600 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* E-mail */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-400 uppercase tracking-wider font-medium pl-1">E-mail от аккаунта</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="example@mail.com" 
                      className="w-full bg-[#121225]/60 border border-white/5 rounded-xl px-4 py-3.5 pr-10 text-sm text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                    />
                    <Mail className="w-4 h-4 text-zinc-600 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Пароль */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-400 uppercase tracking-wider font-medium pl-1">Пароль от аккаунта</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="Введите пароль" 
                      className="w-full bg-[#121225]/60 border border-white/5 rounded-xl px-4 py-3.5 pr-10 text-sm text-gray-300 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                    />
                    <Eye className="w-4 h-4 text-zinc-600 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-purple-400" />
                  </div>
                </div>

              </div>

              {/* Загрузка скриншотов */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="text-[11px] text-gray-500 font-medium pl-1">Загрузите скриншоты / чеки (необязательно)</label>
                <div className="border border-dashed border-zinc-800 hover:border-purple-500/50 bg-[#121225]/30 rounded-xl p-6 text-center cursor-pointer transition-colors group">
                  <Upload className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-gray-300">Перетащите файлы сюда</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">или нажмите для выбора</p>
                  <p className="text-[9px] text-zinc-600 mt-2">PNG, JPG, PDF до 10MB</p>
                </div>
              </div>
            </form>
          </div>

          {/* Футер формы с ценой и кнопкой */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Вы выбрали:</p>
              <p className="text-sm font-bold text-gray-200">Базовая прокачка</p>
              <p className="text-[11px] text-gray-500">Повышение уровня, ресурсов и рейтинга</p>
            </div>
            
            <div className="text-right w-full sm:w-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block sm:hidden">Стоимость:</span>
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest hidden sm:block">Стоимость</span>
                <span className="text-2xl md:text-3xl font-black text-emerald-400">49.99 $</span>
              </div>
            </div>
          </div>

          {/* Кнопка действия */}
          <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_25px_rgba(168,85,247,0.6)] active:scale-[0.99] transition-all text-sm tracking-wide">
            Продолжить
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}