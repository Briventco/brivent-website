const { db, FieldValue } = require("../infra/firebase");

async function addContactInquiry(inquiry) {
  const reference = await db.collection("briventContactInquiries").add({
    ...inquiry, source: "brivent_website", createdAt: FieldValue.serverTimestamp(),
  });
  return reference.id;
}

module.exports = { addContactInquiry };
