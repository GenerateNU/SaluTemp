package model

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/jackc/pgx"
)

/*
 * This file contains the CRUD functions for the medications, patients, 
 * checked_out_medications, holds, and liked_medications tables.
 * and also has the structs for the corresponding tables.
 * CRUD format for each table:
 * Write(pool *pgx.Conn, med Medication) (Medication, error)
 * Get(pool *pgx.Conn, med_id int64) (Medication, error)
 * Edit(pool *pgx.Conn, med Medication) error
 * Delete(pool *pgx.Conn, medID int64) error
 * GetAllFromDB(pool *pgx.Conn) ([]Medication, error)
*/

// Medication represents a medication record.
type Medication struct {
	MedID  int64  `json:"med_id"`
	Title  string `json:"title"`
	Author string `json:"author"`
}

// Patient represents a patient record.
type Patient struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

// CheckedOutMedication represents a medication that has been checked out.
type CheckedOutMedication struct {
	CheckoutID          int64  `json:"checkout_id"`
	MedID               int64  `json:"med_id"`
	ID                  int64  `json:"id"`
	ExpectedReturnDate  string `json:"expected_return_date"`
}

// Hold represents a hold on a medication.
type Hold struct {
	HoldID          int64  `json:"hold_id"`
	MedID           int64  `json:"med_id"`
	ID              int64  `json:"id"`
	HoldCreationDate string `json:"hold_creation_date"`
}

// LikedMedication represents a medication that has been liked.
type LikedMedication struct {
	LikeID int64 `json:"like_id"`
	MedID  int64 `json:"med_id"`
	ID     int64 `json:"id"`
}


// CRUD functions for the medications table.
// WriteMedToDb inserts a new medication record into the database.
func WriteMedToDb(pool *pgx.Conn, med Medication) (Medication, error) {
	var insertedMed Medication
	err := pool.QueryRow("INSERT INTO medications (med_id, title, author) VALUES ($1, $2, $3) RETURNING med_id;", med.MedID, med.Title, med.Author).Scan(&insertedMed.MedID)
	if err != nil {
		return Medication{}, err
	}
	return insertedMed, nil
}

// GetMedFromDB retrieves a medication record from the database by medication ID.
func GetMedFromDB(pool *pgx.Conn, medID int64) (Medication, error) {
	med := Medication{MedID: medID}
	query := fmt.Sprintf("SELECT med_id, title, author FROM medications WHERE med_id = $1;")
	err := pool.QueryRow(query, medID).Scan(&med.MedID, &med.Title, &med.Author)
	if err != nil {
		return Medication{}, err
	}
	return med, nil
}

