package model

import (
	"fmt"

	"github.com/jackc/pgx"
)

// WritePatientToDb inserts a new patient record into the database and returns the updated patient object with the assigned ID.
func WritePatientToDb(pool *pgx.Conn, patient Patient) (Patient, error) {
    err := pool.QueryRow(
        "INSERT INTO patients (name) VALUES ($1) RETURNING id;",
        patient.Name,
    ).Scan(&patient.ID)

    if err != nil {
        return Patient{}, err
    }

    return patient, nil
}

// GetPatientFromDB retrieves a patient record from the database based on the given patient ID.
func GetPatientFromDB(pool *pgx.Conn, id int64) (Patient, error) {
    patient := Patient{
        ID: id,
    }

    err := pool.QueryRow(
        "SELECT id, name FROM patients WHERE id = $1;",
        id,
    ).Scan(&patient.ID, &patient.Name)

    if err != nil {
        panic(err)
    }

    return patient, nil
}

// GetAllPatientsFromDB retrieves all patient records from the database.
func GetAllPatientsFromDB(pool *pgx.Conn) ([]Patient, error) {
    rows, err := pool.Query("SELECT id, name FROM patients;")

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
