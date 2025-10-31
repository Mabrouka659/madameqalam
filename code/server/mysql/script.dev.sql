-- supprimer la base de données si elle existe 
-- ATTENTION uniquement en dévelopement 
DROP DATABASE IF EXISTS madameqalam_dev;

-- créer de base de données
CREATE DATABASE madameqalam_dev;
-- USE madameqalam_dev;

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
    password VARCHAR (150) NOT NULL,
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
(NULL,'carte postale'),
(NULL, 'mug'),
(NULL, 'Totebag'),
(NULL, 'Trouse')
;

INSERT INTO madameqalam_dev.workshop
VaLUES
  (NULL,'association culturel','prestation de fete du quartier ', 400  ),
  (  NULL , 'mairie ' ,'journe culturel', 600),
  (NULL,'ecole primaire','initiation du calligraphie arabe',300)
  ;

-- mdp : admin / user1 / user2
INSERT INTO madameqalam_dev.user
VaLUES
  (NULL,'ali','rabi','0796875021' ,'rabiali@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$VXJjdThPWHdxMG95M1pZeg$mJsRWsXCfXiBYp5Ho6fP6A' ,1 ),
  (NULL,'ines','chouchen','0648503920','ineschouchen@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$VXJjdThPWHdxMG95M1pZeg$pL9rIcBRn/3KgmopVffBEQ',2),
  (NULL,'meriem','dren','0739452612','drenmeriem@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$VXJjdThPWHdxMG95M1pZeg$tFRqh7v4FfKDdaA3hdxCrA',2)
;


INSERT INTO madameqalam_dev.artwork
VaLUES
( NULL, '3chek','amour en calligraphie arabe artistique ', 100, 3),
( NULL, 'adadportrait','adad en calligraphie arabe artistique ',100, 1),
( NULL, 'droit de femmes','portrait des femmes en calligraphie arabe artistique ',100, 1),
( NULL, 'droit de femmes1','portrait des femmes en calligraphie arabe artistique ',100, 1),
( NULL, 'djamilaportrait','djamila en calligraphie arabe artistique',150, 1),
( NULL, 'angel davisportrait','angel davis en calligraphie arabe artistique', 200, 1),
( NULL, 'adelgourde','adel en calligraphie arabe artistique sur une gourde ',200, 2),
( NULL, 'rosaparksgourde','rosaparks en calligraphie arabe artistique sur une gourde ',150, 2),
( NULL, 'adelMugblanc','adel en calligraphie arabe artistique sur une mug blanc ',150, 4),
( NULL, 'adelMugnoir','adel en calligraphie arabe artistique sur une mug noir ',150, 4),
( NULL, 'adelMugrouge','adel en calligraphie arabe artistique sur une mug rouge ',150, 4),
( NULL, 'Mug calligraphie ','femmes célèbres en calligraphie arabe artistique sur des mugs ',150, 4),
( NULL, 'Totebag ','Totebag en calligraphie arabe artistique',150, 5),
( NULL, 'Trouse','Trouse creer avec des femmes célèbres en calligraphie arabe artistique ',150, 6)
;

INSERT INTO madameqalam_dev.image
VaLUES
(NULL, '3chek.jpg ',3),
(NULL,'adadportrait.jpg',1),
(NULL,'droit de femmes.jpg',1),
(NULL,'droit de femmes1.jpg',1),
(NULL,'djamilaportrait.jpg', 1),
(NULL,'angel davisportrait.jpg',1),
(NULL,'adelgourde.jpg',2),
(NULL, 'rosaparksgourde.jpg ',2),
(NULL,'adelMugblanc.jpg',4),
(NULL,'adelMugnoir.jpg',4),
(NULL,'adelMugrouge.jpg',4),
(NULL,'Mug calligraphie.jpg',4),
(NULL,'Totebagg .jpg',5),

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