CREATE TABLE `customerSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeCustomerId` varchar(255) NOT NULL,
	`stripeSubscriptionId` varchar(255) NOT NULL,
	`productId` int NOT NULL,
	`status` enum('active','past_due','canceled','unpaid') NOT NULL,
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`canceledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customerSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `customerSubscriptions_stripeSubscriptionId_unique` UNIQUE(`stripeSubscriptionId`)
);
--> statement-breakpoint
CREATE TABLE `stripeCustomers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeCustomerId` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripeCustomers_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripeCustomers_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `stripeCustomers_stripeCustomerId_unique` UNIQUE(`stripeCustomerId`)
);
--> statement-breakpoint
CREATE TABLE `stripePayments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripePaymentId` varchar(255) NOT NULL,
	`stripeCustomerId` varchar(255) NOT NULL,
	`productId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'EUR',
	`status` enum('succeeded','pending','failed','canceled') NOT NULL,
	`paymentMethod` varchar(50),
	`receiptUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripePayments_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripePayments_stripePaymentId_unique` UNIQUE(`stripePaymentId`)
);
--> statement-breakpoint
CREATE TABLE `stripeProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeProductId` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`type` enum('one_time','subscription') NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'EUR',
	`image` varchar(512),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripeProducts_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripeProducts_stripeProductId_unique` UNIQUE(`stripeProductId`)
);
--> statement-breakpoint
CREATE TABLE `stripeSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripePriceId` varchar(255) NOT NULL,
	`productId` int NOT NULL,
	`billingInterval` enum('month','year') NOT NULL,
	`trialDays` int DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripeSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripeSubscriptions_stripePriceId_unique` UNIQUE(`stripePriceId`)
);
