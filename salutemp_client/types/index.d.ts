export type Medication = {
  medication_id: Float;
  medication_name: string;
};

export type StoredMedicationWithConstraint = {
  stored_medication_id: int;
  medication_id: int;
  medication_name: string;
  current_temperature: number;
  temp_max_threshold: number;
  temp_min_threshold: number;
  temp_duration: string;
  current_light: number;
  light_max_threshold: number;
  light_min_threshold: number;
  light_duration: string;
  current_humidity: number;
  humidity_max_threshold: number;
  humidity_min_threshold: number;
  humidity_duration: string;
};

/**
 *     StoredMedicationID int     `json:"stored_medication_id"`
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
 */
