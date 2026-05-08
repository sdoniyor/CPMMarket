// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         error: "No token",
//       });
//     }

//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         error: "Wrong token format",
//       });
//     }

//     const token = authHeader.slice(7).trim();

//     if (!token) {
//       return res.status(401).json({
//         error: "Token empty",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     if (!decoded.id) {
//       return res.status(401).json({
//         error: "Invalid payload",
//       });
//     }

//     req.userId = decoded.id;

//     next();
//   } catch (e) {
//     console.log("AUTH ERROR:", e.message);

//     return res.status(401).json({
//       error: "Invalid token",
//     });
//   }
// };


const jwt = require("jsonwebtoken");
const { q } = require("../db");

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.slice(7).trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // берем пользователя из БД (самый надежный вариант)
    const result = await q(
      "SELECT id, role FROM users WHERE id=$1",
      [decoded.id]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.userId = user.id;
    req.userRole = (user.role || "user").toLowerCase().trim();

    next();
  } catch (e) {
    console.log("AUTH ERROR:", e.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};