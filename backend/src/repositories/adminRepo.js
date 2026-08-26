const { db, FieldValue } = require("../infra/firebase");

async function listInquiries() {
  const snapshot = await db.collection("briventContactInquiries").orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function updateInquiry(id, status) {
  await db.collection("briventContactInquiries").doc(String(id)).update({ status, updatedAt: FieldValue.serverTimestamp() });
}

module.exports = { listInquiries, updateInquiry };