CREATE TABLE `courses` (
	`id` varchar(128) NOT NULL,
	`name` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` varchar(128) NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`youtubeVideoId` text NOT NULL,
	`order` int NOT NULL,
	`lesson_status` enum('public','private','preview') NOT NULL DEFAULT 'private',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(128) NOT NULL,
	`description` text NOT NULL,
	`imageUrl` text NOT NULL,
	`priceInDollars` int NOT NULL,
	`product_status` enum('public','private') NOT NULL DEFAULT 'private',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchases` (
	`id` varchar(128) NOT NULL,
	`pricePaidInCents` int NOT NULL,
	`productDetails` json NOT NULL,
	`stripeSessionId` varchar(128) NOT NULL,
	`refundedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `purchases_id` PRIMARY KEY(`id`),
	CONSTRAINT `purchases_stripeSessionId_unique` UNIQUE(`stripeSessionId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(128) NOT NULL,
	`clerkUserId` varchar(128) NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`user_role` enum('user','admin') NOT NULL DEFAULT 'user',
	`imageUrl` text,
	`deletedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_clerkUserId_unique` UNIQUE(`clerkUserId`)
);
