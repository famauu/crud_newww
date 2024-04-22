CREATE DATABASE tugas_programming

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    SKU TEXT,
    judul TEXT,
    harga float,
    stock INTEGER
);

INSERT INTO books (sku, judul, harga, stock)
VALUES
    ('HPATPS', 'Harry Potter and the Philosopher`s Stone', 150000, 100),
    ('TH', 'The Hobbit', 100000, 50),
    ('TKAM', 'To Kill a Mockingbird', 120000, 2),
    ('PNP', 'Pride and Prejudice', 90000, 5);
    
SELECT * FROM books b