
// const express = require("express");
// const { q } = require("../db");
// const auth = require("../middleware/auth");
// const bot = require("../bot/bot");
// const { receiptUpload } = require("../middleware/upload");

// const router = express.Router();

// /* ================= ORDER TO TG ================= */
// router.post(
//   "/order-to-tg",
//   auth,
//   receiptUpload.single("receipt"),
//   async (req, res) => {
//     try {
//       /* multipart/form-data => parse manually */
//       const car = JSON.parse(req.body.car);
//       const configs = JSON.parse(req.body.configs);
//       const total = req.body.total;
//       const password = req.body.password;

//       /* get user */
//       const userRes = await q(
//         "SELECT * FROM users WHERE id=$1",
//         [req.userId]
//       );

//       const user = userRes.rows[0];

//       if (!user) {
//         return res.status(404).json({
//           error: "User not found",
//         });
//       }

//       /* tg message */
//       const message =
// `🚗 NEW ORDER

// 👤 User: ${user.name}
// 📧 Email: ${user.email}

// 🆔 TG ID: ${user.telegram_id || "not connected"}
// 🔗 Username: @${user.telegram_username || "unknown"}

// 🚘 Car:
// ${car?.brand || ""} ${car?.name || ""}

// ⚙️ Configs:
// • Engine: ${configs?.power?.name || "Stock"}
// • Tuning: ${configs?.tuning?.name || "None"}
// • Wheels: ${configs?.wheels?.name || "None"}

// 🔐 Password:
// ${password}

// 💰 TOTAL:
// $${total}
// `;

//       /* send text */
//       await bot.sendMessage(
//         process.env.CHAT_ID,
//         message
//       );

//       /* send receipt photo */
//       if (req.file?.path) {
//         await bot.sendPhoto(
//           process.env.CHAT_ID,
//           req.file.path,
//           {
//             caption:
// `🧾 PAYMENT RECEIPT

// 👤 ${user.name}
// 🚘 ${car?.brand || ""} ${car?.name || ""}
// 💰 TOTAL: $${total}`,
//           }
//         );
//       }

//       /* consume promo */
//       await q(
//         `
//         UPDATE user_promos
//         SET consumed = true
//         WHERE user_id = $1
//         AND consumed = false
//         `,
//         [req.userId]
//       );

//       res.json({
//         success: true,
//       });

//     } catch (e) {
//       console.log("ORDER TO TG ERROR:", e);

//       res.status(500).json({
//         error: "error",
//       });
//     }
//   }
// );

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
//       return res.status(404).json({
//         error: "User not found",
//       });
//     }

//     await bot.sendMessage(
//       process.env.CHAT_ID,
//       `🚗 ${user.name} bought ${car?.name || "unknown car"}`
//     );

//     /* consume promo */
//     await q(
//       `
//       UPDATE user_promos
//       SET consumed = true
//       WHERE user_id = $1
//       AND consumed = false
//       `,
//       [req.userId]
//     );

//     res.json({
//       success: true,
//     });

//   } catch (e) {
//     console.log("ORDER ERROR:", e);

//     res.status(500).json({
//       success: false,
//     });
//   }
// });

// module.exports = router;




const express = require("express");
const { q } = require("../db");
const auth = require("../middleware/auth");
const bot = require("../bot/bot");
const { receiptUpload } = require("../middleware/upload");

const router = express.Router();

/* ================= ORDER TO TG (CARS) ================= */
router.post(
  "/order-to-tg",
  auth,
  receiptUpload.single("receipt"),
  async (req, res) => {
    try {
      const car = JSON.parse(req.body.car);
      const configs = JSON.parse(req.body.configs);
      const total = req.body.total;
      const password = req.body.password;

      const userRes = await q(
        "SELECT * FROM users WHERE id=$1",
        [req.userId]
      );

      const user = userRes.rows[0];

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const message =
`🚗 NEW CAR ORDER

👤 User: ${user.name}
📧 Email: ${user.email}

🆔 TG ID: ${user.telegram_id || "not connected"}
🔗 Username: @${user.telegram_username || "unknown"}

🚘 Car:
${car?.brand || ""} ${car?.name || ""}

⚙️ Configs:
• Engine: ${configs?.power?.name || "Stock"}
• Tuning: ${configs?.tuning?.name || "None"}
• Wheels: ${configs?.wheels?.name || "None"}

🔐 Password:
${password}

💰 TOTAL:
$${total}
`;

      await bot.sendMessage(process.env.CHAT_ID, message);

      if (req.file?.path) {
        await bot.sendPhoto(process.env.CHAT_ID, req.file.path, {
          caption:
`🧾 CAR PAYMENT RECEIPT

👤 ${user.name}
🚘 ${car?.brand || ""} ${car?.name || ""}`,
        });
      }

      await q(
        `
        UPDATE user_promos
        SET consumed = true
        WHERE user_id = $1
        AND consumed = false
        `,
        [req.userId]
      );

      res.json({ success: true });

    } catch (e) {
      console.log("ORDER TO TG ERROR:", e);
      res.status(500).json({ error: "error" });
    }
  }
);

/* ================= BOOST ACCOUNT ORDER ================= */
router.post(
  "/boost-to-tg",
  auth,
  receiptUpload.single("receipt"),
  async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const amount = req.body.amount;

      const userRes = await q(
        "SELECT * FROM users WHERE id=$1",
        [req.userId]
      );

      const user = userRes.rows[0];

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const message =
`🔥 NEW ACCOUNT BOOST ORDER

👤 User: ${user.name}
📧 Email: ${user.email}

🆔 TG ID: ${user.telegram_id || "not connected"}
🔗 Username: @${user.telegram_username || "unknown"}

📦 BOOST DATA:
• Login Email: ${email}
• Password: ${password}

💰 AMOUNT:
$${amount}

📌 Status: Pending review
`;

      await bot.sendMessage(process.env.CHAT_ID, message);

      if (req.file?.path) {
        await bot.sendPhoto(process.env.CHAT_ID, req.file.path, {
          caption:
`🧾 BOOST PAYMENT RECEIPT

👤 ${user.name}
💰 $${amount}`,
        });
      }

      await q(
        `
        UPDATE user_promos
        SET consumed = true
        WHERE user_id = $1
        AND consumed = false
        `,
        [req.userId]
      );

      res.json({ success: true });

    } catch (e) {
      console.log("BOOST TO TG ERROR:", e);
      res.status(500).json({ error: "error" });
    }
  }
);

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
      return res.status(404).json({ error: "User not found" });
    }

    await bot.sendMessage(
      process.env.CHAT_ID,
      `🚗 ${user.name} bought ${car?.name || "unknown car"}`
    );

    await q(
      `
      UPDATE user_promos
      SET consumed = true
      WHERE user_id = $1
      AND consumed = false
      `,
      [req.userId]
    );

    res.json({ success: true });

  } catch (e) {
    console.log("ORDER ERROR:", e);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;