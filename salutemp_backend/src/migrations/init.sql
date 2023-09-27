DROP TABLE IF EXISTS medication_constraint;
DROP TABLE IF EXISTS alert;
DROP TABLE IF EXISTS condition_event;
DROP TYPE IF EXISTS condition_type;
DROP TABLE IF EXISTS stored_medication;
DROP TABLE IF EXISTS medication;
DROP TABLE IF EXISTS "user";

CREATE TYPE condition_type AS ENUM ('TEMPERATURE', 'HUMIDITY', 'LIGHT_EXPOSURE');

CREATE TABLE IF NOT EXISTS "user" (
    user_id integer NOT NULL UNIQUE,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS medication (
    medication_id integer NOT NULL UNIQUE,
    medication_name varchar NOT NULL,
    PRIMARY KEY (medication_id)
);

CREATE TABLE IF NOT EXISTS stored_medication ( /*medication_instance?*/
    stored_medication_id integer NOT NULL,
    medication_id integer NOT NULL,
    user_id integer NOT NULL,
    current_temperature float,
    current_humidity float,
    current_light float,
    PRIMARY KEY (stored_medication_id),
    FOREIGN KEY (medication_id) REFERENCES medication (medication_id),
    FOREIGN KEY (user_id) REFERENCES "user" (user_id)
    );

CREATE TABLE IF NOT EXISTS alert (
    warning_id integer NOT NULL UNIQUE,
    stored_medication_id integer NOT NULL,
    warning_timestamp timestamp NOT NULL,
    warning_description varchar NOT NULL,
    condition_type condition_type NOT NULL,
    PRIMARY KEY (warning_id),
    FOREIGN KEY (stored_medication_id) REFERENCES stored_medication (stored_medication_id)
);

CREATE TABLE IF NOT EXISTS condition_event (
    event_time timestamp NOT NULL,
    stored_medication_id integer NOT NULL,
    temperature float,
    humidity float,
    light float,
    PRIMARY KEY (event_time, stored_medication_id),
    FOREIGN KEY (stored_medication_id) REFERENCES stored_medication (stored_medication_id)
);

CREATE TABLE IF NOT EXISTS medication_constraint (
    medication_id integer NOT NULL UNIQUE,
    condition_type condition_type NOT NULL,
    max_threshold float,
    min_threshold float,
    duration varchar, /*Not sure if we should store this as a time object.*/
    PRIMARY KEY (medication_id, condition_type),
    FOREIGN KEY (medication_id) REFERENCES medication (medication_id)
);

INSERT INTO "user" VALUES (200, 'John', 'Doe', 'johndoe@gmail.com');
INSERT INTO medication VALUES (301, 'TestMed');
INSERT INTO stored_medication VALUES (1, 301, 200, 70, 20, 20);
INSERT INTO alert VALUES (3, 1, current_timestamp, 'Test Description!', 'TEMPERATURE');
INSERT INTO condition_event VALUES (current_timestamp, 1, 70, 20, 20);
INSERT INTO medication_constraint VALUES (301, 'TEMPERATURE', 90, 50, '2 Days, 2 Hours, 10 Minutes');