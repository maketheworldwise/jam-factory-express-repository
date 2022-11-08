-- migrate:up
CREATE TABLE `USER` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `zip_code` varchar(5),
  `address_main` varchar(45),
  `address_sub` varchar(45),
  `phone` varchar(11) NOT NULL,
  `email` varchar(320),
  `birth` date NOT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
);

CREATE TABLE `PRODUCT` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `delivery_fee` int NOT NULL,
  `image_url` text
);

CREATE TABLE `PRODUCT_REVIEW` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `product_id` bigint,
  `rating` int,
  `content` text,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
);

CREATE TABLE `SHOPPING_CART` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `product_id` bigint,
  `quantity` int DEFAULT 1,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
);

CREATE TABLE `PURCHASE_HISTORY` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `product_id` bigint,
  `quantity` int DEFAULT 1,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
);

ALTER TABLE `PRODUCT_REVIEW` ADD FOREIGN KEY (`user_id`) REFERENCES `USER` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PRODUCT_REVIEW` ADD FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `SHOPPING_CART` ADD FOREIGN KEY (`user_id`) REFERENCES `USER` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `SHOPPING_CART` ADD FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PURCHASE_HISTORY` ADD FOREIGN KEY (`user_id`) REFERENCES `USER` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PURCHASE_HISTORY` ADD FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


-- migrate:down
DROP TABLE `PURCHASE_HISTORY`;
DROP TABLE `SHOPPING_CART`;
DROP TABLE `PRODUCT_REVIEW`;
DROP TABLE `PRODUCT`;
DROP TABLE `USER`;
