// const express = require("express");
// const { q } = require("../db");
// const auth = require("../middleware/auth");
// const bot = require("../bot/bot");

// const router = express.Router();

// /* ================= ORDER TO TG ================= */
// router.post("/order-to-tg", auth, async (req, res) => {
//   try {
//     const { car, configs, total, password } = req.body;

//     const userRes = await q(
//       "SELECT * FROM users WHERE id=$1",
//       [req.userId]
//     );

//     const user = userRes.rows[0];

//     const message =
// `🚗 NEW ORDER

// 👤 User: ${user.name}
// 📧 Email: ${user.email}
// 🆔 TG ID: ${user.telegram_id || "not connected"}
// 🔗 Username: @${user.telegram_username || "unknown"}

// 🚘 Car: ${car?.brand || ""} ${car?.name || ""}

// ⚙️ Configs:
// • Engine: ${configs?.power?.name || "Stock"}
// • Tuning: ${configs?.tuning?.name || "None"}
// • Wheels: ${configs?.wheels?.name || "None"}
// • Password: ${password}

// 💰 TOTAL: $${total}
// `;

//     await bot.sendMessage(process.env.CHAT_ID, message);

//     res.json({ success: true });

//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ error: "error" });
//   }
// });

// /* ================= SIMPLE ORDER ================= */
// router.post("/order", auth, async (req, res) => {
//   try {
//     const { car } = req.body;

//     const userRes = await q(
//       "SELECT * FROM users WHERE id=$1",
//       [req.userId]
//     );

//     const user = userRes.rows[0];

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     await bot.sendMessage(
//       process.env.CHAT_ID,
//       `🚗 ${user.name} bought ${car?.name || "unknown car"}`
//     );

//     res.json({ success: true });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ success: false });
//   }
// });

// module.exports = router;



const express = require("express");
const { q } = require("../db");
const auth = require("../middleware/auth");
const bot = require("../bot/bot");

const router = express.Router();

/* ================= ORDER TO TG ================= */
router.post("/order-to-tg", auth, async (req, res) => {
  try {
    const { car, configs, total, password } = req.body;

    const userRes = await q(
      "SELECT * FROM users WHERE id=$1",
      [req.userId]
    );

    const user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const message =
`🚗 NEW ORDER

👤 User: ${user.name}
📧 Email: ${user.email}
🆔 TG ID: ${user.telegram_id || "not connected"}
🔗 Username: @${user.telegram_username || "unknown"}

🚘 Car: ${car?.brand || ""} ${car?.name || ""}

⚙️ Configs:
• Engine: ${configs?.power?.name || "Stock"}
• Tuning: ${configs?.tuning?.name || "None"}
• Wheels: ${configs?.wheels?.name || "None"}
• Password: ${password}

💰 TOTAL: $${total}
`;

    // отправляем заказ
    await bot.sendMessage(process.env.CHAT_ID, message);

    // 🔥 сжигаем активный промокод после покупки
    await q(
      `
      UPDATE user_promos
      SET consumed = true
      WHERE user_id = $1
      AND consumed = false
      `,
      [req.userId]
    );

    res.json({
      success: true,
    });

  } catch (e) {
    console.log("ORDER TO TG ERROR:", e);

    res.status(500).json({
      error: "error",
    });
  }
});

/* ================= SIMPLE ORDER ================= */
router.post("/order", auth, async (req, res) => {
  try {
    const { car } = req.body;

    const userRes = await q(
      "SELECT * FROM users WHERE id=$1",
      [req.userId]
    );

    const user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    await bot.sendMessage(
      process.env.CHAT_ID,
      `🚗 ${user.name} bought ${car?.name || "unknown car"}`
    );

    // 🔥 если покупка была через простой order — тоже сжигаем промо
    await q(
      `
      UPDATE user_promos
      SET consumed = true
      WHERE user_id = $1
      AND consumed = false
      `,
      [req.userId]
    );

    res.json({
      success: true,
    });

  } catch (e) {
    console.log("ORDER ERROR:", e);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;