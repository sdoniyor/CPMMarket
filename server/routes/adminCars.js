const express = require("express");
const router = express.Router();
const { q } = require("../db");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* ================= GET ALL ================= */
router.get("/cars", auth, admin, async (req, res) => {
  try {
    const r = await q("SELECT * FROM cars ORDER BY id DESC");
    res.json(r.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "server error" });
  }
});

/* ================= CREATE ================= */
router.post("/cars", auth, admin, async (req, res) => {
  try {
    const { brand, name, price, image_url } = req.body;

    const r = await q(
      `INSERT INTO cars (brand, name, price, image_url)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [brand, name, price, image_url]
    );

    res.json(r.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "server error" });
  }
});

/* ================= UPDATE ================= */
router.put("/cars/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, name, price, image_url } = req.body;

    const r = await q(
      `UPDATE cars
       SET brand=$1, name=$2, price=$3, image_url=$4
       WHERE id=$5
       RETURNING *`,
      [brand, name, price, image_url, id]
    );

    res.json(r.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "server error" });
  }
});

/* ================= DELETE ================= */
router.delete("/cars/:id", auth, admin, async (req, res) => {
  try {
    const { id } = req.params;

    await q("DELETE FROM cars WHERE id=$1", [id]);

    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;