
// import { useState } from "react";

// const faqData = [
//   {
//     question: "Как купить машину?",
//     answer: "Напишите в поддержку или откройте чат и укажите название машины 🚗",
//   },
//   {
//     question: "Сколько занимает доставка?",
//     answer: "Обычно 1–5 минут после оплаты ⚡",
//   },
//   {
//     question: "Какие способы оплаты?",
//     answer: "Все популярные способы. Уточните в чате 💬",
//   },
//   {
//     question: "Есть ли гарантия?",
//     answer: "Да, если проблема — мы решаем её сразу 👍",
//   },
// ];

// export default function FaqPage() {
//   const [open, setOpen] = useState<number | null>(null);

//   return (
//     <div className="min-h-screen bg-black text-white px-4 py-10 flex justify-center">
      
//       <div className="w-full max-w-3xl">

//         {/* HEADER */}
//         <h1 className="text-3xl font-black text-center mb-2">
//           ❓ <span className="text-yellow-400">FAQ</span>
//         </h1>

//         <p className="text-center text-white/40 mb-8">
//           Часто задаваемые вопросы о магазине машин
//         </p>

//         {/* LIST */}
//         <div className="space-y-3">
//           {faqData.map((item, i) => (
//             <div
//               key={i}
//               onClick={() => setOpen(open === i ? null : i)}
//               className="cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-2xl p-4"
//             >
              
//               {/* QUESTION */}
//               <div className="flex justify-between items-center">
//                 <h3 className="font-bold text-white">
//                   <span className="text-yellow-400">Q:</span> {item.question}
//                 </h3>

//                 <span className="text-yellow-400 text-xl">
//                   {open === i ? "−" : "+"}
//                 </span>
//               </div>

//               {/* ANSWER */}
//               {open === i && (
//                 <p className="mt-3 text-white/70 text-sm border-t border-white/10 pt-3">
//                   {item.answer}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* FOOTER BLOCK */}
//         <div className="mt-10 text-center text-white/40 text-sm">
//           Не нашли ответ? Напишите в чат поддержки 💬
//         </div>

//       </div>
//     </div>
//   );
// }


import { useState } from "react";
// Если используешь Next.js, раскомментируй строку ниже:
// import { useRouter } from "next/navigation";

// Если используешь React Router (Vite/CRA), раскомментируй строку ниже:
// import { useNavigate } from "react-router-dom";

const faqData = [
  {
    question: "Как купить машину?",
    answer: "Напишите в поддержку или откройте чат и укажите название машины 🚗",
  },
  {
    question: "Сколько занимает доставка?",
    answer: "Обычно 1–5 минут после оплаты ⚡",
  },
  {
    question: "Какие способы оплаты?",
    answer: "Все популярные способы. Уточните в чате 💬",
  },
  {
    question: "Есть ли гарантия?",
    answer: "Да, если проблема — мы решаем её сразу 👍",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);
  
  // Инициализация роутеров (раскомментируй нужный при необходимости)
  // const router = useRouter(); // для Next.js
  // const navigate = useNavigate(); // для React Router

  const handleBackToMarket = () => {
    // Логика перехода:
    // router.push("/market"); // для Next.js
    // navigate("/market"); // для React Router
    
    // Временная заглушка, если роутер еще не настроен:
    console.log("Переход на страницу маркета");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex justify-center elements-center font-sans">
      <div className="w-full max-w-3xl relative">
        
        {/* КНОПКА НАЗАД В МАРКЕТ */}
        <div className="mb-8 flex justify-start">
          <button
            onClick={handleBackToMarket}
            className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-yellow-400 transition-colors group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5"
          >
            <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>
            Вернуться в маркет
          </button>
        </div>

        {/* HEADER */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight">
            ❓ <span className="text-yellow-400">FAQ</span>
          </h1>
          <p className="text-white/40 text-base">
            Часто задаваемые вопросы о магазине машин
          </p>
        </header>

        {/* LIST */}
        <div className="space-y-3">
          {faqData.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`cursor-pointer border transition-all duration-200 rounded-2xl p-5 select-none ${
                  isOpen
                    ? "border-yellow-400/30 bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {/* QUESTION */}
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-bold text-white text-base sm:text-lg flex items-start gap-2">
                    <span className="text-yellow-400 shrink-0">Q:</span> 
                    <span>{item.question}</span>
                  </h3>
                  <span className="text-yellow-400 text-2xl font-light shrink-0 min-w-[24px] text-center">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>

                {/* ANSWER */}
                {isOpen && (
                  <p className="mt-4 text-white/70 text-sm sm:text-base border-t border-white/10 pt-4 leading-relaxed animate-fadeIn">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER BLOCK */}
        <footer className="mt-12 text-center text-white/40 text-sm">
          Не нашли ответ? Напишите в чат поддержки 💬
        </footer>

      </div>
    </div>
  );
}