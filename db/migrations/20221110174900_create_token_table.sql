-- migrate:up
CREATE TABLE `TOKEN` (
  -- `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `access_token` text,
  `refresh_token` text,
  `ip` text,
  `device` varchar(100) DEFAULT "web",
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `TOKEN` ADD UNIQUE (`user_id`);
ALTER TABLE `TOKEN` ADD FOREIGN KEY (`user_id`) REFERENCES `USER` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


-- migrate:down
DROP TABLE `TOKEN`;

