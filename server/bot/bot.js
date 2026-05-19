
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
const { q } = require("../db");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

/* ================= ADMINS ================= */

const ADMIN_IDS = (process.env.ADMIN_TELEGRAM_IDS || "")
  .split(",")
  .map(id => id.trim())
  .filter(Boolean);

/* ================= CONNECT ACCOUNT ================= */

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || null;

  const code = match?.[1];

  // 🔥 DEBUG LOG — СРАЗУ СМОТРИМ ЧТО ПРИШЛО
  console.log("RAW CODE:", code);

  if (!code) {
    return bot.sendMessage(
      chatId,
      "👋 Welcome!\nGo to site and connect Telegram first."
    );
  }

  // ✔️ чистим код (ВАЖНО)
  const cleanCode = code.trim();

  console.log("CLEAN CODE:", cleanCode);

  try {
    const linkRes = await q(
      "SELECT * FROM telegram_links WHERE code=$1 AND used=false",
      [cleanCode]
    );

    console.log("DB RESULT:", linkRes.rows);

    const link = linkRes.rows[0];

    if (!link) {
      return bot.sendMessage(chatId, "❌ Invalid or expired code");
    }

    const userCheck = await q(
      "SELECT * FROM users WHERE id=$1",
      [link.user_id]
    );

    if (!userCheck.rows.length) {
      return bot.sendMessage(chatId, "❌ User not found");
    }

    await q(
      `
      UPDATE users
      SET telegram_id=$1,
          telegram_username=$2
      WHERE id=$3
      `,
      [chatId, username, link.user_id]
    );

    await q(
      "UPDATE telegram_links SET used=true WHERE code=$1",
      [cleanCode]
    );

    bot.sendMessage(chatId, "✅ Account connected successfully!");

  } catch (e) {
    console.log("BOT ERROR:", e);
    bot.sendMessage(chatId, "❌ Error connecting account");
  }
});
/* ================= SEND TO ALL ADMINS ================= */

async function sendToAdmins(sendFn) {
  for (const adminId of ADMIN_IDS) {
    try {
      await sendFn(adminId);
    } catch (e) {
      console.log("ADMIN SEND ERROR:", e);
    }
  }
}

/* ================= SCREENSHOT ================= */

bot.on("photo", async (msg) => {
  try {
    const chatId = msg.chat.id;

    const biggestPhoto =
      msg.photo[msg.photo.length - 1];

    const fileId = biggestPhoto.file_id;

    const userRes = await q(
      `
      SELECT id,name,email,telegram_username
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

    /* ================= SEND TO ALL ADMINS ================= */

    await sendToAdmins((adminId) =>
      bot.sendPhoto(adminId, fileId, {
        caption,
      })
    );

    await bot.sendMessage(
      chatId,
      "✅ Screenshot sent"
    );

  } catch (e) {
    console.log("PHOTO ERROR:", e);
    bot.sendMessage(msg.chat.id, "❌ Send failed");
  }
});

/* ================= TEXT ================= */

bot.on("message", async (msg) => {
  if (msg.photo) return;
  if (msg.text && msg.text.startsWith("/start")) return;

  bot.sendMessage(
    msg.chat.id,
    "📸 Send screenshot and it will be forwarded to admin"
  );
});

module.exports = bot;