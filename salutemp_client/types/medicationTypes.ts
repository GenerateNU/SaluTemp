import colors from '../config/colors';

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

export function getStatusColors(status: Status) {
  let cardStatusColor = { main: colors.black, side: colors.black };
  switch (status) {
    case Status.Good: {
      cardStatusColor = { main: colors.green, side: colors.darkGreen };
      break;
    }
    case Status.Warning: {
      cardStatusColor = { main: colors.yellow, side: colors.darkYellow };
      break;
    }
    case Status.Bad: {
      cardStatusColor = { main: colors.red, side: colors.darkRed };
      break;
    }
  }

  return cardStatusColor;
}
