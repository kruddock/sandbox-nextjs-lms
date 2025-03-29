CREATE TABLE `course_products` (
	`courseId` int NOT NULL,
	`productId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_products_courseId_productId_pk` PRIMARY KEY(`courseId`,`productId`)
);
--> statement-breakpoint
ALTER TABLE `course_products` ADD CONSTRAINT `course_products_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_products` ADD CONSTRAINT `course_products_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;