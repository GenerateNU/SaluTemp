CREATE DATABASE salutemp;

CREATE TABLE IF NOT EXISTS patients (
    id integer PRIMARY KEY,
    name varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS medications (
    med_id integer PRIMARY KEY,
    title varchar NOT NULL,
    author varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS checked_out_medications (
    checkout_id serial PRIMARY KEY,
    med_id integer NOT NULL REFERENCES medications (med_id),
    id integer NOT NULL REFERENCES patients (id),
    expected_return_date timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS holds (
    hold_id serial PRIMARY KEY,
    med_id integer NOT NULL REFERENCES medications (med_id),
    id integer NOT NULL REFERENCES patients (id),
    hold_creation_date timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS liked_medications (
    like_id serial PRIMARY KEY,
    med_id integer NOT NULL REFERENCES medications (med_id),
    id integer NOT NULL REFERENCES patients (id)
);


INSERT INTO medications (med_id, title, author) VALUES (1738, 'The Lightning Thief', 'Rick Riordan');
