import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Affiliate Programs Configuration
 * Stores affiliate program details and API keys
 */
export const affiliatePrograms = mysqlTable("affiliatePrograms", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(), // e.g., "GPT Prompt Maker", "Copy.ai"
  apiKey: varchar("apiKey", { length: 512 }), // Encrypted API key
  affiliateId: varchar("affiliateId", { length: 255 }).notNull(), // Unique affiliate ID
  baseUrl: varchar("baseUrl", { length: 512 }).notNull(), // Base URL for affiliate links
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AffiliateProgram = typeof affiliatePrograms.$inferSelect;
export type InsertAffiliateProgram = typeof affiliatePrograms.$inferInsert;

/**
 * Keywords and Niche Configuration
 * Stores target keywords for trend detection and content generation
 */
export const keywords = mysqlTable("keywords", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  keyword: varchar("keyword", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "AI Tools", "Productivity"
  isActive: boolean("isActive").default(true).notNull(),
  lastTrendCheck: timestamp("lastTrendCheck"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Keyword = typeof keywords.$inferSelect;
export type InsertKeyword = typeof keywords.$inferInsert;

/**
 * Generated Content
 * Stores all generated blog posts, social media content, etc.
 */
export const content = mysqlTable("content", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 512 }).notNull(),
  slug: varchar("slug", { length: 512 }).notNull().unique(),
  body: text("body").notNull(), // Full article content
  excerpt: text("excerpt"), // Short summary for social media
  contentType: mysqlEnum("contentType", ["blog_post", "social_post", "email"]).notNull(),
  status: mysqlEnum("status", ["draft", "scheduled", "published", "failed"]).default("draft").notNull(),
  keywords: json("keywords").$type<string[]>().notNull(), // Array of keywords used
  affiliateLinks: json("affiliateLinks").$type<Array<{programId: number, url: string}>>().notNull(), // Embedded affiliate links
  publishedAt: timestamp("publishedAt"),
  scheduledFor: timestamp("scheduledFor"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Content = typeof content.$inferSelect;
export type InsertContent = typeof content.$inferInsert;

/**
 * Content Metrics
 * Tracks clicks, impressions, and estimated earnings per content piece
 */
export const contentMetrics = mysqlTable("contentMetrics", {
  id: int("id").autoincrement().primaryKey(),
  contentId: int("contentId").notNull(),
  userId: int("userId").notNull(),
  clicks: int("clicks").default(0).notNull(),
  impressions: int("impressions").default(0).notNull(),
  estimatedEarnings: decimal("estimatedEarnings", { precision: 10, scale: 2 }).default("0.00").notNull(),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
});

export type ContentMetric = typeof contentMetrics.$inferSelect;
export type InsertContentMetric = typeof contentMetrics.$inferInsert;

/**
 * Trend Data
 * Stores detected trends for historical tracking
 */
export const trends = mysqlTable("trends", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  keyword: varchar("keyword", { length: 255 }).notNull(),
  trendScore: int("trendScore").notNull(), // 0-100 scale
  category: varchar("category", { length: 100 }).notNull(),
  detectedAt: timestamp("detectedAt").defaultNow().notNull(),
});

export type Trend = typeof trends.$inferSelect;
export type InsertTrend = typeof trends.$inferInsert;

/**
 * Publishing Platforms Configuration
 * Stores configuration for where content should be published
 */
export const publishingPlatforms = mysqlTable("publishingPlatforms", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  platformName: varchar("platformName", { length: 100 }).notNull(), // e.g., "Medium", "LinkedIn", "Twitter"
  isActive: boolean("isActive").default(true).notNull(),
  apiKey: varchar("apiKey", { length: 512 }), // Encrypted API key
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PublishingPlatform = typeof publishingPlatforms.$inferSelect;
export type InsertPublishingPlatform = typeof publishingPlatforms.$inferInsert;

/**
 * Platform Configuration
 * Stores user-specific settings for the platform
 */
export const platformConfig = mysqlTable("platformConfig", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  paypalEmail: varchar("paypalEmail", { length: 320 }), // PayPal account for payouts
  contentGenerationFrequency: varchar("contentGenerationFrequency", { length: 50 }).default("daily").notNull(), // daily, weekly, custom
  autoPublish: boolean("autoPublish").default(true).notNull(),
  notifyOnNewContent: boolean("notifyOnNewContent").default(true).notNull(),
  notifyOnPublish: boolean("notifyOnPublish").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PlatformConfig = typeof platformConfig.$inferSelect;
export type InsertPlatformConfig = typeof platformConfig.$inferInsert;


/**
 * Stripe Products
 * Stores digital products and services for sale
 */
export const stripeProducts = mysqlTable("stripeProducts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripeProductId: varchar("stripeProductId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["one_time", "subscription"]).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  image: varchar("image", { length: 512 }),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeProduct = typeof stripeProducts.$inferSelect;
export type InsertStripeProduct = typeof stripeProducts.$inferInsert;

/**
 * Stripe Subscriptions
 * Stores subscription plans
 */
export const stripeSubscriptions = mysqlTable("stripeSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripePriceId: varchar("stripePriceId", { length: 255 }).notNull().unique(),
  productId: int("productId").notNull(),
  billingInterval: mysqlEnum("billingInterval", ["month", "year"]).notNull(),
  trialDays: int("trialDays").default(0),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeSubscription = typeof stripeSubscriptions.$inferSelect;
export type InsertStripeSubscription = typeof stripeSubscriptions.$inferInsert;

/**
 * Customer Subscriptions
 * Tracks active subscriptions for customers
 */
export const customerSubscriptions = mysqlTable("customerSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }).notNull().unique(),
  productId: int("productId").notNull(),
  status: mysqlEnum("status", ["active", "past_due", "canceled", "unpaid"]).notNull(),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  canceledAt: timestamp("canceledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomerSubscription = typeof customerSubscriptions.$inferSelect;
export type InsertCustomerSubscription = typeof customerSubscriptions.$inferInsert;

/**
 * Stripe Payments
 * Tracks all payments and transactions
 */
export const stripePayments = mysqlTable("stripePayments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }).notNull().unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull(),
  productId: int("productId").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  status: mysqlEnum("status", ["succeeded", "pending", "failed", "canceled"]).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  receiptUrl: varchar("receiptUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripePayment = typeof stripePayments.$inferSelect;
export type InsertStripePayment = typeof stripePayments.$inferInsert;

/**
 * Stripe Customers
 * Stores Stripe customer information
 */
export const stripeCustomers = mysqlTable("stripeCustomers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeCustomer = typeof stripeCustomers.$inferSelect;
export type InsertStripeCustomer = typeof stripeCustomers.$inferInsert;

/**
 * Niche Pivoting Campaigns
 * Tracks niche switching campaigns and performance
 */
export const nichePivotingCampaigns = mysqlTable("nichePivotingCampaigns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  currentNiche: varchar("currentNiche", { length: 255 }).notNull(),
  targetNiche: varchar("targetNiche", { length: 255 }).notNull(),
  currentCPC: decimal("currentCPC", { precision: 8, scale: 2 }).notNull(),
  targetCPC: decimal("targetCPC", { precision: 8, scale: 2 }).notNull(),
  estimatedROI: int("estimatedROI").notNull(), // percentage
  status: mysqlEnum("status", ["planning", "in_progress", "completed", "failed"]).default("planning").notNull(),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NichePivotingCampaign = typeof nichePivotingCampaigns.$inferSelect;
export type InsertNichePivotingCampaign = typeof nichePivotingCampaigns.$inferInsert;

/**
 * Influencer Outreach Campaigns
 * Tracks influencer partnerships and outreach
 */
export const influencerCampaigns = mysqlTable("influencerCampaigns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  influencerId: varchar("influencerId", { length: 255 }).notNull(),
  influencerName: varchar("influencerName", { length: 255 }).notNull(),
  platform: mysqlEnum("platform", ["youtube", "tiktok", "instagram", "twitter", "linkedin"]).notNull(),
  followers: int("followers").notNull(),
  engagement: decimal("engagement", { precision: 5, scale: 2 }).notNull(), // percentage
  campaignType: mysqlEnum("campaignType", ["product_review", "affiliate_promotion", "sponsored_post", "collaboration"]).notNull(),
  proposedFee: decimal("proposedFee", { precision: 10, scale: 2 }).notNull(),
  estimatedRevenue: decimal("estimatedRevenue", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["outreach", "negotiating", "accepted", "rejected", "completed"]).default("outreach").notNull(),
  pitchSentAt: timestamp("pitchSentAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type InfluencerCampaign = typeof influencerCampaigns.$inferSelect;
export type InsertInfluencerCampaign = typeof influencerCampaigns.$inferInsert;

/**
 * Video Generation Campaigns
 * Tracks AI-generated videos and their performance
 */
export const videoCampaigns = mysqlTable("videoCampaigns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 512 }).notNull(),
  platform: mysqlEnum("platform", ["youtube", "tiktok", "instagram", "twitter"]).notNull(),
  contentId: int("contentId"), // Reference to blog post
  scriptContent: text("scriptContent").notNull(),
  videoUrl: varchar("videoUrl", { length: 512 }),
  thumbnailUrl: varchar("thumbnailUrl", { length: 512 }),
  status: mysqlEnum("status", ["generating", "generated", "uploading", "published", "failed"]).default("generating").notNull(),
  estimatedViews: int("estimatedViews").notNull(),
  estimatedRevenue: decimal("estimatedRevenue", { precision: 10, scale: 2 }).notNull(),
  actualViews: int("actualViews").default(0),
  actualRevenue: decimal("actualRevenue", { precision: 10, scale: 2 }).default("0.00"),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VideoCampaign = typeof videoCampaigns.$inferSelect;
export type InsertVideoCampaign = typeof videoCampaigns.$inferInsert;

/**
 * Ad Campaigns
 * Tracks Google Ads and Facebook Ads campaigns
 */
export const adCampaigns = mysqlTable("adCampaigns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  campaignName: varchar("campaignName", { length: 255 }).notNull(),
  platform: mysqlEnum("platform", ["google_ads", "facebook_ads", "tiktok_ads", "linkedin_ads"]).notNull(),
  externalCampaignId: varchar("externalCampaignId", { length: 255 }),
  dailyBudget: decimal("dailyBudget", { precision: 10, scale: 2 }).notNull(),
  keywords: json("keywords").$type<string[]>().notNull(),
  bidStrategy: mysqlEnum("bidStrategy", ["manual", "automatic", "target_cpa", "target_roas"]).default("manual").notNull(),
  targetCPA: decimal("targetCPA", { precision: 10, scale: 2 }),
  targetROAS: decimal("targetROAS", { precision: 5, scale: 2 }),
  status: mysqlEnum("status", ["active", "paused", "optimizing", "completed"]).default("active").notNull(),
  totalSpend: decimal("totalSpend", { precision: 10, scale: 2 }).default("0.00"),
  totalRevenue: decimal("totalRevenue", { precision: 10, scale: 2 }).default("0.00"),
  totalConversions: int("totalConversions").default(0),
  lastOptimizedAt: timestamp("lastOptimizedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdCampaign = typeof adCampaigns.$inferSelect;
export type InsertAdCampaign = typeof adCampaigns.$inferInsert;

/**
 * Ad Performance Metrics
 * Daily performance tracking for ad campaigns
 */
export const adMetrics = mysqlTable("adMetrics", {
  id: int("id").autoincrement().primaryKey(),
  campaignId: int("campaignId").notNull(),
  userId: int("userId").notNull(),
  date: timestamp("date").notNull(),
  impressions: int("impressions").default(0),
  clicks: int("clicks").default(0),
  conversions: int("conversions").default(0),
  spend: decimal("spend", { precision: 10, scale: 2 }).default("0.00"),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default("0.00"),
  ctr: decimal("ctr", { precision: 5, scale: 2 }).default("0.00"), // Click-through rate
  cpc: decimal("cpc", { precision: 8, scale: 2 }).default("0.00"), // Cost per click
  cpa: decimal("cpa", { precision: 10, scale: 2 }).default("0.00"), // Cost per acquisition
  roas: decimal("roas", { precision: 5, scale: 2 }).default("0.00"), // Return on ad spend
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AdMetric = typeof adMetrics.$inferSelect;
export type InsertAdMetric = typeof adMetrics.$inferInsert;

/**
 * Smart Notifications
 * Stores all notifications for users
 */
export const smartNotifications = mysqlTable("smartNotifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["opportunity", "alert", "milestone", "performance", "action_required"]).notNull(),
  priority: mysqlEnum("priority", ["critical", "high", "medium", "low"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  actionUrl: varchar("actionUrl", { length: 512 }),
  actionText: varchar("actionText", { length: 100 }),
  channels: json("channels").$type<string[]>().notNull(), // ["email", "push", "sms", "in_app"]
  read: boolean("read").default(false),
  sentAt: timestamp("sentAt"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SmartNotification = typeof smartNotifications.$inferSelect;
export type InsertSmartNotification = typeof smartNotifications.$inferInsert;

/**
 * Notification Preferences
 * User preferences for notification delivery
 */
export const notificationPreferences = mysqlTable("notificationPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  emailNotifications: boolean("emailNotifications").default(true),
  pushNotifications: boolean("pushNotifications").default(true),
  smsNotifications: boolean("smsNotifications").default(false),
  inAppNotifications: boolean("inAppNotifications").default(true),
  quietHoursStart: int("quietHoursStart").default(22), // 22:00
  quietHoursEnd: int("quietHoursEnd").default(8), // 08:00
  opportunityAlerts: boolean("opportunityAlerts").default(true),
  performanceAlerts: boolean("performanceAlerts").default(true),
  milestoneAlerts: boolean("milestoneAlerts").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NotificationPreference = typeof notificationPreferences.$inferSelect;
export type InsertNotificationPreference = typeof notificationPreferences.$inferInsert;
