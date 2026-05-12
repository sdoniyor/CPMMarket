import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Как купить машину?",
    answer: "Напишите в поддержку или откройте чат и укажите название машины 🚗",
  },
  {
    question: "Сколько занимает доставка?",
    answer: "Доставка обычно занимает от 1 до 5 минут после оплаты ⚡",
  },
  {
    question: "Какие способы оплаты?",
    answer: "Мы принимаем все популярные способы оплаты, уточните в чате 💬",
  },
  {
    question: "Есть ли гарантия?",
    answer: "Да, если что-то не пришло — мы решаем проблему сразу 👍",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1>❓ Часто задаваемые вопросы</h1>

      <div style={{ marginTop: 20 }}>
        {faqData.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              marginBottom: 10,
              padding: 15,
              cursor: "pointer",
            }}
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <h3 style={{ margin: 0 }}>{item.question}</h3>

            {openIndex === index && (
              <p style={{ marginTop: 10, color: "#555" }}>
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}