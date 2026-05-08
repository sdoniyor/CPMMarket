

// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { q } = require("../db");

// const router = express.Router();

// /* ================= REF CODE ================= */
// const generateRef = () =>
//   Math.random().toString(36).substring(2, 8).toUpperCase();

// /* ================= REGISTER ================= */
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, referredBy } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     /* ================= CHECK EMAIL ================= */
//     const exist = await q(
//       "SELECT id FROM users WHERE email=$1",
//       [email]
//     );

//     if (exist.rows.length > 0) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     /* ================= FIND REFERRER ================= */
//     let referredUserId = null;

//     if (referredBy && typeof referredBy === "string") {
//       const refUser = await q(
//         "SELECT id FROM users WHERE ref_code=$1",
//         [referredBy.trim()]
//       );

//       if (refUser.rows.length > 0) {
//         referredUserId = refUser.rows[0].id;
//       }
//     }

//     /* ================= UNIQUE REF CODE ================= */
//     let refCode;

//     while (true) {
//       refCode = generateRef();

//       const check = await q(
//         "SELECT id FROM users WHERE ref_code=$1",
//         [refCode]
//       );

//       if (check.rows.length === 0) break;
//     }

//     /* ================= CREATE USER ================= */
//     const r = await q(
//       `INSERT INTO users (name, email, password, ref_code, referred_by)
//        VALUES ($1,$2,$3,$4,$5)
//        RETURNING id, name, email, ref_code`,
//       [name, email, hash, refCode, referredUserId]
//     );

//     const newUser = r.rows[0];

//     /* ================= SAVE REF EVENT ================= */
// if (referredUserId) {
//   await q(
//     "INSERT INTO referrals (referrer_id, user_id) VALUES ($1,$2)",
//     [referredUserId, newUser.id]
//   );

//   await q(
//     "UPDATE users SET ref_count = COALESCE(ref_count,0) + 1 WHERE id=$1",
//     [referredUserId]
//   );
// }

//     /* ================= TOKEN ================= */
//     const token = jwt.sign(
//       { id: newUser.id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: newUser,
//     });

//   } catch (e) {
//     console.log("REGISTER ERROR:", e);
//     res.status(500).json({ error: "server error" });
//   }
// });

// /* ================= LOGIN ================= */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const r = await q(
//       "SELECT * FROM users WHERE email=$1",
//       [email]
//     );

//     const user = r.rows[0];

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const ok = await bcrypt.compare(password, user.password);

//     if (!ok) {
//       return res.status(401).json({ error: "Wrong password" });
//     }

//     const token = jwt.sign(
//       { id: user.id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         ref_code: user.ref_code,
//       },
//     });

//   } catch (e) {
//     console.log("LOGIN ERROR:", e);
//     res.status(500).json({ error: "server error" });
//   }
// });

// module.exports = router;



const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { q } = require("../db");

const router = express.Router();

/* ================= REF CODE ================= */
const generateRef = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, referredBy } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // check email
    const exist = await q(
      "SELECT id FROM users WHERE email=$1",
      [email]
    );

    if (exist.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    /* ================= REF ================= */
    let referredUserId = null;

    if (referredBy) {
      const refUser = await q(
        "SELECT id FROM users WHERE ref_code=$1",
        [referredBy.trim()]
      );

      if (refUser.rows.length > 0) {
        referredUserId = refUser.rows[0].id;
      }
    }

    /* ================= UNIQUE REF CODE ================= */
    let refCode;

    while (true) {
      refCode = generateRef();

      const check = await q(
        "SELECT id FROM users WHERE ref_code=$1",
        [refCode]
      );

      if (check.rows.length === 0) break;
    }

    /* ================= CREATE USER ================= */
    const r = await q(
      `
      INSERT INTO users
      (name, email, password, ref_code, referred_by, role, ref_count)
      VALUES ($1,$2,$3,$4,$5,'user',0)
      RETURNING id, name, email, ref_code, role, ref_count
      `,
      [name, email, hash, refCode, referredUserId]
    );

    const newUser = r.rows[0];

    /* ================= REF SYSTEM ================= */
    if (referredUserId) {
      await q(
        "INSERT INTO referrals (referrer_id, user_id) VALUES ($1,$2)",
        [referredUserId, newUser.id]
      );

      await q(
        "UPDATE users SET ref_count = COALESCE(ref_count,0) + 1 WHERE id=$1",
        [referredUserId]
      );
    }

    /* ================= TOKEN ================= */
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        ref_code: newUser.ref_code,
        ref_count: newUser.ref_count,
        role: (newUser.role || "user").toLowerCase().trim(), // 🔥 FIX
      },
    });

  } catch (e) {
    console.log("REGISTER ERROR:", e);
    res.status(500).json({ error: "server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const r = await q(
      `SELECT
        id, name, email, password,
        ref_code, ref_count,
        avatar, telegram_id, telegram_username, role
       FROM users
       WHERE email=$1`,
      [email]
    );

    const user = r.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    /* ================= RESPONSE ================= */
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        ref_code: user.ref_code,
        ref_count: user.ref_count,
        avatar: user.avatar,
        telegram_id: user.telegram_id,
        telegram_username: user.telegram_username,
        role: (user.role || "user").toLowerCase().trim(), // 🔥 FIX
      },
    });

  } catch (e) {
    console.log("LOGIN ERROR:", e);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;