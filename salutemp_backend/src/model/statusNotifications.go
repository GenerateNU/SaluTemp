package model

import (
	"fmt"
	"math/rand"
	"strings"
	"time"

	expo "github.com/oliveroneill/exponent-server-sdk-golang/sdk"
)

var pushClient = expo.NewPushClient(nil)
var pushToken = buildPushToken()

func buildPushToken() expo.ExponentPushToken {
	pushToken, err := expo.NewExponentPushToken("ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]")
	if err != nil {
		fmt.Println("error when generating expo push notification token: ", err)
	}
	return pushToken
}

func SaveStatusReportTicker(m *PgModel) {
	ticker := time.NewTicker(30 * time.Second)
	done := make(chan bool)

	userId := 201

	go func() {
		for {
			select {
			case <-done:
				return
			case t := <-ticker.C:
				saveStatusReport(m, userId, t)
			}
		}
	}()
}

// Saves status report and sends push notification if conditions are not ideal
func saveStatusReport(m *PgModel, userId int, t time.Time) {

	storedMedications, err := m.GetAllStoredMedsFromDBByUser(userId)

	if err != nil {
		fmt.Printf("Error when getting stored medicaitons: %v", err)
		return
	}

	for _, storedMedication := range storedMedications {
		//TODO: When bluetooth is implemented, we want to use real data. For now, mocking the status report data.
		currentTemperature := float64(rand.Intn(32) + 50)
		currentHumidity := float64(rand.Intn(10) + 20)
		currentLight := float64(rand.Intn(10))

		report := StatusReport{
			EventTime:          t,
			StoredMedicationID: storedMedication.StoredMedicationID,
			Temperature:        currentTemperature,
			Humidity:           currentHumidity,
			Light:              currentLight,
		}

		m.AddStatusReport(report)

		constraints, err := m.AllMedicationConstraintsByStoredMedication(storedMedication.StoredMedicationID)
		if err != nil {
			fmt.Printf("Error when getting stored medicaiton constraints: %v, medication: %v", err, storedMedication.StoredMedicationID)
			return
		}

		for _, constraint := range constraints {
			switch conditionType := constraint.ConditionType; conditionType {
			case "TEMPERATURE":
				if currentTemperature > constraint.MaxThreshold {
					handleConstraintViolation(constraint, report)
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

func handleConstraintViolation(constraint MedicationConstraint, report StatusReport) {

	response, err := pushClient.Publish(
		buildStatusPushNotification(constraint),
	)

	if err != nil {
		panic(err)
	}

	// Validate responses
	if response.ValidateResponse() != nil {
		fmt.Println(response.PushMessage.To, "failed")
	}
}

func buildStatusPushNotification(constraint MedicationConstraint) *expo.PushMessage {
	body := fmt.Sprintf("Heads up! Salutemp detected that your medication violated its %v constraint!", strings.ToLower(constraint.ConditionType))

	return &expo.PushMessage{
		To:       []expo.ExponentPushToken{pushToken},
		Body:     body,
		Title:    "Salutemp",
		Priority: expo.DefaultPriority,
		Sound:    "default",
	}
}
