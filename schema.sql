DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT(10) default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Socks", "Clothing & Apparel", 2.00, 100), 
("Crock Pot", "Home & Kitchen", 50.00, 50), 
("Pillows", "Home & Kitchen", 75.00, 200), 
("Digital Camera", "Electronics", 20.00, 100), 
("Water Bottle", "Sports & Outdoors", 14.00, 500), 
("Blender", "Home & Kitchen", 30.00, 100), 
("Vacuum", "Home & Kitchen", 90.00, 100), 
("Drill", "Tools & Home Improvement", 55.00, 50), 
("Desk Chair", "Furniture", 53.00, 75), 
("Television", "Electronics", 700.00, 1000), 
("Camping Tent", "Sports & Outdoors", 45.00, 25),
("Charcoal Grill", "Garden & Outdoor", 100.00, 100);

SELECT * FROM products;