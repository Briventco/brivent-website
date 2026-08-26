const { db } = require("../infra/firebase");
const { careers, blogPosts, products, work, team, findBySlug } = require("../domain/content/briventContent");

const collectionMap = {
  careers: { name: "careers", fallback: careers },
  blogPosts: { name: "blogPosts", fallback: blogPosts },
  products: { name: "products", fallback: products },
  work: { name: "work", fallback: work },
  team: { name: "team", fallback: team },
};

function normalizeValue(value) {
  if (value == null) {
    return value;
  }

  if (typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, normalizeValue(nestedValue)]),
    );
  }

  return value;
}

function normalizeDocument(doc) {
  const data = normalizeValue(doc.data());
  return {
    ...data,
    slug: String(data.slug || doc.id || "").trim(),
  };
}

function sortItems(items) {
  return [...items].sort((left, right) => {
    const leftOrder = Number.isFinite(Number(left.order)) ? Number(left.order) : Number.MAX_SAFE_INTEGER;
    const rightOrder = Number.isFinite(Number(right.order)) ? Number(right.order) : Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    const leftName = String(left.name || left.title || left.slug || "").toLowerCase();
    const rightName = String(right.name || right.title || right.slug || "").toLowerCase();
    return leftName.localeCompare(rightName);
  });
}

async function listCollection(key) {
  const config = collectionMap[key];
  try {
    const snapshot = await db.collection(config.name).get();
    if (snapshot.empty) {
      return config.fallback;
    }
    return sortItems(snapshot.docs.map(normalizeDocument));
  } catch (error) {
    console.warn(`Falling back to static ${config.name} content because Firestore read failed.`, error.message);
    return config.fallback;
  }
}

async function getCollectionItemBySlug(key, slug) {
  const config = collectionMap[key];
  const normalizedSlug = String(slug || "").trim();

  if (!normalizedSlug) {
    return null;
  }

  try {
    const whereSnapshot = await db
      .collection(config.name)
      .where("slug", "==", normalizedSlug)
      .limit(1)
      .get();

    if (!whereSnapshot.empty) {
      return normalizeDocument(whereSnapshot.docs[0]);
    }

    const document = await db.collection(config.name).doc(normalizedSlug).get();
    if (document.exists) {
      return normalizeDocument(document);
    }
  } catch (error) {
    console.warn(`Falling back to static ${config.name} item lookup because Firestore read failed.`, error.message);
  }

  return findBySlug(config.fallback, normalizedSlug);
}

async function upsertCollectionItem(key, slug, data) {
  const config = collectionMap[key];
  const normalizedSlug = String(slug || "").trim();
  if (!normalizedSlug) throw new Error("A slug is required.");
  await db.collection(config.name).doc(normalizedSlug).set({ ...data, slug: normalizedSlug }, { merge: true });
  return getCollectionItemBySlug(key, normalizedSlug);
}

async function deleteCollectionItem(key, slug) {
  const config = collectionMap[key];
  const normalizedSlug = String(slug || "").trim();
  if (!normalizedSlug) throw new Error("A slug is required.");
  await db.collection(config.name).doc(normalizedSlug).delete();
}

module.exports = {
  listCollection,
  getCollectionItemBySlug,
  upsertCollectionItem,
  deleteCollectionItem,
};
