module.exports = function (req, res, next) {
  const role = (req.userRole || "").toLowerCase().trim();

  console.log("ADMIN ROLE CHECK:", role); // DEBUG

  if (role !== "admin") {
    return res.status(403).json({
      error: "Admins only",
      yourRole: role,
    });
  }

  next();
};