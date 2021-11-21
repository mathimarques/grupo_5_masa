CREATE TABLE `products` (
   `id` INT NOT NULL,
   `model` VARCHAR(255) NOT NULL,
   `id_type` INT NOT NULL,
   `price` DECIMAL,
   `id_brand` INT NOT NULL,
   `id_color` INT NOT NULL,
   `description` TEXT,
   `image` VARCHAR(255),
   `stock` INT,
   `created_at` DATETIME,
   `updated_at` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT NOT NULL,
   `name` VARCHAR(80) NOT NULL,
   `username` VARCHAR(80) NOT NULL,
   `email` VARCHAR(200) NOT NULL,
   `date_of_birth` DATE,
   `address` VARCHAR(255),
   `password` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255),
   `id_role` INT,
   `created_at` DATETIME,
   `updated_at` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `types` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(90) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `brands` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `colors` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `product_user` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `id_user` INT NOT NULL,
   `id_product` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `order` (
   `id` INT NOT NULL,
   `id_user` INT NOT NULL,
   `total_price` DECIMAL NOT NULL,
   `date_of_order` DATETIME NOT NULL,
   `created_at` DATETIME NOT NULL,
   `updated_at` DATETIME NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `product_order` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `id_product` INT NOT NULL,
   `id_order` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(10) NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_260dcdff-ce6f-4b6b-91e3-e1a127ceb421` FOREIGN KEY (`id_color`) REFERENCES `colors`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_84856527-a566-454f-8780-d43d3496b437` FOREIGN KEY (`id_type`) REFERENCES `types`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_3d45fde2-5a04-4c24-a235-1237c595d0d1` FOREIGN KEY (`id_brand`) REFERENCES `brands`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_e02968fe-fd8e-493c-9d39-239f9418659d` FOREIGN KEY (`id_role`) REFERENCES `role`(`id`)  ;

ALTER TABLE `product_user` ADD CONSTRAINT `FK_ec9ff8ac-8e0d-411a-b889-5c2021f9506b` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`)  ;

ALTER TABLE `product_user` ADD CONSTRAINT `FK_b9b298ac-b4d6-4fdf-8efa-27325bb345c0` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`)  ;

ALTER TABLE `order` ADD CONSTRAINT `FK_c8321e35-54ad-4399-a38f-7f6098a9604b` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`)  ;

ALTER TABLE `product_order` ADD CONSTRAINT `FK_f930d9ea-cc44-425d-ae22-c8bc674b0ecd` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`)  ;

ALTER TABLE `product_order` ADD CONSTRAINT `FK_a84f77aa-132e-4c94-9f8e-f879a844ca6a` FOREIGN KEY (`id_order`) REFERENCES `order`(`id`)  ;