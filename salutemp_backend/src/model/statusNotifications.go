package model

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/jackc/pgx"
)

func SaveStatusReportTicker(conn *pgx.Conn) {
	ticker := time.NewTicker(5 * time.Second)
	done := make(chan bool)

	userId := 1

	defer conn.Close()

	go func() {
		for {
			select {
			case <-done:
				return
			case t := <-ticker.C:
				saveStatusReport(conn, userId, t)
			}
		}
	}()
}

// Saves status report and sends push notification if conditions are not ideal
func saveStatusReport(conn *pgx.Conn, userId int, t time.Time) {

	storedMedications, err := GetAllStoredMedsFromDBByUser(conn, userId)
	if err != nil {
		fmt.Printf("Error when getting stored medicaitons: %v", err)
		return
	}

	for _, storedMedication := range storedMedications {
		//TODO: When bluetooth is implemented, we want to use real data. For now, mocking the status report data.
		currentTemperature := float64(rand.Intn(10) + 65)
		currentHumidity := float64(rand.Intn(10) + 20)
		currentLight := float64(rand.Intn(10))

		report := StatusReport{
			EventTime:          t,
			StoredMedicationID: storedMedication.StoredMedicationID,
			Temperature:        currentTemperature,
			Humidity:           currentHumidity,
			Light:              currentLight,
		}

		WriteStatusReportToDb(conn, report)

		constraints, err := GetAllStoredMedConstraintsFromDB(conn, storedMedication.StoredMedicationID)
		if err != nil {
			fmt.Printf("Error when getting stored medicaiton constraints: %v, medication: %v", err, storedMedication.StoredMedicationID)
			return
		}

		for _, constraint := range constraints {
			switch conditionType := constraint.ConditionType; conditionType {
			case "TEMPERATURE":
				if currentTemperature > constraint.MaxThreshold {
					fmt.Printf("Temperature upper threshold exceeded for medication %v", storedMedication.StoredMedicationID)
				}
				if currentTemperature < constraint.MinThreshold {
					fmt.Printf("Temperature lower threshold exceeded for medication %v", storedMedication.StoredMedicationID)
				}
			case "HUMIDITY":
				if currentHumidity > constraint.MaxThreshold {
					fmt.Printf("Humidity upper threshold exceeded for medication %v", storedMedication.StoredMedicationID)
				}
				if currentHumidity < constraint.MinThreshold {
					fmt.Printf("Humidity lower threshold exceeded for medication %v", storedMedication.StoredMedicationID)
				}
			case "LIGHT_EXPOSURE":
				if currentLight > constraint.MaxThreshold {
					fmt.Printf("Light upper threshold exceeded for medication %v", storedMedication.StoredMedicationID)
				}
			}
		}

		//TODO: Handle duration logic, we want to track if the conditions have been bad for a certain amount of time.
	}
}
