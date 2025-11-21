-- Data Manipulation Queries
-- Group 123: Alexander Birrell and Eason Hamden
-- 11/19/2025

-- ----------------------------
-- SELECT
-- ----------------------------
-- Get all customers
SELECT * FROM Customers;

-- Get all products
SELECT * FROM Products;

-- Get all stores
SELECT * FROM Stores;

-- Get all discount codes
SELECT * FROM DiscountCodes;

-- Get all sales along with details on products purchased 
SELECT * FROM Sales
INNER JOIN SalesProducts
ON Sales.sale_id = SalesProducts.sale_id
INNER JOIN Products
ON SalesProducts.product_id = Products.product_id;

-- Get all products available at a store
SELECT * FROM StoresProducts
INNER JOIN Products 
ON StoresProducts.product_id = Products.product_id;

-- Get all items purchased in a sale
SELECT * FROM SalesProducts
INNER JOIN Products 
ON SalesProducts.product_id = Products.product_id;


-- ----------------------------
-- INSERT
-- ----------------------------
-- Add new customer
INSERT INTO Customers (first_name, last_name, email, phone_number, registration_date)
VALUES (@first_name_input, @last_name_input, @email_input, @phone_number_input, @registration_date_input);

-- Add new product
INSERT INTO Products (name, price)
VALUES (@name_input, @price_input);

-- Add new store
INSERT INTO Stores (street, city, state, zip_code, phone_number, employee_count)
VALUES (@street_input, @city_input, @state_input, @zip_code_input, @phone_number_input, @employee_count_input);

-- Add new discount code
INSERT INTO DiscountCodes (code, discount_amount, description, expiration_date)
VALUES (@code_input, @discount_amount_input, @description_input, @expiration_date_input);

-- Add new sale
-- Fixed column name: discount_count_id -> discount_code_id
INSERT INTO Sales (store_id, customer_id, discount_code_id, sale_date, payment_method, total_amount_paid)
VALUES (@store_id_input, @customer_id_input, @discount_code_id_input, @sale_date_input, @payment_method_input, @total_amount_paid_input);

-- Add new product to a store
INSERT INTO StoresProducts (store_id, product_id, quantity)
VALUES (@store_id_input, @product_id_input, @quantity_input);

-- Add new product to a sale
INSERT INTO SalesProducts (sale_id, product_id, quantity)
VALUES (@sale_id_input, @product_id_input, @quantity_input);


-- ----------------------------
-- DELETE
-- ----------------------------
-- Delete customer
DELETE FROM Customers 
WHERE first_name = @first_name_input AND last_name = @last_name_input;

-- Delete product
DELETE FROM Products
WHERE name = @name_input;

-- Delete store
DELETE FROM Stores
WHERE store_id = @store_id_input;

-- Delete discount code 
DELETE FROM DiscountCodes
WHERE code = @code_input;

-- Delete a sale
DELETE FROM Sales
WHERE sale_id = @sale_id_input;

-- Delete product from a store
DELETE from StoresProducts
WHERE store_product_id = @store_product_id_input;

-- Delete product from a sale
DELETE from SalesProducts
WHERE sale_product_id = @sale_product_id_input;


-- ----------------------------
-- UPDATE
-- ----------------------------
-- Update customer
UPDATE Customers
SET first_name = @first_name_input, last_name = @last_name_input, 
    email = @email_input, phone_number = @phone_number_input, registration_date = @registration_date_input
WHERE customer_id = @customer_id_input;

-- Update product
UPDATE Products
SET name = @name_input, price = @price_input
WHERE product_id = @product_id_input;

-- Update store
UPDATE Stores
SET street = @street_input, city = @city_input, state = @state_input, zip_code = @zip_code_input, 
    phone_number = @phone_number_input, employee_count = @employee_count_input
WHERE store_id = @store_id_input;

-- Update discount code
-- Fixed syntax error (removed extra comma after description)
UPDATE DiscountCodes
SET code = @code_input, discount_amount = @discount_amount_input, description = @description_input
WHERE discount_code_id = @discount_code_id_input;

-- Update sale
-- Fixed column name: discount_count_id -> discount_code_id
UPDATE Sales
SET store_id = @store_id_input, customer_id = @customer_id_input, discount_code_id = @discount_code_id_input, 
    sale_date = @sale_date_input, payment_method = @payment_method_input, total_amount_paid = @total_amount_paid_input
WHERE sale_id = @sale_id_input;

-- Update product at a store
UPDATE StoresProducts
SET store_id = @store_id_input, product_id = @product_id_input, quantity = @quantity_input
WHERE store_product_id = @store_product_id_input;

-- Update product for a sale
UPDATE SalesProducts
SET sale_id = @sale_id_input, product_id = @product_id_input, quantity = @quantity_input
WHERE sale_product_id = @sale_product_id_input;