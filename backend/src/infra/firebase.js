const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

let firestoreInstance = null;

function normalizePrivateKey(privateKey) {
  return String(privateKey || "").replace(/\\n/g, "\n").trim();
}

function readServiceAccountFromEnv() {
  const jsonValue = String(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "").trim();
  if (jsonValue) {
    try {
      return JSON.parse(jsonValue);
    } catch (error) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON must contain valid JSON.");
    }
  }

  const keyPath = String(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "").trim();
  if (keyPath && fs.existsSync(keyPath)) {
    try {
      return JSON.parse(fs.readFileSync(path.resolve(keyPath), "utf8"));
    } catch (error) {
      throw new Error(`Unable to read Firebase service account JSON from ${keyPath}.`);
    }
  }

  const clientEmail = String(process.env.FIREBASE_CLIENT_EMAIL || "").trim();
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);
  const projectId = String(process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || "").trim();

  if (clientEmail && privateKey && projectId) {
    return { projectId, clientEmail, privateKey };
  }

  return null;
}

function initializeFirebase() {
  if (admin.apps.length) {
    return admin.app();
  }

  const projectId = String(process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || "").trim()
    || (process.env.FIRESTORE_EMULATOR_HOST ? "demo-brivent" : "");
  const serviceAccount = readServiceAccountFromEnv();
  const appOptions = {};

  if (projectId) {
    appOptions.projectId = projectId;
  }

  if (serviceAccount) {
    appOptions.credential = admin.credential.cert(serviceAccount);
  }

  admin.initializeApp(Object.keys(appOptions).length ? appOptions : undefined);

  return admin.app();
}

function getFirestore() {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  initializeFirebase();
  firestoreInstance = admin.firestore();
  firestoreInstance.settings({ ignoreUndefinedProperties: true });
  return firestoreInstance;
}

module.exports = {
  admin,
  initializeFirebase,
  getFirestore,
  db: getFirestore(),
  FieldValue: admin.firestore.FieldValue,
};
