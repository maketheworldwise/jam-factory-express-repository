-- migrate:up
CREATE TABLE `USER` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(10) NOT NULL,
  `password` text NOT NULL,
  `zip_code` varchar(5),
  `address_main` varchar(45),
  `address_sub` varchar(45),
  `phone` varchar(11) NOT NULL,
  `email` varchar(320) NOT NULL,
  `birth` date NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `PRODUCT` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `delivery_fee` int NOT NULL,
  `image_url` text
);

CREATE TABLE `PRODUCT_REVIEW` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `product_id` bigint,
  `rating` varchar(5) DEFAULT '5.0',
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `PRODUCT_CART` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `product_id` bigint,
  `quantity` int DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `PRODUCT_PURCHASE` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `product_id` bigint,
  `quantity` int DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `PRODUCT_REVIEW` ADD FOREIGN KEY (`user_id`) REFERENCES `USER` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PRODUCT_REVIEW` ADD FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PRODUCT_CART` ADD FOREIGN KEY (`user_id`) REFERENCES `USER` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PRODUCT_CART` ADD FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PRODUCT_PURCHASE` ADD FOREIGN KEY (`user_id`) REFERENCES `USER` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PRODUCT_PURCHASE` ADD FOREIGN KEY (`product_id`) REFERENCES `PRODUCT` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


-- migrate:down
DROP TABLE `PRODUCT_PURCHASE`;
DROP TABLE `PRODUCT_CART`;
DROP TABLE `PRODUCT_REVIEW`;
DROP TABLE `PRODUCT`;
DROP TABLE `USER`;
