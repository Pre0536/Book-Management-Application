CREATE DATABASE IF NOT EXISTS bookdb;
USE bookdb;


CREATE USER IF NOT EXISTS 'bookmaster'@'localhost' IDENTIFIED BY 'MasterOogway';

GRANT ALL PRIVILEGES ON bookdb.* TO 'bookmaster'@'localhost';
FLUSH PRIVILEGES;

SELECT * FROM book LIMIT 0, 1000;
SELECT * FROM author LIMIT 0, 1000;
SELECT * FROM book_details LIMIT 0, 1000;  

