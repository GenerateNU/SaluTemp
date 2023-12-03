DROP TABLE IF EXISTS medication_constraint;
DROP TABLE IF EXISTS alert;
DROP TABLE IF EXISTS status_report;
DROP TYPE IF EXISTS condition_type;
DROP TABLE IF EXISTS stored_medication;
DROP TABLE IF EXISTS medication;
DROP TABLE IF EXISTS user_device;
DROP TABLE IF EXISTS "user";

CREATE TYPE condition_type AS ENUM ('TEMPERATURE', 'HUMIDITY', 'LIGHT_EXPOSURE');

CREATE TABLE IF NOT EXISTS "user" (
    user_id integer NOT NULL UNIQUE,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    push_notification_enabled BOOLEAN DEFAULT FALSE
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS user_device (
    user_device_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    device_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (user_id)
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

CREATE TABLE IF NOT EXISTS status_report (
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

-- populate
-- Add users
INSERT INTO "user" VALUES 
  (201, 'Alice', 'Smith', 'alice.smith@gmail.com'),
  (202, 'Bob', 'Johnson', 'bob.johnson@gmail.com'),
  (203, 'Eva', 'Williams', 'eva.williams@gmail.com'),
  (204, 'Michael', 'Davis', 'michael.davis@gmail.com'),
  (205, 'Sophia', 'Miller', 'sophia.miller@gmail.com');

-- Add medications
INSERT INTO medication VALUES 
  (302, 'MedicationA'),
  (303, 'MedicationB'),
  (304, 'MedicationC'),
  (305, 'MedicationD'),
  (306, 'MedicationE');

-- Add stored medications
INSERT INTO stored_medication VALUES 
  (2, 302, 201, 68, 25, 30),
  (3, 303, 202, 72, 22, 28),
  (4, 304, 203, 70, 20, 20),
  (5, 305, 204, 75, 18, 25),
  (6, 306, 205, 71, 23, 22);

-- Add alerts
INSERT INTO alert VALUES 
  (4, 2, current_timestamp, 'Low temperature alert!', 'TEMPERATURE'),
  (5, 3, current_timestamp, 'High humidity alert!', 'HUMIDITY'),
  (6, 4, current_timestamp, 'Light exposure alert!', 'LIGHT_EXPOSURE'),
  (7, 5, current_timestamp, 'Temperature and humidity alert!', 'TEMPERATURE'),
  (8, 6, current_timestamp, 'Light exposure alert!', 'LIGHT_EXPOSURE');

-- Add status reports
INSERT INTO status_report VALUES 
  (current_timestamp, 2, 68, 25, 30),
  (current_timestamp, 3, 72, 22, 28),
  (current_timestamp, 4, 70, 20, 20),
  (current_timestamp, 5, 75, 18, 25),
  (current_timestamp, 6, 71, 23, 22);

-- Add medication constraints
INSERT INTO medication_constraint VALUES 
  (302, 'TEMPERATURE', 80, 50, '1 Day, 4 Hours'),
  (303, 'HUMIDITY', 30, 10, '12 Hours'),
  (304, 'LIGHT_EXPOSURE', 40, 10, '1 Day'),
  (305, 'TEMPERATURE', 85, 55, '1 Day, 6 Hours'),
  (306, 'HUMIDITY', 35, 15, '18 Hours');
