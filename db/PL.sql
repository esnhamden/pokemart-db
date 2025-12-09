-- ----------------------------------------------------------------------------
-- Customers
-- ----------------------------------------------------------------------------
-- SELECT
DROP VIEW IF EXISTS v_customers;
CREATE VIEW v_customers AS
SELECT *
FROM Customers;

-- INSERT
DELIMITER //
DROP PROCEDURE IF EXISTS sp_create_customer;
CREATE PROCEDURE sp_create_customer(
    IN p_first_name VARCHAR(50), 
    IN p_last_name VARCHAR(50), 
    IN p_email VARCHAR(100), 
    IN p_phone_number VARCHAR(20), 
    IN p_registration_date DATE)
BEGIN
    INSERT INTO Customers (first_name, last_name, email, phone_number, registration_date)
    VALUES (p_first_name, p_last_name, p_email, p_phone_number, p_registration_date);
    SELECT LAST_INSERT_ID() AS customer_id;
END //
DELIMITER ;

-- UPDATE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_customer;
CREATE PROCEDURE sp_update_customer(
    IN p_customer_id INT,
    IN p_first_name VARCHAR(50), 
    IN p_last_name VARCHAR(50), 
    IN p_email VARCHAR(100), 
    IN p_phone_number VARCHAR(20), 
    IN p_registration_date DATE)
BEGIN
    UPDATE Customers 
    SET first_name = p_first_name, last_name = p_last_name, email = p_email,
        phone_number = p_phone_number, registration_date = p_registration_date 
    WHERE customer_id = p_customer_id;
END //
DELIMITER ;

-- DELETE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_delete_customer;
CREATE PROCEDURE sp_delete_customer(
    IN p_customer_id INT)
BEGIN  
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
        DELETE FROM Customers 
        WHERE customer_id = p_customer_id;
    COMMIT;
END //
DELIMITER ;


-- ----------------------------------------------------------------------------
-- Stores
-- ----------------------------------------------------------------------------
-- SELECT
DROP VIEW IF EXISTS v_stores;
CREATE VIEW v_stores AS
SELECT *
FROM Stores;

-- INSERT
DELIMITER //
DROP PROCEDURE IF EXISTS sp_create_store;
CREATE PROCEDURE sp_create_store(
    IN p_name VARCHAR(50), 
    IN p_street VARCHAR(100),
    IN p_city VARCHAR(100),
    IN p_state VARCHAR(50),
    IN p_zip_code VARCHAR(20),
    IN p_phone_number VARCHAR(20),
    IN p_employee_count INT)
BEGIN
    INSERT INTO Stores (name, street, city, state, zip_code, phone_number, employee_count)
    VALUES (p_name, p_street, p_city, p_state, p_zip_code, p_phone_number, p_employee_count);
    SELECT LAST_INSERT_ID() AS store_id;
END //
DELIMITER ;

-- UPDATE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_store;
CREATE PROCEDURE sp_update_store(
    IN p_store_id INT,
    IN p_name VARCHAR(50), 
    IN p_street VARCHAR(100),
    IN p_city VARCHAR(100),
    IN p_state VARCHAR(50),
    IN p_zip_code VARCHAR(20),
    IN p_phone_number VARCHAR(20),
    IN p_employee_count INT)
BEGIN
    UPDATE Stores
    SET name = p_name, street = p_street, city = p_city, state = p_state, zipcode = p_zipcode, 
        phone_number = p_phone_number, employee_count = p_employee_count
    WHERE store_id = p_store_id;
END //
DELIMITER ;

-- DELETE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_delete_store;
CREATE PROCEDURE sp_delete_store(
    IN p_store_id INT)
BEGIN  
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
        DELETE FROM Stores
        WHERE store_id = p_store_id;
    COMMIT;
END //
DELIMITER ;


-- ----------------------------------------------------------------------------
-- Products
-- ----------------------------------------------------------------------------
-- SELECT
DROP VIEW IF EXISTS v_products;
CREATE VIEW v_products AS
SELECT *
FROM Products;

