-- create userss table
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
    user_id uuid,
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