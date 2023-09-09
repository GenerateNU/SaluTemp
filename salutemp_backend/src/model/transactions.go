package model

import (
	"fmt"

	"github.com/jackc/pgx"
)

func WriteMedToDb(pool *pgx.Conn, med Medication) (Medication, error) {

	err := pool.QueryRow(fmt.Sprintf("INSERT INTO medications (title, author) VALUES ('%s','%s') RETURNING med_id;", med.Title, med.Author)).Scan(&med.MedID)

	if err != nil {
		return Medication{}, err
	}

	return med, nil
}

func GetMedFromDB(pool *pgx.Conn, med_id int64) (Medication, error) {
	med := Medication{
		MedID: med_id,
	}

	var bid int
	err := pool.QueryRow(fmt.Sprintf("SELECT med_id, title, author FROM medications where med_id = '%d';", med_id)).Scan(&bid, &med.Title, &med.Author)

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
