
## Tables
##pass Chris4589

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO role (role) VALUES ('ROLE_ADMIN');
INSERT INTO role (role) VALUES ('ROLE_USER');

CREATE TABLE user (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    roleId INT NOT NULL,
    correo VARCHAR(125) NOT NULL UNIQUE,
    name VARCHAR(125) NOT NULL,
    password VARCHAR(125) NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    FOREIGN KEY (roleId)
        REFERENCES role(id)
        ON DELETE CASCADE
);

INSERT INTO user (roleId, correo, name, password, token) 
VALUES 
(1, 'chris.syst3@gmail.com', 'Christopher', '$2b$10$/fk8wMyNbo6uaIQFXIRDKu/TyVKfymk9RGBK8iwULZLHtpe2xH.dq', '$2b$10$/fk8wMyNbo6uaIQFXIRDKuNmMXt9vyAPlKeHOTOvStVJQz1Adi4eK');

CREATE TABLE about (
    aboutId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    isActive BIT(7) NOT NULL,
    title VARCHAR(125) NOT NULL,
    description VARCHAR(225) NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES user(userId)
        ON DELETE CASCADE
);

CREATE TABLE workTeam (
    groupId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    fullName VARCHAR(125) NOT NULL,
    photo VARCHAR(225) NOT NULL,
    position VARCHAR(125) NOT NULL,
    description VARCHAR(225) NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES user(userId)
        ON DELETE CASCADE
);

CREATE TABLE proyect (
    proyectId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name_proyect VARCHAR(125) NOT NULL,
    video VARCHAR(225) NOT NULL,
    description VARCHAR(225) NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES user(userId)
        ON DELETE CASCADE
);


CREATE TABLE photos (
    photoId INT AUTO_INCREMENT PRIMARY KEY,
    proyectId INT NOT NULL,
    url VARCHAR(225) NOT NULL,
    FOREIGN KEY (proyectId)
        REFERENCES proyect(proyectId)
        ON DELETE CASCADE
);

CREATE TABLE document (
    documentId INT AUTO_INCREMENT PRIMARY KEY,
    proyectId INT NOT NULL,
    url VARCHAR(225) NOT NULL,
    FOREIGN KEY (proyectId)
        REFERENCES proyect(proyectId)
        ON DELETE CASCADE
);

CREATE TABLE mission (
    missionId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    description VARCHAR(325) NOT NULL,
    isActive  BIT(7) NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES user(userId)
        ON DELETE CASCADE
);

CREATE TABLE vision (
    visionId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    description VARCHAR(325) NOT NULL,
    isActive  BIT(7) NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES user(userId)
        ON DELETE CASCADE
);

CREATE TABLE publication (
    publicationId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    description VARCHAR(325) NOT NULL,
    titleName VARCHAR(50) NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES user(userId)
        ON DELETE CASCADE
);

CREATE TABLE publishPhotos (
    publishPhotosId INT AUTO_INCREMENT PRIMARY KEY,
    publicationId INT NOT NULL,
    description VARCHAR(225) NOT NULL,
    FOREIGN KEY (publicationId)
        REFERENCES publication(publicationId)
        ON DELETE CASCADE
);

#ya hechas todas
