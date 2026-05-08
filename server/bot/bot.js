// require("dotenv").config();

// const TelegramBot = require("node-telegram-bot-api");
// const { q } = require("../db");

// const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

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
//       "UPDATE users SET telegram_id=$1, telegram_username=$2 WHERE id=$3",
//       [chatId, username, link.user_id]
//     );

//     await q(
//       "UPDATE telegram_links SET used=true WHERE code=$1",
//       [code]
//     );

//     bot.sendMessage(chatId, "✅ Account connected successfully!");
//   } catch (e) {
//     console.log("BOT ERROR:", e);
//     bot.sendMessage(chatId, "❌ Error connecting account");
//   }
// });

// module.exports = bot;



require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const { q } = require("../db");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

/*
.env
BOT_TOKEN=xxxx
ADMIN_TELEGRAM_ID=1837175511
*/

const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID;

/* ================= CONNECT ACCOUNT ================= */
bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || null;

  const code = match?.[1];

  if (!code) {
    return bot.sendMessage(
      chatId,
      "👋 Welcome!\nGo to site and connect Telegram first."
    );
  }

  try {
    const linkRes = await q(
      "SELECT * FROM telegram_links WHERE code=$1 AND used=false",
      [code]
    );

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
      [code]
    );

    bot.sendMessage(
      chatId,
      "✅ Account connected successfully!"
    );
  } catch (e) {
    console.log("BOT ERROR:", e);
    bot.sendMessage(
      chatId,
      "❌ Error connecting account"
    );
  }
});

/* ================= SCREENSHOT FOR ADMIN ================= */
bot.on("photo", async (msg) => {
  try {
    const chatId = msg.chat.id;

    const photos = msg.photo;
    const biggestPhoto = photos[photos.length - 1];
    const fileId = biggestPhoto.file_id;

    /* user from DB */
    const userRes = await q(
      `
      SELECT id, name, email, telegram_username
      FROM users
      WHERE telegram_id=$1
      `,
      [String(chatId)]
    );

    const user = userRes.rows[0];

    let caption = `📸 New screenshot\n\n`;

    if (user) {
      caption +=
        `👤 Name: ${user.name}\n` +
        `🆔 ID: ${user.id}\n` +
        `📧 Email: ${user.email}\n` +
        `📨 Username: @${user.telegram_username || "-"}\n` +
        `💬 Chat ID: ${chatId}`;
    } else {
      caption +=
        `⚠ Unknown user\n` +
        `💬 Chat ID: ${chatId}\n` +
        `👤 TG: @${msg.from.username || "-"}`;
    }

    /* send to admin */
    await bot.sendPhoto(
      ADMIN_ID,
      fileId,
      {
        caption,
      }
    );

    /* reply user */
    await bot.sendMessage(
      chatId,
      "✅ Screenshot sent successfully"
    );
  } catch (e) {
    console.log("PHOTO ERROR:", e);

    bot.sendMessage(
      msg.chat.id,
      "❌ Send failed"
    );
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