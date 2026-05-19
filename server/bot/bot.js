
// require("dotenv").config();

// const TelegramBot = require("node-telegram-bot-api");
// const { q } = require("../db");

// const bot = new TelegramBot(process.env.BOT_TOKEN, {
//   polling: true,
// });

// /*
// .env
// BOT_TOKEN=xxxx
// ADMIN_TELEGRAM_ID=1837175511
// */

// const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID;

// /* ================= CONNECT ACCOUNT ================= */
// bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
//   const chatId = msg.chat.id;
//   const username = msg.from.username || null;

//   const code = match?.[1];

//   if (!code) {
//     return bot.sendMessage(
//       chatId,
//       "👋 Welcome!\nGo to site and connect Telegram first."
//     );
//   }

//   try {
//     const linkRes = await q(
//       "SELECT * FROM telegram_links WHERE code=$1 AND used=false",
//       [code]
//     );

//     const link = linkRes.rows[0];

//     if (!link) {
//       return bot.sendMessage(chatId, "❌ Invalid or expired code");
//     }

//     const userCheck = await q(
//       "SELECT * FROM users WHERE id=$1",
//       [link.user_id]
//     );

//     if (!userCheck.rows.length) {
//       return bot.sendMessage(chatId, "❌ User not found");
//     }

//     await q(
//       `
//       UPDATE users
//       SET telegram_id=$1,
//           telegram_username=$2
//       WHERE id=$3
//       `,
//       [chatId, username, link.user_id]
//     );

//     await q(
//       "UPDATE telegram_links SET used=true WHERE code=$1",
//       [code]
//     );

//     bot.sendMessage(
//       chatId,
//       "✅ Account connected successfully!"
//     );
//   } catch (e) {
//     console.log("BOT ERROR:", e);
//     bot.sendMessage(
//       chatId,
//       "❌ Error connecting account"
//     );
//   }
// });

// /* ================= SCREENSHOT FOR ADMIN ================= */
// bot.on("photo", async (msg) => {
//   try {
//     const chatId = msg.chat.id;
//     console.log("PHOTO FROM:", chatId);

//     const biggestPhoto = msg.photo[msg.photo.length - 1];
//     console.log("FILE ID:", biggestPhoto.file_id);

//     const fileId = biggestPhoto.file_id;

//     const userRes = await q(
//       `
//       SELECT id,name,email,telegram_username
//       FROM users
//       WHERE telegram_id=$1
//       `,
//       [String(chatId)]
//     );

//     console.log("DB USER:", userRes.rows);

//     const user = userRes.rows[0];

//     let caption = "📸 New screenshot\n\n";

//     if (user) {
//       caption += `
// 👤 Name: ${user.name}
// 🆔 ID: ${user.id}
// 📧 Email: ${user.email}
// 📨 Username: @${user.telegram_username || "-"}
// 💬 Chat ID: ${chatId}
// `;
//     } else {
//       caption += `
// ⚠ Unknown user
// 💬 Chat ID: ${chatId}
// 👤 TG: @${msg.from.username || "-"}
// `;
//     }

//     console.log("ADMIN ID:", process.env.ADMIN_TELEGRAM_ID);

//     await bot.sendPhoto(
//       process.env.ADMIN_TELEGRAM_ID,
//       fileId,
//       { caption }
//     );

//     console.log("PHOTO SENT");

//     await bot.sendMessage(
//       chatId,
//       "✅ Screenshot sent"
//     );

//   } catch (e) {
//     console.log("PHOTO ERROR FULL:", e);
//     bot.sendMessage(msg.chat.id, "❌ Send failed");
//   }
// });

// /* ================= TEXT ================= */
// bot.on("message", async (msg) => {
//   if (msg.photo) return;

//   if (msg.text && msg.text.startsWith("/start")) return;

//   bot.sendMessage(
//     msg.chat.id,
//     "📸 Send screenshot and it will be forwarded to admin"
//   );
// });

// module.exports = bot;


require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const crypto = require("crypto");
const { q } = require("../db");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

/* ================= ADMINS ================= */

const ADMIN_IDS = (process.env.ADMIN_TELEGRAM_IDS || "")
  .split(",")
  .map(id => id.trim())
  .filter(Boolean);

/* ================= GENERATE CODE ================= */

function generateCode() {
  return crypto.randomBytes(3).toString("hex"); // a1b2c3
}

/* ================= CONNECT ACCOUNT (/start) ================= */

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || null;

  const code = match?.[1]?.trim();

  console.log("RAW CODE:", code);

  if (!code) {
    return bot.sendMessage(
      chatId,
      "👋 Go to website and get connect code first"
    );
  }

  try {
    const res = await q(
      "SELECT * FROM telegram_links WHERE code=$1 AND used=false",
      [code]
    );

    const link = res.rows[0];

    console.log("DB LINK:", link);

    if (!link) {
      return bot.sendMessage(chatId, "❌ Invalid or expired code");
    }

    // connect user
    await q(
      `
      UPDATE users
      SET telegram_id=$1,
          telegram_username=$2
      WHERE id=$3
      `,
      [chatId, username, link.user_id]
    );

    // mark used
    await q(
      "UPDATE telegram_links SET used=true WHERE code=$1",
      [code]
    );

    bot.sendMessage(chatId, "✅ Connected successfully!");

  } catch (e) {
    console.log("START ERROR:", e);
    bot.sendMessage(chatId, "❌ Server error");
  }
});

/* ================= SEND TO ADMINS ================= */

async function sendToAdmins(sendFn) {
  for (const adminId of ADMIN_IDS) {
    try {
      await sendFn(adminId);
    } catch (e) {
      console.log("ADMIN SEND ERROR:", e);
    }
  }
}

/* ================= SCREENSHOT HANDLER ================= */

bot.on("photo", async (msg) => {
  try {
    const chatId = msg.chat.id;

    const fileId = msg.photo[msg.photo.length - 1].file_id;

    const userRes = await q(
      `
      SELECT id, name, email, telegram_username
      FROM users
      WHERE telegram_id=$1
      `,
      [String(chatId)]
    );

    const user = userRes.rows[0];

    let caption = "📸 New screenshot\n\n";

    if (user) {
      caption += `
👤 Name: ${user.name}
🆔 ID: ${user.id}
📧 Email: ${user.email}
📨 Username: @${user.telegram_username || "-"}
💬 Chat ID: ${chatId}
`;
    } else {
      caption += `
⚠ Unknown user
💬 Chat ID: ${chatId}
👤 TG: @${msg.from.username || "-"}
`;
    }

    await sendToAdmins((adminId) =>
      bot.sendPhoto(adminId, fileId, { caption })
    );

    bot.sendMessage(chatId, "✅ Screenshot sent");

  } catch (e) {
    console.log("PHOTO ERROR:", e);
    bot.sendMessage(msg.chat.id, "❌ Send failed");
  }
});

/* ================= DEFAULT TEXT ================= */

bot.on("message", async (msg) => {
  if (msg.photo) return;
  if (msg.text && msg.text.startsWith("/start")) return;

  bot.sendMessage(
    msg.chat.id,
    "📸 Send screenshot and it will be forwarded to admin"
  );
});

module.exports = bot;