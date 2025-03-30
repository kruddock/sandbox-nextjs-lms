CREATE TABLE `course_products` (
	`courseId` varchar(128) NOT NULL,
	`productId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_products_courseId_productId_pk` PRIMARY KEY(`courseId`,`productId`)
);
--> statement-breakpoint
CREATE TABLE `course_sections` (
	`id` varchar(128) NOT NULL,
	`name` text NOT NULL,
	`course_section_status` enum('public','private') NOT NULL DEFAULT 'private',
	`order` int NOT NULL,
	`courseId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_sections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_course_access` (
	`userId` varchar(128) NOT NULL,
	`courseId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_course_access_userId_courseId_pk` PRIMARY KEY(`userId`,`courseId`)
);
--> statement-breakpoint
CREATE TABLE `user_lesson_complete` (
	`userId` varchar(128) NOT NULL,
	`lessonId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_lesson_complete_userId_lessonId_pk` PRIMARY KEY(`userId`,`lessonId`)
);
--> statement-breakpoint
ALTER TABLE `lessons` ADD `sectionId` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `purchases` ADD `userId` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `purchases` ADD `productId` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `course_products` ADD CONSTRAINT `course_products_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_products` ADD CONSTRAINT `course_products_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `course_sections` ADD CONSTRAINT `course_sections_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_course_access` ADD CONSTRAINT `user_course_access_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_course_access` ADD CONSTRAINT `user_course_access_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_lesson_complete` ADD CONSTRAINT `user_lesson_complete_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_lesson_complete` ADD CONSTRAINT `user_lesson_complete_lessonId_lessons_id_fk` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_sectionId_course_sections_id_fk` FOREIGN KEY (`sectionId`) REFERENCES `course_sections`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE restrict ON UPDATE no action;