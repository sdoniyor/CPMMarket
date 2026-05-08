module.exports = function (req, res, next) {
  try {
    // защита от undefined / null
    const role = (req.userRole || "").toString().trim().toLowerCase();

    // debug (временно можно оставить)
    console.log("ADMIN CHECK ROLE:", role);

    if (role !== "admin") {
      return res.status(403).json({
        error: "Admins only",
        yourRole: role, // 🔥 полезно для дебага
      });
    }

    next();
  } catch (e) {
    console.log("ADMIN MIDDLEWARE ERROR:", e);
    return res.status(500).json({ error: "server error" });
  }
};