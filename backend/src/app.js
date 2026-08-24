const express = require("express");
const cors = require("cors");
const { createPublicWebsiteRoutes } = require("./routes/publicWebsiteRoutes");

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
  app.use((req, res) => res.status(404).json({ error: "Route not found", path: req.originalUrl }));
  app.use((error, _req, res, _next) => res.status(500).json({ error: "Internal server error" }));
  return app;
}

module.exports = { createApp };
