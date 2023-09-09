package model

import (
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

type Model interface {
	Medication(int64) Medication
	AllMedications() ([]Medication, error)
	AddMedication(Medication) (Medication, error)
}

func (m *PgModel) Medication(id int64) Medication {
	med, err := GetMedFromDB(m.Conn, id)

	if err != nil {
		panic(err)
	}

	return med
}

func (m *PgModel) AddMedication(med Medication) (Medication, error) {
	b, err := WriteMedToDb(m.Conn, med)

	if err != nil {
		return Medication{}, err
	}

	return b, nil
}

func (m *PgModel) AllMedications() ([]Medication, error) {
	meds, err := GetAllMedsFromDB(m.Conn)

	if err != nil {
		return []Medication{}, err
	}
	return meds, nil
}
