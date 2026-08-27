const crypto = require("crypto");
const path = require("path");
const { admin } = require("../infra/firebase");

function resolveBucketName() {
  const explicit = String(process.env.FIREBASE_STORAGE_BUCKET || "").trim();
  if (explicit) return explicit;
  const projectId = String(process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || "").trim();
  return projectId ? `${projectId}.appspot.com` : undefined;
}

async function uploadImage(file, folder) {
  const bucketName = resolveBucketName();
  const bucket = bucketName ? admin.storage().bucket(bucketName) : admin.storage().bucket();
  const extension = path.extname(file.originalname || "").toLowerCase() || ".jpg";
  const objectPath = `admin-uploads/${folder}/${Date.now()}-${crypto.randomBytes(6).toString("hex")}${extension}`;
  const blob = bucket.file(objectPath);

  await blob.save(file.buffer, {
    contentType: file.mimetype,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
  await blob.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${objectPath}`;
}

module.exports = { uploadImage };
