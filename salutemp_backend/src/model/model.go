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
	DeleteMedication(int64) error
	EditMedication(Medication) error

	Patient(int64) Patient
	AllPatients() ([]Patient, error)
	AddPatient(Patient) (Patient, error)
	DeletePatient(int64) error
	EditPatient(Patient) error
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

// Function to delete a single medication from the list of medications
func (m *PgModel) DeleteMedication(id int64) error {
	err := DeleteMedFromDB(m.Conn, id)
	// Return error if there is an error
	if err != nil {
		return err
	}
	// Nothing to return upon a successful deletion
	return nil
}

func (m *PgModel) EditMedication(med Medication) error {
	err := EditMedication(m.Conn, med)
	return err
}

func (m *PgModel) AllMedications() ([]Medication, error) {
	meds, err := GetAllMedsFromDB(m.Conn)

	if err != nil {
		return []Medication{}, err
	}
	return meds, nil
}

func (m *PgModel) Patient(id int64) Patient {
	patient, err := GetPatientFromDB(m.Conn, id)

	if err != nil {
		panic(err)
	}

	return patient
}

func (m *PgModel) AddPatient(patient Patient) (Patient, error) {
	p, err := WritePatientToDb(m.Conn, patient)

	if err != nil {
		return Patient{}, err
	}

	return p, nil
}

func (m *PgModel) DeletePatient(id int64) error {
	err := DeletePatient(m.Conn, id)
	return err
}

func (m *PgModel) EditPatient(patient Patient) error {
	err := EditPatient(m.Conn, patient)
	return err
}

func (m *PgModel) AllPatients() ([]Patient, error) {
	pat, err := GetAllPatientsFromDB(m.Conn)

	if err != nil {
		return []Patient{}, err
	}
	return pat, nil
}
