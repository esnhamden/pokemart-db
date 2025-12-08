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