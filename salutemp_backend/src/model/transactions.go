package model

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/jackc/pgx"
)

/*
 * This file contains the CRUD functions for the users, medication,
 * stored_medication, alert, status_report, and medication_constraint tables.
 * CRUD format for each table:
 * WritetoDB: insert a new record into the table
 * GetFromDB: retrieve a record from the table by ID
 * Update: update a record in the table
 * DeleteFromDB: delete a record from the table by ID
 * GetAllFromDB: retrieve all records from the table
 */

// WriteUserToDb inserts a new user record into the database.
func WriteUserToDb(pool *pgx.Conn, user User) (User, error) {
	var insertedUser User
	err := pool.QueryRow("INSERT INTO \"user\" (user_id, first_name, last_name, email, push_notification_enabled) VALUES ($1, $2, $3, $4, $5) RETURNING user_id;",
		user.UserID, user.FirstName, user.LastName, user.Email, user.PushNotificationEnabled).Scan(&insertedUser.UserID)
	if err != nil {
		return User{}, err
	}
	return insertedUser, nil
}

// GetUserFromDB retrieves a user record from the database by user ID.
func GetUserFromDB(pool *pgx.Conn, userID string) (User, error) {
	user := User{UserID: userID}
	query := fmt.Sprintf("SELECT user_id, first_name, last_name, email, push_notification_enabled FROM \"user\" WHERE user_id = $1;")
	err := pool.QueryRow(query, userID).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Email, &user.PushNotificationEnabled)
	if err != nil {
		return User{}, err
	}
	return user, nil
}

