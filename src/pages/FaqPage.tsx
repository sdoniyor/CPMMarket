
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

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

//   const navigate = useNavigate();

//   const handleBackToMarket = () => {
//     navigate("/market");
//   };

//   return (
//     <div className="min-h-screen bg-black text-white px-4 py-10 flex justify-center items-center font-sans">
//       <div className="w-full max-w-3xl relative">

//         {/* КНОПКА НАЗАД В МАРКЕТ */}
//         <div className="mb-8 flex justify-start">
//           <button
//             onClick={handleBackToMarket}
//             className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-yellow-400 transition-colors group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5"
//           >
//             <span className="inline-block transform group-hover:-translate-x-1 transition-transform duration-200">
//               ←
//             </span>
//             Вернуться в маркет
//           </button>
//         </div>

//         {/* HEADER */}
//         <header className="text-center mb-10">
//           <h1 className="text-4xl font-black mb-2 tracking-tight">
//             ❓ <span className="text-yellow-400">FAQ</span>
//           </h1>

//           <p className="text-white/40 text-base">
//             Часто задаваемые вопросы о магазине машин
//           </p>
//         </header>

//         {/* LIST */}
//         <div className="space-y-3">
//           {faqData.map((item, i) => {
//             const isOpen = open === i;

//             return (
//               <div
//                 key={i}
//                 onClick={() => setOpen(isOpen ? null : i)}
//                 className={`cursor-pointer border transition-all duration-200 rounded-2xl p-5 select-none ${
//                   isOpen
//                     ? "border-yellow-400/30 bg-white/10"
//                     : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
//                 }`}
//               >
//                 {/* QUESTION */}
//                 <div className="flex justify-between items-center gap-4">
//                   <h3 className="font-bold text-white text-base sm:text-lg flex items-start gap-2">
//                     <span className="text-yellow-400 shrink-0">Q:</span>

//                     <span>{item.question}</span>
//                   </h3>

//                   <span className="text-yellow-400 text-2xl font-light shrink-0 min-w-[24px] text-center">
//                     {isOpen ? "−" : "+"}
//                   </span>
//                 </div>

//                 {/* ANSWER */}
//                 {isOpen && (
//                   <p className="mt-4 text-white/70 text-sm sm:text-base border-t border-white/10 pt-4 leading-relaxed animate-fadeIn">
//                     {item.answer}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* FOOTER */}
//         <footer className="mt-12 text-center text-white/40 text-sm">
//           Не нашли ответ? Напишите в чат поддержки 💬
//         </footer>

//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Flag, MessageSquare, Plus, Minus } from "lucide-react";

