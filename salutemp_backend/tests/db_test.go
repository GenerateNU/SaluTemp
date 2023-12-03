package tests

import (
	"database/sql"
	"fmt"
	"testing"

	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	c "salutemp/backend/src/controller"
	"salutemp/backend/src/model"
	"time"

	_ "github.com/lib/pq"

	"github.com/huandu/go-assert"
	"github.com/jackc/pgx"
)

func TestDBConnection(t *testing.T) {
	dbURL := fmt.Sprintf("postgres://%s:%s@localhost:5434/%s?sslmode=disable",
		"user",
		"pwd",
		"salutemp",
	)

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		t.Fatalf("failed to connect to the database: %v", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		t.Fatalf("failed to ping the database: %v", err)
	}
}

func TestMedication(t *testing.T) {
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
	a := assert.New(t)

	t.Run("TestGetMedication", func(t *testing.T) {
		// initialRequest, _ := http.NewRequest("GET", "/v1/medications", nil)
		// initialResponseRecorder := httptest.NewRecorder()
		// router.ServeHTTP(initialResponseRecorder, initialRequest)

		// // Check for HTTP Status OK (200) when retrieving all medications initially
		// assert.Equal(t, http.StatusOK, initialResponseRecorder.Code)

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/v1/medications/301", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var responseMedication model.Medication
		err := json.Unmarshal(w.Body.Bytes(), &responseMedication)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Define the expected medication data
		expectedMedication := model.Medication{
			MedicationID:   301,
			MedicationName: "TestMed",
		}

		// Check individual fields of the response
		assert.Equal(t, expectedMedication.MedicationID, responseMedication.MedicationID)
		assert.Equal(t, expectedMedication.MedicationName, responseMedication.MedicationName)
	})

	t.Run("TestAddAndRetrieveMedication", func(t *testing.T) {
		// Prepare a new medication to add
		newMedication := model.Medication{
			MedicationID:   305,
			MedicationName: "NewMed",
		}

		// Marshal the new medication to JSON
		payload, err := json.Marshal(newMedication)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Add a new medication
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/v1/addmedications", bytes.NewReader(payload))
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		// Retrieve the newly added medication
		w = httptest.NewRecorder()
		req, _ = http.NewRequest("GET", fmt.Sprintf("/v1/medications/%d", newMedication.MedicationID), nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var retrievedMedication model.Medication
		err = json.Unmarshal(w.Body.Bytes(), &retrievedMedication)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved medication matches the expected data
		assert.Equal(t, newMedication.MedicationID, 305)
		assert.Equal(t, newMedication.MedicationName, retrievedMedication.MedicationName)
	})
	t.Run("TestEditAndRetrieveMedication", func(t *testing.T) {
		// Prepare the updated medication data
		updatedMedication := model.Medication{
			MedicationID:   305,
			MedicationName: "EditMed",
		}

		// Marshal the updated medication to JSON
		updatedPayload, err := json.Marshal(updatedMedication)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Edit the medication
		editRequest, _ := http.NewRequest("PUT", fmt.Sprintf("/v1/medications/%d", updatedMedication.MedicationID), bytes.NewReader(updatedPayload))
		editResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(editResponseRecorder, editRequest)

		// Check for HTTP Status OK (200) after editing the medication
		assert.Equal(t, http.StatusOK, editResponseRecorder.Code)

		// Retrieve the edited medication
		retrieveRequest, _ := http.NewRequest("GET", fmt.Sprintf("/v1/medications/%d", updatedMedication.MedicationID), nil)
		retrieveResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(retrieveResponseRecorder, retrieveRequest)

		// Check for HTTP Status OK (200) when retrieving the edited medication
		assert.Equal(t, http.StatusOK, retrieveResponseRecorder.Code)

		var retrievedMedication model.Medication
		err = json.Unmarshal(retrieveResponseRecorder.Body.Bytes(), &retrievedMedication)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved medication's name matches the updated name
		assert.Equal(t, updatedMedication.MedicationName, retrievedMedication.MedicationName)
	})

	t.Run("TestDeleteMedication", func(t *testing.T) {
		// Get all medications before deletion
		initialRequest, _ := http.NewRequest("GET", "/v1/medications/", nil)
		initialResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(initialResponseRecorder, initialRequest)

		// Check for HTTP Status OK (200) when retrieving all medications initially
		assert.Equal(t, http.StatusOK, initialResponseRecorder.Code)

		fmt.Println(initialResponseRecorder)

		var initialMedications []model.Medication
		err := json.Unmarshal(initialResponseRecorder.Body.Bytes(), &initialMedications)
		a.NilError(t, err, "Error unmarshaling JSON response")

		fmt.Println("flkdsmng;klsdfmglkdsfmfl")
		fmt.Println(initialMedications)

		// Check that there are initially 2 medications in the database
		assert.Equal(t, 2, len(initialMedications))
		assert.Equal(t, 301, initialMedications[0].MedicationID)
		assert.Equal(t, "TestMed", initialMedications[0].MedicationName)
		assert.Equal(t, 305, initialMedications[1].MedicationID)
		assert.Equal(t, "EditMed", initialMedications[1].MedicationName)

		// Delete the medication with ID 305
		deleteRequest, _ := http.NewRequest("DELETE", "/v1/medications/305", nil)
		deleteResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(deleteResponseRecorder, deleteRequest)

		// Check for HTTP Status OK (200) after deleting the medication
		assert.Equal(t, http.StatusOK, deleteResponseRecorder.Code)

		// Get all medications after deletion
		finalRequest, _ := http.NewRequest("GET", "/v1/medications/", nil)
		finalResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(finalResponseRecorder, finalRequest)

		// Check for HTTP Status OK (200) when retrieving all medications after deletion
		assert.Equal(t, http.StatusOK, finalResponseRecorder.Code)

		var finalMedications []model.Medication
		err = json.Unmarshal(finalResponseRecorder.Body.Bytes(), &finalMedications)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there is only 1 medication remaining in the database after deletion
		assert.Equal(t, 1, len(finalMedications))

		// Check that the remaining medication has the ID 301 and the name "TestMed"
		assert.Equal(t, 301, finalMedications[0].MedicationID)
		assert.Equal(t, "TestMed", finalMedications[0].MedicationName)
	})

}

func TestUser(t *testing.T) {
	// Your database connection setup code here
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
	a := assert.New(t)

	t.Run("TestGetUser", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/v1/users/200", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var responseUser model.User
		err := json.Unmarshal(w.Body.Bytes(), &responseUser)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Define the expected user data
		expectedUser := model.User{
			UserID:    200,
			FirstName: "John",
			LastName:  "Doe",
			Email:     "johndoe@gmail.com",
		}

		// Check individual fields of the response
		assert.Equal(t, expectedUser.UserID, responseUser.UserID)
		assert.Equal(t, expectedUser.FirstName, responseUser.FirstName)
		assert.Equal(t, expectedUser.LastName, responseUser.LastName)
		assert.Equal(t, expectedUser.Email, responseUser.Email)
	})

	t.Run("TestAddAndRetrieveUser", func(t *testing.T) {
		// Prepare a new user to add
		newUser := model.User{
			UserID:    2,
			FirstName: "Jane",
			LastName:  "Smith",
			Email:     "janesmith@gmail.com",
		}

		// Marshal the new user to JSON
		payload, err := json.Marshal(newUser)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Add a new user
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/v1/addusers", bytes.NewReader(payload))
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		// Retrieve the newly added user
		w = httptest.NewRecorder()
		req, _ = http.NewRequest("GET", fmt.Sprintf("/v1/users/%d", newUser.UserID), nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var retrievedUser model.User
		err = json.Unmarshal(w.Body.Bytes(), &retrievedUser)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved user matches the expected data
		assert.Equal(t, newUser.UserID, retrievedUser.UserID)
		assert.Equal(t, newUser.FirstName, retrievedUser.FirstName)
		assert.Equal(t, newUser.LastName, retrievedUser.LastName)
		assert.Equal(t, newUser.Email, retrievedUser.Email)
	})

	t.Run("TestEditAndRetrieveUser", func(t *testing.T) {
		// Prepare the updated user data
		updatedUser := model.User{
			UserID:    2,
			FirstName: "UpdatedJane",
			LastName:  "UpdatedSmith",
			Email:     "updatedjanesmith@gmail.com",
		}

		// Marshal the updated user to JSON
		updatedPayload, err := json.Marshal(updatedUser)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Edit the user
		editRequest, _ := http.NewRequest("PUT", fmt.Sprintf("/v1/users/%d", updatedUser.UserID), bytes.NewReader(updatedPayload))
		editResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(editResponseRecorder, editRequest)

		// Check for HTTP Status OK (200) after editing the user
		assert.Equal(t, http.StatusOK, editResponseRecorder.Code)

		// Retrieve the edited user
		retrieveRequest, _ := http.NewRequest("GET", fmt.Sprintf("/v1/users/%d", updatedUser.UserID), nil)
		retrieveResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(retrieveResponseRecorder, retrieveRequest)

		// Check for HTTP Status OK (200) when retrieving the edited user
		assert.Equal(t, http.StatusOK, retrieveResponseRecorder.Code)

		var retrievedUser model.User
		err = json.Unmarshal(retrieveResponseRecorder.Body.Bytes(), &retrievedUser)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved user's fields match the updated values
		// Check if the retrieved user's fields match the updated values
		assert.Equal(t, updatedUser.FirstName, retrievedUser.FirstName)
		assert.Equal(t, updatedUser.LastName, retrievedUser.LastName)
		assert.Equal(t, updatedUser.Email, retrievedUser.Email)
	})

	t.Run("TestDeleteUser", func(t *testing.T) {
		// Get all users before deletion
		initialRequest, _ := http.NewRequest("GET", "/v1/users/", nil)
		initialResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(initialResponseRecorder, initialRequest)

		// Check for HTTP Status OK (200) when retrieving all users initially
		assert.Equal(t, http.StatusOK, initialResponseRecorder.Code)

		var initialUsers []model.User
		err := json.Unmarshal(initialResponseRecorder.Body.Bytes(), &initialUsers)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there are initially 2 users in the database
		assert.Equal(t, 2, len(initialUsers))
		assert.Equal(t, 200, initialUsers[0].UserID)
		assert.Equal(t, "John", initialUsers[0].FirstName)
		assert.Equal(t, "Doe", initialUsers[0].LastName)
		assert.Equal(t, "johndoe@gmail.com", initialUsers[0].Email)

		assert.Equal(t, 2, initialUsers[1].UserID)
		assert.Equal(t, "UpdatedJane", initialUsers[1].FirstName)
		assert.Equal(t, "UpdatedSmith", initialUsers[1].LastName)
		assert.Equal(t, "updatedjanesmith@gmail.com", initialUsers[1].Email)

		// Delete the user with ID 2
		deleteRequest, _ := http.NewRequest("DELETE", "/v1/users/2", nil)
		deleteResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(deleteResponseRecorder, deleteRequest)

		// Check for HTTP Status OK (200) after deleting the user
		assert.Equal(t, http.StatusOK, deleteResponseRecorder.Code)

		// Get all users after deletion
		finalRequest, _ := http.NewRequest("GET", "/v1/users/", nil)
		finalResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(finalResponseRecorder, finalRequest)

		// Check for HTTP Status OK (200) when retrieving all users after deletion
		assert.Equal(t, http.StatusOK, finalResponseRecorder.Code)

		var finalUsers []model.User
		err = json.Unmarshal(finalResponseRecorder.Body.Bytes(), &finalUsers)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there is only 1 user remaining in the database after deletion
		assert.Equal(t, 1, len(finalUsers))

		// Check that the remaining user has the ID 1 and the name "John Doe"
		assert.Equal(t, 200, finalUsers[0].UserID)
		assert.Equal(t, "John", finalUsers[0].FirstName)
		assert.Equal(t, "Doe", finalUsers[0].LastName)
		assert.Equal(t, "johndoe@gmail.com", finalUsers[0].Email)
	})
}

func TestStoredMed(t *testing.T) {
	// Your database connection setup code here
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
	a := assert.New(t)

	t.Run("TestGetStoredMedicationByID", func(t *testing.T) {
		// Make a GET request to retrieve the stored medication by ID 1
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/v1/storedmedications/1", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var retrievedStoredMedication model.StoredMedication
		err := json.Unmarshal(w.Body.Bytes(), &retrievedStoredMedication)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved stored medication matches the expected data
		assert.Equal(t, 1, retrievedStoredMedication.StoredMedicationID)
		assert.Equal(t, 301, retrievedStoredMedication.MedicationID)
		assert.Equal(t, 200, retrievedStoredMedication.UserID)
		assert.Equal(t, 70.0, retrievedStoredMedication.CurrentTemperature)
		assert.Equal(t, 20.0, retrievedStoredMedication.CurrentHumidity)
		assert.Equal(t, 20.0, retrievedStoredMedication.CurrentLight)
	})

	t.Run("TestAddAndRetrieveStoredMedication", func(t *testing.T) {
		// Prepare a new stored medication to add
		newStoredMedication := model.StoredMedication{
			StoredMedicationID: 2,
			MedicationID:       301,
			UserID:             200,
			CurrentTemperature: 25.5,
			CurrentHumidity:    60.0,
			CurrentLight:       300.0,
		}

		// Marshal the new stored medication to JSON
		payload, err := json.Marshal(newStoredMedication)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Add a new stored medication
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/v1/addstoredmedications", bytes.NewReader(payload))
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		// Retrieve the newly added stored medication
		w = httptest.NewRecorder()
		req, _ = http.NewRequest("GET", fmt.Sprintf("/v1/storedmedications/%d", newStoredMedication.StoredMedicationID), nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var retrievedStoredMedication model.StoredMedication
		err = json.Unmarshal(w.Body.Bytes(), &retrievedStoredMedication)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved stored medication matches the expected data
		assert.Equal(t, newStoredMedication.StoredMedicationID, retrievedStoredMedication.StoredMedicationID)
		assert.Equal(t, newStoredMedication.MedicationID, retrievedStoredMedication.MedicationID)
		assert.Equal(t, newStoredMedication.UserID, retrievedStoredMedication.UserID)
		assert.Equal(t, newStoredMedication.CurrentTemperature, retrievedStoredMedication.CurrentTemperature)
		assert.Equal(t, newStoredMedication.CurrentHumidity, retrievedStoredMedication.CurrentHumidity)
		assert.Equal(t, newStoredMedication.CurrentLight, retrievedStoredMedication.CurrentLight)
	})

	t.Run("TestEditAndRetrieveStoredMedication", func(t *testing.T) {
		// Prepare the updated stored medication data
		updatedStoredMedication := model.StoredMedication{
			StoredMedicationID: 2,
			MedicationID:       301,
			UserID:             200,
			CurrentTemperature: 30.0,
			CurrentHumidity:    50.0,
			CurrentLight:       250.0,
		}

		// Marshal the updated stored medication to JSON
		updatedPayload, err := json.Marshal(updatedStoredMedication)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Edit the stored medication
		editRequest, _ := http.NewRequest("PUT", fmt.Sprintf("/v1/storedmedications/%d", updatedStoredMedication.StoredMedicationID), bytes.NewReader(updatedPayload))
		editResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(editResponseRecorder, editRequest)

		// Check for HTTP Status OK (200) after editing the stored medication
		assert.Equal(t, http.StatusOK, editResponseRecorder.Code)

		// Retrieve the edited stored medication
		retrieveRequest, _ := http.NewRequest("GET", fmt.Sprintf("/v1/storedmedications/%d", updatedStoredMedication.StoredMedicationID), nil)
		retrieveResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(retrieveResponseRecorder, retrieveRequest)

		// Check for HTTP Status OK (200) when retrieving the edited stored medication
		assert.Equal(t, http.StatusOK, retrieveResponseRecorder.Code)

		var retrievedStoredMedication model.StoredMedication
		err = json.Unmarshal(retrieveResponseRecorder.Body.Bytes(), &retrievedStoredMedication)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved stored medication's fields match the updated values
		assert.Equal(t, updatedStoredMedication.CurrentTemperature, retrievedStoredMedication.CurrentTemperature)
		assert.Equal(t, updatedStoredMedication.CurrentHumidity, retrievedStoredMedication.CurrentHumidity)
		assert.Equal(t, updatedStoredMedication.CurrentLight, retrievedStoredMedication.CurrentLight)
	})

	t.Run("TestDeleteStoredMedication", func(t *testing.T) {
		// Get all stored medications before deletion
		initialRequest, _ := http.NewRequest("GET", "/v1/storedmedications/", nil)
		initialResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(initialResponseRecorder, initialRequest)

		// Check for HTTP Status OK (200) when retrieving all stored medications initially
		assert.Equal(t, http.StatusOK, initialResponseRecorder.Code)

		var initialStoredMedications []model.StoredMedication
		err := json.Unmarshal(initialResponseRecorder.Body.Bytes(), &initialStoredMedications)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there are initially 1 stored medication in the database
		assert.Equal(t, 2, len(initialStoredMedications))
		assert.Equal(t, 1, initialStoredMedications[0].StoredMedicationID)
		assert.Equal(t, 301, initialStoredMedications[0].MedicationID)
		assert.Equal(t, 200, initialStoredMedications[0].UserID)
		assert.Equal(t, 70.0, initialStoredMedications[0].CurrentTemperature)
		assert.Equal(t, 20.0, initialStoredMedications[0].CurrentHumidity)
		assert.Equal(t, 20.0, initialStoredMedications[0].CurrentLight)

		assert.Equal(t, 2, initialStoredMedications[1].StoredMedicationID)
		assert.Equal(t, 301, initialStoredMedications[1].MedicationID)
		assert.Equal(t, 200, initialStoredMedications[1].UserID)
		assert.Equal(t, 30.0, initialStoredMedications[1].CurrentTemperature)
		assert.Equal(t, 50.0, initialStoredMedications[1].CurrentHumidity)
		assert.Equal(t, 250.0, initialStoredMedications[1].CurrentLight)

		// Delete the stored medication with ID 1
		deleteRequest, _ := http.NewRequest("DELETE", "/v1/storedmedications/2", nil)
		deleteResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(deleteResponseRecorder, deleteRequest)

		// Check for HTTP Status OK (200) after deleting the stored medication
		assert.Equal(t, http.StatusOK, deleteResponseRecorder.Code)

		// Get all stored medications after deletion
		finalRequest, _ := http.NewRequest("GET", "/v1/storedmedications/", nil)
		finalResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(finalResponseRecorder, finalRequest)

		// Check for HTTP Status OK (200) when retrieving all stored medications after deletion
		assert.Equal(t, http.StatusOK, finalResponseRecorder.Code)

		var finalStoredMedications []model.StoredMedication
		err = json.Unmarshal(finalResponseRecorder.Body.Bytes(), &finalStoredMedications)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there are no stored medications remaining in the database after deletion
		assert.Equal(t, 1, len(finalStoredMedications))
		assert.Equal(t, 1, initialStoredMedications[0].StoredMedicationID)
		assert.Equal(t, 301, initialStoredMedications[0].MedicationID)
		assert.Equal(t, 200, initialStoredMedications[0].UserID)
		assert.Equal(t, 70.0, initialStoredMedications[0].CurrentTemperature)
		assert.Equal(t, 20.0, initialStoredMedications[0].CurrentHumidity)
		assert.Equal(t, 20.0, initialStoredMedications[0].CurrentLight)
	})
}

func TestAlertAPI(t *testing.T) {
	// Your database connection setup code here
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
	a := assert.New(t)

	t.Run("TestGetAlertByID", func(t *testing.T) {
		// Make a GET request to retrieve the alert by ID 1
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/v1/alerts/3", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var retrievedAlert model.Alert
		err := json.Unmarshal(w.Body.Bytes(), &retrievedAlert)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// // Check if the retrieved alert matches the expected data
		assert.Equal(t, 3, retrievedAlert.WarningID)
		assert.Equal(t, 1, retrievedAlert.StoredMedicationID)
		assert.Equal(t, "Test Description!", retrievedAlert.WarningDescription)
		assert.Equal(t, "TEMPERATURE", retrievedAlert.ConditionType)
	})

	t.Run("TestAddAndRetrieveAlert", func(t *testing.T) {
		// Prepare a new alert to add
		newAlert := model.Alert{
			WarningID:          4,
			StoredMedicationID: 1,
			WarningTimestamp:   time.Now(),
			WarningDescription: "Low Humidity",
			ConditionType:      "HUMIDITY",
		}

		// Marshal the new alert to JSON
		payload, err := json.Marshal(newAlert)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Add a new alert
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/v1/addalerts", bytes.NewReader(payload))
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		// Retrieve the newly added alert
		w = httptest.NewRecorder()
		req, _ = http.NewRequest("GET", fmt.Sprintf("/v1/alerts/%d", newAlert.WarningID), nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var retrievedAlert model.Alert
		err = json.Unmarshal(w.Body.Bytes(), &retrievedAlert)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved alert matches the expected data
		assert.Equal(t, newAlert.WarningID, retrievedAlert.WarningID)
		assert.Equal(t, newAlert.StoredMedicationID, retrievedAlert.StoredMedicationID)
		assert.Equal(t, newAlert.WarningDescription, retrievedAlert.WarningDescription)
		assert.Equal(t, newAlert.ConditionType, retrievedAlert.ConditionType)
	})

	t.Run("TestEditAndRetrieveAlert", func(t *testing.T) {
		// Prepare the updated alert data
		updatedAlert := model.Alert{
			WarningID:          4,
			StoredMedicationID: 1,
			WarningTimestamp:   time.Now(),
			WarningDescription: "High Light Exposure",
			ConditionType:      "LIGHT_EXPOSURE",
		}

		// Marshal the updated alert to JSON
		updatedPayload, err := json.Marshal(updatedAlert)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Edit the alert
		editRequest, _ := http.NewRequest("PUT", fmt.Sprintf("/v1/alerts/%d", updatedAlert.WarningID), bytes.NewReader(updatedPayload))
		editResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(editResponseRecorder, editRequest)

		// Check for HTTP Status OK (200) after editing the alert
		assert.Equal(t, http.StatusOK, editResponseRecorder.Code)

		// Retrieve the edited alert
		retrieveRequest, _ := http.NewRequest("GET", fmt.Sprintf("/v1/alerts/%d", updatedAlert.WarningID), nil)
		retrieveResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(retrieveResponseRecorder, retrieveRequest)

		// Check for HTTP Status OK (200) when retrieving the edited alert
		assert.Equal(t, http.StatusOK, retrieveResponseRecorder.Code)

		var retrievedAlert model.Alert
		err = json.Unmarshal(retrieveResponseRecorder.Body.Bytes(), &retrievedAlert)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved alert's

		// Get all alerts after deletion
		finalRequest, _ := http.NewRequest("GET", "/v1/alerts/4", nil)
		finalResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(finalResponseRecorder, finalRequest)

		// Check for HTTP Status OK (200) when retrieving all alerts after deletion
		assert.Equal(t, http.StatusOK, finalResponseRecorder.Code)

		var finalAlert model.Alert
		err = json.Unmarshal(finalResponseRecorder.Body.Bytes(), &finalAlert)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check for HTTP Status OK (200)
		assert.Equal(t, updatedAlert.WarningID, finalAlert.WarningID)
		assert.Equal(t, updatedAlert.StoredMedicationID, finalAlert.StoredMedicationID)
		assert.Equal(t, updatedAlert.WarningDescription, finalAlert.WarningDescription)
		assert.Equal(t, updatedAlert.ConditionType, finalAlert.ConditionType)
	})

	t.Run("TestDeleteAlert", func(t *testing.T) {
		// Get all alerts before deletion
		initialRequest, _ := http.NewRequest("GET", "/v1/alerts/", nil)
		initialResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(initialResponseRecorder, initialRequest)

		// Check for HTTP Status OK (200) when retrieving all alerts initially
		assert.Equal(t, http.StatusOK, initialResponseRecorder.Code)

		var initialAlerts []model.Alert
		err := json.Unmarshal(initialResponseRecorder.Body.Bytes(), &initialAlerts)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there are initially 3 alerts in the database
		assert.Equal(t, 2, len(initialAlerts))
		assert.Equal(t, 3, initialAlerts[0].WarningID)
		assert.Equal(t, 1, initialAlerts[0].StoredMedicationID)
		assert.Equal(t, "Test Description!", initialAlerts[0].WarningDescription)
		assert.Equal(t, "TEMPERATURE", initialAlerts[0].ConditionType)

		assert.Equal(t, 4, initialAlerts[1].WarningID)
		assert.Equal(t, 1, initialAlerts[1].StoredMedicationID)
		assert.Equal(t, "High Light Exposure", initialAlerts[1].WarningDescription)
		assert.Equal(t, "LIGHT_EXPOSURE", initialAlerts[1].ConditionType)

		// Delete the alert with ID 4
		deleteRequest, _ := http.NewRequest("DELETE", "/v1/alerts/4", nil)
		deleteResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(deleteResponseRecorder, deleteRequest)

		// Check for HTTP Status OK (200) after deleting the alert
		assert.Equal(t, http.StatusOK, deleteResponseRecorder.Code)

		// Get all alerts after deletion
		finalRequest, _ := http.NewRequest("GET", "/v1/alerts/", nil)
		finalResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(finalResponseRecorder, finalRequest)

		// Check for HTTP Status OK (200) when retrieving all alerts after deletion
		assert.Equal(t, http.StatusOK, finalResponseRecorder.Code)

		var finalAlerts []model.Alert
		err = json.Unmarshal(finalResponseRecorder.Body.Bytes(), &finalAlerts)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there are 2 alerts remaining in the database after deletion
		assert.Equal(t, 1, len(finalAlerts))

		// Verify that the deleted alert is not present in the final alerts list
		assert.Equal(t, 3, initialAlerts[0].WarningID)
		assert.Equal(t, 1, initialAlerts[0].StoredMedicationID)
		assert.Equal(t, "Test Description!", initialAlerts[0].WarningDescription)
		assert.Equal(t, "TEMPERATURE", initialAlerts[0].ConditionType)
	})

}

func TestMedicationConstraintAPI(t *testing.T) {
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
	a := assert.New(t)

	t.Run("TestGetMedicationConstraint", func(t *testing.T) {
		// Make a GET request to retrieve the medication constraint by ID 1 and type "example"
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/v1/medicationconstraints/301/TEMPERATURE", nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var retrievedConstraint model.MedicationConstraint
		err := json.Unmarshal(w.Body.Bytes(), &retrievedConstraint)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved constraint matches the expected data
		assert.Equal(t, 301, retrievedConstraint.MedicationID)
		assert.Equal(t, "TEMPERATURE", retrievedConstraint.ConditionType)
		assert.Equal(t, 90.00, retrievedConstraint.MaxThreshold)
		assert.Equal(t, 50.00, retrievedConstraint.MinThreshold)
		assert.Equal(t, "2 Days, 2 Hours, 10 Minutes", retrievedConstraint.Duration)
	})

	t.Run("TestAddAndRetrieveMedicationConstraint", func(t *testing.T) {

		newMedication := model.Medication{
			MedicationID:   305,
			MedicationName: "NewMed",
		}

		// Marshal the new medication to JSON
		payload1, err := json.Marshal(newMedication)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Add a new medication
		w1 := httptest.NewRecorder()
		req1, _ := http.NewRequest("POST", "/v1/addmedications", bytes.NewReader(payload1))
		router.ServeHTTP(w1, req1)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w1.Code)

		// Prepare a new medication constraint to add
		newConstraint := model.MedicationConstraint{
			MedicationID:  305,
			ConditionType: "HUMIDITY",
			MaxThreshold:  15.0,
			MinThreshold:  7.0,
			Duration:      "2 weeks",
		}

		// Marshal the new constraint to JSON
		payload, err := json.Marshal(newConstraint)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Add a new medication constraint
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/v1/addmedicationconstraints", bytes.NewReader(payload))
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		// Retrieve the newly added constraint
		w = httptest.NewRecorder()
		req, _ = http.NewRequest("GET", fmt.Sprintf("/v1/medicationconstraints/%d/%s", newConstraint.MedicationID, newConstraint.ConditionType), nil)
		router.ServeHTTP(w, req)

		// Check for HTTP Status OK (200)
		assert.Equal(t, http.StatusOK, w.Code)

		var retrievedConstraint model.MedicationConstraint
		err = json.Unmarshal(w.Body.Bytes(), &retrievedConstraint)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved constraint matches the expected data
		assert.Equal(t, newConstraint.MedicationID, retrievedConstraint.MedicationID)
		assert.Equal(t, newConstraint.ConditionType, retrievedConstraint.ConditionType)
		assert.Equal(t, newConstraint.MaxThreshold, retrievedConstraint.MaxThreshold)
		assert.Equal(t, newConstraint.MinThreshold, retrievedConstraint.MinThreshold)
		assert.Equal(t, newConstraint.Duration, retrievedConstraint.Duration)
	})

	t.Run("TestEditAndRetrieveMedicationConstraint", func(t *testing.T) {
		// Prepare the updated medication constraint data
		updatedConstraint := model.MedicationConstraint{
			MedicationID:  305,
			ConditionType: "HUMIDITY",
			MaxThreshold:  20.0,
			MinThreshold:  10.0,
			Duration:      "3 weeks",
		}

		// Marshal the updated constraint to JSON
		updatedPayload, err := json.Marshal(updatedConstraint)
		a.NilError(t, err, "Error marshaling JSON request body")

		// Edit the medication constraint
		editRequest, _ := http.NewRequest("PUT", fmt.Sprintf("/v1/medicationconstraints/%d/%s", updatedConstraint.MedicationID, updatedConstraint.ConditionType), bytes.NewReader(updatedPayload))
		editResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(editResponseRecorder, editRequest)

		// Check for HTTP Status OK (200) after editing the constraint
		assert.Equal(t, http.StatusOK, editResponseRecorder.Code)

		// Retrieve the edited constraint
		retrieveRequest, _ := http.NewRequest("GET", fmt.Sprintf("/v1/medicationconstraints/%d/%s", updatedConstraint.MedicationID, updatedConstraint.ConditionType), nil)
		retrieveResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(retrieveResponseRecorder, retrieveRequest)

		// Check for HTTP Status OK (200) when retrieving the edited constraint
		assert.Equal(t, http.StatusOK, retrieveResponseRecorder.Code)

		var retrievedConstraint model.MedicationConstraint
		err = json.Unmarshal(retrieveResponseRecorder.Body.Bytes(), &retrievedConstraint)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check if the retrieved constraint's data matches the updated data
		assert.Equal(t, updatedConstraint.MedicationID, retrievedConstraint.MedicationID)
		assert.Equal(t, updatedConstraint.ConditionType, retrievedConstraint.ConditionType)
		assert.Equal(t, updatedConstraint.MaxThreshold, retrievedConstraint.MaxThreshold)
		assert.Equal(t, updatedConstraint.MinThreshold, retrievedConstraint.MinThreshold)
		assert.Equal(t, updatedConstraint.Duration, retrievedConstraint.Duration)
	})

	t.Run("TestDeleteMedicationConstraint", func(t *testing.T) {
		// Get all medication constraints before deletion
		initialRequest, _ := http.NewRequest("GET", "/v1/medicationconstraints/", nil)
		initialResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(initialResponseRecorder, initialRequest)

		// Check for HTTP Status OK (200) when retrieving all constraints initially
		assert.Equal(t, http.StatusOK, initialResponseRecorder.Code)

		var initialConstraints []model.MedicationConstraint
		err := json.Unmarshal(initialResponseRecorder.Body.Bytes(), &initialConstraints)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there are initially 2 constraints in the database
		assert.Equal(t, 2, len(initialConstraints))
		assert.Equal(t, 301, initialConstraints[0].MedicationID)
		assert.Equal(t, "TEMPERATURE", initialConstraints[0].ConditionType)
		assert.Equal(t, 90.0, initialConstraints[0].MaxThreshold)
		assert.Equal(t, 50.0, initialConstraints[0].MinThreshold)
		assert.Equal(t, "2 Days, 2 Hours, 10 Minutes", initialConstraints[0].Duration)

		assert.Equal(t, 305, initialConstraints[1].MedicationID)
		assert.Equal(t, "HUMIDITY", initialConstraints[1].ConditionType)
		assert.Equal(t, 20.0, initialConstraints[1].MaxThreshold)
		assert.Equal(t, 10.0, initialConstraints[1].MinThreshold)
		assert.Equal(t, "3 weeks", initialConstraints[1].Duration)

		// Delete the constraint with ID 2 and type "test_condition"
		// Delete the constraint with ID 2 and type "test_condition"
		deleteRequest, _ := http.NewRequest("DELETE", "/v1/medicationconstraints/305/HUMIDITY", nil)
		deleteResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(deleteResponseRecorder, deleteRequest)

		// Check for HTTP Status OK (200) after deleting the constraint
		assert.Equal(t, http.StatusOK, deleteResponseRecorder.Code)

		// Get all medication constraints after deletion
		finalRequest, _ := http.NewRequest("GET", "/v1/medicationconstraints/", nil)
		finalResponseRecorder := httptest.NewRecorder()
		router.ServeHTTP(finalResponseRecorder, finalRequest)

		// Check for HTTP Status OK (200) when retrieving all constraints after deletion
		assert.Equal(t, http.StatusOK, finalResponseRecorder.Code)

		var finalConstraints []model.MedicationConstraint
		err = json.Unmarshal(finalResponseRecorder.Body.Bytes(), &finalConstraints)
		a.NilError(t, err, "Error unmarshaling JSON response")

		// Check that there is 1 constraint remaining in the database after deletion
		assert.Equal(t, 1, len(finalConstraints))

		// Verify that the deleted constraint is not present in the final constraints list
		assert.Equal(t, 301, finalConstraints[0].MedicationID)
		assert.Equal(t, "TEMPERATURE", finalConstraints[0].ConditionType)
		assert.Equal(t, 90.0, finalConstraints[0].MaxThreshold)
		assert.Equal(t, 50.0, finalConstraints[0].MinThreshold)
		assert.Equal(t, "2 Days, 2 Hours, 10 Minutes", finalConstraints[0].Duration)
	})

}
