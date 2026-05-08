module.exports = function (req, res, next) {
  const role = (req.userRole || "").toLowerCase().trim();

  if (role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  next();
};