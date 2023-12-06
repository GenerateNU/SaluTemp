import colors from '../config/colors';

export enum Status {
  Good = 'Good',
  Bad = 'Bad',
  Warning = 'Warning',
  NoStatus = ''
}

export enum MedOverviewTypeEnum {
  Temperature = 'Temperature',
  Humidity = 'Humidity',
  Light = 'Light'
}

export function getMedOverviewTypeSymbol(type: MedOverviewTypeEnum) {
  switch (type) {
    case MedOverviewTypeEnum.Temperature:
      return '°';
    case MedOverviewTypeEnum.Humidity:
      return '%';
    case MedOverviewTypeEnum.Light:
      return 'ᴸ';
  }
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
    case Status.NoStatus: {
      cardStatusColor = { main: colors.neutral, side: colors.darkNeutral };
    }
  }

  return cardStatusColor;
}
