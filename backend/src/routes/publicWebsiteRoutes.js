const { Router } = require("express");
const { isValidEmail } = require("../domain/utils/email");
const { addContactInquiry } = require("../repositories/contactInquiryRepo");
const { listCollection, getCollectionItemBySlug } = require("../repositories/briventContentRepo");

async function sendBySlug(res, collectionKey, slug) {
  const item = await getCollectionItemBySlug(collectionKey, slug);
  return item ? res.status(200).json(item) : res.status(404).json({ error: "Resource not found" });
}

function createPublicWebsiteRoutes() {
  const router = Router();
  router.post("/contact", async (req, res, next) => {
    try {
      const body = req.body || {};
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const message = String(body.message || "").trim();
      const enquiryType = String(body.enquiryType || "").trim();
      if (!name || !email || !message || !enquiryType) return res.status(400).json({ error: "Name, email, enquiry type, and message are required." });
      if (!isValidEmail(email)) return res.status(400).json({ error: "Please provide a valid email address." });
      const id = await addContactInquiry({ name, email, message, enquiryType, organization: String(body.organization || "").trim(), website: String(body.website || "").trim() });
      return res.status(200).json({ success: true, id });
    } catch (error) { return next(error); }
  });
  router.get("/careers", async (_req, res, next) => {
    try { return res.status(200).json(await listCollection("careers")); } catch (error) { return next(error); }
  });
  router.get("/careers/:slug", async (req, res, next) => {
    try { return await sendBySlug(res, "careers", req.params.slug); } catch (error) { return next(error); }
  });
  router.get("/blog", async (_req, res, next) => {
    try { return res.status(200).json(await listCollection("blogPosts")); } catch (error) { return next(error); }
  });
  router.get("/blog/:slug", async (req, res, next) => {
    try { return await sendBySlug(res, "blogPosts", req.params.slug); } catch (error) { return next(error); }
  });
  router.get("/team", async (_req, res, next) => {
    try { return res.status(200).json(await listCollection("team")); } catch (error) { return next(error); }
  });
  router.get("/products", async (_req, res, next) => {
    try { return res.status(200).json(await listCollection("products")); } catch (error) { return next(error); }
  });
  router.get("/products/:slug", async (req, res, next) => {
    try { return await sendBySlug(res, "products", req.params.slug); } catch (error) { return next(error); }
  });
  router.get("/work", async (_req, res, next) => {
    try { return res.status(200).json(await listCollection("work")); } catch (error) { return next(error); }
  });
  router.get("/work/:slug", async (req, res, next) => {
    try { return await sendBySlug(res, "work", req.params.slug); } catch (error) { return next(error); }
  });
  return router;
}

module.exports = { createPublicWebsiteRoutes };
