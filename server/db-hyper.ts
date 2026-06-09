import { getDb } from "./db";
import {
  nichePivotingCampaigns,
  influencerCampaigns,
  videoCampaigns,
  adCampaigns,
  adMetrics,
  smartNotifications,
  notificationPreferences,
  type InsertNichePivotingCampaign,
  type InsertInfluencerCampaign,
  type InsertVideoCampaign,
  type InsertAdCampaign,
  type InsertAdMetric,
  type InsertSmartNotification,
  type InsertNotificationPreference,
} from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";

/**
 * Niche Pivoting Database Functions
 */
export async function createNichePivotingCampaign(data: InsertNichePivotingCampaign) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(nichePivotingCampaigns).values(data);
}

export async function getNichePivotingCampaigns(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.nichePivotingCampaigns.findMany({
    where: eq(nichePivotingCampaigns.userId, userId),
    orderBy: desc(nichePivotingCampaigns.createdAt),
  });
}

export async function updateNichePivotingCampaign(id: number, data: Partial<InsertNichePivotingCampaign>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(nichePivotingCampaigns)
    .set(data)
    .where(eq(nichePivotingCampaigns.id, id));
}

/**
 * Influencer Campaigns Database Functions
 */
export async function createInfluencerCampaign(data: InsertInfluencerCampaign) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(influencerCampaigns).values(data);
}

export async function getInfluencerCampaigns(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.influencerCampaigns.findMany({
    where: eq(influencerCampaigns.userId, userId),
    orderBy: desc(influencerCampaigns.createdAt),
  });
}

export async function updateInfluencerCampaign(id: number, data: Partial<InsertInfluencerCampaign>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(influencerCampaigns)
    .set(data)
    .where(eq(influencerCampaigns.id, id));
}

export async function getInfluencerCampaignsByStatus(userId: number, status: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.influencerCampaigns.findMany({
    where: and(
      eq(influencerCampaigns.userId, userId),
      eq(influencerCampaigns.status, status as any)
    ),
  });
}

/**
 * Video Campaigns Database Functions
 */
export async function createVideoCampaign(data: InsertVideoCampaign) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(videoCampaigns).values(data);
}

export async function getVideoCampaigns(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.videoCampaigns.findMany({
    where: eq(videoCampaigns.userId, userId),
    orderBy: desc(videoCampaigns.createdAt),
  });
}

export async function updateVideoCampaign(id: number, data: Partial<InsertVideoCampaign>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(videoCampaigns)
    .set(data)
    .where(eq(videoCampaigns.id, id));
}

export async function getVideoCampaignsByStatus(userId: number, status: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.videoCampaigns.findMany({
    where: and(
      eq(videoCampaigns.userId, userId),
      eq(videoCampaigns.status, status as any)
    ),
  });
}

/**
 * Ad Campaigns Database Functions
 */
export async function createAdCampaign(data: InsertAdCampaign) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(adCampaigns).values(data);
}

export async function getAdCampaigns(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.adCampaigns.findMany({
    where: eq(adCampaigns.userId, userId),
    orderBy: desc(adCampaigns.createdAt),
  });
}

export async function updateAdCampaign(id: number, data: Partial<InsertAdCampaign>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(adCampaigns)
    .set(data)
    .where(eq(adCampaigns.id, id));
}

export async function getAdCampaignsByStatus(userId: number, status: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.adCampaigns.findMany({
    where: and(
      eq(adCampaigns.userId, userId),
      eq(adCampaigns.status, status as any)
    ),
  });
}

/**
 * Ad Metrics Database Functions
 */
export async function createAdMetric(data: InsertAdMetric) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(adMetrics).values(data);
}

export async function getAdMetricsByCampaign(campaignId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.adMetrics.findMany({
    where: eq(adMetrics.campaignId, campaignId),
    orderBy: desc(adMetrics.date),
  });
}