-- INSERT
DELIMITER //
DROP PROCEDURE IF EXISTS sp_create_product;
CREATE PROCEDURE sp_create_product(
    IN p_name VARCHAR(100),
    IN p_price DECIMAL(10,2))
BEGIN
    INSERT INTO Products (name, price)
    VALUES (p_name, p_price);
    SELECT LAST_INSERT_ID() AS product_id;
END //
DELIMITER ;

-- UPDATE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_product;
CREATE PROCEDURE sp_update_product(
    IN p_product_id INT,
    IN p_name VARCHAR(100),
    IN p_price DECIMAL(10,2))
BEGIN
    UPDATE Products
    SET name = p_name, price = p_price
    WHERE product_id = p_product_id;
END //
DELIMITER ;

-- DELETE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_delete_product;
CREATE PROCEDURE sp_delete_product(
    IN p_product_id INT)
BEGIN  
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
        DELETE FROM Products
        WHERE product_id = p_product_id;
    COMMIT;
END //
DELIMITER ;


-- ----------------------------------------------------------------------------
-- DiscountCodes
-- ----------------------------------------------------------------------------
-- SELECT
DROP VIEW IF EXISTS v_discount_codes;
CREATE VIEW v_discount_codes AS
SELECT *
FROM DiscountCodes;

-- INSERT
DELIMITER //
DROP PROCEDURE IF EXISTS sp_create_discount_code;
CREATE PROCEDURE sp_create_discount_code(
    IN p_code VARCHAR(50),
    IN p_discount_amount DECIMAL(10,2),
    IN p_description VARCHAR(100),
    IN p_expiration_date DATE)
BEGIN
    INSERT INTO DiscountCodes (code, discount_amount, description, expiration_date)
    VALUES (p_code, p_discount_amount, p_description, p_expiration_date);
    SELECT LAST_INSERT_ID() AS discount_code_id;
END //
DELIMITER ;

-- UPDATE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_discount_code;
CREATE PROCEDURE sp_update_discount_code(
    IN p_discount_code_id INT,
    IN p_code VARCHAR(50),
    IN p_discount_amount DECIMAL(10,2),
    IN p_description VARCHAR(100),
    IN p_expiration_date DATE)
BEGIN
    UPDATE DiscountCodes
    SET code = p_code, discount_amount = p_discount_amount, description = p_description,
        expiration_date = p_expiration_date
    WHERE discount_code_id = p_discount_code_id;
END //
DELIMITER ;

-- DELETE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_delete_discount_code;
CREATE PROCEDURE sp_delete_discount_code(
    IN p_discount_code_id INT)
BEGIN  
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
        DELETE FROM DiscountCodes
        WHERE discount_code_id = p_discount_code_id;
    COMMIT;
END //
DELIMITER ;


-- ----------------------------------------------------------------------------
-- Sales
-- ----------------------------------------------------------------------------
-- SELECT
DROP VIEW IF EXISTS v_sales;
CREATE VIEW v_sales AS
SELECT *
FROM Sales;

-- INSERT
DELIMITER //
DROP PROCEDURE IF EXISTS sp_create_sale;
CREATE PROCEDURE sp_create_sale(
    IN p_store_id INT, 
    IN p_customer_id INT, 
    IN p_discount_code_id INT, 
    IN p_sale_date DATE, 
    IN p_payment_method VARCHAR(50),
    IN p_total_amount_paid DECIMAL(10,2))
BEGIN
    INSERT INTO Sales (store_id, customer_id, discount_code_id, sale_date, payment_method, total_amount_paid)
    VALUES (p_store_id, p_customer_id, p_discount_code_id, p_sale_date, p_payment_method, p_total_amount_paid);
    SELECT LAST_INSERT_ID() AS sale_id;
END //
DELIMITER ;

