CREATE TABLE `affiliatePrograms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`apiKey` varchar(512),
	`affiliateId` varchar(255) NOT NULL,
	`baseUrl` varchar(512) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `affiliatePrograms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(512) NOT NULL,
	`slug` varchar(512) NOT NULL,
	`body` text NOT NULL,
	`excerpt` text,
	`contentType` enum('blog_post','social_post','email') NOT NULL,
	`status` enum('draft','scheduled','published','failed') NOT NULL DEFAULT 'draft',
	`keywords` json NOT NULL,
	`affiliateLinks` json NOT NULL,
	`publishedAt` timestamp,
	`scheduledFor` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contentMetrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentId` int NOT NULL,
	`userId` int NOT NULL,
	`clicks` int NOT NULL DEFAULT 0,
	`impressions` int NOT NULL DEFAULT 0,
	`estimatedEarnings` decimal(10,2) NOT NULL DEFAULT '0.00',
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contentMetrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `keywords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`keyword` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`lastTrendCheck` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `keywords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `platformConfig` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`paypalEmail` varchar(320),
	`contentGenerationFrequency` varchar(50) NOT NULL DEFAULT 'daily',
	`autoPublish` boolean NOT NULL DEFAULT true,
	`notifyOnNewContent` boolean NOT NULL DEFAULT true,
	`notifyOnPublish` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `platformConfig_id` PRIMARY KEY(`id`),
	CONSTRAINT `platformConfig_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `publishingPlatforms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`platformName` varchar(100) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`apiKey` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `publishingPlatforms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trends` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`keyword` varchar(255) NOT NULL,
	`trendScore` int NOT NULL,
	`category` varchar(100) NOT NULL,
	`detectedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `trends_id` PRIMARY KEY(`id`)
);
