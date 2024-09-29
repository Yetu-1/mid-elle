-- create userss table
CREATE TABLE users (
    user_id uuid PRIMARY KEY,
	firstname VARCHAR(100),
	lastname VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    refresh_token text
)

-- create valid tokens table
CREATE TABLE tokens (
	id SERIAL PRIMARY KEY,
    token text
)

-- create products table
CREATE TABLE products (
    product_id uuid PRIMARY KEY,
	name VARCHAR(100),
	type VARCHAR(10),
    brand VARCHAR(50),
    description text,
    price VARCHAR(100),
    discount INTEGER,
    images text[]
)

-- create carts table
CREATE TABLE carts (
    product_id uuid,
    qty INTEGER,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE -- on delete cascade is to ensure if the user is deleted the entries on this table are also deleted
)

-- create orders table
CREATE TABLE orders (
    id SERIAL,
    trans_id INTEGER,
    trans_ref uuid,
    amount INTEGER,
    details text,
    user_id uuid REFERENCES users(user_id)  ON DELETE CASCADE ,
    status VARCHAR(10)
)
