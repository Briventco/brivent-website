require("dotenv").config();

const { db } = require("../src/infra/firebase");
const { team } = require("../src/domain/content/briventContent");

async function seedTeam() {
  const batch = db.batch();
  const uniqueMembers = [...new Map(team.map((member) => [member.slug, member])).values()];

  uniqueMembers.forEach((member) => {
    batch.set(db.collection("team").doc(member.slug), member, { merge: true });
  });

  await batch.commit();
  console.log(`Seeded ${uniqueMembers.length} team members into Firestore.`);
}

seedTeam().catch((error) => {
  console.error("Unable to seed team content:", error.message);
  process.exitCode = 1;
});