CREATE DATABASE recipes_db;

USE recipes_db;

CREATE TABLE users (
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
username VARCHAR(20) NOT NULL,
password CHAR(60) NOT NULL,
fullName VARCHAR(60) NOT NULL,
PRIMARY KEY (id),
INDEX id_UNIQUE (id ASC),
INDEX username_UNIQUE (username ASC)
);

CREATE TABLE recipe (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_name VARCHAR(50) NOT NULL,
    diet VARCHAR(50) NOT NULL,
    ingredient VARCHAR(50) NOT NULL,
    total_time INT NOT NULL,
    primary key (id)
);