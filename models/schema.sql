CREATE DATABASE recipes_db;

USE recipes_db;

CREATE TABLE user_profile (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    bmr INT NOT NULL,
    user_weight INT NOT NULL,
    user_height INT NOT NULL,
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
