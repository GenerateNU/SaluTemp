package model

import "time"


type User struct {
    UserID    string    `json:"user_id"`
    FirstName string `json:"first_name"`
    LastName  string `json:"last_name"`
    Email     string `json:"email"`
    PushNotificationEnabled bool   `json:"push_notification_enabled"`

}


type UserDevice struct {
    UserDeviceID int    `json:"user_device_id"`
    UserID       string    `json:"user_id"`
    DeviceID     string `json:"device_id"`
}


type Medication struct {
    MedicationID   int    `json:"medication_id"`
    MedicationName string `json:"medication_name"`
}

type StoredMedication struct {
    StoredMedicationID int     `json:"stored_medication_id"`
    MedicationID       int     `json:"medication_id"`
    UserID             string     `json:"user_id"`
    CurrentTemperature float64 `json:"current_temperature"`
    CurrentHumidity    float64 `json:"current_humidity"`
    CurrentLight       float64 `json:"current_light"`
}

type Alert struct {
    WarningID           int       `json:"warning_id"`
    StoredMedicationID  int       `json:"stored_medication_id"`
    WarningTimestamp    time.Time `json:"warning_timestamp"`
    WarningDescription  string    `json:"warning_description"`
    ConditionType       string    `json:"condition_type"`
}

type StatusReport struct {
    EventTime           time.Time  `json:"event_time"`
    StoredMedicationID  int        `json:"stored_medication_id"`
    Temperature         float64    `json:"temperature"`
    Humidity            float64    `json:"humidity"`
    Light               float64    `json:"light"`
}

type MedicationConstraint struct {
    StoredMedicationID  int     `json:"medication_id"`
    ConditionType string  `json:"condition_type"` 
    MaxThreshold  float64 `json:"max_threshold"`
    MinThreshold  float64 `json:"min_threshold"`
    Duration      string  `json:"duration"` 
}

type StoredMedicationWithConstraint struct {
    StoredMedicationID int     `json:"stored_medication_id"`
    MedicationID       int     `json:"medication_id"`
    MedicationName     string  `json:"medication_name"`
    CurrentTemperature float64 `json:"current_temperature"`
    CurrentHumidity    float64 `json:"current_humidity"`
    CurrentLight       float64 `json:"current_light"`
    TempMaxThreshold       float64 `json:"temp_max_threshold"`
    TempMinThreshold       float64 `json:"temp_min_threshold"`
    LightMaxThreshold       float64 `json:"light_max_threshold"`
    LightMinThreshold       float64 `json:"light_min_threshold"`
    HumidityMaxThreshold       float64 `json:"humidity_max_threshold"`
    HumidityMinThreshold       float64 `json:"humidity_min_threshold"`
    HumidityDuration           string  `json:"humidity_duration"` 
    TempDuration           string  `json:"temp_duration"` 
    LightDuration           string  `json:"light_duration"` 
}

type ExpoNotificationToken struct {
	ExpoNotificationTokenID int    `json:"expo_notification_token_id"`
	UserID                  string    `json:"user_id"`
	DeviceToken             string `json:"device_token"`
}