const { Router } = require("express");
const multer = require("multer");
const { requireAdmin } = require("../middleware/adminAuth");
const { listCollection, upsertCollectionItem, deleteCollectionItem } = require("../repositories/briventContentRepo");
const { listInquiries, updateInquiry } = require("../repositories/adminRepo");
const { uploadImage } = require("../repositories/uploadRepo");

const collections = ["careers", "blogPosts", "products", "work", "team"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!/^image\//.test(file.mimetype)) {
      const error = new Error("Only image uploads are allowed.");
      error.status = 400;
      return callback(error);
    }
    return callback(null, true);
  },
});

function createAdminRoutes() {
  const router = Router();
  router.use(requireAdmin);

  router.post("/upload", upload.single("file"), async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file was uploaded." });
      const folder = collections.includes(req.body?.collection) ? req.body.collection : "general";
      const url = await uploadImage(req.file, folder);
      return res.json({ url });
    } catch (error) {
      return next(error);
    }
  });

  router.get("/summary", async (_req, res, next) => {
    try {
      const counts = await Promise.all(collections.map(async (key) => [key, (await listCollection(key)).length]));
      return res.json({ counts: Object.fromEntries(counts), inquiries: (await listInquiries()).length });
    } catch (error) { return next(error); }
  });

  router.get("/content/:collection", async (req, res, next) => {
    try {
      if (!collections.includes(req.params.collection)) return res.status(404).json({ error: "Unknown collection." });
      return res.json(await listCollection(req.params.collection));
    } catch (error) { return next(error); }
  });

  router.put("/content/:collection/:slug", async (req, res, next) => {
    try {
      if (!collections.includes(req.params.collection)) return res.status(404).json({ error: "Unknown collection." });
      return res.json(await upsertCollectionItem(req.params.collection, req.params.slug, req.body || {}));
    } catch (error) { return next(error); }
  });

  router.delete("/content/:collection/:slug", async (req, res, next) => {
    try {
      if (!collections.includes(req.params.collection)) return res.status(404).json({ error: "Unknown collection." });
      await deleteCollectionItem(req.params.collection, req.params.slug);
      return res.status(204).send();
    } catch (error) { return next(error); }
  });

  router.get("/inquiries", async (_req, res, next) => {
    try { return res.json(await listInquiries()); } catch (error) { return next(error); }
  });

  router.patch("/inquiries/:id", async (req, res, next) => {
    try {
      const status = String(req.body?.status || "").trim();
      if (!["new", "in_progress", "resolved"].includes(status)) return res.status(400).json({ error: "Invalid inquiry status." });
      await updateInquiry(req.params.id, status);
      return res.json({ success: true });
    } catch (error) { return next(error); }
  });

  return router;
}

module.exports = { createAdminRoutes };