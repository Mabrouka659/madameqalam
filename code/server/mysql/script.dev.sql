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

CREATE TABLE madameqalam_dev.user(
    id SMALLINT UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    role_id TINYINT(1) UNSIGNED ,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE madameqalam_dev.workshop(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT  NOT NULL,
    price DECIMAL(5,2) NOT NULL
);

CREATE TABLE madameqalam_dev.booking(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    -- verifier avec laurent 
    datetime  DATETIME  NOT NULL,
    address  VARCHAR(150) NOT NULL,
    user_id SMALLINT UNSIGNED ,
    FOREIGN KEY (user_id) REFERENCES user(id),
    workshop_id SMALLINT UNSIGNED,
    FOREIGN KEY (workshop_id) REFERENCES workshop(id)
);

CREATE TABLE madameqalam_dev.category(
     id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE madameqalam_dev.artwork(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(5,2) NOT NULL,
    category_id TINYINT(1) UNSIGNED ,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE madameqalam_dev.image(
    id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(255) NOT NULL,
    artwork_id SMALLINT UNSIGNED,
    FOREIGN KEY (artwork_id) REFERENCES artwork(id)
);


 -- créer des enregistrements
 -- commencer les tables n'ayants pas de clés étrangéres 

 INSERT INTO madameqalam_dev.role
 VaLUES
 -- pour le PK , utiliser NULL pour l'auto-incrémentation
    (NULL,'admin'),
    (NULL,'user')
    ;

    INSERT INTO madameqalam_dev.category
VaLUES
( NULL, 'portrait'),
(NULL,  'gourde '),
(NULL,'carte postale')
;

INSERT INTO madameqalam_dev.workshop
VaLUES
  (NULL,'association culturel','prestation de fete du quartier ', 400  ),
  (  NULL , 'mairie ' ,'journe culturel', 600),
  (NULL,'ecole primaire','initiation du calligraphie arabe',300)
  ;

INSERT INTO madameqalam_dev.user
VaLUES
  (NULL,'ali ','rabi','0796875021' ,'rabiali@gmail.com',1 ),
  (NULL,'ines','chouchen','0648503920','ineschouchen@gmail.com',2),
  (NULL,'meriem','dren','0739452612','drenmeriem@gmail.com',2)
;




INSERT INTO madameqalam_dev.artwork
VaLUES
( NULL, 'amour', 'mour en calligraphie arabe artistique ', 100, 1),
( NULL, 'espoir','crèation artistique du lettre',100, 1),
( NULL, 'la joie','la joie du lettre en calligraphie arabe',150, 2),
( NULL, 'fleur','creation du fleur en calligraphie artistique', 200, 2),
( NULL, 'coeur ','creation du coeur avec le mots amour ',200, 2),
( NULL, 'pigeon','creation du pigeon avec le mots liberte',150, 2),
( NULL, 'Hind','prenom hind en calligraphie', 60, 3)
;

INSERT INTO madameqalam_dev.image
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



INSERT INTO madameqalam_dev.booking
VaLUES
(NULL,'2024-06-12 14:00:00', '16 rue brancion 75015 paris',2,1),
(NULL,'2025-09-10 09:00:00','45 rue alfred choquet 93150 le blanc menil ',2,1),
(NULL,'2025-03-12 12:00:00','3 avenue de carnot 93140 bondy',1,3)
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