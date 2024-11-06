-- -- sélectionner des enregistrments 
-- -- choisir les colonnes 
-- -- *sélection de toutes les colonnes 
-- SELECT 
--    -- user.*
--    role.firstname, role.lastname , role.role 

-- FROM   
--     madameqalam_dev.role
    -- WHERE permet de créer une condition pour récupérer des enregistrements
-- WHERE
 -- role.id = 1

--   role.name--
  
  -- sélectionner les nom et prénom des personnes dont l'école est 1
--   SELECT
--      role.name

--    FROM
--    madameqalam_dev.role 

--    WHERE
--     role.id = 1
;
-- jointure : sélectionner des données présentes dans plusieurs tables en tables en utilisant les relations
--  SELECT
--    role.*
--  FROM
--  madameqalam_dev.role

--  -- JOIN /INNER JOIN permet de cibler une table en relation

--  JOIN
--    madameqalam_dev.role
--    -- ON permet de relier une clé étrangére à une clé primaire 
--    ON

--  ;

-- sélectionner toutes les informations des utilisateurs et le nom de leur rôle

-- SELECT
--   user.* ,
--   role.name

--   FROM
--   madameqalam_dev.user
--   JOIN
 
--  madameqalam_dev.role

--  ON
--  role.id = user.role_id;

-- sélectionner le nom de l'oeuvre et le nom de sa catégorie
-- SELECT
-- artwork.name,
-- category.name

-- FROM
-- madameqalam_dev.artwork

-- JOIN
-- madameqalam_dev.category

-- ON
-- category.id = artwork.category_id

-- ;


--  SELECT 
--  artwork.lastname,
--  artwork.id,
--  user.name
--  FROM
--  madameqalam_dev.artwork
--  JOIN
-- madameqalam_dev.user
--  JOIN 
-- madameqalam_dev.artwork.
--  AND 

--  WHERE
 
--  ;



-- jointure avec une table de jointure
-- selectionne tous les colonnées de orders
SELECT
 orders.*,
 user.*,
 role.name
 FROM
 madameqalam_dev.orders
 JOIN
 madameqalam_dev.user
 ON
 orders.user_id = user.id
JOIN
madameqalam_dev.role
ON
user.role_id = role.id

 ;
