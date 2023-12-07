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

export type StatusReport = {
  event_time: string;
  stored_medication_id: number;
  temperature: number;
  humidity: number;
  light: number;
};

export type MedicationConstraint = {
  medication_id: number;
  condition_type: string;
  max_threshold: number;
  min_threshold: number;
  duration: string;
};

export type statusReport = {
  time: string;
  stored_medication_id: number,
  temperature: number,
  humidity: number,
  light: number;
  };

export type storedMedication = {
	stored_medication_id: number,
	medication_id:       number,
	user_id:             number,
	current_temperature: number,
	current_humidity:    number,
	current_light:       number,
}

export type medicationConstraint = {
  stored_medication_id: number,
  condition_type: string,
  max_threshold:  number,
  min_threshold:  number,
  duration: string
}

export type alert = {
  warning_id:           int,
  stored_medication_id: int,
  warning_timestamp:    string,
  warning_description:  string,
  condition_type:       string 
}
