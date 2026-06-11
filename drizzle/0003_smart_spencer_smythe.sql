CREATE TABLE `adCampaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`campaignName` varchar(255) NOT NULL,
	`platform` enum('google_ads','facebook_ads','tiktok_ads','linkedin_ads') NOT NULL,
	`externalCampaignId` varchar(255),
	`dailyBudget` decimal(10,2) NOT NULL,
	`keywords` json NOT NULL,
	`bidStrategy` enum('manual','automatic','target_cpa','target_roas') NOT NULL DEFAULT 'manual',
	`targetCPA` decimal(10,2),
	`targetROAS` decimal(5,2),
	`status` enum('active','paused','optimizing','completed') NOT NULL DEFAULT 'active',
	`totalSpend` decimal(10,2) DEFAULT '0.00',
	`totalRevenue` decimal(10,2) DEFAULT '0.00',
	`totalConversions` int DEFAULT 0,
	`lastOptimizedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `adCampaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `adMetrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campaignId` int NOT NULL,
	`userId` int NOT NULL,
	`date` timestamp NOT NULL,
	`impressions` int DEFAULT 0,
	`clicks` int DEFAULT 0,
	`conversions` int DEFAULT 0,
	`spend` decimal(10,2) DEFAULT '0.00',
	`revenue` decimal(10,2) DEFAULT '0.00',
	`ctr` decimal(5,2) DEFAULT '0.00',
	`cpc` decimal(8,2) DEFAULT '0.00',
	`cpa` decimal(10,2) DEFAULT '0.00',
	`roas` decimal(5,2) DEFAULT '0.00',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `adMetrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `influencerCampaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`influencerId` varchar(255) NOT NULL,
	`influencerName` varchar(255) NOT NULL,
	`platform` enum('youtube','tiktok','instagram','twitter','linkedin') NOT NULL,
	`followers` int NOT NULL,
	`engagement` decimal(5,2) NOT NULL,
	`campaignType` enum('product_review','affiliate_promotion','sponsored_post','collaboration') NOT NULL,
	`proposedFee` decimal(10,2) NOT NULL,
	`estimatedRevenue` decimal(10,2) NOT NULL,
	`status` enum('outreach','negotiating','accepted','rejected','completed') NOT NULL DEFAULT 'outreach',
	`pitchSentAt` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `influencerCampaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nichePivotingCampaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`currentNiche` varchar(255) NOT NULL,
	`targetNiche` varchar(255) NOT NULL,
	`currentCPC` decimal(8,2) NOT NULL,
	`targetCPC` decimal(8,2) NOT NULL,
	`estimatedROI` int NOT NULL,
	`status` enum('planning','in_progress','completed','failed') NOT NULL DEFAULT 'planning',
	`startedAt` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nichePivotingCampaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notificationPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailNotifications` boolean DEFAULT true,
	`pushNotifications` boolean DEFAULT true,
	`smsNotifications` boolean DEFAULT false,
	`inAppNotifications` boolean DEFAULT true,
	`quietHoursStart` int DEFAULT 22,
	`quietHoursEnd` int DEFAULT 8,
	`opportunityAlerts` boolean DEFAULT true,
	`performanceAlerts` boolean DEFAULT true,
	`milestoneAlerts` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notificationPreferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `notificationPreferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `smartNotifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('opportunity','alert','milestone','performance','action_required') NOT NULL,
	`priority` enum('critical','high','medium','low') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`actionUrl` varchar(512),
	`actionText` varchar(100),
	`channels` json NOT NULL,
	`read` boolean DEFAULT false,
	`sentAt` timestamp,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `smartNotifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `videoCampaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(512) NOT NULL,
	`platform` enum('youtube','tiktok','instagram','twitter') NOT NULL,
	`contentId` int,
	`scriptContent` text NOT NULL,
	`videoUrl` varchar(512),
	`thumbnailUrl` varchar(512),
	`status` enum('generating','generated','uploading','published','failed') NOT NULL DEFAULT 'generating',
	`estimatedViews` int NOT NULL,
	`estimatedRevenue` decimal(10,2) NOT NULL,
	`actualViews` int DEFAULT 0,
	`actualRevenue` decimal(10,2) DEFAULT '0.00',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `videoCampaigns_id` PRIMARY KEY(`id`)
);
