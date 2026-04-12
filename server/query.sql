CREATE TABLE users (
    id TEXT PRIMARY UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    image_url TEXT
);

CREATE TABLE metrics (
    id INT PRIMARY KEY default 1,
    total_scans INT NOT NULL DEFAULT 0,
    avg_confidence REAL NOT NULL DEFAULT 0
);

INSERT INTO metrics (id, total_scans, avg_confidence)
VALUES (1, 0, 0);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    profession TEXT NOT NULL,
    place TEXT NOT NULL,
    review TEXT NOT NULL
);