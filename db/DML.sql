-- Alexander Birrell and Eason Hamden
-- 12/8/2025

-- Citations:
-- - Based on bsg_sample_data_manipulation_queries.sql provided in Project Step 3 Draft assignment
--   URL: https://canvas.oregonstate.edu/courses/2017561/assignments/10111739?
-- - Referenced code from CS340 Exploration Database Application Design
--   URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-database-application-design?

-- ----------------------------------------------------------------------------
-- INSERT
-- ----------------------------------------------------------------------------
INSERT INTO Customers (first_name, last_name, email, phone_number, registration_date)
VALUES (p_first_name, p_last_name, p_email, p_phone_number, p_registration_date);
SELECT LAST_INSERT_ID() AS customer_id;

INSERT INTO Stores (name, street, city, state, zip_code, phone_number, employee_count)
VALUES (p_name, p_street, p_city, p_state, p_zip_code, p_phone_number, p_employee_count);
SELECT LAST_INSERT_ID() AS store_id;

INSERT INTO Products (name, price)
VALUES (p_name, p_price);
SELECT LAST_INSERT_ID() AS product_id;

INSERT INTO DiscountCodes (code, discount_amount, description, expiration_date)
VALUES (p_code, p_discount_amount, p_description, p_expiration_date);
SELECT LAST_INSERT_ID() AS discount_code_id;

INSERT INTO Sales (store_id, customer_id, discount_code_id, sale_date, payment_method, total_amount_paid)
VALUES (p_store_id, p_customer_id, p_discount_code_id, p_sale_date, p_payment_method, p_total_amount_paid);
SELECT LAST_INSERT_ID() AS sale_id;

INSERT INTO StoresProducts (store_id, product_id, quantity)
VALUES (p_store_id, p_product_id, p_quantity);
SELECT LAST_INSERT_ID() AS store_product_id;

INSERT INTO SalesProducts (sale_id, product_id, quantity)
VALUES (p_sale_id, p_product_id, p_quantity);
SELECT LAST_INSERT_ID() AS sale_product_id;

-- ----------------------------------------------------------------------------
-- UPDATE
-- ----------------------------------------------------------------------------
UPDATE Customers 
SET first_name = p_first_name, last_name = p_last_name, email = p_email,
    phone_number = p_phone_number, registration_date = p_registration_date 
WHERE customer_id = p_customer_id;

UPDATE Stores
SET name = p_name, street = p_street, city = p_city, state = p_state, zipcode = p_zipcode, 
           phone_number = p_phone_number, employee_count = p_employee_count
WHERE store_id = p_store_id;

UPDATE Products
SET name = p_name, price = p_price
WHERE product_id = p_product_id;

UPDATE DiscountCodes
SET code = p_code, discount_amount = p_discount_amount, description = p_description,
    expiration_date = p_expiration_date
WHERE discount_code_id = p_discount_code_id;

UPDATE Sales
SET store_id = p_store_id, customer_id = p_customer_id, discount_code_id = p_discount_code_id, 
    sale_date = p_sale_date, payment_method = p_payment_method, total_amount_paid = p_total_amount_paid
WHERE sale_id = p_sale_id;

UPDATE StoresProducts
SET store_id = p_store_id, product_id = p_product_id, quantity = p_quantity
WHERE store_product_id = p_store_product_id;

UPDATE SalesProducts
SET sale_id = p_sale_id, product_id = p_product_id, quantity = p_quantity
WHERE sale_product_id = p_sale_product_id;

-- ----------------------------------------------------------------------------
-- DELETE
-- ----------------------------------------------------------------------------
DELETE FROM Customers 
WHERE customer_id = p_customer_id;

DELETE FROM Stores
WHERE store_id = p_store_id;

DELETE FROM Products
WHERE product_id = p_product_id;

DELETE FROM DiscountCodes
WHERE discount_code_id = p_discount_code_id;

DELETE FROM Sales
WHERE sale_id = p_sale_id;

DELETE FROM StoresProducts
WHERE store_product_id = p_store_product_id;

DELETE FROM SalesProducts
WHERE sale_product_id = p_sale_product_id;