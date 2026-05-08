const express = require("express");
const { q } = require("../db");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

/* ================= LOG ================= */
router.use((req, res, next) => {
  console.log(`[ADMIN] ${req.method} ${req.url}`);
  next();
});

/* ================= USERS ================= */
router.get("/users", auth, admin, async (req, res) => {
  try {
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

    res.json(result.rows || []);
  } catch (e) {
    console.log("USERS ERROR:", e);
    res.status(500).json({ error: "users failed" });
  }
});

/* ================= CARS ================= */
router.get("/cars", auth, admin, async (req, res) => {
  try {
    const result = await q(`SELECT * FROM cars ORDER BY id DESC`);
    res.json(result.rows || []);
  } catch (e) {
    console.log("CARS ERROR:", e);
    res.status(500).json({ error: "cars failed" });
  }
});

router.post("/cars", auth, admin, async (req, res) => {
  try {
    const {
      name,
      brand,
      dvigatel,
      power,
      speed,
      price,
      image_url,
      type
    } = req.body;

    const result = await q(
      `
      INSERT INTO cars
      (name, brand, dvigatel, power, speed, price, image_url, type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [name, brand, dvigatel, power, speed, price, image_url, type]
    );

    res.json(result.rows[0]);
  } catch (e) {
    console.log("CREATE CAR ERROR:", e);
    res.status(500).json({ error: "create failed" });
  }
});

router.put("/cars/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      brand,
      dvigatel,
      power,
      speed,
      price,
      image_url,
      type
    } = req.body;

    const result = await q(
      `
      UPDATE cars
      SET name=$1,
          brand=$2,
          dvigatel=$3,
          power=$4,
          speed=$5,
          price=$6,
          image_url=$7,
          type=$8
      WHERE id=$9
      RETURNING *
      `,
      [name, brand, dvigatel, power, speed, price, image_url, type, id]
    );

    res.json(result.rows[0]);
  } catch (e) {
    console.log("UPDATE CAR ERROR:", e);
    res.status(500).json({ error: "update failed" });
  }
});

router.delete("/cars/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;

    await q("DELETE FROM cars WHERE id=$1", [id]);

    res.json({ success: true });
  } catch (e) {
    console.log("DELETE CAR ERROR:", e);
    res.status(500).json({ error: "delete failed" });
  }
});

/* ================= PROMOS ================= */
router.get("/promos", auth, admin, async (req, res) => {
  try {
    const result = await q(`SELECT * FROM promo_codes ORDER BY id DESC`);
    res.json(result.rows || []);
  } catch (e) {
    console.log("PROMOS ERROR:", e);
    res.status(500).json({ error: "promos failed" });
  }
});

router.post("/promos", auth, admin, async (req, res) => {
  try {
    const { code, discount, rules } = req.body;

    const result = await q(
      `
      INSERT INTO promo_codes (code, discount, rules)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [code, discount, rules]
    );

    res.json(result.rows[0]);
  } catch (e) {
    console.log("PROMO CREATE ERROR:", e);
    res.status(500).json({ error: "create failed" });
  }
});

router.put("/promos/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { code, discount, rules } = req.body;

    const result = await q(
      `
      UPDATE promo_codes
      SET code=$1, discount=$2, rules=$3
      WHERE id=$4
      RETURNING *
      `,
      [code, discount, rules, id]
    );

    res.json(result.rows[0]);
  } catch (e) {
    console.log("PROMO UPDATE ERROR:", e);
    res.status(500).json({ error: "update failed" });
  }
});

router.delete("/promos/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;

    await q("DELETE FROM promo_codes WHERE id=$1", [id]);

    res.json({ success: true });
  } catch (e) {
    console.log("PROMO DELETE ERROR:", e);
    res.status(500).json({ error: "delete failed" });
  }
});

/* ================= DEBUG: USERS COUNT ================= */
router.get("/debug/users-count", auth, admin, async (req, res) => {
  try {
    const r = await q("SELECT COUNT(*) FROM users");
    res.json(r.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* ================= DEBUG: DB NAME ================= */
router.get("/debug/db", async (req, res) => {
  try {
    const r = await q("SELECT current_database()");
    res.json(r.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;