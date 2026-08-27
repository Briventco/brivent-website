const express = require("express");
const cors = require("cors");
const { createPublicWebsiteRoutes } = require("./routes/publicWebsiteRoutes");
const { createAdminRoutes } = require("./routes/adminRoutes");

function createApp() {
  const app = express();
  const origins = String(process.env.CORS_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  app.use(cors({ origin: origins.length ? origins : true }));
  app.use(express.json({ limit: "1mb" }));
  app.get("/health", (_req, res) => res.status(200).json({ ok: true, service: "brivent-website-api" }));
  app.use("/api", createPublicWebsiteRoutes());
  app.use("/api/admin", createAdminRoutes());
  app.use((req, res) => res.status(404).json({ error: "Route not found", path: req.originalUrl }));
  app.use((error, _req, res, _next) => {
    const status = Number(error.status || error.statusCode) || (error.code === "LIMIT_FILE_SIZE" ? 413 : 500);
    const message = status < 500 ? error.message : "Internal server error";
    if (status >= 500) console.error(error);
    return res.status(status).json({ error: message || "Something went wrong." });
  });
  return app;
}

module.exports = { createApp };
