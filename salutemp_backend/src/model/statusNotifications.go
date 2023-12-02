package model

import (
	"fmt"
	"math/rand"
	"os"
	"time"

	"github.com/jackc/pgx"
)

func saveStatusReportTicker() {
	ticker := time.NewTicker(30 * time.Second)
	done := make(chan bool)

	userId := 1

	db_url, exists := os.LookupEnv("DATABASE_URL")

	cfg := pgx.ConnConfig{
		User:     "user",
		Database: "salutemp",
		Password: "pwd",
		Host:     "localhost",
		Port:     5434,
	}
	var err error
	if exists {
		cfg, err = pgx.ParseConnectionString(db_url)

		if err != nil {
			panic(err)
		}
	}
	conn, err := pgx.Connect(cfg)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

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

func saveStatusReport(pool *pgx.Conn, userId int, t time.Time) {
	storedMedications, err := GetAllStoredMedsFromDBByUser(pool, userId)
	if err != nil {
		fmt.Println(err)
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

		WriteStatusReportToDb(pool, report)

		constraints, err := GetAllStoredMedConstraintsFromDB(pool, storedMedication.StoredMedicationID)
		if err != nil {
			fmt.Println(err)
			return
		}

		for _, constraint := range constraints {
			switch conditionType := constraint.ConditionType; conditionType {
			case "TEMPERATURE":
				if currentTemperature > constraint.MaxThreshold {
					fmt.Printf("Temperature threshold exceeded for medication %d", storedMedication.StoredMedicationID)
				}
			}
		}
	}
}