const faqData = [
  {
    q: "Как купить машину?",
    a: "Напишите в поддержку или откройте чат и укажите название машины.",
    icon: "🚗",
  },
  {
    q: "Сколько занимает доставка?",
    a: "Обычно 1–5 минут после оплаты.",
    icon: "⚡",
  },
  {
    q: "Какие способы оплаты?",
    a: "Все популярные способы. Уточните в чате.",
    icon: "💳",
  },
  {
    q: "Есть ли гарантия?",
    a: "Да, если проблема — мы решаем её сразу.",
    icon: "✅",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-white px-4 pb-24 pt-20 flex flex-col items-center"
      style={{ background: "#080809" }}
    >
      {/* bg atmosphere */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 35% at 50% -5%, #FF3D000E 0%, transparent 60%)," +
            "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "auto, 44px 44px, 44px 44px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">

        {/* BACK */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/market")}
          className="flex items-center gap-2 mb-10 font-black uppercase tracking-[0.22em] transition-colors duration-200 group"
          style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FF3D00")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.25)")}
        >
          <ChevronLeft size={13} />
          Вернуться в маркет
        </motion.button>

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <Flag size={11} style={{ color: "#FF3D00" }} />
            <span className="font-black uppercase tracking-[0.4em]" style={{ fontSize: 8, color: "#FF3D0088" }}>
              CPM Racing Market
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #FF3D0030, transparent)" }} />
          </div>

          <h1 className="font-black italic uppercase tracking-tighter leading-none" style={{ fontSize: "clamp(2.8rem, 8vw, 4.5rem)" }}>
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.13)", color: "transparent" }}>FAQ</span>
            {"  "}
            <span style={{ color: "#FF3D00", textShadow: "0 0 32px #FF3D0077" }}>///</span>
          </h1>
          <p className="font-bold uppercase tracking-[0.25em] mt-3" style={{ fontSize: 9, color: "rgba(255,255,255,0.18)" }}>
            Часто задаваемые вопросы о магазине машин
          </p>
        </motion.header>

        {/* FAQ LIST */}
        <div className="space-y-2.5">
          {faqData.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="relative overflow-hidden cursor-pointer select-none transition-colors duration-250"
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    background: isOpen ? "#FF3D000C" : "#0D0D0F",
                    border: `1px solid ${isOpen ? "#FF3D0045" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 2,
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen)
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#FF3D0028";
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen)
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  {/* left accent bar */}
                  <div
                    className="absolute left-0 inset-y-0 w-[2px] transition-opacity duration-250"
                    style={{
                      background: `linear-gradient(to bottom, #FF3D00, transparent)`,
                      opacity: isOpen ? 1 : 0,
                    }}
                  />

                  {/* top line when open */}
                  {isOpen && (
                    <div
                      className="absolute top-0 inset-x-0 h-[1.5px]"
                      style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }}
                    />
                  )}

                  {/* QUESTION ROW */}
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* index */}
                      <span
                        className="font-black italic shrink-0"
                        style={{ fontSize: 11, color: isOpen ? "#FF3D00" : "rgba(255,255,255,0.15)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* speed-line divider */}
                      <div className="flex items-center gap-1 shrink-0">
                        <div className="w-4 h-px" style={{ background: isOpen ? "#FF3D0060" : "rgba(255,255,255,0.08)" }} />
                        <div className="w-1 h-1 rotate-45" style={{ background: isOpen ? "#FF3D00" : "rgba(255,255,255,0.1)" }} />
                      </div>

                      <h3
                        className="font-black italic uppercase tracking-tight leading-snug truncate transition-colors duration-200"
                        style={{ fontSize: 14, color: isOpen ? "#fff" : "rgba(255,255,255,0.7)" }}
                      >
                        {item.q}
                      </h3>
                    </div>

                    <div
                      className="shrink-0 w-7 h-7 flex items-center justify-center transition-all duration-250"
                      style={{
                        background: isOpen ? "#FF3D0020" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isOpen ? "#FF3D0050" : "rgba(255,255,255,0.08)"}`,
                        clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                      }}
                    >
                      {isOpen
                        ? <Minus size={11} style={{ color: "#FF3D00" }} />
                        : <Plus size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
                      }
                    </div>
                  </div>

                  {/* ANSWER */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-5 pb-5 pt-1"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                        >
                          <div className="flex items-start gap-3 pl-10">
                            <span style={{ fontSize: 18, lineHeight: 1.4 }}>{item.icon}</span>
                            <p
                              className="font-bold leading-relaxed"
                              style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
                            >
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FOOTER CTA */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-12"
        >
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-5 p-5 relative overflow-hidden"
            style={{
              background: "#0D0D0F",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2,
            }}
          >
            <div
              className="absolute top-0 inset-x-0 h-[1.5px]"
              style={{ background: "linear-gradient(90deg, #FF3D00, transparent)" }}
            />
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center shrink-0"
                style={{
                  background: "#FF3D0018",
                  border: "1px solid #FF3D0040",
                  clipPath: "polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)",
                }}
              >
                <MessageSquare size={13} style={{ color: "#FF3D00" }} />
              </div>
              <div>
                <p className="font-black uppercase tracking-widest" style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>
                  Не нашли ответ?
                </p>
                <p className="font-bold" style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
                  Напишите в чат поддержки
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 font-black uppercase tracking-widest shrink-0"
              style={{
                background: "#FF3D00",
                color: "#000",
                fontSize: 10,
                clipPath: "polygon(0 0, 92% 0, 100% 35%, 100% 100%, 8% 100%, 0 65%)",
              }}
            >
              Открыть чат
              <ChevronRight size={12} />
            </motion.button>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}
