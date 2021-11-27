-- INSERTS --

INSERT INTO role (id, name)
VALUES (1, 'admin'),
(2, 'user'),
(3, 'guest');

INSERT INTO users (id, name, username, email, password, id_role)
VALUES (1, 'Mathias Marques', 'mathimarques','asdasd@asas.com.ar', '1234', 1), 
(2, 'Santiago Vitali', 'santivit','asdasd@asas.com.ar', '1234', 1),
(3, 'Santiago Vazquez Bare', 'santivb','asdasd@asas.com.ar', '1234', 1),
(4, 'Antonio Santafe', 'toni','asdasd@asas.com.ar', '1234', 1),
(5, 'Usuario 1', 'user1','asdasd@asas.com.ar', '1234', 2),
(6, 'Invitado 1', 'guest1','asdasd@asas.com.ar', '1234', 3);

INSERT INTO types (id, name)
VALUES (1, 'Piano'),
(2, 'Bateria'),
(3, 'Violin'),
(4, 'Guitarra'),
(5, 'Bajo');

INSERT INTO brands (id, name)
VALUES(1, 'Casio'),
(2, 'Fender'),
(3, 'Pearl'),
(4, 'Stradella'),
(5, 'Marshall');

INSERT INTO colors(id, name)
VALUES(1, 'Negro'),
(2, 'Rojo'),
(3, 'Azul'),
(4, 'Marron'),
(5, 'Blanco');

INSERT INTO product_user(id, id_user, id_product)
VALUES(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

INSERT INTO products (id, model, id_type, price, id_brand, id_color, description, image, stock)
VALUES (1, 'ABC123', 1, 50000, 1, 1, 'DESCRIPCION 1', 'piano.png', 5),
(2, 'CBA321', 2, 150000, 3, 1, 'DESCRIPCION 2', 'bateria.png', 3),
(3, 'MAS555', 3, 30000, 4, 2, 'DESCRIPCION 3', 'violin.png', 2),
(4, 'XBN841', 4, 170000, 2, 5, 'DESCRIPCION 4', 'guitarra.png' 1),
(5, 'WSX359', 5, 120000, 2, 4, 'DESCRIPCION 5', 'bajo.png' ,4);