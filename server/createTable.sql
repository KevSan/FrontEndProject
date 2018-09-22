CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    personal_address VARCHAR(50),
    company VARCHAR(50),
    salary DOUBLE PRECISION
);