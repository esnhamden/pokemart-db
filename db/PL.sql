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