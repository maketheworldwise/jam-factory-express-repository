-- migrate:up
CREATE TABLE `TEST` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `content` text
);

-- migrate:down
DROP TABLE `TEST`;
