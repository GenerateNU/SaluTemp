package tests

import (
	"bytes"
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
	a:=assert.New(t)

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
		assert.Equal(t, newMedication.MedicationID,305)
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
	a:=assert.New(t)

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

