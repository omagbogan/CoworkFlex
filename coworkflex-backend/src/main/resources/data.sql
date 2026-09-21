INSERT INTO spaces (name, city, capacity, description) 
VALUES ('Espace Central', 'Paris', 20, 'Un bel espace de coworking au coeur de Paris');

INSERT INTO spaces (name, city, capacity, description) 
VALUES ('CoWork Plateau', 'Lyon', 15, 'Espace moderne au coeur de Lyon');

INSERT INTO spaces (name, city, capacity, description) 
VALUES ('Le Hub', 'Marseille', 30, 'Grand espace collaboratif face a la mer');

INSERT INTO spaces (name, city, capacity, description) 
VALUES ('StartUp Corner', 'Bordeaux', 10, 'Espace dedie aux entrepreneurs');

INSERT INTO desks (type, price, space_id) VALUES ('OPEN_SPACE', 15.0, 1);
INSERT INTO desks (type, price, space_id) VALUES ('BUREAU_PRIVE', 35.0, 1);
INSERT INTO desks (type, price, space_id) VALUES ('SALLE_REUNION', 50.0, 1);
INSERT INTO desks (type, price, space_id) VALUES ('OPEN_SPACE', 12.0, 2);
INSERT INTO desks (type, price, space_id) VALUES ('BUREAU_PRIVE', 30.0, 2);
INSERT INTO desks (type, price, space_id) VALUES ('SALLE_REUNION', 45.0, 3);
INSERT INTO desks (type, price, space_id) VALUES ('OPEN_SPACE', 10.0, 4);