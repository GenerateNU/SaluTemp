export interface Medication {
  // not sure how any of these are stored in the backend so probably will need to be changed.
  name: string;
  status: Status;
  photo?: string;
  //TODO: Add other stuff coming from API
}

export enum Status {
  Good = 'Good',
  Bad = 'Bad',
  Warning = 'Warning'
}

export enum MedOverviewTypeEnum {
  Temperature = 'Temperature',
  Humidity = 'Humidity',
  Light = 'Light'
}
