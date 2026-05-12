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

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "🏎️ Как купить машину?",
    answer: "Выберите понравившуюся модель в каталоге, напишите в нашу поддержку или откройте чат. Укажите название авто, и наш менеджер поможет оформить сделку!",
  },
  {
    question: "⚡ Сколько занимает доставка?",
    answer: "Мы работаем на максимальных скоростях! Обычно машина оказывается в вашем гараже в течение 1–5 минут после подтверждения оплаты.",
  },
  {
    question: "💳 Какие способы оплаты доступны?",
    answer: "Мы принимаем карты всех популярных банков, электронные кошельки и криптовалюту. Все детали — в личном чате с оператором.",
  },
  {
    question: "🛡️ Есть ли гарантия на покупку?",
    answer: "Безусловно! Мы дорожим репутацией. Если возникнет техническая заминка, мы решим её моментально или вернем средства.",
  },
  {
    question: "🔧 Можно ли заказать кастомный тюнинг?",
    answer: "Да, мы делаем эксклюзивные винилы и настройки подвески. Просто приложите скриншот или описание желаемого дизайна.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={styles.container}>
      {/* Background Decor */}
      <div style={styles.glow} />

      <header style={styles.header}>
        <h1 style={styles.title}>CAR PARKING <span style={styles.accent}>FAQ</span></h1>
        <p style={styles.subtitle}>Все, что нужно знать перед выездом на трассу</p>
      </header>

      <div style={styles.faqList}>
        {faqData.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              borderColor: openIndex === index ? "#00ff88" : "rgba(255,255,255,0.1)",
              background: openIndex === index ? "rgba(0, 255, 136, 0.05)" : "rgba(255,255,255,0.03)",
            }}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div style={styles.questionRow}>
              <h3 style={{
                ...styles.question,
                color: openIndex === index ? "#00ff88" : "#fff"
              }}>
                {item.question}
              </h3>
              <span style={{
                ...styles.icon,
                transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)"
              }}>
                ▼
              </span>
            </div>

            <div style={{
              ...styles.answerContainer,
              maxHeight: openIndex === index ? "200px" : "0px",
              opacity: openIndex === index ? 1 : 0,
            }}>
              <p style={styles.answer}>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        Остались вопросы? <span style={styles.link}>Свяжитесь с техподдержкой</span>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#0a0a0b",
    color: "#ffffff",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    top: "-10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    height: "300px",
    background: "radial-gradient(circle, rgba(0,255,136,0.15) 0%, rgba(0,0,0,0) 70%)",
    pointerEvents: "none",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 900,
    letterSpacing: "2px",
    margin: "0 0 10px 0",
    textShadow: "0 0 20px rgba(0,255,136,0.3)",
  },
  accent: {
    color: "#00ff88",
  },
  subtitle: {
    color: "#888",
    fontSize: "1.1rem",
  },
  faqList: {
    maxWidth: "700px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    border: "1px solid",
    borderRadius: "16px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  questionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: 600,
    transition: "color 0.3s ease",
  },
  icon: {
    fontSize: "0.8rem",
    transition: "transform 0.3s ease",
    color: "#555",
  },
  answerContainer: {
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  answer: {
    marginTop: "15px",
    lineHeight: "1.6",
    color: "#ccc",
    fontSize: "1rem",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "15px",
  },
  footer: {
    textAlign: "center",
    marginTop: "50px",
    color: "#555",
    fontSize: "0.9rem",
  },
  link: {
    color: "#00ff88",
    textDecoration: "underline",
    cursor: "pointer",
  }
};