import React, { useState } from 'react';

// Типизация для товаров (если используешь TypeScript)
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
}

export default function DonateMarket() {
  const [activeTab, setActiveTab] = useState<'all' | 'coins' | 'cash' | 'specials'>('all');

  const coinPacks: CoinPack[] = [
    {
      id: 1,
      badge: 'STARTER PACK',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      amount: '5 000',
      perks: ['Premium Access', 'Special Decals'],
      price: '$9.99',
      glowColor: 'shadow-blue-500/10 hover:shadow-blue-500/20',
    },
    {
      id: 2,
      badge: 'PRO PACK',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      amount: '25 000',
      perks: ['Premium Access', 'Fast Pass'],
      price: '$24.99',
      glowColor: 'shadow-cyan-500/10 hover:shadow-cyan-500/20',
    },
    {
      id: 3,
      badge: 'ELITE PACK',
      badgeColor: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      amount: '100 000',
      perks: ['Premium Access', 'Fast Pass', 'Special Decals'],
      price: '$79.99',
      glowColor: 'shadow-yellow-500/10 hover:shadow-yellow-500/30',
      isLegend: true,
    },
    {
      id: 4,
      badge: 'LEGEND PACK',
      badgeColor: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
      amount: '500 000',
      perks: ['Premium Access', 'Fast Pass', 'Special Decals'],
      price: '$199.99',
      glowColor: 'shadow-orange-500/20 hover:shadow-orange-500/40 border-orange-500/40',
      isLegend: true,
    },
  ];

  const cashPacks: CashPack[] = [
    { id: 1, badge: 'QUICK CASH', amount: '1M', badgeColor: 'bg-green-500/20 text-green-400' },
    { id: 2, badge: 'MID-SIZE INJECTION', amount: '10M', badgeColor: 'bg-green-500/20 text-green-400' },
    { id: 3, badge: 'HEAVY LOAD', amount: '100M', badgeColor: 'bg-green-500/20 text-green-400' },
    { id: 4, badge: 'ULTIMATE CASH', amount: '500M', badgeColor: 'bg-green-500/20 text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans antialiased selection:bg-orange-500 selection:text-black p-4 md:p-8 relative overflow-hidden">
      
      {/* Легкое фоновое свечение сверху */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Хлебные крошки / Категория */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-orange-500 font-semibold mb-2">
          <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
          CPM Racing Market
        </div>

        {/* Главный заголовок в стиле твоего Showroom */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tight uppercase">
            GET PREMIUM CURRENCY <span className="text-orange-500">& BOOSTS ///</span>
          </h1>

          {/* Фильтры/Табы */}
          <div className="flex gap-2 bg-[#121212] border border-zinc-800 p-1 rounded-md self-start md:self-auto">
            {(['all', 'coins', 'cash', 'specials'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded text-xs uppercase font-bold tracking-wider transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab === 'all' ? 'All Products' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* БЛОК 1: COIN PACKS */}
        {(activeTab === 'all' || activeTab === 'coins') && (
          <div className="mb-14">
            <h2 className="text-2xl font-black italic uppercase tracking-wide mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 block" /> COIN PACKS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coinPacks.map((pack) => (
                <div
                  key={pack.id}
                  className={`bg-[#111111] border border-zinc-800/80 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl ${pack.glowColor} group hover:-translate-y-1`}
                >
                  <div>
                    {/* Хедер карточки */}
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border ${pack.badgeColor}`}>
                        {pack.badge}
                      </span>
                      {pack.isLegend && (
                        <span className="text-[10px] font-black bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-0.5 rounded uppercase tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                          Best Value
                        </span>
                      )}
                    </div>

                    {/* Иконка / Заглушка под сундук */}
                    <div className="w-full h-32 flex items-center justify-center my-4 relative">
                      <div className="absolute w-20 h-20 bg-current opacity-5 blur-2xl rounded-full text-cyan-400 group-hover:scale-125 transition-transform" />
                      {/* Сюда вставляется картинка сундука с коинами */}
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-300 select-none">
                        {pack.id === 1 ? '💎' : pack.id === 2 ? '🪙' : pack.id === 3 ? '🧰' : '👑'}
                      </span>
                    </div>

                    {/* Количество */}
                    <div className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-4 tracking-tight">
                      {pack.amount} <span className="text-xs font-bold text-zinc-500 not-italic tracking-normal">COINS</span>
                    </div>

                    {/* Перки */}
                    <ul className="space-y-2 mb-8">
                      {pack.perks.map((perk, idx) => (
                        <li key={idx} className="text-xs text-zinc-400 flex items-center gap-2">
                          <span className="w-1 h-1 bg-zinc-500 rounded-full" /> {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Кнопка купить */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                    <span className="text-xl font-black text-cyan-400 tracking-tight">{pack.price}</span>
                    <button className="bg-zinc-800 hover:bg-orange-500 text-white hover:text-black font-bold uppercase text-xs py-2 px-4 rounded transition-all duration-200 tracking-wider flex items-center gap-1">
                      GO <span className="text-[10px]">&gt;</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* БЛОК 2: CASH BOOSTS */}
        {(activeTab === 'all' || activeTab === 'cash') && (
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-wide mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 block" /> CASH BOOSTS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cashPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-[#111111] border border-zinc-800/80 rounded-xl p-5 flex items-center justify-between hover:border-green-500/30 hover:bg-[#141414] transition-all duration-200 shadow-lg group"
                >
                  <div className="space-y-2">
                    <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${pack.badgeColor}`}>
                      {pack.badge}
                    </span>
                    <div className="text-3xl font-black text-green-500 italic tracking-tighter">
                      {pack.amount} <span className="text-xs text-zinc-600 not-italic font-bold">CASH</span>
                    </div>
                  </div>

                  {/* Иконка пачки денег + кнопка быстрого перехода */}
                  <div className="flex items-center gap-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-200 select-none">💵</span>
                    <button className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 hover:bg-orange-500 hover:text-black hover:border-transparent transition-all">
                      &gt;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Футер страницы доната с платежками */}
        <div className="mt-16 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <div className="flex items-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all">
            <span>PayPal</span>
            <span>Stripe</span>
            <span>VISA / MasterCard</span>
          </div>
          <div>PAYMENT METHOD SECURED BY CPM MARKET</div>
        </div>

      </div>
    </div>
  );
}