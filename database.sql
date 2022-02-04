CREATE DATABASE spenvest;

CREATE TABLE users(
    email VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    address VARCHAR(100)
);

ALTER TABLE users
ADD COLUMN contact_number INT,
ADD COLUMN hashed_password VARCHAR(50),
ADD COLUMN monthly_pay INT,
ADD COLUMN savings_target INT,
ADD COLUMN deleted BOOLEAN;

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(50),
    trans_type VARCHAR(10),
    ts TIMESTAMP,
    deleted BOOLEAN,
    email VARCHAR(50) REFERENCES users(email)
);

CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50),
    quantity INT,
    unit_price INT,
    transaction_id INT REFERENCES transactions(transaction_id)
);