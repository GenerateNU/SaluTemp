package model

import (
	"time"
	"fmt"
	"github.com/jackc/pgx"
	"strings"
)

type PgModel struct {
	Conn *pgx.Conn
}

type Model interface {
	Medication(int) Medication
	AllMedications() ([]Medication, error)
	AddMedication(Medication) (Medication, error)
	DeleteMedication(int) error
	EditMedication(Medication) error
	GetUserByEmail(email string) (*User, error)
	
	User(string) User
	AllUsers() ([]User, error)
	AddUser(User) (User, error)
	DeleteUser(string) error
	EditUser(User) error

	UserDevice(int) UserDevice
    AllUserDevices() ([]UserDevice, error)
    AddUserDevice(UserDevice) (UserDevice, error)
    DeleteUserDevice(int) error
    EditUserDevice(UserDevice) error

	StoredMedication(int) (StoredMedication,error)
	AllStoredMedications() ([]StoredMedication, error)
	AddStoredMedication(StoredMedication) (StoredMedication, error)
	DeleteStoredMedication(int) error
	EditStoredMedication(StoredMedication) error
	GetAllStoredMedsFromDBByUser(userId string) (userMeds []StoredMedication, err error)

	Alert(int) (Alert,error)
    AllAlerts() ([]Alert, error)
    AddAlert(Alert) (Alert, error)
    DeleteAlert(int) error
    EditAlert(Alert) error

    StatusReport(time.Time, int) (StatusReport, error)
    AllStatusReports() ([]StatusReport, error)
    AddStatusReport(StatusReport) (StatusReport, error)
    DeleteStatusReport(time.Time, int) error
    EditStatusReport(StatusReport) error

    MedicationConstraint(int, string) (MedicationConstraint, error)
    AllMedicationConstraints() ([]MedicationConstraint, error)
    AddMedicationConstraint(MedicationConstraint) (MedicationConstraint,error)
    DeleteMedicationConstraint(int, string) error
    EditMedicationConstraint(MedicationConstraint) error
	AllMedicationConstraintsByStoredMedication(storedMedicationId int) (medConstraints []MedicationConstraint, err error)

	ExpoNotificationToken(string) (ExpoNotificationToken, error)
	AddExpoNotificationToken(ExpoNotificationToken) (ExpoNotificationToken, error)
	DeleteExpoNotificationToken(string) error
	EditExpoNotificationToken(ExpoNotificationToken) error
	AllExpoNotificationTokens() ([]ExpoNotificationToken, error)

    GetAllUserMedicationsWithConstraint(userId string, constraint string) ([]StoredMedicationWithConstraint, error)
}

