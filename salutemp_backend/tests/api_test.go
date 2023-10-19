package tests

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	c "salutemp/backend/src/controller"
	"salutemp/backend/src/model"
	"testing"

	"github.com/huandu/go-assert"
	"github.com/jackc/pgx"
)

func TestGetMedication(t *testing.T) {
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

	m := &model.PgModel{
		Conn: conn,
	}
	c := &c.PgController{
		Model: m,
	}
	router := c.Serve()

	w := httptest.NewRecorder()

	req, _ := http.NewRequest("GET", "/v1/medications/301", nil)
	router.ServeHTTP(w, req)

	// Check for HTTP Status OK (200)
	assert.Equal(t, http.StatusOK, w.Code)

	var responseMedication model.Medication

	var err2 error
	a := assert.New(t)

	err2 = json.Unmarshal(w.Body.Bytes(), &responseMedication)
	a.NilError(t, err2, "Error unmarshaling JSON response")

	// Define the expected medication data
	expectedMedication := model.Medication{
		MedicationID:   301,
		MedicationName: "TestMed",
	}

	// Check individual fields of the response
	assert.Equal(t, expectedMedication.MedicationID, responseMedication.MedicationID)
	assert.Equal(t, expectedMedication.MedicationName, responseMedication.MedicationName)
}
