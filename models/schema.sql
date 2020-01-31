CREATE DATABASE if not exists recipes_db;

USE recipes_db;

CREATE TABLE user_profile (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    bmr INT NOT NULL,
    user_weight INT NOT NULL,
    user_height INT NOT NULL,
    user_age INT NOT NULL,
    user_sex VARCHAR(1) NOT NULL,
    primary key (id)
);

CREATE TABLE recipe (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_name VARCHAR(50) NOT NULL,
    diet VARCHAR(50) NOT NULL,
    ingredient VARCHAR(50) NOT NULL,
    total_time INT NOT NULL,
    primary key (id)
);

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
)
