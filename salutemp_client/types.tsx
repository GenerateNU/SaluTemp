export interface Medication {
  // not sure how any of these are stored in the backend so probably will need to be changed.
  name: string;
  status: string;
  photo?: string;
  //TODO: Add other stuff coming from API
}

export interface MedInfo {
  nickname: string;
  expirationDate: string;
  notes: string;
  maxTemp: string;
  minTemp: string;
  maxHumidity: string;
  minHumidity: string;
  maxLight: string;
  minLight: string;
}