export async function getAdMetricsForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.adMetrics.findMany({
    where: eq(adMetrics.userId, userId),
    orderBy: desc(adMetrics.date),
  });
}

/**
 * Smart Notifications Database Functions
 */
export async function createSmartNotification(data: InsertSmartNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(smartNotifications).values(data);
}

export async function getSmartNotifications(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.smartNotifications.findMany({
    where: eq(smartNotifications.userId, userId),
    orderBy: desc(smartNotifications.createdAt),
    limit,
  });
}

export async function getUnreadNotifications(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.query.smartNotifications.findMany({
    where: and(
      eq(smartNotifications.userId, userId),
      eq(smartNotifications.read, false)
    ),
    orderBy: desc(smartNotifications.createdAt),
  });
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(smartNotifications)
    .set({ read: true })
    .where(eq(smartNotifications.id, id));
}

export async function deleteNotification(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .delete(smartNotifications)
    .where(eq(smartNotifications.id, id));
}

/**
 * Notification Preferences Database Functions
 */
export async function createNotificationPreferences(data: InsertNotificationPreference) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(notificationPreferences).values(data);
}

export async function getNotificationPreferences(userId: number) {
  const db = await getDb();
  if (!db) return null;
  return await db.query.notificationPreferences.findFirst({
    where: eq(notificationPreferences.userId, userId),
  });
}

export async function updateNotificationPreferences(userId: number, data: Partial<InsertNotificationPreference>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(notificationPreferences)
    .set(data)
    .where(eq(notificationPreferences.userId, userId));
}

/**
 * Analytics Functions
 */
export async function getAdCampaignStats(userId: number) {
  const campaigns = await getAdCampaigns(userId);
  const totalSpend = campaigns.reduce((sum: number, c: any) => sum + parseFloat(c.totalSpend || "0"), 0);
  const totalRevenue = campaigns.reduce((sum: number, c: any) => sum + parseFloat(c.totalRevenue || "0"), 0);
  const totalConversions = campaigns.reduce((sum: number, c: any) => sum + (c.totalConversions || 0), 0);
  const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  return {
    campaignCount: campaigns.length,
    totalSpend,
    totalRevenue,
    totalConversions,
    roas: roas.toFixed(2),
    profit: (totalRevenue - totalSpend).toFixed(2),
  };
}

export async function getInfluencerCampaignStats(userId: number) {
  const campaigns = await getInfluencerCampaigns(userId);
  const totalProposedFee = campaigns.reduce((sum: number, c: any) => sum + parseFloat(c.proposedFee || "0"), 0);
  const totalEstimatedRevenue = campaigns.reduce((sum: number, c: any) => sum + parseFloat(c.estimatedRevenue || "0"), 0);
  const completedCount = campaigns.filter((c: any) => c.status === "completed").length;

  return {
    campaignCount: campaigns.length,
    totalProposedFee,
    totalEstimatedRevenue,
    completedCount,
    potentialProfit: (totalEstimatedRevenue - totalProposedFee).toFixed(2),
  };
}

export async function getVideoCampaignStats(userId: number) {
  const campaigns = await getVideoCampaigns(userId);
  const totalEstimatedViews = campaigns.reduce((sum: number, c: any) => sum + (c.estimatedViews || 0), 0);
  const totalEstimatedRevenue = campaigns.reduce((sum: number, c: any) => sum + parseFloat(c.estimatedRevenue || "0"), 0);
  const totalActualViews = campaigns.reduce((sum: number, c: any) => sum + (c.actualViews || 0), 0);
  const totalActualRevenue = campaigns.reduce((sum: number, c: any) => sum + parseFloat(c.actualRevenue || "0"), 0);
  const publishedCount = campaigns.filter((c: any) => c.status === "published").length;

  return {
    campaignCount: campaigns.length,
    publishedCount,
    totalEstimatedViews,
    totalEstimatedRevenue,
    totalActualViews,
    totalActualRevenue,
  };
}
