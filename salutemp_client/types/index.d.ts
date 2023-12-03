export type Medication = {
  medication_id: Float;
  medication_name: string;
};

export type StoredMedication = {
  stored_medication_id: number;
  medication_id: number;
  user_id: number;
  current_temperature: number;
  current_humidity: number;
  current_light: number;
};

export type MedicationConstraint = {
  medication_id: string;
  condition_type: string;
  max_threshold: number;
  min_threshold: number;
  duration: string;
};

type StoredMedicationWithConstraintTemperature = {
  stored_medication_id: int;
  medication_id: int;
  medication_name: string;
  current_temperature: number;
  condition_type: string;
  max_threshold: number;
  min_threshold: number;
  duration: string;
};

type StoredMedicationWithConstraintLight = {
  stored_medication_id: int;
  medication_id: int;
  medication_name: string;
  current_light: number;
  condition_type: string;
  max_threshold: number;
  min_threshold: number;
  duration: string;
};

type StoredMedicationWithConstraintHumidity = {
  stored_medication_id: int;
  medication_id: int;
  medication_name: string;
  current_humidity: number;
  condition_type: string;
  max_threshold: number;
  min_threshold: number;
  duration: string;
};
