package model

import (
	"fmt"
    "strconv"
	"github.com/jackc/pgx"
)

func WriteMedToDb(pool *pgx.Conn, med Medication) (Medication, error) {
	var insertedMed Medication
	err := pool.QueryRow("INSERT INTO medications (med_id, title, author) VALUES ($1, $2, $3) RETURNING med_id;", strconv.FormatInt(med.MedID, 10), med.Title, med.Author).Scan(&insertedMed.MedID)

	if err != nil {
		return Medication{}, err
	}

	return insertedMed, nil
}

// Function to delete a given medication from the medication table
func DeleteMedFromDB(pool *pgx.Conn, medID int64) error {
	_, err := pool.Exec(fmt.Sprintf("DELETE FROM medications WHERE med_id = %d;", medID))

	if err != nil {
		return err
	} else {
		// return nil because there is nothing to return upon a successful deltion
		return nil
	}

}

func GetMedFromDB(pool *pgx.Conn, med_id int64) (Medication, error) {
	med := Medication{
		MedID: med_id,
	}

	var bid int
	err := pool.QueryRow(fmt.Sprintf("SELECT * FROM medications where med_id = '%d';", med_id)).Scan(&bid, &med.Title, &med.Author)

	if err != nil {
		panic(err)
	}

	return med, nil
}

func GetAllMedsFromDB(pool *pgx.Conn) ([]Medication, error) {
	rows, err := pool.Query("SELECT med_id, title, author FROM medications;")

	if err != nil {
		panic(err)
	}

	results := []Medication{}

	defer rows.Close()

	for rows.Next() {
		med := Medication{}
		err := rows.Scan(&med.MedID, &med.Title, &med.Author)

		if err != nil {
			panic(err)
		}

		results = append(results, med)
	}

	return results, nil
}

func EditMedication(pool *pgx.Conn, med Medication) error {
	_, err := pool.Exec(
		"UPDATE medications SET title = $2, author = $3 WHERE med_id = $1",
		med.MedID, med.Title, med.Author,
	)
	return err
}

///patients transactions

///

// WritePatientToDb inserts a new patient record into the database and returns the updated patient object with the assigned ID.
func WritePatientToDb(pool *pgx.Conn, patient Patient) (Patient, error) {
	var insertedPatient Patient

	err := pool.QueryRow("INSERT INTO patients (id, name) VALUES ($1, $2) RETURNING id;", strconv.FormatInt(patient.ID, 10), patient.Name).Scan(&insertedPatient.ID)


	if err != nil {
		return Patient{}, err
	}

	return insertedPatient, nil
}

// GetPatientFromDB retrieves a patient record from the database based on the given patient ID.
func GetPatientFromDB(pool *pgx.Conn, id int64) (Patient, error) {
	patient := Patient{
		ID: id,
	}

	err := pool.QueryRow(
		"SELECT * FROM patients WHERE id = $1;",
		id,
	).Scan(&patient.ID, &patient.Name)

	if err != nil {
		panic(err)
	}

	return patient, nil
}

// GetAllPatientsFromDB retrieves all patient records from the database.
func GetAllPatientsFromDB(pool *pgx.Conn) ([]Patient, error) {
	rows, err := pool.Query("SELECT * FROM patients;")

	if err != nil {
		panic(err)
	}

	results := []Patient{}

	defer rows.Close()

	for rows.Next() {
		patient := Patient{}
		err := rows.Scan(&patient.ID, &patient.Name)

		if err != nil {
			panic(err)
		}

		results = append(results, patient)
	}

	return results, nil
}

func DeletePatient(pool *pgx.Conn, id int64) error {
	_, err := pool.Exec(fmt.Sprintf("DELETE FROM patients WHERE id = %d;", id))
	return err
}

func EditPatient(pool *pgx.Conn, user Patient) error {
	_, err := pool.Exec(
		"UPDATE patients SET name = $2 WHERE id = $1",
		user.ID, user.Name,
	)
	return err
}
