const { admin } = require("../infra/firebase");

async function requireAdmin(req, res, next) {
  const header = String(req.headers.authorization || "");
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Authentication required." });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const allowedEmails = String(process.env.ADMIN_EMAILS || "")
      .split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
    if (!decoded.email || !allowedEmails.includes(decoded.email.toLowerCase())) {
      return res.status(403).json({ error: "You are not authorized to use the admin dashboard." });
    }
    req.admin = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired authentication token." });
  }
}

module.exports = { requireAdmin };