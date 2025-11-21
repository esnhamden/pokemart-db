-- PL/SQL Queries (Stored Procedures)
-- Group 123: Alexander Birrell and Eason Hamden
-- 11/19/2025

-- -----------------------------------------------------
-- Stored Procedure: sp_DeleteCustomer
-- Purpose: Deletes a specific customer (Freddy Cantketchum)
-- if it works, Freddy should disappear after being deleted.
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_DeleteCustomer;

DELIMITER $$

CREATE PROCEDURE sp_DeleteCustomer()
BEGIN
    DELETE FROM Customers 
    WHERE first_name = 'Freddy' AND last_name = 'Cantketchum';
END $$

DELIMITER ;