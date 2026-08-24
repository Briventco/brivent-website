const { Router } = require("express");
const { careers, blogPosts, products, work, team, findBySlug } = require("../domain/content/briventContent");
const { isValidEmail } = require("../domain/utils/email");
const { addContactInquiry } = require("../repositories/contactInquiryRepo");

function sendBySlug(res, items, slug) {
  const item = findBySlug(items, slug);
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
  router.get("/careers", (_req, res) => res.status(200).json(careers));
  router.get("/careers/:slug", (req, res) => sendBySlug(res, careers, req.params.slug));
  router.get("/blog", (_req, res) => res.status(200).json(blogPosts));
  router.get("/blog/:slug", (req, res) => sendBySlug(res, blogPosts, req.params.slug));
  router.get("/team", (_req, res) => res.status(200).json(team));
  router.get("/products", (_req, res) => res.status(200).json(products));
  router.get("/products/:slug", (req, res) => sendBySlug(res, products, req.params.slug));
  router.get("/work", (_req, res) => res.status(200).json(work));
  router.get("/work/:slug", (req, res) => sendBySlug(res, work, req.params.slug));
  return router;
}

module.exports = { createPublicWebsiteRoutes };
