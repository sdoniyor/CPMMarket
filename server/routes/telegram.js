
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
${total}
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
`🔥 NEW BOOST ORDER

👤 User: ${user.name}
📧 Email: ${user.email}

📦 DATA:
• Login: ${email}
• Password: ${password}

💰 Amount: ${amount}
`;

      await bot.sendMessage(process.env.CHAT_ID, message);

      if (req.file?.path) {
        await bot.sendPhoto(process.env.CHAT_ID, req.file.path, {
          caption:
`🧾 BOOST RECEIPT

👤 ${user.name}
💰 ${amount}`,
        });
      }

      res.json({ success: true });

    } catch (e) {
      console.log("BOOST ERROR:", e);
      res.status(500).json({ error: "error" });
    }
  }
);

/* ================= DONATE MARKET TO TG ================= */
router.post(
  "/donate-to-tg",
  auth,
  receiptUpload.single("receipt"),
  async (req, res) => {
    try {
      const { item, price, email, category, amount } = req.body;

      const userRes = await q(
        "SELECT * FROM users WHERE id=$1",
        [req.userId]
      );

      const user = userRes.rows[0];

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const message =
`💎 NEW DONATE ORDER (MARKET)

👤 User: ${user.name}
📧 Email: ${user.email}
🔗 TG: @${user.telegram_username || "unknown"}

📦 CATEGORY:
${category || "UNKNOWN"}

🛒 ITEM:
${item}

💰 AMOUNT:
${amount || "UNKNOWN"}

💰 PRICE:
${price}

📦 STATUS:
Pending confirmation
`;

      await bot.sendMessage(process.env.CHAT_ID, message);

      if (req.file?.path) {
        await bot.sendPhoto(process.env.CHAT_ID, req.file.path, {
          caption:
`🧾 DONATE RECEIPT

👤 ${user.name}
📦 ${category}
🛒 ${item}
💰 ${amount}
💵 ${price}

🔥 Awaiting approval...`,
        });
      }

      res.json({ success: true });

    } catch (e) {
      console.log("DONATE ERROR:", e);
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