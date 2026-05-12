// import { useState } from "react";

// type FAQItem = {
//   question: string;
//   answer: string;
// };

// const faqData: FAQItem[] = [
//   {
//     question: "Как купить машину?",
//     answer: "Напишите в поддержку или откройте чат и укажите название машины 🚗",
//   },
//   {
//     question: "Сколько занимает доставка?",
//     answer: "Доставка обычно занимает от 1 до 5 минут после оплаты ⚡",
//   },
//   {
//     question: "Какие способы оплаты?",
//     answer: "Мы принимаем все популярные способы оплаты, уточните в чате 💬",
//   },
//   {
//     question: "Есть ли гарантия?",
//     answer: "Да, если что-то не пришло — мы решаем проблему сразу 👍",
//   },
// ];

// export default function FaqPage() {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   return (
//     <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
//       <h1>❓ Часто задаваемые вопросы</h1>

//       <div style={{ marginTop: 20 }}>
//         {faqData.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: 10,
//               marginBottom: 10,
//               padding: 15,
//               cursor: "pointer",
//             }}
//             onClick={() =>
//               setOpenIndex(openIndex === index ? null : index)
//             }
//           >
//             <h3 style={{ margin: 0 }}>{item.question}</h3>

//             {openIndex === index && (
//               <p style={{ marginTop: 10, color: "#555" }}>
//                 {item.answer}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex justify-center">
      
      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <h1 className="text-3xl font-black text-center mb-2">
          ❓ <span className="text-yellow-400">FAQ</span>
        </h1>

        <p className="text-center text-white/40 mb-8">
          Часто задаваемые вопросы о магазине машин
        </p>

        {/* LIST */}
        <div className="space-y-3">
          {faqData.map((item, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-2xl p-4"
            >
              
              {/* QUESTION */}
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white">
                  <span className="text-yellow-400">Q:</span> {item.question}
                </h3>

                <span className="text-yellow-400 text-xl">
                  {open === i ? "−" : "+"}
                </span>
              </div>

              {/* ANSWER */}
              {open === i && (
                <p className="mt-3 text-white/70 text-sm border-t border-white/10 pt-3">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER BLOCK */}
        <div className="mt-10 text-center text-white/40 text-sm">
          Не нашли ответ? Напишите в чат поддержки 💬
        </div>

      </div>
    </div>
  );
}