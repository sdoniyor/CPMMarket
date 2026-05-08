const express = require("express");
const { q } = require("../db");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

/* USERS */
router.get("/users", auth, admin, async (req, res) => {
  const result = await q(`
    SELECT
      id,
      name,
      email,
      avatar,
      telegram_id,
      telegram_username,
      ref_code,
      ref_count,
      role,
      created_at
    FROM users
    ORDER BY id DESC
  `);

  res.json(result.rows);
});

/* CARS */
router.get("/cars", auth, admin, async (req, res) => {
  const result = await q(`SELECT * FROM cars ORDER BY id DESC`);
  res.json(result.rows);
});

/* PROMOS */
router.get("/promos", auth, admin, async (req, res) => {
  const result = await q(`
    SELECT * FROM promo_codes
    ORDER BY id DESC
  `);

  res.json(result.rows);
});

module.exports = router;