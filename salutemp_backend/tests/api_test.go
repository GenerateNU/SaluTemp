// package yourpackage

// import (
//     "encoding/json"
//     "net/http"
//     "net/http/httptest"
//     "testing"
//     "time"
// )

// func TestGetRecentStatusReports(t *testing.T) {
//     // Start your server or create a router instance
//     router := setupRouter() // This function sets up your Gin router with all routes

//     // Create a test server
//     ts := httptest.NewServer(router)
//     defer ts.Close()

//     // Define the storedMedicationID to test
//     storedMedicationID := 1

//     // Make a request to the endpoint
//     resp, err := http.Get(ts.URL + "/v1/statusreports/recent/?storedMedicationID=" + strconv.Itoa(storedMedicationID))
//     if err != nil {
//         t.Fatalf("Failed to make request: %v", err)
//     }
//     defer resp.Body.Close()

//     // Check the status code
//     if resp.StatusCode != http.StatusOK {
//         t.Errorf("Expected status OK; got %v", resp.Status)
//     }

//     // Decode the response body
//     var reports []StatusReport
//     if err := json.NewDecoder(resp.Body).Decode(&reports); err != nil {
//         t.Fatalf("Failed to decode response: %v", err)
//     }

//     // Assert the response data
//     // Here, you will write your assertions based on the expected data from your database
//     // For example, check if the reports are within the last 24 hours and have the correct storedMedicationID
//     currentTime := time.Now()
//     for _, report := range reports {
//         if report.StoredMedicationID != storedMedicationID || report.EventTime.Before(currentTime.Add(-24*time.Hour)) {
//             t.Errorf("Report does not match criteria: %+v", report)
//         }
//     }
// }

