CREATE TABLE users (
    id TEXT PRIMARY UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    image_url TEXT
);