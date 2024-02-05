-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

-- Switch to the newly created database

USE ecommerce_db;

-- establish the category table structure

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Dedicate the product table schema

CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 10,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Set up the tag table structure

CREATE TABLE tag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255)
);

-- Formulate the product tag table layout
CREATE TABLE productTag (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  tag_id INT,
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (tag_id) REFERENCES tag(id)
);