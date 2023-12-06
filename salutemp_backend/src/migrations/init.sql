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
    user_id varchar NOT NULL UNIQUE,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    push_notification_enabled BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS expo_notification_token (
    expo_notification_token_id SERIAL PRIMARY KEY,
    user_id varchar NOT NULL,
    device_token VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);

CREATE TABLE IF NOT EXISTS user_device (
    user_device_id SERIAL PRIMARY KEY,
    user_id varchar NOT NULL,
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
    user_id varchar NOT NULL,
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
    stored_medication_id integer NOT NULL,
    condition_type condition_type NOT NULL,
    max_threshold float,
    min_threshold float,
    duration varchar, /*Not sure if we should store this as a time object.*/
    PRIMARY KEY (stored_medication_id, condition_type),
    FOREIGN KEY (stored_medication_id) REFERENCES stored_medication (stored_medication_id)
);

-- populate
-- Add users
-- Insert sample data into "user" table
INSERT INTO "user" (user_id, first_name, last_name, email, push_notification_enabled)
VALUES
  ('1', 'John', 'Doe', 'john.doe@example.com', true),
  ('2', 'Jane', 'Smith', 'jane.smith@example.com', false),
  ('3', 'Bob', 'Johnson', 'bob.johnson@example.com', true),
  ('4', 'Alice', 'Williams', 'alice.williams@example.com', false),
  ('5', 'Charlie', 'Brown', 'charlie.brown@example.com', true);

-- Insert sample data into "user_device" table
INSERT INTO user_device (user_device_id, user_id, device_id)
VALUES
  (1, 1, 'device_1'),
  (2, 2, 'device_2'),
  (3, 3, 'device_3'),
  (4, 4, 'device_4'),
  (5, 5, 'device_5');

-- Insert sample data into "medication" table
INSERT INTO medication (medication_id, medication_name)
VALUES
  (1, 'Medication A'),
  (2, 'Medication B'),
  (3, 'Medication C'),
  (4, 'Medication D'),
  (5, 'Medication E'),
  (6, 'Medication F'),
  (7, 'Medication G'),
  (8, 'Medication H'),
  (9, 'Medication I'),
  (10, 'Medication J'),
  (11, 'Medication K'),
  (12, 'Medication L'),
  (13, 'Medication M'),
  (14, 'Medication N'),
  (15, 'Medication O'),
  (16, 'Medication P'),
  (17, 'Medication Q'),
  (18, 'Medication R'),
  (19, 'Medication S'),
  (20, 'Medication T');

-- Insert sample data into "stored_medication" table
INSERT INTO stored_medication (stored_medication_id, medication_id, user_id, current_temperature, current_humidity, current_light)
VALUES
  (1, 1, 1, 25.5, 50.0, 300),
  (2, 2, 2, 22.0, 40.0, 200),
  (3, 3, 3, 26.5, 60.0, 400),
  (4, 4, 4, 23.0, 45.0, 250),
  (5, 5, 5, 24.5, 55.0, 350),
  (6, 6, 1, 25.0, 50.0, 300),
  (7, 7, 1, 22.0, 40.0, 200),
  (8, 8, 1, 26.5, 60.0, 400),
  (9, 9, 1, 23.0, 45.0, 250),
  (10, 10, 1, 24.5, 55.0, 350),
  (11, 11, 1, 25.2, 48.0, 290),
  (12, 12, 1, 22.8, 42.0, 210),
  (13, 13, 1, 26.0, 58.0, 380),
  (14, 14, 1, 23.5, 46.0, 260),
  (15, 15, 1, 24.8, 53.0, 330);

-- Insert sample data into "alert" table
INSERT INTO alert (warning_id, stored_medication_id, warning_timestamp, warning_description, condition_type)
VALUES
  (1, 1, '2023-01-01 08:00:00', 'High Temperature', 'TEMPERATURE'),
  (2, 2, '2023-01-02 10:30:00', 'Low Humidity', 'HUMIDITY'),
  (3, 3, '2023-01-03 12:45:00', 'High Light Exposure', 'LIGHT_EXPOSURE'),
  (4, 4, '2023-01-04 14:15:00', 'Low Temperature', 'TEMPERATURE'),
  (5, 5, '2023-01-05 16:30:00', 'High Humidity', 'HUMIDITY'),
  (6, 3, '2023-01-03 12:45:00', 'High Humidity', 'HUMIDITY');

-- Insert sample data into "status_report" table
INSERT INTO status_report (event_time, stored_medication_id, temperature, humidity, light)
VALUES
  ('2023-01-01 08:00:00', 1, 25.0, 49.0, 290),
  ('2023-01-02 10:30:00', 2, 21.5, 38.0, 180),
  ('2023-01-03 12:45:00', 3, 26.0, 58.0, 380),
  ('2023-01-04 14:15:00', 4, 22.5, 44.0, 240),
  ('2023-01-05 16:30:00', 5, 24.0, 53.0, 330);

-- Insert sample data into "medication_constraint" table
INSERT INTO medication_constraint (stored_medication_id, condition_type, max_threshold, min_threshold, duration)
VALUES
  (1, 'TEMPERATURE', 30.0, 20.0, '1 day'),
  (2, 'HUMIDITY', 45.0, 30.0, '2 days'),
  (3, 'LIGHT_EXPOSURE', 500.0, 300.0, '3 days'),
  (4, 'TEMPERATURE', 28.0, 18.0, '1 day'),
  (5, 'HUMIDITY', 50.0, 35.0, '2 days'),
  (3, 'TEMPERATURE', 50.0, 35.0, '2 days');

  -- Insert sample data into "expo_notification_token" table
INSERT INTO expo_notification_token (expo_notification_token_id, user_id, device_token)
VALUES
  (1, 1, 'expo_device_token_1'),
  (2, 2, 'expo_device_token_2'),
  (3, 3, 'expo_device_token_3'),
  (4, 4, 'expo_device_token_4'),
  (5, 5, 'expo_device_token_5');


