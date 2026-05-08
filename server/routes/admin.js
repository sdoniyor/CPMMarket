const express = require("express");
const { q } = require("../db");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

/* ================= USERS ================= */
router.get("/users", auth, admin, async (req, res) => {
  const result = await q(`
    SELECT id, name, email, avatar,
           telegram_id, telegram_username,
           ref_code, ref_count, role, created_at
    FROM users
    ORDER BY id DESC
  `);

  res.json(result.rows);
});

/* ================= CARS ================= */
router.get("/cars", auth, admin, async (req, res) => {
  const result = await q(`SELECT * FROM cars ORDER BY id DESC`);
  res.json(result.rows);
});

/* 🔥 CREATE CAR (У ТЕБЯ ЕГО НЕ БЫЛО) */
router.post("/cars", auth, admin, async (req, res) => {
  const { brand, name, price, image_url } = req.body;

  const result = await q(
    `INSERT INTO cars (brand, name, price, image_url)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [brand, name, price, image_url]
  );

  res.json(result.rows[0]);
});

/* 🔥 UPDATE CAR */
router.put("/cars/:id", auth, admin, async (req, res) => {
  const { id } = req.params;
  const { brand, name, price, image_url } = req.body;

  const result = await q(
    `UPDATE cars
     SET brand=$1, name=$2, price=$3, image_url=$4
     WHERE id=$5
     RETURNING *`,
    [brand, name, price, image_url, id]
  );

  res.json(result.rows[0]);
});

/* 🔥 DELETE CAR */
router.delete("/cars/:id", auth, admin, async (req, res) => {
  const { id } = req.params;

  await q("DELETE FROM cars WHERE id=$1", [id]);

  res.json({ success: true });
});

/* ================= PROMOS ================= */
router.get("/promos", auth, admin, async (req, res) => {
  const result = await q(`
    SELECT * FROM promo_codes
    ORDER BY id DESC
  `);

  res.json(result.rows);
});

module.exports = router;