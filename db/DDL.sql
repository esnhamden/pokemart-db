-- Alexander Birrell and Eason Hamden
-- 12/8/2025

-- Citations:
-- - Based on PLSQL code from CS340 Exploration Pl/SQL Part 2
--   URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-pl-slash-sql-part-2-stored-procedures-for-cud?module_item_id=25645141

-- Creates the Customers, Stores, Products, DiscountCodes, Sales, StoresProducts, and SalesProducts tables
-- and inserts mock data

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

DELIMITER //
DROP PROCEDURE IF EXISTS sp_reset_db;
CREATE PROCEDURE sp_reset_db()
BEGIN
    SET FOREIGN_KEY_CHECKS = 0;

    DROP TABLE IF EXISTS Customers;
    CREATE TABLE Customers (
        customer_id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100),
        phone_number VARCHAR(20),
        registration_date DATE,
        PRIMARY KEY (customer_id)
    );

    DROP TABLE IF EXISTS Stores;
    CREATE TABLE Stores (
        store_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100),
        street VARCHAR(100),
        city VARCHAR(100),
        state VARCHAR(50),
        zip_code VARCHAR(20),
        phone_number VARCHAR(20),
        employee_count INT,
        PRIMARY KEY (store_id)
    );

    DROP TABLE IF EXISTS Products;
    CREATE TABLE Products (
        product_id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100),
        price DECIMAL(10,2),
        PRIMARY KEY (product_id)
    );

    DROP TABLE IF EXISTS DiscountCodes;
    CREATE TABLE DiscountCodes (
        discount_code_id INT NOT NULL AUTO_INCREMENT, 
        code VARCHAR(50),
        discount_amount DECIMAL(10,2),
        description VARCHAR(100),
        expiration_date DATE, 
        PRIMARY KEY (discount_code_id)
    );

    DROP TABLE IF EXISTS Sales;
    CREATE TABLE Sales (
        sale_id INT NOT NULL AUTO_INCREMENT,
        store_id INT,
        customer_id INT,
        discount_code_id INT,
        sale_date DATE,
        payment_method VARCHAR(50),
        total_amount_paid DECIMAL(10,2), 
        PRIMARY KEY (sale_id),
        FOREIGN KEY (store_id) REFERENCES Stores(store_id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
        FOREIGN KEY (discount_code_id) REFERENCES DiscountCodes(discount_code_id) ON DELETE CASCADE
    );

    DROP TABLE IF EXISTS StoresProducts;
    CREATE TABLE StoresProducts (
        store_product_id INT NOT NULL AUTO_INCREMENT,
        store_id INT, 
        product_id INT, 
        quantity INT, 
        PRIMARY KEY (store_product_id),
        FOREIGN KEY (store_id) REFERENCES Stores(store_id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
        UNIQUE (store_id, product_id)
    );

    DROP TABLE IF EXISTS SalesProducts;
    CREATE TABLE SalesProducts (
        sale_product_id INT NOT NULL AUTO_INCREMENT, 
        sale_id INT,
        product_id INT,
        quantity INT, 
        PRIMARY KEY (sale_product_id),
        FOREIGN KEY (sale_id) REFERENCES Sales(sale_id) ON DELETE CASCADE, 
        FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
        UNIQUE (sale_id, product_id)
    );

    CALL sp_insert_mock_data();
    SET FOREIGN_KEY_CHECKS = 1;
END //
DELIMITER ;