// UpdateUser updates a user record in the database.
func UpdateUser(pool *pgx.Conn, user User) error {
	commandTag, err := pool.Exec("UPDATE \"user\" SET first_name = $1, last_name = $2, email = $3, push_notification_enabled = $4 WHERE user_id = $5;",
		user.FirstName, user.LastName, user.Email, user.PushNotificationEnabled, user.UserID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeleteUserFromDB deletes a user record from the database.
func DeleteUserFromDB(pool *pgx.Conn, userID string) error {
	commandTag, err := pool.Exec("DELETE FROM \"user\" WHERE user_id = $1;", userID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllUsersFromDB retrieves all user records from the database.
func GetAllUsersFromDB(pool *pgx.Conn) ([]User, error) {
	rows, err := pool.Query("SELECT user_id, first_name, last_name, email, push_notification_enabled FROM \"user\";")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Email, &user.PushNotificationEnabled)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, rows.Err()
}

// CRUD functions for the user_device table.
// WriteUserDeviceToDb inserts a new user device record into the database.
func WriteUserDeviceToDb(pool *pgx.Conn, userDevice UserDevice) (UserDevice, error) {
	var insertedUserDevice UserDevice
	err := pool.QueryRow("INSERT INTO user_device (user_id, device_id) VALUES ($1, $2) RETURNING user_device_id;",
		userDevice.UserID, userDevice.DeviceID).Scan(&insertedUserDevice.UserDeviceID)
	if err != nil {
		return UserDevice{}, err
	}
	return insertedUserDevice, nil
}

// GetUserDeviceFromDB retrieves a user device record from the database by user device ID.
func GetUserDeviceFromDB(pool *pgx.Conn, userDeviceID int) (UserDevice, error) {
	userDevice := UserDevice{UserDeviceID: userDeviceID}
	query := fmt.Sprintf("SELECT user_device_id, user_id, device_id FROM user_device WHERE user_device_id = $1;")
	err := pool.QueryRow(query, userDeviceID).Scan(&userDevice.UserDeviceID, &userDevice.UserID, &userDevice.DeviceID)
	if err != nil {
		return UserDevice{}, err
	}
	return userDevice, nil
}

// UpdateUserDevice updates a user device record in the database.
func UpdateUserDevice(pool *pgx.Conn, userDevice UserDevice) error {
	_, err := pool.Exec("UPDATE user_device SET user_id = $1, device_id = $2 WHERE user_device_id = $3;",
		userDevice.UserID, userDevice.DeviceID, userDevice.UserDeviceID)
	if err != nil {
		return err
	}
	return nil
}

// DeleteUserDeviceFromDB deletes a user device record from the database.
func DeleteUserDeviceFromDB(pool *pgx.Conn, userDeviceID int) error {
	_, err := pool.Exec("DELETE FROM user_device WHERE user_device_id = $1;", userDeviceID)
	if err != nil {
		return err
	}
	return nil
}

// GetAllUserDevicesFromDB retrieves all user device records from the database.
func GetAllUserDevicesFromDB(pool *pgx.Conn) ([]UserDevice, error) {
	rows, err := pool.Query("SELECT user_device_id, user_id, device_id FROM user_device;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var userDevices []UserDevice
	for rows.Next() {
		var userDevice UserDevice
		err := rows.Scan(&userDevice.UserDeviceID, &userDevice.UserID, &userDevice.DeviceID)
		if err != nil {
			return nil, err
		}
		userDevices = append(userDevices, userDevice)
	}

	return userDevices, rows.Err()
}

//Crud functions for med table

func WriteMedToDb(pool *pgx.Conn, med Medication) (Medication, error) {
	var insertedMed Medication
	medIDStr := strconv.FormatInt(int64(med.MedicationID), 10)
	err := pool.QueryRow("INSERT INTO medication (medication_id, medication_name) VALUES ($1, $2) RETURNING medication_id;", medIDStr, med.MedicationName).Scan(&insertedMed.MedicationID)

	if err != nil {
		return Medication{}, err
	}

	return insertedMed, nil
}

// Function to delete a given medication from the medication table
func DeleteMedFromDB(pool *pgx.Conn, medID int) error {
	_, err := pool.Exec(fmt.Sprintf("DELETE FROM medication WHERE medication_id = %d;", medID))

	if err != nil {
		return err
	}

	return nil
}

// Function to get a specific medication from the medication table
func GetMedFromDB(pool *pgx.Conn, medID int) (Medication, error) {
	med := Medication{
		MedicationID: medID,
	}

	err := pool.QueryRow(
		"SELECT medication_id, medication_name FROM medication WHERE medication_id = $1;",
		medID,
	).Scan(&med.MedicationID, &med.MedicationName)

	if err != nil {
		return Medication{}, err
	}

	return med, nil
}

func GetAllMedsFromDB(pool *pgx.Conn) ([]Medication, error) {
	rows, err := pool.Query("SELECT medication_id, medication_name FROM medication;")

	if err != nil {
		print(err, "from transactions err ")

		return nil, err
	}

	defer rows.Close()

	var results []Medication

	for rows.Next() {
		med := Medication{}
		err := rows.Scan(&med.MedicationID, &med.MedicationName)

		if err != nil {
			print(err, "from transactions err2 ")

			return nil, err
		}

		results = append(results, med)
	}

	println(results, "from transactions results ")

	return results, nil
}

func EditMedicationToDB(pool *pgx.Conn, med Medication) error {
	_, err := pool.Exec(
		"UPDATE medication SET medication_name = $2 WHERE medication_id = $1",
		med.MedicationID, med.MedicationName,
	)
	return err
}

// CRUD functions for the storedmedications table.
// WriteStoredMedToDb inserts a new stored medication record into the database.
func WriteStoredMedToDb(pool *pgx.Conn, med StoredMedication) (StoredMedication, error) {
	var insertedMed StoredMedication
	err := pool.QueryRow("INSERT INTO stored_medication (stored_medication_id, medication_id, user_id, current_temperature, current_humidity, current_light) VALUES ($1, $2, $3, $4, $5, $6) RETURNING stored_medication_id;",
		med.StoredMedicationID, med.MedicationID, med.UserID, med.CurrentTemperature, med.CurrentHumidity, med.CurrentLight).Scan(&insertedMed.StoredMedicationID)
	if err != nil {
		return StoredMedication{}, err
	}
	return insertedMed, nil
}

// GetStoredMedFromDB retrieves a stored medication record from the database.
func GetStoredMedFromDB(pool *pgx.Conn, storedMedID int) (StoredMedication, error) {
	med := StoredMedication{StoredMedicationID: storedMedID}
	query := "SELECT stored_medication_id, medication_id, user_id, current_temperature, current_humidity, current_light FROM stored_medication WHERE stored_medication_id = $1;"
	err := pool.QueryRow(query, storedMedID).Scan(&med.StoredMedicationID, &med.MedicationID, &med.UserID, &med.CurrentTemperature, &med.CurrentHumidity, &med.CurrentLight)
	if err != nil {
		return StoredMedication{}, err
	}
	return med, nil
}

// UpdateStoredMedication updates a stored medication record in the database.
func UpdateStoredMed(pool *pgx.Conn, med StoredMedication) error {
	commandTag, err := pool.Exec("UPDATE stored_medication SET medication_id = $1, user_id = $2, current_temperature = $3, current_humidity = $4, current_light = $5 WHERE stored_medication_id = $6;",
		med.MedicationID, med.UserID, med.CurrentTemperature, med.CurrentHumidity, med.CurrentLight, med.StoredMedicationID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeleteStoredMedFromDB deletes a stored medication record from the database.
func DeleteStoredMedFromDB(pool *pgx.Conn, storedMedID int) error {
	commandTag, err := pool.Exec("DELETE FROM stored_medication WHERE stored_medication_id = $1;", storedMedID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllStoredMedsFromDB retrieves all stored medication records.
func GetAllStoredMedsFromDB(pool *pgx.Conn) ([]StoredMedication, error) {
	rows, err := pool.Query("SELECT stored_medication_id, medication_id, user_id, current_temperature, current_humidity, current_light FROM stored_medication;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var meds []StoredMedication
	for rows.Next() {
		var med StoredMedication
		err := rows.Scan(&med.StoredMedicationID, &med.MedicationID, &med.UserID, &med.CurrentTemperature, &med.CurrentHumidity, &med.CurrentLight)
		if err != nil {
			return nil, err
		}
		meds = append(meds, med)
	}

	return meds, rows.Err()
}

// GetAllStoredMedsFromDB retrieves all stored medication records.
func GetAllStoredMeds(pool *pgx.Conn) ([]StoredMedication, error) {
	rows, err := pool.Query("SELECT * FROM stored_medication")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var meds []StoredMedication
	for rows.Next() {
		var med StoredMedication
		if err := rows.Scan(&med.StoredMedicationID, &med.MedicationID, &med.UserID, &med.CurrentTemperature, &med.CurrentHumidity, &med.CurrentLight); err != nil {
			return nil, err
		}
		meds = append(meds, med)
	}
	return meds, nil
}

// CRUD functions for the alert table
// WriteAlertToDb inserts a new alert record into the database.
func WriteAlertToDb(pool *pgx.Conn, alert Alert) (Alert, error) {
	var insertedAlert Alert
	err := pool.QueryRow("INSERT INTO alert (warning_id, stored_medication_id, warning_timestamp, warning_description, condition_type) VALUES ($1, $2, $3, $4, $5) RETURNING warning_id;",
		alert.WarningID, alert.StoredMedicationID, alert.WarningTimestamp, alert.WarningDescription, alert.ConditionType).Scan(&insertedAlert.WarningID)
	if err != nil {
		return Alert{}, err
	}
	return insertedAlert, nil
}

// GetAlertFromDB retrieves an alert record from the database by warning ID.
func GetAlertFromDB(pool *pgx.Conn, warningID int) (Alert, error) {
	alert := Alert{WarningID: warningID}
	query := "SELECT warning_id, stored_medication_id, warning_timestamp, warning_description, condition_type FROM alert WHERE warning_id = $1;"
	err := pool.QueryRow(query, warningID).Scan(&alert.WarningID, &alert.StoredMedicationID, &alert.WarningTimestamp, &alert.WarningDescription, &alert.ConditionType)
	if err != nil {
		return Alert{}, err
	}
	return alert, nil
}

// UpdateAlert updates an alert record in the database.
func UpdateAlert(pool *pgx.Conn, alert Alert) error {
	commandTag, err := pool.Exec("UPDATE alert SET stored_medication_id = $1, warning_timestamp = $2, warning_description = $3, condition_type = $4 WHERE warning_id = $5;",
		alert.StoredMedicationID, alert.WarningTimestamp, alert.WarningDescription, alert.ConditionType, alert.WarningID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeleteAlertFromDB deletes an alert record from the database.
func DeleteAlertFromDB(pool *pgx.Conn, warningID int) error {
	commandTag, err := pool.Exec("DELETE FROM alert WHERE warning_id = $1;", warningID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllAlertsFromDB retrieves all alert records from the database.
func GetAllAlertsFromDB(pool *pgx.Conn) ([]Alert, error) {
	rows, err := pool.Query("SELECT warning_id, stored_medication_id, warning_timestamp, warning_description, condition_type FROM alert;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var alerts []Alert
	for rows.Next() {
		var alert Alert
		err := rows.Scan(&alert.WarningID, &alert.StoredMedicationID, &alert.WarningTimestamp, &alert.WarningDescription, &alert.ConditionType)
		if err != nil {
			return nil, err
		}
		alerts = append(alerts, alert)
	}

	return alerts, rows.Err()
}

// CRUD functions for the status_report table
// WriteStatusReportToDb inserts a new status report into the database.
func WriteStatusReportToDb(pool *pgx.Conn, report StatusReport) (StatusReport, error) {
	var insertedReport StatusReport
	err := pool.QueryRow(`INSERT INTO status_report (event_time, stored_medication_id, temperature, humidity, light)
        VALUES ($1, $2, $3, $4, $5) RETURNING event_time, stored_medication_id;`,
		report.EventTime, report.StoredMedicationID, report.Temperature, report.Humidity, report.Light).
		Scan(&insertedReport.EventTime, &insertedReport.StoredMedicationID)

	if err != nil {
		return StatusReport{}, err
	}
	return insertedReport, nil
}

// GetStatusReportFromDB retrieves a status report record based on the event time and stored medication ID.
func GetStatusReportFromDB(pool *pgx.Conn, eventTime time.Time, storedMedID int) (StatusReport, error) {
	var report StatusReport
	err := pool.QueryRow(`SELECT event_time, stored_medication_id, temperature, humidity, light
        FROM status_report WHERE event_time = $1 AND stored_medication_id = $2;`, eventTime, storedMedID).
		Scan(&report.EventTime, &report.StoredMedicationID, &report.Temperature, &report.Humidity, &report.Light)
	if err != nil {
		return StatusReport{}, err
	}
	return report, nil
}

// UpdateStatusReport updates a status report record based on the event time and stored medication ID.
func UpdateStatusReport(pool *pgx.Conn, report StatusReport) error {
	commandTag, err := pool.Exec(`UPDATE status_report
        SET temperature = $1, humidity = $2, light = $3
        WHERE event_time = $4 AND stored_medication_id = $5;`,
		report.Temperature, report.Humidity, report.Light, report.EventTime, report.StoredMedicationID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeleteStatusReportFromDB deletes a status report based on the event time and stored medication ID.
func DeleteStatusReportFromDB(pool *pgx.Conn, eventTime time.Time, storedMedID int) error {
	commandTag, err := pool.Exec(`DELETE FROM status_report WHERE event_time = $1 AND stored_medication_id = $2;`,
		eventTime, storedMedID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllStatusReportsFromDB retrieves all status report records.
func GetAllStatusReportsFromDB(pool *pgx.Conn) ([]StatusReport, error) {
	rows, err := pool.Query(`SELECT event_time, stored_medication_id, temperature, humidity, light FROM status_report;`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reports []StatusReport
	for rows.Next() {
		var report StatusReport
		err := rows.Scan(&report.EventTime, &report.StoredMedicationID, &report.Temperature, &report.Humidity, &report.Light)
		if err != nil {
			return nil, err
		}
		reports = append(reports, report)
	}

	return reports, rows.Err()
}

// CRUD functions for the medication_constraint
// WriteMedConstraintToDb inserts a new medication_constraint record into the database.
func WriteMedConstraintToDb(pool *pgx.Conn, constraint MedicationConstraint) (MedicationConstraint, error) {
	var insertedConstraint MedicationConstraint
	err := pool.QueryRow("INSERT INTO medication_constraint (stored_medication_id, condition_type, max_threshold, min_threshold, duration) VALUES ($1, $2, $3, $4, $5) RETURNING stored_medication_id;",
		constraint.StoredMedicationID, constraint.ConditionType, constraint.MaxThreshold, constraint.MinThreshold, constraint.Duration).Scan(&insertedConstraint.StoredMedicationID)
	if err != nil {
		return MedicationConstraint{}, err
	}
	return insertedConstraint, nil
}

// GetMedConstraintFromDB retrieves a medication_constraint record from the database by medication_id and condition_type.
func GetMedConstraintFromDB(pool *pgx.Conn, stored_medication_id int, conditionType string) (MedicationConstraint, error) {
	constraint := MedicationConstraint{StoredMedicationID: stored_medication_id, ConditionType: conditionType}
	query := "SELECT stored_medication_id, condition_type, max_threshold, min_threshold, duration FROM medication_constraint WHERE stored_medication_id = $1 AND condition_type = $2;"
	err := pool.QueryRow(query, stored_medication_id, conditionType).Scan(&constraint.StoredMedicationID, &constraint.ConditionType, &constraint.MaxThreshold, &constraint.MinThreshold, &constraint.Duration)
	if err != nil {
		return MedicationConstraint{}, err
	}
	return constraint, nil
}

// UpdateMedConstraint updates a medication_constraint record in the database.
func UpdateMedConstraint(pool *pgx.Conn, constraint MedicationConstraint) error {
	commandTag, err := pool.Exec("UPDATE stored_medication_id SET max_threshold = $1, min_threshold = $2, duration = $3 WHERE stored_medication_id = $4 AND condition_type = $5;",
		constraint.MaxThreshold, constraint.MinThreshold, constraint.Duration, constraint.StoredMedicationID, constraint.ConditionType)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeleteMedConstraintFromDB deletes a medication_constraint record from the database.
func DeleteMedConstraintFromDB(pool *pgx.Conn, stored_medication_id int, conditionType string) error {
	commandTag, err := pool.Exec("DELETE FROM medication_constraint WHERE stored_medication_id = $1 AND condition_type = $2;", stored_medication_id, conditionType)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllMedConstraintsFromDB retrieves all medication_constraint records from the database.
func GetAllMedConstraintsFromDB(pool *pgx.Conn) ([]MedicationConstraint, error) {
	rows, err := pool.Query("SELECT stored_medication_id, condition_type, max_threshold, min_threshold, duration FROM medication_constraint;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var constraints []MedicationConstraint
	for rows.Next() {
		var constraint MedicationConstraint
		err := rows.Scan(&constraint.StoredMedicationID, &constraint.ConditionType, &constraint.MaxThreshold, &constraint.MinThreshold, &constraint.Duration)
		if err != nil {
			return nil, err
		}
		constraints = append(constraints, constraint)
	}

	return constraints, rows.Err()
}

func GetAllStoredMedConstraintsFromDB(pool *pgx.Conn, storedMedicationId int) ([]MedicationConstraint, error) {
	rows, err := pool.Query("SELECT stored_medication_id, condition_type, max_threshold, min_threshold, duration FROM medication_constraint WHERE stored_medication_id = $1;", storedMedicationId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var constraints []MedicationConstraint
	for rows.Next() {
		var constraint MedicationConstraint
		err := rows.Scan(&constraint.StoredMedicationID, &constraint.ConditionType, &constraint.MaxThreshold, &constraint.MinThreshold, &constraint.Duration)
		if err != nil {
			return nil, err
		}
		constraints = append(constraints, constraint)
	}

	return constraints, rows.Err()
}

// Get a User by Email
func UserByEmail(pool *pgx.Conn, user_email string) (*User, error) {
	user := &User{
		Email: user_email,
	}

	query := "SELECT user_id, first_name, last_name FROM \"user\" WHERE email = $1;"
	err := pool.QueryRow(query, user_email).Scan(&user.UserID, &user.FirstName, &user.LastName)

	if err != nil {
		if err == pgx.ErrNoRows {
			// Return an empty user if no rows are found
			return nil, nil
		}
		return nil, err
	}

	return user, nil
}

// CRUD functions for the expo_notification_token table.

// WriteExpoNotificationTokenToDb inserts a new expo_notification_token record into the database.
func WriteExpoNotificationTokenToDb(pool *pgx.Conn, token ExpoNotificationToken) (ExpoNotificationToken, error) {
	var insertedToken ExpoNotificationToken
	err := pool.QueryRow(`
		INSERT INTO expo_notification_token (user_id, device_token)
		VALUES ($1, $2)
		ON CONFLICT (user_id)
		DO UPDATE SET device_token = $2
		RETURNING expo_notification_token_id;
	`, token.UserID, token.DeviceToken).Scan(&insertedToken.ExpoNotificationTokenID)
	if err != nil {
		return ExpoNotificationToken{}, err
	}
	return insertedToken, nil
}

// GetExpoNotificationTokenFromDB retrieves an expo_notification_token record from the database by user ID.
func GetExpoNotificationTokenFromDB(pool *pgx.Conn, userID string) (ExpoNotificationToken, error) {
	token := ExpoNotificationToken{UserID: userID}
	query := fmt.Sprintf("SELECT expo_notification_token_id, user_id, device_token FROM expo_notification_token WHERE user_id = $1;")
	err := pool.QueryRow(query, userID).Scan(&token.ExpoNotificationTokenID, &token.UserID, &token.DeviceToken)
	if err != nil {
		return ExpoNotificationToken{}, err
	}
	return token, nil
}

// UpdateExpoNotificationToken updates an expo_notification_token record in the database.
func UpdateExpoNotificationToken(pool *pgx.Conn, token ExpoNotificationToken) error {
	commandTag, err := pool.Exec("UPDATE expo_notification_token SET device_token = $1 WHERE user_id = $2;",
		token.DeviceToken, token.UserID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeleteExpoNotificationTokenFromDB deletes an expo_notification_token record from the database.
func DeleteExpoNotificationTokenFromDB(pool *pgx.Conn, userID string) error {
	commandTag, err := pool.Exec("DELETE FROM expo_notification_token WHERE user_id = $1;", userID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllExpoNotificationTokensFromDB retrieves all expo_notification_token records from the database.
func GetAllExpoNotificationTokensFromDB(pool *pgx.Conn) ([]ExpoNotificationToken, error) {
	rows, err := pool.Query("SELECT expo_notification_token_id, user_id, device_token FROM expo_notification_token;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tokens []ExpoNotificationToken
	for rows.Next() {
		var token ExpoNotificationToken
		err := rows.Scan(&token.ExpoNotificationTokenID, &token.UserID, &token.DeviceToken)
		if err != nil {
			return nil, err
		}
		tokens = append(tokens, token)
	}

	return tokens, rows.Err()
}
