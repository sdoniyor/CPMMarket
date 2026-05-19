
// const express = require("express");
// const auth = require("../middleware/auth");
// const { q } = require("../db");

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const router = express.Router();

// /* ================= UPLOAD CONFIG ================= */
// const uploadDir = path.join(__dirname, "../uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (_, __, cb) => cb(null, uploadDir),
//   filename: (_, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// const upload = multer({ storage });

// /* ================= UPLOAD AVATAR ================= */
// router.post(
//   "/upload-avatar",
//   auth,
//   upload.single("avatar"),
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ error: "No file" });
//       }

//       const avatarPath = `/uploads/${req.file.filename}`;

//       await q(
//         `UPDATE users SET avatar=$1 WHERE id=$2`,
//         [avatarPath, req.userId]
//       );

//       const userRes = await q(
//         `SELECT id,name,email,avatar,ref_code,telegram_username,telegram_id,role
//          FROM users
//          WHERE id=$1`,
//         [req.userId]
//       );

//       return res.json({
//         success: true,
//         user: userRes.rows[0],
//       });

//     } catch (e) {
//       console.log("UPLOAD ERROR:", e);
//       return res.status(500).json({ error: "Upload error" });
//     }
//   }
// );

// /* ================= GET PROFILE ================= */
// router.get("/me", auth, async (req, res) => {
//   try {
//     const userRes = await q(
//       `SELECT 
//         id, 
//         name, 
//         email, 
//         avatar, 
//         ref_code, 
//         telegram_username, 
//         telegram_id,
//         role
//        FROM users
//        WHERE id=$1`,
//       [req.userId]
//     );

//     const user = userRes.rows[0];

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const refs = await q(
//       `SELECT COUNT(*) FROM referrals WHERE referrer_id=$1`,
//       [req.userId]
//     );

//     const promoRes = await q(
//       `SELECT promo_code, discount, rules
//        FROM user_promos
//        WHERE user_id=$1 AND consumed=false
//        ORDER BY id DESC
//        LIMIT 1`,
//       [req.userId]
//     );

//     const promo = promoRes.rows[0] || null;

//     let rules = promo?.rules;

//     if (typeof rules !== "string") {
//       rules = String(rules || "");
//     }

//     rules = rules.trim();

//     const validTypes = ["coin", "premium", "default", "all"];

//     const isValidPromo =
//       promo &&
//       promo.discount !== null &&
//       promo.discount !== undefined &&
//       validTypes.includes(rules);

//     return res.json({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       avatar: user.avatar || null,
//       role: user.role || "user",

//       ref_code: user.ref_code,
//       ref_count: Number(refs.rows?.[0]?.count || 0),

//       telegram_username: user.telegram_username,
//       telegram_id: user.telegram_id,

//       active_promo: isValidPromo
//         ? {
//             promo_code: promo.promo_code,
//             discount: Number(promo.discount),
//             rules,
//           }
//         : null,
//     });

//   } catch (e) {
//     console.log("PROFILE ERROR:", e);
//     return res.status(500).json({ error: "server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const auth = require("../middleware/auth");
const { q } = require("../db");
const crypto = require("crypto");

const router = express.Router();

/* ================= GET PROFILE ================= */
router.get("/me", auth, async (req, res) => {
  try {
    // ================= GET USER =================
    const userRes = await q(
      `SELECT 
        id, 
        name, 
        email, 
        avatar, 
        ref_code, 
        telegram_username, 
        telegram_id,
        role
       FROM users
       WHERE id=$1`,
      [req.userId]
    );

    const user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ================= AUTO CREATE TELEGRAM LINK =================
    const linkRes = await q(
      "SELECT * FROM telegram_links WHERE user_id=$1",
      [req.userId]
    );

    if (!linkRes.rows.length) {
      const code = crypto.randomBytes(3).toString("hex");

      await q(
        `INSERT INTO telegram_links(user_id, code, used)
         VALUES ($1,$2,false)`,
        [req.userId, code]
      );
    }

    // ================= REFERRALS =================
    const refs = await q(
      `SELECT COUNT(*) FROM referrals WHERE referrer_id=$1`,
      [req.userId]
    );

    // ================= PROMO =================
    const promoRes = await q(
      `SELECT promo_code, discount, rules
       FROM user_promos
       WHERE user_id=$1 AND consumed=false
       ORDER BY id DESC
       LIMIT 1`,
      [req.userId]
    );

    const promo = promoRes.rows[0] || null;

    let rules = promo?.rules;
    rules = typeof rules !== "string" ? String(rules || "") : rules;
    rules = rules.trim();

    const validTypes = ["coin", "premium", "default", "all"];

    const isValidPromo =
      promo &&
      promo.discount !== null &&
      promo.discount !== undefined &&
      validTypes.includes(rules);

    // ================= RESPONSE =================
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || null,
      role: user.role || "user",

      ref_code: user.ref_code,
      ref_count: Number(refs.rows?.[0]?.count || 0),

      telegram_username: user.telegram_username,
      telegram_id: user.telegram_id,

      active_promo: isValidPromo
        ? {
            promo_code: promo.promo_code,
            discount: Number(promo.discount),
            rules,
          }
        : null,
    });

  } catch (e) {
    console.log("PROFILE ERROR:", e);
    return res.status(500).json({ error: "server error" });
  }
});

module.exports = router;