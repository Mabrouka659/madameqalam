-- supprimer la base de données si elle existe 
-- ATTENTION uniquement en dévelopement 
DROP DATABASE IF EXISTS madameqalam_test
;

-- créer de base de données
CREATE DATABASE madameqalam_test
;
-- USE madameqalam_test
;

-- créer les tables
-- commence par les tables qui n'ayant pas de clés étrangéres
CREATE TABLE madameqalam_test
.role(
    id TINYINT(1) UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE madameqalam_test.user(
    id SMALLINT UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR (150) NOT NULL,
    role_id TINYINT(1) UNSIGNED ,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE madameqalam_test.workshop(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT  NOT NULL,
    price DECIMAL(5,2) NOT NULL
);

CREATE TABLE madameqalam_test.booking(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    -- verifier avec laurent 
    datetime  DATETIME  NOT NULL,
    address  VARCHAR(150) NOT NULL,
    user_id SMALLINT UNSIGNED ,
    FOREIGN KEY (user_id) REFERENCES user(id),
    workshop_id SMALLINT UNSIGNED,
    FOREIGN KEY (workshop_id) REFERENCES workshop(id)
);

CREATE TABLE madameqalam_test.category(
     id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE madameqalam_test.artwork(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(5,2) NOT NULL,
    category_id TINYINT(1) UNSIGNED ,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE madameqalam_test.image(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(255) NOT NULL,
    artwork_id SMALLINT UNSIGNED,
    FOREIGN KEY (artwork_id) REFERENCES artwork(id)
);


 -- créer des enregistrements
 -- commencer les tables n'ayants pas de clés étrangéres 

 INSERT INTO madameqalam_test.role
 VaLUES
 -- pour le PK , utiliser NULL pour l'auto-incrémentation
    (NULL,'admin'),
    (NULL,'user')
    ;

    INSERT INTO madameqalam_test.category
VaLUES
( NULL, 'portrait'),
(NULL,  'gourde '),
(NULL,'carte postale')
;

INSERT INTO madameqalam_test.workshop
VaLUES
  (NULL,'association culturel','prestation de fete du quartier ', 400  ),
  (  NULL , 'mairie ' ,'journe culturel', 600),
  (NULL,'ecole primaire','initiation du calligraphie arabe',300)
  ;

-- mdp : admin / user1 / user2
INSERT INTO madameqalam_test.user
VaLUES
  (NULL,'ali','rabi','0796875021' ,'rabiali@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$VXJjdThPWHdxMG95M1pZeg$mJsRWsXCfXiBYp5Ho6fP6A' ,1 ),
  (NULL,'ines','chouchen','0648503920','ineschouchen@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$VXJjdThPWHdxMG95M1pZeg$pL9rIcBRn/3KgmopVffBEQ',2),
  (NULL,'meriem','dren','0739452612','drenmeriem@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$VXJjdThPWHdxMG95M1pZeg$tFRqh7v4FfKDdaA3hdxCrA',2)
;


INSERT INTO madameqalam_test.artwork
VaLUES
( NULL, 'amour', 'mour en calligraphie arabe artistique ', 100, 1),
( NULL, 'espoir','crèation artistique du lettre',100, 1),
( NULL, 'la joie','la joie du lettre en calligraphie arabe',150, 2),
( NULL, 'fleur','creation du fleur en calligraphie artistique', 200, 2),
( NULL, 'coeur ','creation du coeur avec le mots amour ',200, 2),
( NULL, 'pigeon','creation du pigeon avec le mots liberte',150, 2),
( NULL, 'Hind','prenom hind en calligraphie', 60, 3)
;

INSERT INTO madameqalam_test.image
VaLUES
(NULL, 'amour.jpg ',1),
(NULL,'espoir.jpg',2 ),
(NULL,'coeur.jpg',2),
(NULL,'Hind.jpg',3),
(NULL,'la joie.jpg',3),
(NULL,'fleur.jpg',3),
(NULL,'pigeon.jpg',4),
(NULL, 'amour.jpg ',5),
(NULL,'espoir.jpg',5 ),
(NULL,'coeur.jpg',6),
(NULL,'Hind.jpg',6),
(NULL,'la joie.jpg',6),
(NULL,'fleur.jpg',7)
;



INSERT INTO madameqalam_test.booking
VaLUES
(NULL,'2024-06-12 14:00:00', '16 rue brancion 75015 paris',2,1),
(NULL,'2025-09-10 09:00:00','45 rue alfred choquet 93150 le blanc menil ',2,1),
(NULL,'2025-03-12 12:00:00','3 avenue de carnot 93140 bondy',1,3)
;


-- -- modifier des enregistrements
-- UPDATE madameqalam_test.user
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