-- UPDATE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_sale;
CREATE PROCEDURE sp_update_sale(
    IN p_sale_id INT,
    IN p_store_id INT, 
    IN p_customer_id INT, 
    IN p_discount_code_id INT, 
    IN p_sale_date DATE, 
    IN p_payment_method VARCHAR(50),
    IN p_total_amount_paid DECIMAL(10,2))
BEGIN
    UPDATE Sales
    SET store_id = p_store_id, customer_id = p_customer_id, discount_code_id = p_discount_code_id, 
        sale_date = p_sale_date, payment_method = p_payment_method, total_amount_paid = p_total_amount_paid
    WHERE sale_id = p_sale_id;
END //
DELIMITER ;

-- DELETE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_delete_sale;
CREATE PROCEDURE sp_delete_sale(
    IN p_sale_id INT)
BEGIN  
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
        DELETE FROM Sales
        WHERE sale_id = p_sale_id;
    COMMIT;
END //
DELIMITER ;


-- ----------------------------------------------------------------------------
-- StoresProducts
-- ----------------------------------------------------------------------------
-- SELECT
DROP VIEW IF EXISTS v_stores_products;
CREATE VIEW v_stores_products AS
SELECT *
FROM StoresProducts;

-- INSERT
DELIMITER //
DROP PROCEDURE IF EXISTS sp_create_store_product;
CREATE PROCEDURE sp_create_store_product(
    IN p_store_id INT,
    IN p_product_id INT,
    IN p_quantity INT)
BEGIN
    INSERT INTO StoresProducts (store_id, product_id, quantity)
    VALUES (p_store_id, p_product_id, p_quantity);
    SELECT LAST_INSERT_ID() AS store_product_id;
END //
DELIMITER ;

-- UPDATE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_store_product;
CREATE PROCEDURE sp_update_store_product(
    IN p_store_product_id INT,
    IN p_store_id INT,
    IN p_product_id INT,
    IN p_quantity INT)
BEGIN
    UPDATE StoresProducts
    SET store_id = p_store_id, product_id = p_product_id, quantity = p_quantity
    WHERE store_product_id = p_store_product_id;
END //
DELIMITER ;

-- DELETE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_delete_store_product;
CREATE PROCEDURE sp_delete_store_product(
    IN p_store_product_id INT)
BEGIN  
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
        DELETE FROM StoresProducts
        WHERE store_product_id = p_store_product_id;
    COMMIT;
END //
DELIMITER ;

-- ----------------------------------------------------------------------------
-- SalesProducts
-- ----------------------------------------------------------------------------
-- SELECT
DROP VIEW IF EXISTS v_sales_products;
CREATE VIEW v_sales_products AS
SELECT *
FROM SalesProducts;

-- INSERT
DELIMITER //
DROP PROCEDURE IF EXISTS sp_create_sale_product;
CREATE PROCEDURE sp_create_sale_product(
    IN p_sale_id INT,
    IN p_product_id INT,
    IN p_quantity INT)
BEGIN
    INSERT INTO SalesProducts (sale_id, product_id, quantity)
    VALUES (p_sale_id, p_product_id, p_quantity);
    SELECT LAST_INSERT_ID() AS sale_product_id;
END //
DELIMITER ;

-- UPDATE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_sale_product;
CREATE PROCEDURE sp_update_sale_product(
    IN p_sale_product_id INT,
    IN p_store_id INT,
    IN p_product_id INT,
    IN p_quantity INT)
BEGIN
    UPDATE SalesProducts
    SET sale_id = p_sale_id, product_id = p_product_id, quantity = p_quantity
    WHERE sale_product_id = p_sale_product_id;
END //
DELIMITER ;

-- DELETE
DELIMITER //
DROP PROCEDURE IF EXISTS sp_delete_sale_product;
CREATE PROCEDURE sp_delete_sale_product(
    IN p_sale_product_id INT)
BEGIN  
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;
        DELETE FROM SalesProducts
        WHERE sale_product_id = p_sale_product_id;
    COMMIT;
END //
DELIMITER ;