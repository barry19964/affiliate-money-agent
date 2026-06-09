import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, affiliatePrograms, keywords, content, contentMetrics, trends, platformConfig, publishingPlatforms, stripeProducts, stripeSubscriptions, stripePayments, stripeCustomers, customerSubscriptions } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============= Affiliate Programs =============

export async function getAffiliatePrograms(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(affiliatePrograms).where(eq(affiliatePrograms.userId, userId));
}

export async function createAffiliateProgram(data: typeof affiliatePrograms.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(affiliatePrograms).values(data);
  return result;
}

export async function updateAffiliateProgram(id: number, data: Partial<typeof affiliatePrograms.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(affiliatePrograms).set(data).where(eq(affiliatePrograms.id, id));
}

export async function deleteAffiliateProgram(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(affiliatePrograms).where(eq(affiliatePrograms.id, id));
}

// ============= Keywords =============

export async function getKeywords(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(keywords).where(eq(keywords.userId, userId));
}

export async function createKeyword(data: typeof keywords.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(keywords).values(data);
}

export async function updateKeyword(id: number, data: Partial<typeof keywords.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(keywords).set(data).where(eq(keywords.id, id));
}

export async function deleteKeyword(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(keywords).where(eq(keywords.id, id));
}

// ============= Content =============

export async function getContent(userId: number, limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(content)
    .where(eq(content.userId, userId))
    .limit(limit)
    .orderBy(content.createdAt);
}

export async function getContentById(id: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(content)
    .where(and(eq(content.id, id), eq(content.userId, userId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function createContent(data: typeof content.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(content).values(data);
  return result;
}

export async function updateContent(id: number, data: Partial<typeof content.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(content).set(data).where(eq(content.id, id));
}

export async function deleteContent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(content).where(eq(content.id, id));
}

// ============= Content Metrics =============

export async function getContentMetrics(contentId: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(contentMetrics)
    .where(and(eq(contentMetrics.contentId, contentId), eq(contentMetrics.userId, userId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function getMetricsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(contentMetrics).where(eq(contentMetrics.userId, userId));
}

export async function updateContentMetrics(contentId: number, userId: number, data: Partial<typeof contentMetrics.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getContentMetrics(contentId, userId);
  
  if (!existing) {
    return await db.insert(contentMetrics).values({
      contentId,
      userId,
      clicks: data.clicks || 0,
      impressions: data.impressions || 0,
      estimatedEarnings: data.estimatedEarnings || "0.00",
    });
  }
  
  return await db.update(contentMetrics).set(data).where(and(eq(contentMetrics.contentId, contentId), eq(contentMetrics.userId, userId)));
}

// ============= Trends =============

export async function getTrends(userId: number, limit = 100) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(trends)
    .where(eq(trends.userId, userId))
    .limit(limit)
    .orderBy(trends.detectedAt);
}

export async function createTrend(data: typeof trends.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(trends).values(data);
}

// ============= Platform Config =============

export async function getPlatformConfig(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(platformConfig)
    .where(eq(platformConfig.userId, userId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function createPlatformConfig(data: typeof platformConfig.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(platformConfig).values(data);
}

export async function updatePlatformConfig(userId: number, data: Partial<typeof platformConfig.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getPlatformConfig(userId);
  
  if (!existing) {
    return await createPlatformConfig({
      userId,
      ...data,
    });
  }
  
  return await db.update(platformConfig).set(data).where(eq(platformConfig.userId, userId));
}

// ============= Publishing Platforms =============

export async function getPublishingPlatforms(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(publishingPlatforms).where(eq(publishingPlatforms.userId, userId));
}

export async function createPublishingPlatform(data: typeof publishingPlatforms.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(publishingPlatforms).values(data);
}

export async function updatePublishingPlatform(id: number, data: Partial<typeof publishingPlatforms.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(publishingPlatforms).set(data).where(eq(publishingPlatforms.id, id));
}

export async function deletePublishingPlatform(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(publishingPlatforms).where(eq(publishingPlatforms.id, id));
}
