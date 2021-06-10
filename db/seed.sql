DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS mods;
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS auto_builds_users;

CREATE TABLE auto_builds_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
CREATE TABLE vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES auto_builds_users(user_id),
    year INT,
    make VARCHAR(50),
    model VARCHAR(50),
    trim VARCHAR(50),
    date_created TIMESTAMP
);
CREATE TABLE mods (
    mod_id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES vehicles(vehicle_id),
    description VARCHAR(100),
    type VARCHAR(8)
);
CREATE TABLE images (
    img_id SERIAL PRIMARY KEY,
    vehicle_id INT REFERENCES vehicles(vehicle_id),
    link TEXT
);