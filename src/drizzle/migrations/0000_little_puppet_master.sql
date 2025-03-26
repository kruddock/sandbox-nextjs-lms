-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_name` varchar(100),
	`unit_price` float,
	`discontinued` bit(1) DEFAULT 'b''0''',
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);

*/