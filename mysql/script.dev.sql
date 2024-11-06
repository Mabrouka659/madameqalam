-- supprimer la base de données si elle existe 
-- ATTENTION uniquement en dévelopement 
DROP DATABASE IF EXISTS madameqalam_dev;

-- créer de base de données
CREATE DATABASE madameqalam_dev;

-- créer les tables
-- commence par les tables qui n'ayant pas de clés étrangéres
CREATE TABLE madameqalam_dev.role(
    id TINYINT(1) UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE madameqalam_dev.Benefit(
    id SMALLINT UNSIGNED  UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(5,2) NOt NULL

);


CREATE TABLE madameqalam_dev.category(
     id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE madameqalam_dev.user(
    id SMALLINT UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    role_id TINYINT(1) UNSIGNED ,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE madameqalam_dev.artwork(
    id TINYINT(2)  UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    description TEXT,
    category_id TINYINT(1) UNSIGNED ,
    FOREIGN KEY (category_id) REFERENCES category(id)
);


CREATE TABLE madameqalam_dev.images(
    id  TINYINT(2) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    artwork_id TINYINT(2) UNSIGNED,
    FOREIGN KEY (artwork_id) REFERENCES artwork(id)
);

CREATE TABLE madameqalam_dev.orders(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    price DECIMAL(5,2)  NOT NULL,
    date DATE  NOT NULL,
    comment TEXT(150),
    user_id SMALLINT UNSIGNED ,
    FOREIGN KEY (user_id) REFERENCES user(id),
    artwork_id TINYINT(2) UNSIGNED,
    FOREIGN KEY (artwork_id) REFERENCES artwork(id)
);


CREATE TABLE madameqalam_dev.order_detail(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    quantity SMALLINT(3) NOT NULL,
    order_id SMALLINT UNSIGNED ,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);



 -- créer des enregistrements
 -- commencer les tables n'ayants pas de clés étrangéres 

 INSERT INTO madameqalam_dev.role
 VaLUES
 -- pour le PK , utiliser NULL pour l'auto-incrémentation
    (NULL,'admin'),
    (NULL,'user'),
    (NULL, 'user'),
    (NULL,'user')
    
    ;

INSERT INTO madameqalam_dev.user
VaLUES
  (NULL,'ali ' ,'rabi' ,'rabiali@gmail.com',1 ),
  (NULL,'ines','chouchen','ineschouchen@gmail.com',2),
  (NULL,'meriem','dren','drenmeriem@gmail.com',3)
;
INSERT INTO madameqalam_dev.Benefit
VaLUES
  (NULL,'association culturel','prestation de fete du quartier '  ,'atelier artistique ', 40  ),
  (  NULL , 'mairie ' ,'jours culturel','atelier inisation'  ,                      4     )
  ;

INSERT INTO madameqalam_dev.category
VaLUES
( NULL, 'portrait'),
(NULL,  'gourde '),
(NULL,'carte postale')
;

INSERT INTO madameqalam_dev.user
VaLUES 
( NULL,'manel','achour', 'achourmanel@gmail.com',2),
(NULL,'Amle','jaray','ameljary@gmail.com',2);

INSERT INTO madameqalam_dev.artwork
VaLUES
( NULL, 'artwork1', 10, 'desc1', 1),
( NULL, 'artwork2', 20, 'desc2', 1),
( NULL, 'artwork3', 30, 'desc3', 2),
( NULL, 'artwork4', 40, 'desc4', 2),
( NULL, 'artwork5', 50, 'desc5', 2),
( NULL, 'artwork6', 60, 'desc6', 3)
;
INSERT INTO madameqalam_dev.images
VaLUES
(NULL, 'amour ',2),
(NULL,'espoir',1 )
;



INSERT INTO madameqalam_dev.orders
VaLUES
(NULL, 20 , '2024-06-12', 'personnalise en rouge',2,1),
(NULL,15,'2025-09-10','fait en rouge ',2,1)
;
-- -- modifier des enregistrements
-- UPDATE madameqalam_dev.user
-- -- SET permet de cible les colonnes à mettre à jour, et leur affecter une nouvelle valeur 
-- SET 
--   user.firstname = 'hind'
-- -- WHERE permet de créer une condition ,cibler une colonne et une valeur 

-- WHERE
-- user.id = 1
-- ;

-- -- supprimer un enregistrement 
--  DELETE FROM 
--  WHERE
--  ;