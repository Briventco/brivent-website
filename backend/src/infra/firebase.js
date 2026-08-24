const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

if (!admin.apps.length) {
  const keyPath = String(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "").trim();
  const credential = keyPath && fs.existsSync(keyPath)
    ? admin.credential.cert(require(path.resolve(keyPath)))
    : null;
  admin.initializeApp(credential ? { credential } : undefined);
}

module.exports = { db: admin.firestore(), FieldValue: admin.firestore.FieldValue };