// EditMedication updates a medication record in the database.
func EditMedication(pool *pgx.Conn, med Medication) error {
	commandTag, err := pool.Exec("UPDATE medications SET title = $1, author = $2 WHERE med_id = $3;", med.Title, med.Author, med.MedID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeleteMedFromDB deletes a medication record from the database.
func DeleteMedFromDB(pool *pgx.Conn, medID int64) error {
	commandTag, err := pool.Exec("DELETE FROM medications WHERE med_id = $1;", medID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllMedsFromDB retrieves all medication records from the database.
func GetAllMedsFromDB(pool *pgx.Conn) ([]Medication, error) {
	rows, err := pool.Query("SELECT med_id, title, author FROM medications;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var meds []Medication
	for rows.Next() {
		var med Medication
		err := rows.Scan(&med.MedID, &med.Title, &med.Author)
		if err != nil {
			return nil, err
		}
		meds = append(meds, med)
	}

	return meds, rows.Err()
}


// CRUD functions for patients table
// WritePatientToDb inserts a new patient record into the database.
func WritePatientToDb(pool *pgx.Conn, patient Patient) (Patient, error) {
	var insertedPatient Patient
	err := pool.QueryRow("INSERT INTO patients (id, name) VALUES ($1, $2) RETURNING id;", patient.ID, patient.Name).Scan(&insertedPatient.ID)
	if err != nil {
		return Patient{}, err
	}
	return insertedPatient, nil
}

// GetPatientFromDB retrieves a patient record from the database by patient ID.
func GetPatientFromDB(pool *pgx.Conn, patientID int64) (Patient, error) {
	patient := Patient{ID: patientID}
	query := fmt.Sprintf("SELECT id, name FROM patients WHERE id = $1;")
	err := pool.QueryRow(query, patientID).Scan(&patient.ID, &patient.Name)
	if err != nil {
		return Patient{}, err
	}
	return patient, nil
}

// EditPatient updates a patient record in the database.
func EditPatient(pool *pgx.Conn, patient Patient) error {
	commandTag, err := pool.Exec("UPDATE patients SET name = $1 WHERE id = $2;", patient.Name, patient.ID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeletePatientFromDB deletes a patient record from the database.
func DeletePatientFromDB(pool *pgx.Conn, patientID int64) error {
	commandTag, err := pool.Exec("DELETE FROM patients WHERE id = $1;", patientID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllPatientsFromDB retrieves all patient records from the database.
func GetAllPatientsFromDB(pool *pgx.Conn) ([]Patient, error) {
	rows, err := pool.Query("SELECT id, name FROM patients;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var patients []Patient
	for rows.Next() {
		var patient Patient
		err := rows.Scan(&patient.ID, &patient.Name)
		if err != nil {
			return nil, err
		}
		patients = append(patients, patient)
	}

	return patients, rows.Err()
}


// CRUD functions for checkouts table
// WriteCheckedOutMedToDb inserts a new CheckedOutMedication record into the database.
func WriteCheckedOutMedToDb(pool *pgx.Conn, checkedOutMed CheckedOutMedication) (CheckedOutMedication, error) {
	var insertedCheckedOutMed CheckedOutMedication
	err := pool.QueryRow("INSERT INTO checked_out_meds (checkout_id, med_id, id, expected_return_date) VALUES ($1, $2, $3, $4) RETURNING checkout_id;", checkedOutMed.CheckoutID, checkedOutMed.MedID, checkedOutMed.ID, checkedOutMed.ExpectedReturnDate).Scan(&insertedCheckedOutMed.CheckoutID)
	if err != nil {
		return CheckedOutMedication{}, err
	}
	return insertedCheckedOutMed, nil
}

// GetCheckedOutMedFromDB retrieves a CheckedOutMedication record from the database by checkout ID.
func GetCheckedOutMedFromDB(pool *pgx.Conn, checkoutID int64) (CheckedOutMedication, error) {
	checkedOutMed := CheckedOutMedication{CheckoutID: checkoutID}
	query := fmt.Sprintf("SELECT checkout_id, med_id, id, expected_return_date FROM checked_out_meds WHERE checkout_id = $1;")
	err := pool.QueryRow(query, checkoutID).Scan(&checkedOutMed.CheckoutID, &checkedOutMed.MedID, &checkedOutMed.ID, &checkedOutMed.ExpectedReturnDate)
	if err != nil {
		return CheckedOutMedication{}, err
	}
	return checkedOutMed, nil
}

// EditCheckedOutMed updates a CheckedOutMedication record in the database.
func EditCheckedOutMed(pool *pgx.Conn, checkedOutMed CheckedOutMedication) error {
	commandTag, err := pool.Exec("UPDATE checked_out_meds SET expected_return_date = $1 WHERE checkout_id = $2;", checkedOutMed.ExpectedReturnDate, checkedOutMed.CheckoutID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows updated")
	}
	return nil
}

// DeleteCheckedOutMedFromDB deletes a CheckedOutMedication record from the database.
func DeleteCheckedOutMedFromDB(pool *pgx.Conn, checkoutID int64) error {
	commandTag, err := pool.Exec("DELETE FROM checked_out_meds WHERE checkout_id = $1;", checkoutID)
	if err != nil {
		return err
	}
	if commandTag.RowsAffected() == 0 {
		return errors.New("no rows deleted")
	}
	return nil
}

// GetAllCheckedOutMedsFromDB retrieves all CheckedOutMedication records from the database.
func GetAllCheckedOutMedsFromDB(pool *pgx.Conn) ([]CheckedOutMedication, error) {
	rows, err := pool.Query("SELECT checkout_id, med_id, id, expected_return_date FROM checked_out_meds;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var checkedOutMeds []CheckedOutMedication
	for rows.Next() {
		var checkedOutMed CheckedOutMedication
		err := rows.Scan(&checkedOutMed.CheckoutID, &checkedOutMed.MedID, &checkedOutMed.ID, &checkedOutMed.ExpectedReturnDate)
		if err != nil {
			return nil, err
		}
		checkedOutMeds = append(checkedOutMeds, checkedOutMed)
	}

	return checkedOutMeds, rows.Err()
}

// CRUD functions for holds table
// WriteHoldToDB inserts a new Hold record into the database and returns the inserted record.
func WriteHoldToDB(pool *pgx.Conn, hold Hold) (Hold, error) {
	var insertedHold Hold
	err := pool.QueryRow("INSERT INTO holds (med_id, id, placed_on) VALUES ($1, $2, $3) RETURNING hold_id;", hold.MedID, hold.ID, hold.PlacedOn).Scan(&insertedHold.HoldID)
	if err != nil {
		return Hold{}, err
	}
	return insertedHold, nil
}

// GetHoldFromDB retrieves a single hold record by hold_id from the database.
func GetHoldFromDB(pool *pgx.Conn, holdID int) (*Hold, error) {
	var hold Hold
	err := pool.QueryRow("SELECT hold_id, med_id, id, placed_on FROM holds WHERE hold_id = $1;", holdID).Scan(&hold.HoldID, &hold.MedID, &hold.ID, &hold.PlacedOn)
	if err != nil {
		return nil, err
	}
	return &hold, nil
}

// EditHoldInDB updates an existing hold record in the database.
func EditHoldInDB(pool *pgx.Conn, hold Hold) error {
	_, err := pool.Exec("UPDATE holds SET med_id = $1, id = $2, placed_on = $3 WHERE hold_id = $4;", hold.MedID, hold.ID, hold.PlacedOn, hold.HoldID)
	if err != nil {
		return err
	}
	return nil
}

// DeleteHoldFromDB removes a hold record by hold_id from the database.
func DeleteHoldFromDB(pool *pgx.Conn, holdID int) error {
	_, err := pool.Exec("DELETE FROM holds WHERE hold_id = $1;", holdID)
	if err != nil {
		return err
	}
	return nil
}

// GetAllHoldsFromDB retrieves all Hold records from the database.
func GetAllHoldsFromDB(pool *pgx.Conn) ([]Hold, error) {
	rows, err := pool.Query("SELECT hold_id, med_id, id, placed_on FROM holds;")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var holds []Hold
	for rows.Next() {
		var hold Hold
		err := rows.Scan(&hold.HoldID, &hold.MedID, &hold.ID, &hold.PlacedOn)
		if err != nil {
			return nil, err
		}
		holds = append(holds, hold)
	}

	return holds, rows.Err()
}



