-- Alexander Birrell and Eason Hamden
-- 12/8/2025

-- Citations:
-- - Based on bsg_sample_data_manipulation_queries.sql provided in Project Step 3 Draft assignment
--   URL: https://canvas.oregonstate.edu/courses/2017561/assignments/10111739?
-- - Referenced code from CS340 Exploration Database Application Design
--   URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-database-application-design?

DELIMITER //
DROP PROCEDURE IF EXISTS sp_insert_mock_data;
CREATE PROCEDURE sp_insert_mock_data()
BEGIN
    INSERT INTO Customers (first_name, last_name, email, phone_number, registration_date)
    VALUES ('Ash', 'Ketchum', 'aketchum@nintendo.com', '9994331812', '2020-01-15'),
           ('Satoshi', 'Tajiri', 'satoshi@gamefreak.com', '4245552100', '1996-10-22'),
           ('Freddy', 'Cantketchum', 'fc1998@gmail.com', '3238869219', '2021-04-02');

    INSERT INTO Stores (name, street, city, state, zip_code, phone_number, employee_count)
    VALUES ('PokeMart Bend', '865 8th St.', 'Bend', 'Oregon', 97702, '5148504465', 4),
           ('PokeMart SF', '1002 Harvey Ave.', 'San Francisco', 'California', 94493, '2345567059', 7),
           ('PokeMart LA', '40961 Sunset Blvd.', 'Los Angeles', 'California', 90049, '3238097121', 5);

    INSERT INTO Products (name, price)
    VALUES ('Pokemon TCG: Mega Venusaur ex Premium Collection', 39.99),
           ('Pokemon TCG: Mega Evolution Booster Bundle', 64.99),
           ('Pokemon Legends: Z-A', 59.99), 
           ('Pokemon 24" Plush - Gengar', 49.99);

    INSERT INTO DiscountCodes (code, discount_amount, description, expiration_date)
    VALUES ('CHARIZARD30', .30, 'Get 30% off $100 or more.', '2025-10-30'),
           ('BLACKFRIDAY20', .20, 'Get 20% off on any purchase during Black Friday.', '2025-11-28'),
           ('TEAMROCKET10', .10, 'Get 10% off purchase for any trading card pack.', '2025-12-30');

    INSERT INTO Sales (store_id, customer_id, discount_code_id, sale_date, payment_method, total_amount_paid)
    VALUES (1, 2, NULL, '2025-10-30', 'Card', 142.97),
           (1, 3, 2, '2025-10-29', 'Cash', 98.97),
           (3, 1, 1, '2025-10-29', 'Card', 81.92);

    INSERT INTO StoresProducts (store_id, product_id, quantity)
    VALUES (1, 1, 58),
           (1, 2, 1), 
           (2, 2, 20),
           (3, 2, 18), 
           (3, 3, 12);

    INSERT INTO SalesProducts (sale_id, product_id, quantity)
    VALUES (1, 2, 2),
           (2, 1, 1),
           (2, 4, 1);
END //
DELIMITER ;

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