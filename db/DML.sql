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