func (m *PgModel) Medication(id int) Medication {
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
func (m *PgModel) DeleteMedication(id int) error {
	err := DeleteMedFromDB(m.Conn, id)
	// Return error if there is an error
	if err != nil {
		return err
	}
	// Nothing to return upon a successful deletion
	return nil
}

func (m *PgModel) EditMedication(med Medication) (error) {
	err := EditMedicationToDB(m.Conn, med)
	return err
}

func (m *PgModel) GetUserByEmail(email string) (*User, error) {
    user, err := UserByEmail(m.Conn, email)
    if err != nil {
        // Handle the error, log it, or return it based on your application's requirements.
        return nil, err
    }
    
    // Do something with the retrieved user, if needed.

    return user, nil
}


func (m *PgModel) AllMedications() ([]Medication, error) {
	meds, err := GetAllMedsFromDB(m.Conn)

	if err != nil {
		return []Medication{}, err
	}
	return meds, nil
}

func (m *PgModel) User(id string) User {
	user, err := GetUserFromDB(m.Conn, id)

	if err != nil {
		panic(err)
	}

	return user
}

func (m *PgModel) AddUser(user User) (User, error) {
	p, err := WriteUserToDb(m.Conn, user)

	if err != nil {
		return User{}, err
	}

	return p, nil
}

func (m *PgModel) DeleteUser(id string) error {
	err := DeleteUserFromDB(m.Conn, id)
	return err
}

func (m *PgModel) EditUser(user User) error {
	err := UpdateUser(m.Conn, user)
	return err
}

func (m *PgModel) AllUsers() ([]User, error) {
	user, err := GetAllUsersFromDB(m.Conn)

	if err != nil {
		return []User{}, err
	}
	return user, nil
}

//user devices
func (m *PgModel) UserDevice(id int) UserDevice {
    userDevice, err := GetUserDeviceFromDB(m.Conn, id)

    if err != nil {
        panic(err)
    }

    return userDevice
}

func (m *PgModel) AddUserDevice(userDevice UserDevice) (UserDevice, error) {
    u, err := WriteUserDeviceToDb(m.Conn, userDevice)

    if err != nil {
        return UserDevice{}, err
    }

    return u, nil
}

func (m *PgModel) DeleteUserDevice(id int) error {
    err := DeleteUserDeviceFromDB(m.Conn, id)
    return err
}

func (m *PgModel) EditUserDevice(userDevice UserDevice) error {
    err := UpdateUserDevice(m.Conn, userDevice)
    return err
}

func (m *PgModel) AllUserDevices() ([]UserDevice, error) {
    userDevices, err := GetAllUserDevicesFromDB(m.Conn)

    if err != nil {
        return []UserDevice{}, err
    }
    return userDevices, nil
}



//stored medications

func (m *PgModel) StoredMedication(id int) (StoredMedication,error) {
	med, err := GetStoredMedFromDB(m.Conn, id)

	if err != nil {
		panic(err)
	}

	return med,err
}

func (m *PgModel) AddStoredMedication(storedMed StoredMedication) (StoredMedication, error) {
	b, err := WriteStoredMedToDb(m.Conn, storedMed)

	if err != nil {
		return StoredMedication{}, err
	}

	return b, nil
}

func (m *PgModel) DeleteStoredMedication(id int) error {
	err := DeleteStoredMedFromDB(m.Conn, id)

	if err != nil {
		return err
	}

	return nil
}

func (m *PgModel) EditStoredMedication(storedMed StoredMedication) error {
	err := UpdateStoredMed(m.Conn, storedMed)
	return err
}

func (m *PgModel) AllStoredMedications() ([]StoredMedication, error) {
	meds, err := GetAllStoredMedsFromDB(m.Conn)

	if err != nil {
		return []StoredMedication{}, err
	}
	return meds, nil
}


func (m *PgModel) AllMedicationConstraintsByStoredMedication(storedMedicationId int) (medConstraints []MedicationConstraint, err error) {
	constraints, err := GetAllMedConstraintsFromDB(m.Conn)

	for _, constraint := range constraints {
		if constraint.StoredMedicationID == storedMedicationId {
			medConstraints = append(medConstraints, constraint)
		}
	}

	if err != nil {
		return []MedicationConstraint{}, err
	}
	return medConstraints, err
}

func (m *PgModel) GetAllStoredMedsFromDBByUser(userId string) (userMeds []StoredMedication, err error) {
	meds, err := GetAllStoredMedsFromDB(m.Conn)

	for _, med := range meds {
		if med.UserID == userId {
			userMeds = append(userMeds, med)
		}
	}

	if err != nil {
		return []StoredMedication{}, err
	}
	return userMeds, err
}

//alert routes


func (m *PgModel) Alert(id int) (Alert,error) {
    alert, err := GetAlertFromDB(m.Conn, id)

    if err != nil {
        panic(err)
    }

    return alert,err
}

func (m *PgModel) AddAlert(alert Alert) (Alert, error) {
    addedAlert, err := WriteAlertToDb(m.Conn, alert)

    if err != nil {
        return Alert{}, err
    }

    return addedAlert, nil
}

func (m *PgModel) DeleteAlert(id int) error {
    err := DeleteAlertFromDB(m.Conn, id)

    if err != nil {
        return err
    }

    return nil
}

func (m *PgModel) EditAlert(alert Alert) (error) {
    err := UpdateAlert(m.Conn, alert)
    return err
}

func (m *PgModel) AllAlerts() ([]Alert, error) {
    alerts, err := GetAllAlertsFromDB(m.Conn)

    if err != nil {
        return []Alert{}, err
    }

    return alerts, nil
}



//status reports

func (m *PgModel) StatusReport(eventTime time.Time, storedMedicationID int) (StatusReport, error) {
    event, err := GetStatusReportFromDB(m.Conn, eventTime, storedMedicationID)

    if err != nil {
        return StatusReport{}, err
    }

    return event, nil
}

func (m *PgModel) AllStatusReports() ([]StatusReport, error) {
    events, err := GetAllStatusReportsFromDB(m.Conn)

    if err != nil {
        return []StatusReport{}, err
    }

    return events, nil
}

func (m *PgModel) AddStatusReport(event StatusReport) (StatusReport, error) {
    insertedReport, err := WriteStatusReportToDb(m.Conn, event)
    if err != nil {
        return StatusReport{}, err
    }
    return insertedReport, nil
}


func (m *PgModel) DeleteStatusReport(eventTime time.Time, storedMedicationID int) error {
    err := DeleteStatusReportFromDB(m.Conn, eventTime, storedMedicationID)

    return err
}

func (m *PgModel) EditStatusReport(event StatusReport) error {
    err := UpdateStatusReport(m.Conn, event)

    return err
}


//medication contstraints

func (m *PgModel) MedicationConstraint(medicationID int, conditionType string) (MedicationConstraint, error) {
    constraint, err := GetMedConstraintFromDB(m.Conn, medicationID, conditionType)

    if err != nil {
        return MedicationConstraint{}, err
    }

    return constraint, nil
}

func (m *PgModel) AllMedicationConstraints() ([]MedicationConstraint, error) {
    constraints, err := GetAllMedConstraintsFromDB(m.Conn)

    if err != nil {
        return []MedicationConstraint{}, err
    }

    return constraints, nil
}

func (m *PgModel) AddMedicationConstraint(constraint MedicationConstraint) (MedicationConstraint,error) {
    insertedConstraint,err := WriteMedConstraintToDb(m.Conn, constraint)

	if err != nil {
        return MedicationConstraint{}, err
    }

    return insertedConstraint, nil
}

func (m *PgModel) DeleteMedicationConstraint(medicationID int, conditionType string) error {
    err := DeleteMedConstraintFromDB(m.Conn, medicationID, conditionType)

    return err
}

func (m *PgModel) EditMedicationConstraint(constraint MedicationConstraint) error {
    err := UpdateMedConstraint(m.Conn, constraint)

    return err
}

func (m *PgModel) GetAllUserMedicationsWithConstraint(userId string, constraint string) ([]StoredMedicationWithConstraint, error) {
	meds, err := GetAllStoredMedsFromDB(m.Conn)
	fmt.Println("hey")

	if err != nil {
		fmt.Println("Error getting all stored medications:", err)
		return []StoredMedicationWithConstraint{}, err
	}

	var userStoredMedsWithConstraint []StoredMedicationWithConstraint

	for _, med := range meds {
		if med.UserID == userId {
			fmt.Println("Processing medication for user:", userId)
			fmt.Println("The medication:", med)


			medName, err := GetMedFromDB(m.Conn, med.MedicationID)
			if err != nil {
				fmt.Println("Error getting medication name:", err)
				return []StoredMedicationWithConstraint{}, err
			}

			fmt.Println(med.MedicationID, " ",constraint, " COCONESTARING")

			tempConstraint, err := GetMedConstraintFromDB(m.Conn, med.MedicationID, strings.ToUpper(constraint))
			if err != nil {
				fmt.Println("Error getting medication constraint:", err)
				
				if err.Error() == "no rows in result set" {
					// Handle the specific case of no rows
					fmt.Println("No rows in result set")
					continue
				}else {
					// Handle other errors
					return []StoredMedicationWithConstraint{}, err
				}
			}
			
			var current float64
			
			switch (constraint) {
			case "temperature":
				current = med.CurrentTemperature
			case "light_exposure":
				current = med.CurrentLight
			case "humidity":
				current = med.CurrentHumidity
			}

			fmt.Printf("MedicationID: %d, MedicationName: %s, StoredMedicationID: %d, Type: %s, Current: %f, MaxThreshold: %f, MinThreshold: %f, Duration: %f\n",
				med.MedicationID, medName.MedicationName, med.StoredMedicationID, tempConstraint.ConditionType, current, tempConstraint.MaxThreshold, tempConstraint.MinThreshold, tempConstraint.Duration)

			var userStoredMedWithConstraint StoredMedicationWithConstraint = StoredMedicationWithConstraint{
				MedicationID:       med.MedicationID,
				MedicationName:     medName.MedicationName,
				StoredMedicationID: med.StoredMedicationID,
				Current:            current,
				MaxThreshold:       tempConstraint.MaxThreshold,
				MinThreshold:       tempConstraint.MinThreshold,
				Duration:           tempConstraint.Duration,
			}

			userStoredMedsWithConstraint = append(userStoredMedsWithConstraint, userStoredMedWithConstraint)
		}
	}

	fmt.Println("Finished processing all medications for user:", userId)
	return userStoredMedsWithConstraint, nil
}



func (m *PgModel) ExpoNotificationToken(userID string) (ExpoNotificationToken, error) {
	token, err := GetExpoNotificationTokenFromDB(m.Conn, userID)

	if err != nil {
		panic(err)
	}

	return token, nil
}

func (m *PgModel) AddExpoNotificationToken(token ExpoNotificationToken) (ExpoNotificationToken, error) {
	insertedToken, err := WriteExpoNotificationTokenToDb(m.Conn, token)

	if err != nil {
		return ExpoNotificationToken{}, err
	}

	return insertedToken, nil
}

func (m *PgModel) DeleteExpoNotificationToken(userID string) error {
	err := DeleteExpoNotificationTokenFromDB(m.Conn, userID)
	return err
}

func (m *PgModel) EditExpoNotificationToken(token ExpoNotificationToken) error {
	err := UpdateExpoNotificationToken(m.Conn, token)
	return err
}

func (m *PgModel) AllExpoNotificationTokens() ([]ExpoNotificationToken, error) {
	tokens, err := GetAllExpoNotificationTokensFromDB(m.Conn)

	if err != nil {
		return []ExpoNotificationToken{}, err
	}
	return tokens, nil
}