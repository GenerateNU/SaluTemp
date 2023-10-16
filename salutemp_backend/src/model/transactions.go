package model

import (
	"fmt"
    "strconv"
	"github.com/jackc/pgx"
)

// CRUD functions for the medications table
// WriteMedToDb inserts a new medication record into the database and returns the updated medication object with the assigned ID.
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

// GetMedFromDB retrieves a medication record from the database based on the given medication ID.
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

// GetAllMedsFromDB retrieves all medication records from the database.
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

// EditMedication updates a given medication in the database
func EditMedication(pool *pgx.Conn, med Medication) error {
	_, err := pool.Exec(
		"UPDATE medications SET title = $2, author = $3 WHERE med_id = $1",
		med.MedID, med.Title, med.Author,
	)
	return err
}

// CRUD functions for the patients table
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

// DeletePatient deletes a given patient from the database
func DeletePatient(pool *pgx.Conn, id int64) error {
	_, err := pool.Exec(fmt.Sprintf("DELETE FROM patients WHERE id = %d;", id))
	return err
}

// EditPatient updates a given patient in the database
func EditPatient(pool *pgx.Conn, user Patient) error {
	_, err := pool.Exec(
		"UPDATE patients SET name = $2 WHERE id = $1",
		user.ID, user.Name,
	)
	return err
}

// CRUD functions for the checked_out_medications table
// WriteCheckoutToDb inserts a new checkout record into the database and returns the updated checkout object with the assigned ID.
func WriteCheckoutToDb(pool *pgx.Conn, checkout CheckedOutMedication) (CheckedOutMedication, error) {
	var insertedCheckout CheckedOutMedication
	err := pool.QueryRow("INSERT INTO checked_out_medications (med_id, id, expected_return_date) VALUES ($1, $2, $3) RETURNING checkout_id;", checkout.MedID, checkout.ID, checkout.ExpectedReturnDate).Scan(&insertedCheckout.CheckoutID)

	if err != nil {
		return CheckedOutMedication{}, err
	}

	return insertedCheckout, nil
}

// GetCheckoutFromDb retrieves a checkout record from the database based on the given checkout ID.
func GetCheckoutFromDb(pool *pgx.Conn, checkoutID int64) (CheckedOutMedication, error) {
    var checkout CheckedOutMedication
    err := pool.QueryRow("SELECT * FROM checked_out_medications WHERE checkout_id = $1;", checkoutID).Scan(&checkout.CheckoutID, &checkout.MedID, &checkout.ID, &checkout.ExpectedReturnDate)

    if err != nil {
        return CheckedOutMedication{}, err
    }

    return checkout, nil
}

// EditCheckout updates a given checkout in the database
func EditCheckout(pool *pgx.Conn, checkout CheckedOutMedication) error {
    _, err := pool.Exec(
        "UPDATE checked_out_medications SET med_id = $2, id = $3, expected_return_date = $4 WHERE checkout_id = $1;",
        checkout.CheckoutID, checkout.MedID, checkout.ID, checkout.ExpectedReturnDate,
    )
    return err
}

// DeleteCheckoutFromDb deletes a given checkout from the database
func DeleteCheckoutFromDb(pool *pgx.Conn, checkoutID int64) error {
    _, err := pool.Exec("DELETE FROM checked_out_medications WHERE checkout_id = $1;", checkoutID)
    return err
}

// GetAllCheckoutsFromDb retrieves all checkout records from the database.
func GetAllCheckoutsFromDb(pool *pgx.Conn) ([]CheckedOutMedication, error) {
    rows, err := pool.Query("SELECT * FROM checked_out_medications;")

    if err != nil {
        return nil, err
    }

    var checkouts []CheckedOutMedication
    defer rows.Close()

    for rows.Next() {
        var checkout CheckedOutMedication
        err := rows.Scan(&checkout.CheckoutID, &checkout.MedID, &checkout.ID, &checkout.ExpectedReturnDate)
        
        if err != nil {
            return nil, err
        }

        checkouts = append(checkouts, checkout)
    }

    return checkouts, nil
}

// CRUD functions for the holds table
func WriteHoldToDb(pool *pgx.Conn, hold Hold) (Hold, error) {
	var insertedHold Hold
	err := pool.QueryRow("INSERT INTO holds (med_id, id, hold_creation_date) VALUES ($1, $2, $3) RETURNING hold_id;", hold.MedID, hold.ID, hold.HoldCreationDate).Scan(&insertedHold.HoldID)

	if err != nil {
		return Hold{}, err
	}

	return insertedHold, nil
}

// CRUD functions for the liked_medications table
// WriteLikeToDb inserts a new liked medication record into the database and returns the updated liked medication object with the assigned ID.
func WriteLikeToDb(pool *pgx.Conn, like LikedMedication) (LikedMedication, error) {
	var insertedLike LikedMedication
	err := pool.QueryRow("INSERT INTO liked_medications (med_id, id) VALUES ($1, $2) RETURNING like_id;", like.MedID, like.ID).Scan(&insertedLike.LikeID)

	if err != nil {
		return LikedMedication{}, err
	}

	return insertedLike, nil
}




