export type Medication = {
  medication_id: Float;
  medication_name: string;
};

export type StoredMedicationWithConstraint = {
  stored_medication_id: int;
  medication_id: int;
  medication_name: string;
  current: number;
  condition_type: string;
  max_threshold: number;
  min_threshold: number;
  duration: string;
};
